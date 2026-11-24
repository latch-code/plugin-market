# Contributing

[简体中文](CONTRIBUTING.zh-CN.md) · [README](README.md)

## Before you start

This repository holds official plugins that the Latch authors maintain. To publish your own plugin, you do not need a pull request here. Publish it from your own GitHub repository (with a root `latch.catalog.json`, `latch-plugin.json` or `latch-app.json`), as an npm package, or as an exported `.latch-plugin.json`. A Latch administrator adds it with **Add plugin** in the Plugin marketplace, or with **Settings › Plugins › Import file…**. The [Latch plugin documentation](https://github.com/latch-code/latch/blob/main/docs/PLUGIN-DEVELOPMENT.md) describes the manifest, the npm package layout and each source.

## Package layout

Each plugin lives in `plugins/<id>/` with one manifest and the files it ships.

| Manifest | Use for | Contents |
| --- | --- | --- |
| `latch-plugin.json` | Skills, tools, session panels, Host modules | `formatVersion` 1 with `id`, `name`, `version`, `description` and any of `host`, `config`, `skills`, `panels`, `dataPanels`. `formatVersion` 2 can also carry `apps` and `requires.appSdk`. |
| `latch-app.json` | Isolated app pages | `formatVersion` 2 with at least one entry in `apps` and no `host` or `panels`. |

| Contribution | Entry | Notes | Example |
| --- | --- | --- | --- |
| Skill | `.md` or `.txt` in `skills[].file` | At most 32,000 bytes. Model-visible instructions, not a script. | [shift-handoff](plugins/shift-handoff/) |
| Host module and tool | Self-contained `.mjs` in `host` | Default export `{ activate(context, config) }`. Runs with the Host's permissions. Validate `config` yourself. | [release-review](plugins/release-review/) |
| Session panel | Self-contained `.mjs` in `panels[].entry` | Default export is a function component that uses the `react` and `ui` it receives. Add `context: true` to receive context statistics. At most 1 MB. | [release-review](plugins/release-review/), [context-insights](plugins/context-insights/) |
| App page | `.ts`, `.tsx` or prebuilt `.js` in `apps[].entry` | Latch builds TypeScript pages in its sandbox. Declare each capability the page uses. | [release-check](plugins/release-check/) |

Manifests are strict: an unknown field or capability makes the whole package invalid. A package has at most 128 files, 1 MB per file, a 64 KiB manifest and 8 MiB in total. Latch does not install dependencies or compile JSX or TypeScript for Host modules and panels. Format 2 plugin names and page titles cannot contain 「」『』, colons or line breaks.

## Catalog entries

Add one entry per plugin to `plugins` in [`latch.catalog.json`](latch.catalog.json), which has `formatVersion` 1 and 1–64 entries.

| Field | Rule |
| --- | --- |
| `id` | Lowercase letters, digits and hyphens, at most 64 characters. Unique in the catalog, equal to the manifest's `id` and unchanged across versions. |
| `folder` | `plugins/<id>` |
| `manifest` | `latch-plugin.json` or `latch-app.json` |
| `files` | Every other file to ship, relative to the folder, in bundle order. At most 128, unique ignoring case, never a manifest or catalog name. Must include every entry the manifest names. Regular UTF-8 text files only. |
| `facets` | Unique values from `skill`, `tool`, `panel`, `app`. The marketplace filters on them. |
| `en`, `zh` | Each has exactly six non-empty strings: `name`, `kind`, `summary`, `use`, `agent`, `access`. |

Write the listing fields for someone deciding whether to install:

- `name`: the listing name. Keep the manifest `name` the same as the `zh` name so two plugins stay distinguishable once installed.
- `kind`: the contributions, such as `Session panel · Tool · Skill`.
- `summary`: one sentence on what it does.
- `use`: where to open it, quoting Latch's UI labels exactly.
- `agent`: what the agent gets, including what a tool does not verify.
- `access`: which code runs with which permissions, the page capabilities, and that applying it needs confirmation on the Mac.

Latch's reader ignores `facets`, `en` and `zh` in a source catalog. The build and Latch's bundled marketplace read them. The reader also accepts prebuilt entries with `id`, `version`, `bundle`, `sha256` and optional `name` and `description`. This source catalog does not use them and the build rejects them, but the generated `dist/plugins/latch.catalog.json` has that shape. Each file path segment starts with a letter, digit, `_` or `-`. Paths cannot use `node_modules`, `dist` or `build` folders or names that look like secrets or keys.

## Versioning

Bump `version` in the manifest whenever the manifest or any shipped file changes. The version must match the Host's `releaseVersionSchema`: `MAJOR.MINOR.PATCH` with an optional `-prerelease` and `+build`, no leading zeros in numeric parts (including prerelease parts such as `-01`), and at most 64 characters. Latch only offers an update whose version is strictly higher than the downloaded and applied ones. Update the version in both README tables.

## Security requirements

A pull request is accepted only when every item holds:

- [ ] No secrets, credentials, tokens or text that looks like them, in any file, file name or listing. Latch refuses a source that contains secret-looking text or file names. The build does not run that scan, so check your files yourself.
- [ ] Only regular files. No symbolic or hard links. The build and Latch both refuse them.
- [ ] No dependency downloads or install steps. Host modules and panels are self-contained `.mjs` files.
- [ ] No network, file system or process access in a Host module or panel unless the listing's `access` text states it.
- [ ] No `eval`, `new Function`, `innerHTML` or `dangerouslySetInnerHTML`. Untrusted text is rendered as text.
- [ ] App pages request the narrowest capabilities and storage scopes they use.
- [ ] Tool results describe only what the tool did. They never claim a test, check or verification that did not run.
- [ ] Tools validate their arguments in `execute`, including types, lengths, unknown keys and control characters, in addition to the JSON schema. Host modules validate `config` in `activate`.

Plugins and Host modules are trusted local code. Latch's approval and Mac confirmation are not an OS sandbox, so these requirements are the review's job.

## Build and try it

CI runs Node.js 24. The scripts use only Node's built-in modules and work offline.

```sh
node scripts/build.mjs   # validates the catalog and writes dist/
node scripts/check.mjs   # checks the README tables, unlisted plugin files and catalog spelling
```

The build checks each entry's fields, the manifest `id` and `version`, the manifest entries listed in `files`, and the source files. It stops with a message that names the plugin id. It prints each plugin's id, version and SHA-256. `dist/plugins/latch.catalog.json` lists each bundle path and digest, and the bundles are in `dist/plugins/files/`.

To try a plugin, use a test Mac with the Latch desktop app:

1. Open **Plugin marketplace**, choose **Add plugin**, enter the checkout's absolute path and choose **Find**. You can also enter the path of a built bundle, or choose it with **Settings › Plugins › Import file…**.
2. Choose **Preview release**, then **Save as draft** and **Review draft**. Check the files, entries and capabilities.
3. For an app page, build the draft and preview it with sample data.
4. Apply the draft, confirm on the Mac when Latch asks, and use the plugin from the place named in `use`. Check that the applied version matches the manifest.

## Pull request checklist

- [ ] Source, manifest and catalog entry are updated together, and `version` is bumped.
- [ ] `node scripts/build.mjs` and `node scripts/check.mjs` pass.
- [ ] Both README tables show the plugin, its version, kind and access.
- [ ] `en` and `zh` listings say the same thing.
- [ ] The security requirements above hold.
- [ ] The description gives the plugin id and version, what changed for users, and any new capability or compatibility requirement.
- [ ] The description names the Latch version you tried and how you checked preview, apply and first use.

## Bundling a plugin with Latch

The **Bundled with Latch** tab and the Latch website read `examples/latch.catalog.json` in the [Latch repository](https://github.com/latch-code/latch), not this repository. To ship a plugin or an update in a Latch release, open a separate pull request there. Copy the package to `examples/<id>/` and the catalog entry to `examples/latch.catalog.json`, with `folder` set to `<id>`. Then verify install and first use from the marketplace. Until that change ships, the bundled copy keeps its earlier version.
