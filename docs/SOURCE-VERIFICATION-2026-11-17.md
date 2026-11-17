# New Dawn 文档来源复核

核查日期：2026-11-17（Asia/Shanghai）。本次仅核查与记录，未修改产品内容、构建文件或部署。

## 结论

现有网站把 January reveal 与 later in 2027 release 分开，方向正确。新官方文章补充了试玩和赛季动画的安排；六个线上内容页及本地内容数据均未覆盖该文章和本轮新增玩法名称。应补充来源与里程碑，无需推翻现有发售窗口。

文档关于媒体月份、第一赛季结束时间、测试报名和内容数量的部分推论应撤回或收窄。没有读取到的页面不能被判断为永久不可读取。

## 核查方法与范围

- 直接读取 Riot TL;DW 和 New Dawn 官方主页的 HTML 与可见正文。
- 直接读取 newdawnlol.com 的首页、release-date、changes、teaser、lol-2、map 和 sitemap。
- 对照 src/data/content.json、src/data/page-dates.json 与源文件检索结果。
- esports.gg 普通 HTTP 请求返回 403；通过网页检索与打开工具读取到完整可提取正文。未把该结果写成浏览器人工过验证。
- Insider Gaming 新赛季文章直接 HTTP 200 并读取正文；旧揭晓报道也通过网页检索读取到正文。
- lolnewdawn.com 通过 curl 检查首页和 lander 原始响应；未执行其页面 JavaScript。
- 本次没有重新取得关键词搜索量、GSC、Google 选定 canonical 或索引状态。

## 1. 官方消息与时间线

来源：https://www.leagueoflegends.com/en-us/news/dev/tldw-season-1-2027-dev-update---lol-website-article-lollol27-s1225r001/

直接响应 HTTP 200。文章署名 Meddler，发布时间字段为 2026-11-16T16:00:00.000Z，即北京时间 2026-11-17 00:00。引用官方页面日期时可写 11 月 16 日，但不要同时称其为北京时间 11 月 16 日发布。

官方分别说明了完整揭晓、揭晓后不久试玩、正式上线和赛季动画的安排，也说明了 1 月玩法调整与未来 New Dawn 的衔接。文章没有提供正式上线的具体月份或第一赛季结束日期。

因此，揭晓后上线不能单独证明第一赛季结束后上线；揭晓后不久试玩也不能锁定试玩一定在 1 月。

## 2. 官方订阅与测试资格

来源：https://www.leagueoflegends.com/en-us/new-dawn/

直接响应 HTTP 200，页面提供邮件消息订阅；隐私说明允许发送游戏、活动、皮肤等资讯。本轮看到的页面不是保证获得测试资格的申请表。

TL;DW 的报名指引是了解更多消息。页面可以引导用户订阅后续通知，但不能承诺测试邀请、公开测试、具体测试日或保证资格。

## 3. esports.gg 发售窗口归因

来源：https://esports.gg/guides/league-of-legends/league-of-legends-new-dawn-new-summoners-rift-client-and-more/

正文先称尚未公开宣布正式上线时间，再提出不在第一赛季，随后根据第二、第三赛季推导 4–8 月范围。文章另有段落称 Riot 提供了产品更新的初步资料，但这不能自动成为月份推导的官方背书。

应记录为媒体提出的时间范围及其推导，不能写成 Riot 已公布的月份。TL;DW 本身也没有独立确认“不在第一赛季”。本轮未找到可独立交叉确认这些具体范围的官方材料。

这纠正了原文档的两种过度定性：把该范围叫新事实，以及仅因一篇官方文章没写月份便断言媒体没有任何其他消息来源。

## 4. Insider Gaming 已不再是黑盒

来源：

- https://insider-gaming.com/league-of-legends-preseason-2027-update-revealed/
- https://insider-gaming.com/league-of-legends-new-dawn-update-revealed-worlds/

新赛季文章本次可直接读取，不能继续标记为放弃核查。它涵盖新赛季调整，并将试玩时间写到 1 月。该时间表述比 TL;DW 更具体，本轮未核验视频是否另有更明确说法，不能把媒体这一点直接当作官方原话。

