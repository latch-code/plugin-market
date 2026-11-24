import { createHash } from 'node:crypto'
import { closeSync, constants, fstatSync, lstatSync, mkdirSync, openSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)))
const dist = join(root, 'dist')
const CATALOG = 'latch.catalog.json'
const MANIFESTS = ['latch-plugin.json', 'latch-app.json']
const FACETS = ['skill', 'tool', 'panel', 'app']
const LISTING_FIELDS = ['name', 'kind', 'summary', 'use', 'agent', 'access']
const ENTRY_FIELDS = ['id', 'folder', 'manifest', 'files', 'facets', 'en', 'zh']
const MAX_PLUGINS = 64
const MAX_FILES = 128
const slug = /^[a-z0-9-]{1,64}$/u
// The Host's releaseVersionSchema (apps/host/src/npm-source.ts in the Latch repository).
const semver =
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u

function releaseVersion(value) {
  if (typeof value !== 'string' || value.length > 64) return false
  const parts = semver.exec(value)
  return parts !== null && !parts[4]?.split('.').some(part => /^[0-9]+$/u.test(part) && part.length > 1 && part.startsWith('0'))
}

const record = value => typeof value === 'object' && value !== null && !Array.isArray(value)
const fold = path => path.normalize('NFC').toLowerCase()

function readSourceFile(file) {
  const parts = file.split('/')
  if (!parts.every(part => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/u.test(part))) throw new Error(`Invalid file path ${file}`)
  let path = root
  for (const part of parts.slice(0, -1)) {
    path = join(path, part)
    if (!lstatSync(path).isDirectory()) throw new Error(`Not a plain directory: ${parts.slice(0, -1).join('/')}`)
  }
  path = join(path, parts.at(-1))
  const before = lstatSync(path, { bigint: true })
  if (!before.isFile() || before.nlink !== 1n || realpathSync(path) !== path) throw new Error(`Not a regular, singly linked file: ${file}`)
  const fd = openSync(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0))
  try {
    const opened = fstatSync(fd, { bigint: true })
    if (!opened.isFile() || opened.nlink !== 1n || opened.dev !== before.dev || opened.ino !== before.ino || realpathSync(path) !== path) {
      throw new Error(`File changed while opening: ${file}`)
    }
    return readFileSync(fd)
  } finally {
    closeSync(fd)
  }
}

function readText(file) {
  let bytes
  try {
    bytes = readSourceFile(file)
  } catch (error) {
    if (error?.code === 'ENOENT') throw new Error(`Missing file: ${file}`)
    throw error
  }
  try {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes)
  } catch {
    throw new Error(`Not UTF-8 text: ${file}`)
  }
}

