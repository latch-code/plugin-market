# Latch 官方插件

[English](README.md)

本仓库存放 Latch 作者维护的插件及列出它们的目录清单。每个插件是 `plugins/` 下的一个包，带一份由 Latch 校验的声明。根目录的 [`latch.catalog.json`](latch.catalog.json) 让 Latch 从 GitHub 地址或本机克隆中列出并安装这些插件，`scripts/build.mjs` 生成带 SHA-256 摘要的可安装包。

## 插件

| 插件 | 标识 | 版本 | 类型 | 用途 | 可以访问什么 |
| --- | --- | --- | --- | --- | --- |
| [交接清单](plugins/shift-handoff/) | `shift-handoff` | 1.0.0 | 技能 | 把对话整理成交接说明：下一步、已完成工作的证据、待确认的问题。 | 只有文本。一份交给所选 Agent 读取的技能文件，不含代码。 |
| [发布清单面板](plugins/release-review/) | `release-review` | 1.0.1 | 会话面板 · 工具 · 技能 | 在内置 Agent 会话旁勾选发布条件，写入草稿交给 Agent 核对。工具只汇总传入的清单，不做核实。 | 可信本机代码：以 Host 权限运行的 Host 模块，以及与工作台页面同权的 React 面板。应用前需在 Mac 上确认。 |
| [发布检查记录](plugins/release-check/) | `release-check` | 1.0.1 | 应用页面 | 在新会话中为项目发起发布检查，留存每项的结果、证据和备注。 | 隔离页面，能力为 `tasks.read`、任意项目的 `tasks.start`、`tasks.readOwn` 和 `storage`（plugin、project）。它开始的会话使用项目默认权限。授予这些能力需在 Mac 上确认。 |
| [上下文](plugins/context-insights/) | `context-insights` | 1.1.0 | 会话面板 | 比较请求组成和逐轮上下文窗口用量，跳回造成变化的轮次或工具输出。 | 与工作台页面同权的可信 React 面板。读取工作台提供的当前会话上下文统计与回合跳转。应用前需在 Mac 上确认。 |

## 安装

在运行 Latch 的那台 Mac 上用 Latch 桌面端安装。每种方式都先保存为草稿。

- **插件市场。** 从侧栏打开「插件市场」。「随 Latch 附带」列出你这版 Latch 内附带的这些插件副本，版本可能比本仓库旧。选择插件，再点「审阅并安装」。
- **GitHub 地址。** 在插件市场选「添加插件」，在「npm 包名、GitHub 地址或文件夹路径」中输入 `https://github.com/latch-code/plugin-market`，点「查找」。加 `/tree/<分支或标签>` 可选其他 ref。Latch 在固定提交上匿名读取 GitHub，不使用令牌或登录，所以只支持公开仓库。本仓库目前是私有的：公开之前请使用本机克隆。
- **本机克隆或插件包。** 把仓库克隆到这台 Mac，在同一输入框填克隆目录的绝对路径或以 `~/` 开头的路径。路径不能位于隐藏目录、`~/Library` 或 Latch 数据目录中。也可以运行 `node scripts/build.mjs`，填入 `dist/plugins/files/` 中某个插件包的路径，或在「设置 › 插件 › 导入文件…」中选择它。

对 GitHub 和本机来源，在插件上点「预览版本」，再点「保存为草稿」和「审阅草稿」。审阅显示来源与修订、技能、面板、可执行入口和页面能力；更新还会显示与已应用版本相比的变化。在插件设置中应用草稿。应用新的或改动过的 Host 模块、React 面板，或比已批准范围更宽的页面能力之前，Latch 会请你在 Mac 上确认。交接清单这类只有文本的包无需确认即可应用。

## 信任模型

- 插件是可信本机代码。Host 模块以 Host 进程的权限运行，可以读写文件、启动程序或联网。React 面板与工作台页面同权。
- 工具审批、路径检查、出站策略和 Mac 上的确认都不隔离插件代码。批准只记录你信任这份代码，不是操作系统沙箱。
- 应用页面在不透明的隔离框中运行，拿不到设备凭据，不能联网。页面只能使用清单中声明、并已在 Mac 上批准的能力，Host 按已应用的清单核对每次调用。页面开始的会话使用项目默认权限，不带私有上下文。

## 仓库结构

| 路径 | 内容 |
| --- | --- |
| `latch.catalog.json` | 源码目录清单：每个插件一项，写明目录、声明文件、交付文件、贡献类型及中英文介绍 |
| `plugins/<id>/` | 一个包：`latch-plugin.json` 或 `latch-app.json`，以及目录清单列出的文件 |
| `scripts/build.mjs` | 校验目录清单与声明，然后写入 `dist/` |
| `scripts/check.mjs` | 检查 README 表格、未列出的插件文件和目录清单名称的拼写 |
| `dist/plugins/` | 带包路径和 SHA-256 摘要的 `latch.catalog.json`、带 `url` 的下载索引 `catalog.json`，以及 `files/*.latch-plugin.json` 插件包 |
| `dist/npm/<id>/` | 每个插件的 npm 包结构，标记为 `private` |

## 链接

- [贡献指南](CONTRIBUTING.zh-CN.md)
- [许可证](LICENSE)（MIT）
- [Latch 仓库](https://github.com/latch-code/latch)
