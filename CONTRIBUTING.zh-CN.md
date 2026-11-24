# 贡献指南

[English](CONTRIBUTING.md) · [README](README.zh-CN.md)

## 开始之前

本仓库存放 Latch 作者维护的官方插件。发布你自己的插件不需要向这里提交 PR：从你自己的 GitHub 仓库发布（根目录有 `latch.catalog.json`、`latch-plugin.json` 或 `latch-app.json`），发布为 npm 包，或分发导出的 `.latch-plugin.json`。Latch 管理员在插件市场的「添加插件」或「设置 › 插件 › 导入文件…」中添加。声明、npm 包结构和各种来源见 [Latch 插件开发文档](https://github.com/latch-code/latch/blob/main/docs/PLUGIN-DEVELOPMENT.md)。

## 包结构

每个插件放在 `plugins/<id>/`，含一份声明和它交付的文件。

| 声明 | 用于 | 内容 |
| --- | --- | --- |
| `latch-plugin.json` | 技能、工具、会话面板、Host 模块 | `formatVersion` 1，含 `id`、`name`、`version`、`description`，以及 `host`、`config`、`skills`、`panels`、`dataPanels` 中的任意几项。`formatVersion` 2 另可带 `apps` 和 `requires.appSdk`。 |
| `latch-app.json` | 隔离的应用页面 | `formatVersion` 2，`apps` 至少一项，不含 `host` 或 `panels`。 |

| 贡献 | 入口 | 说明 | 示例 |
| --- | --- | --- | --- |
| 技能 | `skills[].file` 中的 `.md` 或 `.txt` | 不超过 32,000 字节。是模型可见的指令，不是脚本。 | [shift-handoff](plugins/shift-handoff/) |
| Host 模块与工具 | `host` 中自包含的 `.mjs` | 默认导出 `{ activate(context, config) }`，以 Host 的权限运行。`config` 由模块自己校验。 | [release-review](plugins/release-review/) |
| 会话面板 | `panels[].entry` 中自包含的 `.mjs` | 默认导出函数组件，使用传入的 `react` 与 `ui`。声明 `context: true` 才会收到上下文统计。不超过 1 MB。 | [release-review](plugins/release-review/)、[context-insights](plugins/context-insights/) |
| 应用页面 | `apps[].entry` 中的 `.ts`、`.tsx` 或预先构建的 `.js` | Latch 在沙箱中构建 TypeScript 页面。声明页面用到的每项能力。 | [release-check](plugins/release-check/) |

声明是严格校验的：未知字段或未知能力会让整个包无效。一个包最多 128 个文件，单文件 1 MB，声明 64 KiB，总计 8 MiB。Latch 不为 Host 模块和面板安装依赖，也不编译 JSX 或 TypeScript。格式 2 的插件名称与页面标题不能含「」『』、冒号或换行。

## 目录清单条目

在 [`latch.catalog.json`](latch.catalog.json) 的 `plugins` 中为每个插件写一项。清单的 `formatVersion` 为 1，含 1 到 64 项。

| 字段 | 规则 |
| --- | --- |
| `id` | 小写字母、数字和连字符，不超过 64 个字符。在清单中唯一，等于声明的 `id`，各版本保持不变。 |
| `folder` | `plugins/<id>` |
| `manifest` | `latch-plugin.json` 或 `latch-app.json` |
| `files` | 其余所有要交付的文件，相对于该目录，按包内顺序排列。最多 128 个，忽略大小写后不重复，不能是声明或清单的文件名。必须包含声明指向的每个入口。只收普通的 UTF-8 文本文件。 |
| `facets` | 取自 `skill`、`tool`、`panel`、`app` 的不重复值，插件市场按它筛选。 |
| `en`、`zh` | 各含六个非空字符串：`name`、`kind`、`summary`、`use`、`agent`、`access`，不能有其他字段。 |

介绍字段写给正在决定是否安装的人：

- `name`：列表中的名称。声明的 `name` 与 `zh` 的名称保持一致，安装后两个插件才能区分。
- `kind`：贡献类型，例如「会话面板 · 工具 · 技能」。
- `summary`：一句话说明用途。
- `use`：在哪里打开，界面文字照 Latch 原样引用。
- `agent`：Agent 得到什么，包括工具不核实的内容。
- `access`：哪些代码以什么权限运行、页面能力，以及应用前需在 Mac 上确认。

Latch 读取源码目录清单时忽略 `facets`、`en` 和 `zh`；它们由构建脚本和 Latch 随附的插件市场读取。读取器也接受预先构建的条目，含 `id`、`version`、`bundle`、`sha256` 及可选的 `name`、`description`。本仓库的源码目录清单不用这种条目，构建脚本会拒绝它们；生成的 `dist/plugins/latch.catalog.json` 就是这种格式。文件路径的每一段以字母、数字、`_` 或 `-` 开头，不能经过 `node_modules`、`dist` 或 `build` 目录，也不能用看起来像密钥或私钥的名称。

## 版本

声明或任何交付文件改动时，都要提高声明中的 `version`。版本须符合 Host 的 `releaseVersionSchema`：`MAJOR.MINOR.PATCH`，可带 `-预发布` 与 `+构建`，数字部分（包括 `-01` 这样的预发布部分）不能有前导零，不超过 64 个字符。Latch 只提供版本严格高于已下载和已应用版本的更新。同时更新两份 README 表格中的版本。

## 安全要求

只有全部满足以下各项，PR 才会被接受：

- [ ] 任何文件、文件名或介绍中都没有密钥、凭据、令牌或看起来像它们的文本。来源含疑似密钥的文本或文件名时 Latch 会拒绝；构建脚本不做这项扫描，请自行检查。
- [ ] 只有普通文件，没有符号链接或硬链接。构建脚本和 Latch 都会拒绝它们。
- [ ] 不下载依赖，没有安装步骤。Host 模块和面板是自包含的 `.mjs` 文件。
- [ ] Host 模块或面板不联网、不访问文件系统、不启动进程，除非介绍的 `access` 写明。
- [ ] 不用 `eval`、`new Function`、`innerHTML` 或 `dangerouslySetInnerHTML`，不可信文本按文本渲染。
- [ ] 应用页面只申请用到的最窄能力和存储范围。
- [ ] 工具结果只描述工具实际做了什么，不声称做过没有运行的测试、检查或核实。
- [ ] 工具在 `execute` 中校验参数（类型、长度、未知字段、控制字符），而不只依赖 JSON Schema。Host 模块在 `activate` 中校验 `config`。

插件和 Host 模块是可信本机代码。Latch 的批准和 Mac 上的确认不是操作系统沙箱，所以这些要求由审阅把关。

## 构建与试用

CI 使用 Node.js 24。脚本只用 Node 内置模块，可离线运行。

```sh
node scripts/build.mjs   # 校验目录清单并写入 dist/
node scripts/check.mjs   # 检查 README 表格、未列出的插件文件和目录清单名称的拼写
```

构建脚本检查每一项的字段、声明的 `id` 与 `version`、`files` 是否列出了声明的入口，以及源文件本身。出错时给出带插件标识的消息并停止。成功时逐行输出插件标识、版本和 SHA-256。`dist/plugins/latch.catalog.json` 列出每个包的路径和摘要，包文件在 `dist/plugins/files/`。

在装有 Latch 桌面端的测试 Mac 上试用：

1. 打开「插件市场」，选「添加插件」，输入克隆目录的绝对路径，点「查找」。也可以输入构建出的插件包路径，或在「设置 › 插件 › 导入文件…」中选择它。
2. 点「预览版本」，再点「保存为草稿」和「审阅草稿」，核对文件、入口和能力。
3. 应用页面先构建草稿，用样例数据预览。
4. 应用草稿，Latch 请求时在 Mac 上确认，然后从 `use` 写明的位置使用插件。核对已应用的版本与声明一致。

## PR 检查清单

- [ ] 源码、声明和目录清单条目一起更新，`version` 已提高。
- [ ] `node scripts/build.mjs` 和 `node scripts/check.mjs` 通过。
- [ ] 两份 README 表格都列出插件及其版本、类型和访问范围。
- [ ] `en` 与 `zh` 介绍内容一致。
- [ ] 满足上面的安全要求。
- [ ] 描述写明插件标识和版本、对用户的变化，以及新增的能力或兼容性要求。
- [ ] 描述写明试用的 Latch 版本，以及如何核对预览、应用和首次使用。

## 随 Latch 发布

「随 Latch 附带」页签和 Latch 官网读取 [Latch 仓库](https://github.com/latch-code/latch)的 `examples/latch.catalog.json`，而不是本仓库。要在 Latch 的某个版本中附带插件或更新，请在那里另提 PR：把包复制到 `examples/<id>/`，把目录清单条目复制到 `examples/latch.catalog.json`，`folder` 写 `<id>`。然后从插件市场核对安装和首次使用。在这项改动发布之前，随附的副本保持原来的版本。
