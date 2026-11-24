# Latch 插件市场

这里是 Latch 官方插件市场的源码和离线构建入口。目录中的每个插件都可以从源码生成一个可审阅、可导入的 Latch 插件文件。

| 插件 | 内容 | 版本 |
| --- | --- | --- |
| [交接清单](plugins/shift-handoff) | 给 Agent 的交接写作技能 | 1.0.0 |
| [发布清单面板](plugins/release-review) | 会话面板、汇总工具与发布检查技能 | 1.0.0 |
| [发布检查记录](plugins/release-check) | 按项目发起检查并记录结果的应用页面 | 1.0.0 |
| [Context（上下文）](plugins/context-insights) | 查看模型请求组成、上下文窗口和工具调用，并跳到对应的对话回合 | 1.0.0 |

## 本地构建与导入

用 Node.js 22 或更新的版本在仓库根目录运行。构建可以离线完成，无需安装依赖。

```sh
node scripts/build.mjs
```

[catalog.json](catalog.json) 声明每个包的源目录、清单、分发文件和中英文案。构建生成 `dist/plugins/catalog.json` 和 `dist/plugins/files/` 下的插件文件。目录中的 `url` 是相对 `dist/` 根目录的下载路径，`sha256` 对应该路径下的文件字节。

在 Host 所在 Mac 的 Latch 桌面端打开「设置 › 插件 › 导入文件…」，选择 `dist/plugins/files/` 下的 `.latch-plugin.json`，审阅文件和能力后应用。发布检查记录也可以先用样例数据预览。含可信代码的插件与新授予的页面能力需要在这台 Mac 上确认。

安装 Context 后，在会话右栏点「＋」，选择「上下文」。它需要支持会话面板 `context` 接口的 Latch 版本。内置 Agent 的新请求有逐步组成记录，旧会话可能只有最近一次请求的计数。其他 Harness 的窗口占用取自它们的报告。

## 本地 npm 打包

构建也生成 `dist/npm/<插件 ID>/`。其中的 `latch-plugin.json` 与下载文件逐字节一致，npm 清单标记为私有。可以打成压缩包供本地使用。

```sh
npm pack --offline --ignore-scripts ./dist/npm/context-insights
```
