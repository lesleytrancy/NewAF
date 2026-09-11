# AgenticFeed 产品模型

> 本文描述本次纯前端原型所依据的产品事实，不约束未来技术实现。

## Product Goal

- Problem: 企业信息分发与 AI 内容创作割裂，员工难以把阅读所得快速转化为可交付成果。
- Intended outcome: 用户可在 Feed 获取个性化信息、在 Studio 项目上下文中生成企业级成果，并通过 AI 组织安全复用团队成员授权的项目知识。
- Product boundary: Feed、Studio 与 AI 组织共享账号；只有用户主动保存的内容引用和明确授权给 AI 组员的只读项目数据可以跨模块使用，内容运营、后台与审核流程相互独立。
- Success signals: 用户能完成“发现 → 收藏 → 引用 → 生成 → 导出/入库”闭环，且无需重复选择身份与上下文。

## Users

| User / role | Context | Responsibilities | Permissions or constraints |
|---|---|---|---|
| 企业员工 | 日常阅读、办公创作 | 阅读、发布、收藏、生成与分享 | 受组织层级与内容权限约束 |
| 内容发布者 | 部门/项目传播 | 发布内部动态并设置可见范围 | 内容可能需审核 |
| 企业管理员 | 企业配置 | 管理模板、能力、知识库与权限 | 管理权限 |
| AI 小组 Leader | 跨成员协作 | 管理小组并配置 AI 组员及其数据范围 | 只能授权本人有权管理的员工与项目范围 |

## Core Business Objects

| Object | Purpose | Identity | Owner | Created by | Modified by | Consumed by |
|---|---|---|---|---|---|---|
| 内容条目 | Feed 信息载体 | content_id | 发布者/外部来源 | 员工或采集服务 | 发布者/审核员 | 阅读者 |
| 项目 | 统一管理目标、资料、对话与成果 | project_id | 当前用户/团队 | 当前用户 | 项目成员 | 创作会话、生成任务 |
| 收藏引用 | Feed 到 Studio 项目文件夹的显式上下文 | reference_id | 项目 | 当前用户 | 项目成员 | 项目会话与生成任务 |
| 创作会话 | 保持项目内对话与附件上下文 | conversation_id | 项目 | 项目成员 | 项目成员/AI | 生成任务 |
| 生成产物 | 可交付的文档、PPT 等 | artifact_id | 当前用户/团队 | 生成服务 | 当前用户 | 下载者/知识库 |
| 企业模板 | 统一文档规范 | template_id | 企业 | 管理员 | 管理员 | 生成任务 |
| 用户内容偏好 | 控制信息源订阅、推荐主题、语言与通知方式 | preference_id | 当前用户 | 当前用户/系统默认值 | 当前用户 | Feed 推荐、搜索与通知服务 |
| AI 小组 | 组织人员与 AI 组员协作 | group_id | 小组 Leader | Leader | Leader | 小组成员 |
| AI 组员 | 基于员工授权项目回答小组问题 | ai_member_id | AI 小组 | Leader | Leader | 小组成员 |
| 项目读取授权 | 限定 AI 组员可读取的员工 Studio 项目 | grant_id | 对应员工/组织 | Leader 配置、员工授权 | Leader/员工 | AI 组员 |

## Object Lifecycle

### Object: 生成产物

- Initial state: 草稿请求
- Terminal state(s): 已导出、已入库、失败
- Invariants: 保留来源会话、引用、模板与访问权限信息。

| From state | Trigger / action | Actor | To state | Data produced | Downstream consumer | Failure / recovery |
|---|---|---|---|---|---|---|
| 草稿请求 | 提交自然语言指令 | 用户 | 生成中 | 提示词、上下文、能力、模板 | 生成服务 | 保留输入并允许重试 |
| 生成中 | 完成生成 | AI | 已生成 | 预览、格式、版本 | 用户 | 显示失败原因并重试 |
| 已生成 | 导出 | 用户 | 已导出 | 文件 | 本地/外部系统 | 切换格式重试 |
| 已生成 | 保存知识库 | 用户 | 已入库 | 知识条目 | 个人/团队知识库 | 重新选择目标库 |
| 已生成 | 发布至 Studio | 用户 | 已发布 | Studio 文件及发布状态 | 项目成员、AI 组员（若已授权） | 保留产物并允许重试 |

