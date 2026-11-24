# Latch 插件市场

这里是精选插件目录的本地草稿。这三个包来自 Latch 的市场示例，按原清单和 MIT 许可保留源码。

| 插件 | 内容 | 版本 |
| --- | --- | --- |
| [交接清单](plugins/shift-handoff) | 给 Agent 的交接写作技能 | 1.0.0 |
| [发布清单面板](plugins/release-review) | 会话面板、汇总工具与发布检查技能 | 1.0.0 |
| [发布检查记录](plugins/release-check) | 按项目发起检查并记录结果的应用页面 | 1.0.0 |

## Context（上下文）

Context 目前是 Latch 工作台内置的「上下文」页签，在会话右栏点「＋」即可打开。独立插件需要 Host 按访问者对当前会话的权限提供只读统计和回合跳转，消息正文留在原会话中。统计、图表和跳转通过与内置页签等价的验收后，再将插件加入目录。

## 本地构建与导入

用 Node.js 22 或更新的版本在仓库根目录运行。构建无需安装依赖，可以离线完成。

```sh
node scripts/build.mjs
```

[catalog.json](catalog.json) 声明每个包的源目录、清单、分发文件和中英文案。构建按列表顺序读入源码，生成 `dist/plugins/catalog.json`。其中 `url` 是相对 `dist/` 根目录的下载路径，`sha256` 校验该路径下的文件字节，与 Latch 官网的格式一致。

在 Mac 的 Latch 打开「设置 › 插件 › 导入文件…」，选择 `dist/plugins/files/` 下对应的 `.latch-plugin.json`。导入后先审阅文件和能力，再应用。发布检查记录可先用样例数据预览。含可信代码的插件与新授予的页面能力需要在 Host 所在的 Mac 上确认。

## 本地核对 npm 包

构建也生成 `dist/npm/<插件 ID>/`。里面的 `latch-plugin.json` 和下载文件的字节一致，`package.json` 使用临时包名并标记为私有。以下命令把压缩包写入当前目录。

```sh
npm pack --offline --ignore-scripts ./dist/npm/shift-handoff
```

这里提供本地分发文件和导入流程。npm 仓库、包名与桌面远端目录接入待定。
