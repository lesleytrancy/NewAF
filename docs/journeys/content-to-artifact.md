# Journey: 将信息转化为工作成果

## User

- Primary user: 企业员工
- Other actors: 内容发布者、企业管理员、AI 生成服务

## Goal

把阅读、附件或自然语言想法快速转化为符合企业规范的可交付成果。

## Trigger

用户在 Feed 发现相关内容，或直接进入 Studio 开始一项办公创作。

## Preconditions

- 用户已登录且组织身份可用。
- 用户对引用内容与目标知识库具备访问权限。
- 企业能力与模板已配置。

## Success Criteria

- Completion condition: 生成产物已导出或保存到知识库。
- Observable user outcome: 用户看到可预览的结果及明确完成状态。
- Resulting object state: 生成产物为“已导出”或“已入库”。

## Journey Stages

### Stage: 发现并整理相关信息

- **User Goal:** 找到与当前工作相关的信息。
- **User Action:** 切换分类、搜索、切换智能/最新排序、关注来源并参考同部门阅读；可让 AI 自动总结并继续讨论，也可选择 Studio 项目与文件夹保存。
- **System Response:** 个性化排序，明确来源与权限，并将单条内容作为隔离的 AI 讨论上下文。
- **Output:** AI 讨论或具备项目归属的收藏引用。
- **State Change:** `收藏引用: 不存在 -> 可用`
- **Next Stage:** 准备创作上下文
- **Resume / interruption behavior:** 收藏持续存在，可稍后从 Studio 引用。
- **Preference path:** 用户可从用户中心维护信息源、关注主题、语言、排序及通知偏好；保存后由后续 Feed 推荐与简报任务消费，返回 Feed 时无需重复配置。

### Stage: 准备创作上下文

- **User Goal:** 让 AI 理解目标、资料与交付形式。
- **User Action:** 进入项目，上传本地文件，并单选、多选或全选项目附件/Feed 引用作为对话与生成上下文，再输入自然语言并选择能力与企业模板。
- **System Response:** 继承项目身份，在项目工作区展示对话与项目文件，并持续显示已选来源数量；上传文件默认选中。
- **Output:** 完整生成请求。
- **State Change:** `创作会话: 空白 -> 已配置`
- **Previous Stage:** 发现并整理相关信息
- **Next Stage:** 生成并校正成果
- **Resume / interruption behavior:** 会话保留已选引用、附件与模板。

### Stage: 生成并校正成果

- **User Goal:** 获得可用成果并根据反馈调整。
- **User Action:** 提交、查看生成进度、继续对话修改。
- **System Response:** 生成预览，展示来源、模板与可执行的下一步。
- **Output:** 生成产物。
- **State Change:** `生成产物: 草稿请求 -> 已生成`
- **Previous Stage:** 准备创作上下文
- **Next Stage:** 交付或沉淀成果
- **Resume / interruption behavior:** 失败时保留输入并可重试。

### Stage: 交付或沉淀成果

- **User Goal:** 把成果带入真实工作流程。
- **User Action:** 导出 Word/PPT/PDF、保存到个人/团队知识库，或把已完成结果发布至 Studio。
- **System Response:** 明确格式、目标位置与完成反馈。
- **Output:** 文件或知识条目。
- **State Change:** `生成产物: 已生成 -> 已导出/已入库/已发布`
- **Previous Stage:** 生成并校正成果
- **Next Stage:** 无；可继续对话生成新版本。

## Entry Points

| Entry | User intent | Required context/state | How context is established |
|---|---|---|---|
| Feed 顶部导航 | 主动创作 | 登录身份 | 新建空白会话 |
| 内容卡“在 Studio 使用” | 基于当前内容创作 | 内容访问权 | 自动创建收藏引用 |
| Studio 历史会话 | 继续工作 | 会话所有权 | 恢复消息与上下文 |

## Alternate Paths

| Condition | Branch | Rejoin / terminal point | State impact |
|---|---|---|---|
| 没有收藏内容 | 直接输入或上传附件 | 准备创作上下文 | 不创建收藏引用 |
| 不选择模板 | 使用企业默认模板 | 生成并校正成果 | 记录默认模板 |
| 生成失败 | 原地重试 | 生成并校正成果 | 保留完整请求 |

## Error / Empty / Interrupted States

| Condition | User sees/understands | Recovery | State preserved |
|---|---|---|---|
| Feed 无内容 | 当前筛选无结果 | 清除筛选/换分类 | 搜索条件 |
| 生成失败 | 失败阶段与原因 | 重试或修改提示词 | 对话、附件、引用、模板 |
| 无知识库权限 | 目标不可用 | 换个人库或申请权限 | 生成产物 |

## Experience Risks

| Risk | Affected stage | Likelihood / impact | Mitigation | Residual uncertainty |
|---|---|---|---|---|
| 功能按钮过多挤压输入区 | 准备创作上下文 | 中/中 | 基础能力横向滚动，企业能力折叠 | 企业配置上限待定义 |
| 用户误以为 Feed 与 Studio 共用审核 | 跨模块 | 中/高 | 文案强调“收藏引用”，不展示共享后台入口 | 后台信息架构待设计 |

## Experience Gate

- Status: PASS
- Blocking evidence: None
- Warnings: 本次只模拟权限、生成和导出。
- Mitigation and owner: 前端提供完整状态反馈；真实校验由后端与企业管理服务负责。
- Validation evidence: 三个可达模块、显式引用交接、生成后的导出与入库动作均有闭环。
- Required action before implementation: None
