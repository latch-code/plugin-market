import { createHash } from 'node:crypto'
import { closeSync, constants, fstatSync, lstatSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)))
const dist = join(root, 'dist')
const slug = /^[a-z0-9-]+$/u

function readSourceFile(file) {
  const parts = file.split('/')
  if (!parts.every(part => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/u.test(part))) throw new Error('Invalid catalog file')
  let path = root
  for (const part of parts.slice(0, -1)) {
    path = join(path, part)
    if (!lstatSync(path).isDirectory()) throw new Error('Invalid catalog source directory')
  }
  path = join(path, parts.at(-1))
  const before = lstatSync(path, { bigint: true })
  if (!before.isFile() || before.nlink !== 1n || realpathSync(path) !== path) throw new Error('Invalid catalog source file')
  const fd = openSync(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0))
  try {
    const opened = fstatSync(fd, { bigint: true })
    if (!opened.isFile() || opened.nlink !== 1n || opened.dev !== before.dev || opened.ino !== before.ino || realpathSync(path) !== path) {
      throw new Error('Catalog source file changed while opening')
    }
    return readFileSync(fd)
  } finally {
    closeSync(fd)
  }
}

const catalog = JSON.parse(readSourceFile('latch.catelog.json').toString('utf8'))
const license = readSourceFile('LICENSE')
if (catalog.formatVersion !== 1) throw new Error('Unsupported catalog version')
const packages = catalog.plugins.map(entry => {
  if (!slug.test(entry.id) || entry.folder !== 'plugins/' + entry.id) throw new Error('Invalid catalog ID or folder')
  const read = file => {
    if (typeof file !== 'string') throw new Error('Invalid catalog file')
    return readSourceFile(`${entry.folder}/${file}`).toString('utf8')
  }
  const manifest = JSON.parse(read(entry.manifest))
  const { id, version } = manifest
  if (id !== entry.id || typeof version !== 'string' || !/^[0-9][0-9A-Za-z.+-]*$/u.test(version)) {
    throw new Error('Invalid catalog identity or version: ' + entry.id)
  }

  // Match the Latch site serialization, including file order and the absence of a trailing newline.
  const body = JSON.stringify({ manifest, files: entry.files.map(path => ({ path, content: read(path) })) })
  const sha256 = createHash('sha256').update(body).digest('hex')
  const bundle = `files/${id}-${version}-${sha256}.latch-plugin.json`
  const listing = { id, version, publisher: 'Latch', sha256, bundle, en: entry.en, zh: entry.zh }
  return { listing, body }
})

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
writeFileSync(join(dist, 'plugins', 'latch.catelog.json'), JSON.stringify(index))
const downloads = { formatVersion: 1, plugins: index.plugins.map(({ bundle, ...entry }) => ({ ...entry, url: '/plugins/' + bundle })) }
writeFileSync(join(dist, 'plugins', 'catalog.json'), JSON.stringify(downloads))