### Object: AI 组员

- Initial state: 待配置
- Terminal state(s): 已停用
- Invariants: 只读明确授权的项目；回答需保留授权员工与来源范围；普通成员不能扩大权限。

| From state | Trigger / action | Actor | To state | Data produced | Downstream consumer | Failure / recovery |
|---|---|---|---|---|---|---|
| 待配置 | 指定对应员工与项目范围 | 小组 Leader | 可用 | AI 身份、项目读取授权 | 小组成员 | 缺少项目授权时不可完成配置 |
| 可用 | 小组成员提问 | 小组成员 | 可用 | 基于授权项目的回答 | 小组成员 | 无数据时说明范围并联系 Leader |
| 可用 | 调整授权范围 | Leader/对应员工 | 可用 | 更新后的只读范围 | AI 组员 | 撤销后立即停止读取 |

## User Journeys

| Journey | User | Goal | Trigger | Start state | End state | Core object | Journey document |
|---|---|---|---|---|---|---|---|
| 将信息转化为工作成果 | 企业员工 | 从信息获得可交付成果 | 浏览 Feed 或进入 Studio | 无上下文/已有收藏 | 产物已导出或入库 | 收藏引用、创作会话、生成产物 | `docs/journeys/content-to-artifact.md` |
| 向 AI 组员询问团队工作 | 企业员工、AI 小组 Leader | 在权限范围内了解项目进展与成员关注 | 进入 AI 组织或选择 AI 组员 | 已加入小组 | 获得带授权范围的回答 | AI 小组、AI 组员、项目读取授权 | `docs/journeys/ask-ai-teammate.md` |

## Experience Principles

- 对话即创作，所有能力围绕同一个输入区与会话上下文工作。
- Feed 与 Studio 弱耦合，只有用户主动保存并选择项目/文件夹的内容进入 Studio。
- Studio 以项目为最高工作上下文，对话、附件、模板与产物均不得成为无归属孤岛。
- 生成结果必须清楚展示来源、模板、状态与下一步动作。
- 用户可显式管理信息来源和推荐偏好；系统推荐不得覆盖用户主动取消的来源。
- 企业能力与模板可配置，但基础使用路径保持一致。
- AI 组员必须显示对应员工、只读项目范围和权限边界；回答不得越过授权项目。

## Navigation Principles

- 顶部主导航连接 Feed、Studio、AI 组织与用户中心。
- 从 Feed 发起 Studio 创作时携带收藏引用并可返回原内容。
- 分享链接是内容条目的独立深链，访问权限与组织身份绑定。

## Cross-Journey Relationships

| Source journey / stage | Target journey / stage | Shared object or data | Handoff condition | Return path |
|---|---|---|---|---|
| Feed 阅读/收藏 | Studio 准备创作 | 收藏引用 | 用户点击“在 Studio 使用” | Studio 引用卡可回看来源 |
| Studio 生成 | 知识沉淀 | 生成产物 | 用户点击保存知识库 | 保存完成后留在当前会话 |
| Studio 生成 | AI 组织协作 | 已发布产物、项目读取授权 | 产物发布且项目已授权给 AI 组员 | AI 组织回答可引用项目进展，用户可返回 Studio 核验 |

## Known Experience Constraints

| Constraint | Source | Affected users/journeys | Consequence | Required handling |
|---|---|---|---|---|
| 本次为纯前端模拟 | 用户任务 | 全部 | 无真实抓取、生成、导出和权限校验 | 用本地状态展示完整反馈，并在 README 说明后端依赖 |

## Open Product-Model Questions

| Question | Why it matters | Owner | Blocks implementation? |
|---|---|---|---|
| 企业模板是否需要审批发布 | 影响模板生命周期 | 产品/企业管理员 | No |
| 外部资讯的版权与授权规则 | 影响抓取与展示 | 法务/内容运营 | No |
