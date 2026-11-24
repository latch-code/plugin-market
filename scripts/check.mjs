// Repository checks that the build does not cover: the README tables, unshipped files and an old misspelling.
import { lstatSync, readdirSync, readFileSync, realpathSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)))
const SKIP = new Set(['.git', 'dist', 'node_modules'])
const IGNORED = new Set(['.DS_Store'])
// Assembled so that this file does not contain the word it looks for.
const MISSPELLING = ['cate', 'log'].join('')
const problems = []

const catalog = JSON.parse(readFileSync(join(root, 'latch.catalog.json'), 'utf8'))
const plugins = catalog.plugins.map(entry => {
  const manifest = JSON.parse(readFileSync(join(root, entry.folder, entry.manifest), 'utf8'))
  return { id: entry.id, version: manifest.version, folder: entry.folder, shipped: new Set([entry.manifest, ...entry.files]) }
})

function walk(directory, visit) {
  for (const name of readdirSync(directory)) {
    if (SKIP.has(name) || IGNORED.has(name)) continue
    const path = join(directory, name)
    const info = lstatSync(path)
    if (info.isDirectory()) walk(path, visit)
    else visit(relative(root, path).split(sep).join('/'), info)
  }
}

// 1. Each README lists exactly the catalog's plugins, with the versions in their manifests.
for (const readme of ['README.md', 'README.zh-CN.md']) {
  const rows = new Map()
  for (const line of readFileSync(join(root, readme), 'utf8').split('\n')) {
    const cells = line.trim().startsWith('|') ? line.trim().slice(1, -1).split('|').map(cell => cell.trim()) : []
    const id = /^`([a-z0-9-]+)`$/u.exec(cells[1] ?? '')?.[1]
    if (!id) continue
    if (rows.has(id)) problems.push(`${readme}: ${id} is listed twice`)
    rows.set(id, { version: cells[2], link: cells[0] })
  }
  for (const plugin of plugins) {
    const row = rows.get(plugin.id)
    if (!row) problems.push(`${readme}: ${plugin.id} is missing from the plugin table`)
    else {
      if (row.version !== plugin.version) problems.push(`${readme}: ${plugin.id} shows ${row.version}, manifest has ${plugin.version}`)
      if (!row.link.includes(`](${plugin.folder}/)`)) problems.push(`${readme}: ${plugin.id} should link to ${plugin.folder}/`)
    }
  }
  for (const id of rows.keys()) if (!plugins.some(plugin => plugin.id === id)) problems.push(`${readme}: ${id} is not in the catalog`)
}

// 2. Everything under plugins/ belongs to a catalog entry and ships in its bundle.
walk(join(root, 'plugins'), path => {
  const plugin = plugins.find(item => path.startsWith(item.folder + '/'))
  if (!plugin) problems.push(`${path} is not in a catalog plugin folder`)
  else if (!plugin.shipped.has(path.slice(plugin.folder.length + 1))) problems.push(`${path} is not listed in the ${plugin.id} files`)
})

// 3. The catalog name is spelled one way everywhere.
walk(root, (path, info) => {
  if (path.toLowerCase().includes(MISSPELLING)) problems.push(`${path}: file name contains "${MISSPELLING}"`)
  else if (info.isFile() && readFileSync(join(root, path), 'utf8').toLowerCase().includes(MISSPELLING))
    problems.push(`${path} contains "${MISSPELLING}"`)
})

if (problems.length) {
  for (const problem of problems) console.error(problem)
  process.exit(1)
}
console.log(`README tables match ${plugins.length} catalog plugins; every plugin file ships; the catalog name is spelled consistently.`)