/** The entry files a manifest points at; the Host rejects a bundle that lacks any of them. */
function declaredFiles(manifest) {
  const list = value => (Array.isArray(value) ? value : [])
  return [
    ...list(manifest.host),
    ...list(manifest.skills).map(skill => skill?.file),
    ...list(manifest.panels).map(panel => panel?.entry),
    ...list(manifest.apps).map(app => app?.entry),
  ].map(path => (typeof path === 'string' ? path.replace(/^\.\//u, '') : path))
}

function checkEntry(entry) {
  const unknown = Object.keys(entry).filter(key => !ENTRY_FIELDS.includes(key))
  if (unknown.length) throw new Error(`Unknown catalog fields: ${unknown.join(', ')}`)
  if (entry.folder !== 'plugins/' + entry.id) throw new Error(`folder must be plugins/${entry.id}`)
  if (!MANIFESTS.includes(entry.manifest)) throw new Error(`manifest must be ${MANIFESTS.join(' or ')}`)
  const { files } = entry
  if (!Array.isArray(files) || files.length > MAX_FILES || !files.every(file => typeof file === 'string' && file))
    throw new Error(`files must be an array of at most ${MAX_FILES} paths`)
  if (new Set(files.map(fold)).size !== files.length) throw new Error('files must be unique, ignoring case')
  const reserved = files.find(file => [CATALOG, ...MANIFESTS].includes(file.toLowerCase()))
  if (reserved) throw new Error(`files must not list ${reserved}`)
  const { facets } = entry
  if (!Array.isArray(facets) || !facets.length || new Set(facets).size !== facets.length || !facets.every(facet => FACETS.includes(facet)))
    throw new Error(`facets must be unique values from ${FACETS.join(', ')}`)
  for (const lang of ['en', 'zh']) {
    const listing = entry[lang]
    if (!record(listing)) throw new Error(`${lang} listing is missing`)
    const extra = Object.keys(listing).filter(key => !LISTING_FIELDS.includes(key))
    if (extra.length) throw new Error(`Unknown ${lang} listing fields: ${extra.join(', ')}`)
    const empty = LISTING_FIELDS.filter(key => typeof listing[key] !== 'string' || !listing[key].trim())
    if (empty.length) throw new Error(`${lang} listing needs non-empty ${empty.join(', ')}`)
  }

  const read = file => readText(`${entry.folder}/${file}`)
  let manifest
  try {
    manifest = JSON.parse(read(entry.manifest))
  } catch (error) {
    throw new Error(`${entry.manifest}: ${error.message}`)
  }
  if (!record(manifest)) throw new Error(`${entry.manifest} must be a JSON object`)
  if (manifest.id !== entry.id) throw new Error(`${entry.manifest} id must be ${entry.id}`)
  if (!releaseVersion(manifest.version)) throw new Error(`${entry.manifest} version must be a release version such as 1.2.3`)
  if (entry.manifest === 'latch-app.json') {
    const pages = Array.isArray(manifest.apps) && manifest.apps.length > 0
    const code = (Array.isArray(manifest.host) && manifest.host.length) || (Array.isArray(manifest.panels) && manifest.panels.length)
    if (manifest.formatVersion !== 2 || !pages || code) throw new Error('latch-app.json needs formatVersion 2, apps and no host or panels')
  }
  const listed = new Set(files)
  const missing = declaredFiles(manifest).filter(file => !listed.has(file))
  if (missing.length) throw new Error(`files must list the manifest entries ${missing.join(', ')}`)

  // Match the Latch site serialization, including file order and the absence of a trailing newline.
  const body = JSON.stringify({ manifest, files: files.map(path => ({ path, content: read(path) })) })
  const sha256 = createHash('sha256').update(body).digest('hex')
  const { version } = manifest
  const bundle = `files/${entry.id}-${version}-${sha256}.latch-plugin.json`
  const listing = { id: entry.id, version, publisher: 'Latch', sha256, bundle, en: entry.en, zh: entry.zh }
  return { listing, body }
}

const catalog = JSON.parse(readText(CATALOG))
const license = readSourceFile('LICENSE')
if (!record(catalog) || catalog.formatVersion !== 1) throw new Error(`${CATALOG}: formatVersion must be 1`)
if (!Array.isArray(catalog.plugins) || !catalog.plugins.length || catalog.plugins.length > MAX_PLUGINS)
  throw new Error(`${CATALOG}: plugins must list 1 to ${MAX_PLUGINS} entries`)
const seen = new Set()
const packages = catalog.plugins.map((entry, index) => {
  const id = record(entry) && typeof entry.id === 'string' ? entry.id : undefined
  if (id === undefined || !slug.test(id)) throw new Error(`${CATALOG}: plugins[${index}] needs an id of lowercase letters, digits and hyphens`)
  if (seen.has(id)) throw new Error(`${id}: duplicate id`)
  seen.add(id)
  try {
    return checkEntry(entry)
  } catch (error) {
    throw new Error(`${id}: ${error.message}`, { cause: error })
  }
})

// Rebuild from scratch so a removed or re-versioned package never leaves a stale bundle behind.
rmSync(dist, { recursive: true, force: true })
mkdirSync(join(dist, 'plugins', 'files'), { recursive: true })
for (const { listing: { id, version, bundle }, body } of packages) {
  writeFileSync(join(dist, 'plugins', bundle), body)

  const npmDirectory = join(dist, 'npm', id)
  mkdirSync(npmDirectory, { recursive: true })
  const npmPackage = { name: `latch-plugin-${id}`, version, private: true, license: 'MIT', files: ['latch-plugin.json'] }
  writeFileSync(join(npmDirectory, 'package.json'), JSON.stringify(npmPackage, null, 2) + '\n')
  writeFileSync(join(npmDirectory, 'latch-plugin.json'), body)
  writeFileSync(join(npmDirectory, 'LICENSE'), license)
}

const index = { formatVersion: 1, plugins: packages.map(({ listing }) => listing) }
writeFileSync(join(dist, 'plugins', CATALOG), JSON.stringify(index))
const downloads = { formatVersion: 1, plugins: index.plugins.map(({ bundle, ...entry }) => ({ ...entry, url: '/plugins/' + bundle })) }
writeFileSync(join(dist, 'plugins', 'catalog.json'), JSON.stringify(downloads))
for (const { listing } of packages) console.log(`${listing.id} ${listing.version} ${listing.sha256}`)
