# Journey: 向 AI 组员询问团队工作

## User

- Primary user: 企业员工、AI 小组 Leader
- Other actors: 对应员工、AI 组员、Studio 项目成员

## Goal

在不越过项目权限的前提下，快速了解同事项目进度与近期关注信息。

## Trigger

用户进入 AI 组织中的已加入小组，或 Leader 需要配置新的 AI 组员。

## Preconditions

- 用户已加入目标小组。
- AI 组员已绑定对应员工，且员工项目已被明确授予只读范围。
- 普通成员只能询问；Leader 才能配置 AI 组员。

## Success Criteria

- Completion condition: 小组成员获得基于授权项目的回答，或 Leader 完成 AI 组员配置。
- Observable user outcome: 回答显示其授权来源边界，成员可返回 Studio 向项目成员核验。
- Resulting object state: AI 组员保持可用，项目读取授权保持可追踪。

## Journey Stages

### Stage: 组建 AI 协作关系

- **User Goal:** 让 AI 组员代表对应员工安全共享工作上下文。
- **User Action:** Leader 指定 AI 身份、对应员工与可读取的 Studio 项目。
- **System Response:** 校验 Leader 权限，建立只读项目授权并展示范围。
- **Output:** 可用的 AI 组员。
- **State Change:** `AI 组员: 待配置 -> 可用`
- **Next Stage:** 询问团队工作
- **Resume / interruption behavior:** 未完成配置不创建 AI 组员。

### Stage: 询问团队工作

- **User Goal:** 了解项目进度或同事近期关注。
- **User Action:** 选择小组与 AI 组员，输入问题或使用快捷问题。
- **System Response:** 仅检索对应员工已授权的 Studio 项目，以 AIbot 对话方式回答并说明范围。
- **Input:** 问题、AI 组员身份、项目读取授权。
- **Output:** 项目进度或信息关注回答。
- **State Change:** `AI 对话: 空白 -> 已回答`
- **Data Produced:** 小组内 AI 对话记录。
- **Data Consumer:** 小组成员。
- **Previous Stage:** 组建 AI 协作关系或直接进入已有小组。
- **Next Stage:** 返回 Studio 核验或继续追问。
- **Resume / interruption behavior:** 保留小组、AI 组员与授权范围。

## Entry Points

| Entry | User intent | Required context/state | How context is established |
|---|---|---|---|
| 顶部 AI 组织导航 | 查看已加入小组并询问 | 登录身份、小组成员关系 | 自动加载用户已加入的多个小组 |
| 小组 AI 组员列表 | 切换回答主体 | AI 组员可用 | 显示对应员工及授权项目 |

## Exit Points

| Exit | Completion / abandonment reason | Resulting state/data | Return or continuation |
|---|---|---|---|
| 返回 Studio | 核验回答或继续项目工作 | 保留 AI 对话和项目身份 | 在 Studio 打开对应项目 |
| 留在小组继续询问 | 需要补充信息 | 新增对话记录 | 继续当前 AIbot 对话 |

## Alternate Paths

| Condition | Branch | Rejoin / terminal point | State impact |
|---|---|---|---|
| 用户不是 Leader | 隐藏配置动作并显示 Leader | 询问团队工作 | 不改变 AI 配置 |
| AI 无项目授权 | 说明无可用数据并联系 Leader | 组建 AI 协作关系 | 不产生越权回答 |

## Error / Empty / Interrupted States

| Condition | User sees/understands | Recovery | State preserved |
|---|---|---|---|
| 小组没有 AI 组员 | 当前尚未配置 | Leader 添加 AI 组员 | 小组成员关系 |
| 授权项目被撤销 | AI 无法继续引用 | 调整授权或询问其他 AI | 历史回答与撤销记录 |

## Cross-page Continuity

| Transition | Context inherited | Data inherited | Location/state cue | Continue / return path |
|---|---|---|---|---|
| Studio 发布至 AI 组织可用 | 项目、产物、发布状态 | 已发布文件 | 回答标注授权员工与项目 | 返回 Studio 核验原文件 |

## Experience Risks

| Risk | Affected stage | Likelihood / impact | Mitigation | Residual uncertainty |
|---|---|---|---|---|
| 成员误以为 AI 可读员工全部资料 | 询问团队工作 | 中/高 | 始终展示只读授权项目数量与名称 | 真实审计策略待后端定义 |
| 普通成员越权调整数据范围 | 组建 AI 协作关系 | 低/高 | 配置入口只对 Leader 可见 | 企业级委派规则待定义 |

## Validation Checklist

- [x] Journey represents an end-to-end user outcome.
- [x] Every stage is named as user work, not UI.
- [x] Trigger, preconditions, and completion are explicit.
- [x] Previous and next stages are defined where applicable.
- [x] Core object and state transitions are traceable.
- [x] Produced data has a downstream consumer or retention purpose.
- [x] Entry, exit, alternate, empty, error, interruption, and resume paths are proportionate to risk.
- [x] Users do not need to re-enter known context.
- [x] Cross-surface transitions preserve location, state, and intent.
- [x] No stage exists only to justify a page.
