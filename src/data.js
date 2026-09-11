import {
  Image,
  Presentation,
  Video,
  Languages,
  FileText,
  ChartNoAxesCombined,
  Network,
  AudioLines,
  PanelsTopLeft,
  FileSignature,
  BookOpenCheck,
  CalendarCheck,
  Workflow,
} from "lucide-react";

export const categories = [
  "为你推荐",
  "部门动态",
  "行业资讯",
  "通知公告",
  "技术分享",
  "项目动态",
];

export const articles = [
  {
    id: 101,
    category: "行业资讯",
    org: "OpenAI Newsroom",
    time: "8分钟前",
    title: "GPT 系列模型更新开发者工具链，强化长任务与工具调用体验",
    summary:
      "Mock 快讯：OpenAI 展示新一代 GPT 模型在代码执行、长上下文和多工具协作方面的能力，企业用户更关注可控性、成本与审计。",
    tags: ["海外 AI", "GPT", "Mock"],
    likes: 328,
    comments: 46,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  {
    id: 102,
    category: "行业资讯",
    org: "Anthropic Updates",
    time: "26分钟前",
    title: "Claude 面向企业知识工作推出新的协作与文件理解能力",
    summary:
      "Mock 快讯：新版 Claude 更强调复杂文档分析、团队协作和安全边界，并提供面向企业管理员的治理与使用洞察。",
    tags: ["海外 AI", "Claude", "Mock"],
    likes: 241,
    comments: 31,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 103,
    category: "行业资讯",
    org: "Google DeepMind",
    time: "1小时前",
    title: "Gemini 多模态能力扩展至视频理解与复杂研究工作流",
    summary:
      "Mock 快讯：Gemini 演示跨文本、图像、音频和视频的统一推理流程，并把检索、分析与报告生成组合为连续任务。",
    tags: ["Gemini", "多模态", "Mock"],
    likes: 198,
    comments: 27,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 104,
    category: "技术分享",
    org: "Meta AI Research",
    time: "2小时前",
    title: "Llama 生态新增轻量推理与端侧部署参考方案",
    summary:
      "Mock 快讯：Meta AI 分享模型压缩、端侧推理和开放生态进展，为数据敏感型企业提供更多本地部署选择。",
    tags: ["Llama", "开源模型", "Mock"],
    likes: 176,
    comments: 39,
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 105,
    category: "行业资讯",
    org: "Microsoft AI Blog",
    time: "今天 08:40",
    title: "Copilot Studio 更新多智能体编排与企业连接器能力",
    summary:
      "Mock 快讯：Microsoft 展示跨业务系统的 Agent 编排方式，重点覆盖身份继承、数据连接和任务级观测。",
    tags: ["Copilot", "Agent", "Mock"],
    likes: 154,
    comments: 18,
  },
  {
    id: 106,
    category: "部门动态",
    org: "数字创新中心",
    time: "今天 08:15",
    title: "海外 AI 产品观察小组发布本周跟踪清单",
    summary:
      "团队将持续跟踪 GPT、Claude、Gemini、Llama 与 Copilot 的产品动态，并评估其对企业内容创作场景的影响。",
    tags: ["部门动态", "海外 AI"],
    likes: 68,
    comments: 11,
  },
  {"id": 109, "category": "通知公告", "org": "科研交流办公室", "time": "2026-06-03", "title": "华鲲振宇&华为深圳政企科研交流会", "summary": "Mock 公告：围绕政企科研合作、算力基础设施与联合创新展开交流。", "content": "本通知为演示数据。围绕政企科研合作、算力基础设施与联合创新展开交流。具体议程、参会方式与后续安排以正式通知为准。", "tags": ["通知公告", "Mock"], "likes": 0, "comments": 2},
  {"id": 108, "category": "通知公告", "org": "技术交流中心", "time": "2026-06-02", "title": "2026空间智能软件技术大会在京开幕", "summary": "Mock 公告：聚焦空间智能软件、三维感知与行业应用，分享技术研究和实践案例。", "content": "本通知为演示数据。聚焦空间智能软件、三维感知与行业应用，分享技术研究和实践案例。具体议程、参会方式与后续安排以正式通知为准。", "tags": ["通知公告", "Mock"], "likes": 0, "comments": 2},
  {"id": 107, "category": "通知公告", "org": "行业合作中心", "time": "2026-05-28", "title": "唱想“人工智能+医疗健康”发展会议", "summary": "Mock 公告：围绕人工智能在医疗健康领域的应用展开交流，探讨服务创新与协同发展。", "content": "本通知为演示数据。围绕人工智能在医疗健康领域的应用展开交流，探讨服务创新与协同发展。具体议程、参会方式与后续安排以正式通知为准。", "tags": ["通知公告", "Mock"], "likes": 0, "comments": 2},
];

export const abilities = [
  {
    id: "image",
    name: "图像生成",
    hint: "海报、配图、创意素材",
    icon: Image,
    color: "#5b7cff",
  },
  {
    id: "ppt",
    name: "PPT 生成",
    hint: "汇报、方案、路演",
    icon: Presentation,
    color: "#f26b5b",
  },
  {
    id: "video",
    name: "视频生成",
    hint: "脚本到短视频",
    icon: Video,
    color: "#8d6cf6",
  },
  {
    id: "translate",
    name: "智能翻译",
    hint: "多语言专业翻译",
    icon: Languages,
    color: "#1baf8a",
  },
  {
    id: "document",
    name: "报告文档",
    hint: "Word、PDF 报告",
    icon: FileText,
    color: "#36b37e",
  },
  {
    id: "chart",
    name: "信息图表",
    hint: "数据可视化图表",
    icon: ChartNoAxesCombined,
    color: "#2bbac5",
  },
  {
    id: "mindmap",
    name: "思维导图",
    hint: "梳理观点与结构",
    icon: Network,
    color: "#7187f4",
  },
  {
    id: "audio",
    name: "音频生成",
    hint: "播客、配音、摘要",
    icon: AudioLines,
    color: "#ef6471",
  },
  {
    id: "webpage",
    name: "交互网页",
    hint: "可分享的 H5 页面",
    icon: PanelsTopLeft,
    color: "#4c7cf0",
  },
];

export const enterpriseAbilities = [
  {
    id: "contract",
    name: "合同起草",
    hint: "企业条款与风险提示",
    icon: FileSignature,
    color: "#8f6ae8",
  },
  {
    id: "bid",
    name: "标书生成",
    hint: "招标响应与偏离表",
    icon: BookOpenCheck,
    color: "#d28a35",
  },
  {
    id: "weekly",
    name: "周报生成",
    hint: "汇总进展与风险",
    icon: CalendarCheck,
    color: "#29a579",
  },
  {
    id: "flow",
    name: "流程图生成",
    hint: "业务流程与架构图",
    icon: Workflow,
    color: "#4c7cf0",
  },
];

export const templates = [
  {
    id: "brand",
    name: "集团标准汇报",
    type: "PPT",
    color: "#5a5cf5",
    desc: "品牌蓝 · 16:9 · 含封面与章节页",
  },
  {
    id: "research",
    name: "行业研究报告",
    type: "Word",
    color: "#275c9f",
    desc: "深蓝专业 · 含摘要与引用规范",
  },
  {
    id: "project",
    name: "项目阶段复盘",
    type: "PPT",
    color: "#1a9b79",
    desc: "里程碑、成果、风险与下一步",
  },
  {
    id: "notice",
    name: "企业通知公文",
    type: "Word",
    color: "#bd3b3b",
    desc: "正式公文 · 标准页眉页脚",
  },
  {
    id: "bid",
    name: "商务投标模板",
    type: "Word",
    color: "#8756c7",
    desc: "响应目录、资质与服务方案",
  },
  {
    id: "simple",
    name: "极简分析简报",
    type: "PDF",
    color: "#2d3440",
    desc: "轻量阅读 · 图文混排",
  },
];