两篇报道存在不等于在目标主词上有稳定排名；本轮没有证明这一点。

## 5. 六个网站页面的实际缺口

本地已发布内容路由与线上 sitemap 一致，为六个内容页；about 不属于这六个可索引内容页。六页均没有检索到本轮新增的 Kleptomancy、Titanborn、Ranked Rush、Fatetaker、Gravescourge、Lifebloom Crown、Faelights、playtesting 或新 TL;DW 的路径。

| 页面或数据 | 核查发现 | 建议 |
| --- | --- | --- |
| src/data/content.json sources | 未引用新 TL;DW | 增加直接文章来源与准确复核日期 |
| timeline | 仅有首次预告、揭晓、正式上线 | 增补相对揭晓的试玩里程碑，不制造具体日期 |
| /release-date/ | 时间窗口仍正确；测试段落尚未说明新的试玩计划 | 更新测试说明，保留资格未知与不保证邀请的边界 |
| /changes/ | 缺本次赛季调整及其与 New Dawn 的关系 | 独立小节概述；不要宣称全是 New Dawn 最终改动 |
| / | 仍将测试资讯作为待公布信息讨论 | 用短说明更新，并链接 release-date/changes |
| /teaser/ | 未引用新 Dev Update | 如增加视频，明确其与原 teaser 的区别 |
| page-dates 与线上 dateModified | 六页均为 2026-11-16 | 只有实质修改的页面才更新日期，不全站刷日期 |

本轮直接复查了六页，因而“六页未覆盖上述名称与来源”有当前证据；不代表网站没有任何相关概念，也不代表现有发售日期判断错误。

## 6. 原文档的清单与表述问题

- “12 项玩法改动”没有稳定计数依据。表格混入了时间线、消息边界与分类合并，不应将条目数当成缺失功能数。
- 官方英文对 BotRK 的一句使用了疑似笔误 bugged。若要把具体伤害变化写成增强，应补视频或其他明确一手材料，不能静默纠正后声称是原话。
- 不应把公开说明的未来计划写成不可更改的最终补丁内容。
- 一月有玩法调整不代表 New Dawn 在整个第一赛季结束后上线。

## 7. 其他竞品与域名

- lolnewdawn.com 首页本轮返回 HTTP 200，正文由 JavaScript 导航至 /lander；不是本次观察到的 HTTP 301/302。lander 加载 GoDaddy parking 资源，支持停放用途判断。本轮未渲染其动态正文，未复核 sitemap 或 about，也未证明持有者身份、售价或可议价条件。
- https://riftdaily.com/lol-new-dawn/ 可通过网页工具读取正文，有时间线、预告画面时间点和来源链接。文章仍有尚未宣布公开测试的旧表述；比较内容新鲜度时应注意这个差异，不代表网站本身无竞争力。
- https://hexgate.app/blog/league-next/ 可直接返回 HTTP 200，是同题内容；未据此推断目标关键词排名。
- https://gamermarkt.com/blog/league-of-legends-new-dawn-release-2027/ 直接请求返回 403，网页打开也未成功。正文仍待核验，不评价其完整结构。

## 8. 搜索与索引结论的边界

本轮未取得新的关键词数据，不能替原文档的 210、50 或未收录结果背书。旧宽泛词数据不能直接代表本次更新的新增需求。数据源何时补齐 11 月统计也需要实际查询，不能保证 12 月上旬一定完整。

页面可访问、sitemap 有 URL、来源写得清楚均不构成收录或排名证明。仍需 GSC URL Inspection 与查询曝光数据来判断索引及真实需求。本轮不新增页面、不引入统计工具。

## 建议修改顺序

1. 来源数据与 release-date：补直接来源、试玩里程碑和资格边界。
2. changes：新增独立赛季调整说明，保留 New Dawn 与赛季更新的区别。
3. 首页：简短更新并连接内页。
4. 如调整 teaser，先验证要添加的视频与内容，再更新该页自己的日期。
5. 不加入未独立证实的月份或第一赛季结束推论，不按新术语批量建页。

以上为可执行建议，本次没有实施网站修改或发布。
