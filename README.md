# Official Latch plugins

[简体中文](README.zh-CN.md)

This repository holds the plugins maintained by the Latch authors and the catalog that lists them. Each plugin is a package under `plugins/` with a manifest Latch validates. [`latch.catalog.json`](latch.catalog.json) at the root lets Latch list and install the plugins from a GitHub URL or a local checkout, and `scripts/build.mjs` writes installable bundles with SHA-256 digests.

## Plugins

| Plugin | ID | Version | Kind | What it does | What it can access |
| --- | --- | --- | --- | --- | --- |
| [Shift handoff](plugins/shift-handoff/) | `shift-handoff` | 1.0.0 | Skill | Turns a conversation into handoff notes: next action, evidence for completed work, open questions. | Text only. One skill file that the selected agent reads. No code. |
| [Release checklist panel](plugins/release-review/) | `release-review` | 1.0.0 | Session panel · Tool · Skill | Mark release criteria beside a built-in agent session and add them to the draft for the agent to check. The tool only summarizes the supplied checklist and does not verify it. | Trusted local code: a Host module with the Host's permissions and a React panel with the workbench page's permissions. Confirm on the Mac before it is applied. |
| [Release check history](plugins/release-check/) | `release-check` | 1.0.0 | App page | Starts a release check for a project in a new session and keeps each item's result, evidence and notes. | Isolated page with `tasks.read`, `tasks.start` for any project, `tasks.readOwn` and `storage` (plugin, project). Its sessions use the project's default permissions. Grant these capabilities on the Mac. |
| [Context](plugins/context-insights/) | `context-insights` | 1.1.0 | Session panel | Compares request inputs and context window usage by turn, and jumps to the turn or tool output behind a change. | Trusted React panel with the workbench page's permissions. Reads the current session's context statistics and turn navigation that the workbench supplies. Confirm on the Mac before it is applied. |

## Install

Install in the Latch desktop app on the Mac that runs Latch. Every route saves a draft first.

- **Marketplace.** Open **Plugin marketplace** from the sidebar. **Bundled with Latch** lists the copies of these plugins included in your Latch build, which can be older than this repository. Choose a plugin, then **Review and install**.
- **GitHub URL.** In the marketplace, choose **Add plugin**, enter `https://github.com/latch-code/plugin-market` in **npm package name, GitHub URL, or folder path**, and choose **Find**. A `/tree/<branch-or-tag>` suffix selects another ref. Latch reads GitHub anonymously at a fixed commit, without a token or sign-in, so this works only for public repositories. This repository is currently private: use a local checkout until it is public.
- **Local checkout or bundle.** Clone the repository on that Mac and enter the checkout's absolute path or a `~/` path in the same field. The path cannot be in a hidden folder, `~/Library` or the Latch data directory. You can also run `node scripts/build.mjs` and enter the path of a bundle in `dist/plugins/files/`, or choose it with **Settings › Plugins › Import file…**.

For GitHub and local sources, choose **Preview release** on a plugin, then **Save as draft** and **Review draft**. The review shows the source and revision, skills, panels, executable entries and page capabilities. An update also shows what changed since the applied version. Apply the draft from plugin settings. Latch asks for confirmation on the Mac before it applies new or changed Host modules or React panels, or page capabilities wider than those already approved. Text-only packages such as Shift handoff apply without it.

## Trust model

- Plugins are trusted local code. A Host module runs with the Host process's permissions and can read and write files, start programs or use the network. A React panel has the same permissions as the workbench page.
- Tool approval, path checks, the egress policy and the Mac confirmation do not isolate plugin code. An approval records that you trust that code. It is not an OS sandbox.
- App pages run in an opaque isolated frame without device credentials or network access. They can only use the capabilities declared in the manifest and approved on the Mac, and the Host checks every call against the applied manifest. Sessions a page starts use the project's default permissions and no private context.

## Repository layout

| Path | Contents |
| --- | --- |
| `latch.catalog.json` | Source catalog: one entry per plugin with its folder, manifest, shipped files, facets and English and Chinese listing |
| `plugins/<id>/` | One package: `latch-plugin.json` or `latch-app.json` and the files listed in the catalog |
| `scripts/build.mjs` | Validates the catalog and manifests, then writes `dist/` |
| `scripts/check.mjs` | Checks the README tables, unlisted plugin files and the catalog's spelling |
| `dist/plugins/` | `latch.catalog.json` with bundle paths and SHA-256 digests, the `catalog.json` download index with `url` paths, and `files/*.latch-plugin.json` bundles |
| `dist/npm/<id>/` | npm package layout for each plugin, marked `private` |

## Links

- [Contributing](CONTRIBUTING.md)
- [License](LICENSE) (MIT)
- [Latch repository](https://github.com/latch-code/latch)
