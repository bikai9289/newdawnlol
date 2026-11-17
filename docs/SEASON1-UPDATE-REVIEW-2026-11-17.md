# Season 1 内容更新与交叉复核

日期：2026-11-17（Asia/Shanghai）。状态：本地开发完成，未提交、推送或部署。

## 改动范围

- `src/data/content.json`：新增 Riot Season 1 2027 TL;DW 直接来源；共享时间线补试玩里程碑及动画与正式上线的配对安排。
- 首页：补充赛季更新与 New Dawn 的关系、试玩消息与邮件订阅的边界。
- `/release-date/`：更新揭晓、测试、正式上线的说明及 FAQ，链接赛季调整小节。
- `/changes/`：新增九组赛季调整概述，覆盖两种符文、on-hit 系统、三件新装备、Faelights、Ranked Rush 和 ARAM；九组是编辑分组，不是官方声称的改动总数。
- `src/data/page-dates.json`：仅首页、release-date、changes 更新至 2026-11-17；其余页面日期保持原值。
- 无新增发布路由、布局变更、API、分析服务或邮件收集表单。

## 事实边界

- 揭晓、赛季更新、试玩、正式上线分别描述，不将 1 月更新写成 New Dawn 上线。
- 不加入媒体推导的 4–8 月范围，不推断第一赛季结束后才上线。
- 试玩按揭晓后的相对安排描述，不指定其一定落在 1 月。
- 官方 hub 是消息订阅目的地，不保证测试资格。
- 不根据 TL;DW 中 BotRK 疑似笔误补写伤害增强。
- ARAM 只说明社区投票带回旧 Augments，不推断含糊句子中首次投票或首次回归的具体时间。
- 所有赛季机制均标记为公开计划，未写成不可调整的最终补丁。

## 官方来源

- https://www.leagueoflegends.com/en-us/news/dev/tldw-season-1-2027-dev-update---lol-website-article-lollol27-s1225r001/
- https://www.leagueoflegends.com/en-us/new-dawn/
- https://www.leagueoflegends.com/en-us/news/

TL;DW 发布元数据为 2026-11-16T16:00:00Z，换算为北京时间 11 月 17 日零点。既有预告条目也重新从官方新闻列表核实，元数据为 2026-11-14T21:30:00Z；时间线日期沿用该来源的 UTC 日期口径。

## 代码与浏览器验证

- `npm.cmd run check`：22/22 测试通过，静态构建成功，仍为六个发布内容页。
- 现有测试验证来源引用、数据结构、站内链接与锚点、canonical、元数据、JSON-LD、sitemap、草稿边界与失败构建保护。
- 浏览器检查使用本机已有 Playwright 与 Edge，不修改项目依赖。运行方式：在 PowerShell 中设置 `PLAYWRIGHT_MODULE` 和 `PLAYWRIGHT_EXECUTABLE` 后执行 `npm.cmd run test:browser`。
- 六页在 320、390、768、1440 像素下检查；禁用 JavaScript，检查页面状态、页面横向溢出、FAQ、canonical、404、重定向与分享图。
- 另目视检查 `/changes/` 的移动端和桌面端表格截图。截图保存在被忽略的 `test-results/`。
- 独立只读代码复核未发现 Critical/Important 问题；其指出的首页及共享时间线引用精度问题已处理。

## 哥飞 SEO Agent 交叉复核

按用户明确授权，将本地新版实际文案提交至哥飞 SEO Agent，明确说明线上仍为旧版，不能用生产页面判断本地改动。

会话：https://seo.web.cafe/chat/c/008d4d07a09b4910bfbb909707e0f654

该会话非公开分享链接，需要所属账号登录。本次三轮复核，服务端会话显示累计 18 积分。

1. 首轮读取两份官方来源，认可基本时间线与订阅边界；提出措辞建议，但漏读已提供的 changes 正文，并误报 watch 段截断。
2. 回传完整新增表格与相关原句，要求逐组核对。Agent 撤回漏读和截断误报，确认九组与官方来源一致，无 P0/P1；提出 ARAM 时间主语、Terminus 属性与奖励正式名三个可精确化项。
3. 按事实核对后调整三个句子，再次回传。Agent 最终确认三句无新增事实错误，无阻断本地内容交付的问题。

采纳的修改：收紧 January 与 testing 两处文字；Terminus 明确为护甲和魔抗；使用 Timeless Victorious 正式奖励名；去掉 ARAM 投票时间推断。

未采纳的建议：给正确换算的 2027 年额外添加原文引语。Agent 后续确认原写法没有事实问题。其最终回复中的绝对风险措辞不作为本报告结论；本次结论限定为已核对的内容、构建和页面行为。

## 交付边界

本轮没有部署或检查新版本线上表现，也没有取得 Google 索引或排名证据。用户提供的认证信息没有写入项目、构建产物或本报告；完成请求后已清除工作变量中的认证值。
