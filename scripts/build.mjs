import { createHash } from 'node:crypto'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import catalog from '../catalog.json' with { type: 'json' }

const root = fileURLToPath(new URL('../', import.meta.url))
const dist = join(root, 'dist')
const slug = /^[a-z0-9-]+$/u

const packages = catalog.map(entry => {
  if (!slug.test(entry.id) || !slug.test(entry.folder)) throw new Error('Invalid catalog ID or folder')
  const read = file => {
    if (!file.split('/').every(part => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/u.test(part))) throw new Error('Invalid catalog file')
    return readFileSync(join(root, 'plugins', entry.folder, file), 'utf8')
  }
  const manifest = JSON.parse(read(entry.manifest))
  const { id, version } = manifest
  if (id !== entry.id || typeof version !== 'string' || !/^[0-9][0-9A-Za-z.+-]*$/u.test(version)) {
    throw new Error('Invalid catalog identity or version: ' + entry.id)
  }

  // Match the Latch site serialization, including file order and the absence of a trailing newline.
  const body = JSON.stringify({ manifest, files: entry.files.map(path => ({ path, content: read(path) })) })
  const sha256 = createHash('sha256').update(body).digest('hex')
  const url = `/plugins/files/${id}-${version}-${sha256}.latch-plugin.json`
  const listing = { id, version, publisher: 'Latch', sha256, url, en: entry.en, zh: entry.zh }
  return { listing, body }
})

mkdirSync(join(dist, 'plugins', 'files'), { recursive: true })
for (const { listing: { id, version, url }, body } of packages) {
  writeFileSync(join(dist, url.slice(1)), body)

  const npmDirectory = join(dist, 'npm', id)
  mkdirSync(npmDirectory, { recursive: true })
  const npmPackage = { name: `latch-plugin-${id}`, version, private: true, license: 'MIT', files: ['latch-plugin.json'] }
  writeFileSync(join(npmDirectory, 'package.json'), JSON.stringify(npmPackage, null, 2) + '\n')
  writeFileSync(join(npmDirectory, 'latch-plugin.json'), body)
  copyFileSync(join(root, 'LICENSE'), join(npmDirectory, 'LICENSE'))
}

const index = { formatVersion: 1, plugins: packages.map(({ listing }) => listing) }
writeFileSync(join(dist, 'plugins', 'catalog.json'), JSON.stringify(index))
