# Contributing

## Add or update a plugin

1. Add or edit the package in `plugins/<id>/`. Use `latch-plugin.json` for a plugin manifest or `latch-app.json` for an app page. For a minimal example with one skill file, see [Shift handoff](plugins/shift-handoff/).
2. Choose a unique ID using lowercase letters, digits and hyphens. Keep it stable across updates and use it in both the manifest and the catalog. Bump `version` in the manifest when changing a released manifest or any file shipped in its bundle. [Source catalog](latch.catelog.json)
3. Add or update the entry in the catalog’s `plugins` list. Set `folder` to `plugins/<id>`, relative to the catalog, and `manifest` to the manifest filename. In `files`, list the additional regular files to ship, using paths relative to that directory. The build rejects symbolic and hard links. Set `facets` to the features the plugin provides (`skill`, `tool`, `panel`, `app`). Write matching `en` and `zh` entries that explain what the plugin does, where to use it, which agents it works with, and what it can access.
4. Update both [readme.md](readme.md) and [readme.zh-CN.md](readme.zh-CN.md) when the plugin list or a listed description changes.

## Build and try it in Latch

Run this from the repository root with Node.js 22.20 or later. The build works offline with Node's built-in modules.

```sh
node scripts/build.mjs
```

Find your plugin by ID in `dist/plugins/latch.catelog.json`. Check its version and both translations. Its `bundle` path is relative to the published catalog and `sha256` is the digest of those bytes. The build also generates the compatible `dist/plugins/catalog.json` download index with `url` paths.

In Latch on your test Mac, open **Settings › Plugins › Add plugin…** and enter the checkout’s absolute path. Preview the plugin and save a draft. You can also choose the built bundle with **Import file…**. Review the files and capabilities in the draft. For an app page, build and preview the draft before applying it. Apply the plugin, confirm on the Mac if Latch asks, and try its main workflow from the place named in the listing. Check that the applied version matches the catalog.

## Open a pull request

Include the source and listing changes. In the PR description, give the plugin ID and version, explain what changed for users, and describe any new capabilities or compatibility requirements. Say which Latch version you tried and how you verified import, application, and first use.

## Include a plugin in a Latch release

The bundled marketplace gets its packages and listings from `examples/latch.catelog.json` in the Latch repository. To ship the plugin in a later release, add or update the package and its catalog entry there in a separate change and verify installation and first use from the marketplace. [Latch repository](https://github.com/latch-code/latch)
