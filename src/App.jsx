import React, { useMemo, useRef, useState } from "react";
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Plus,
  Folder,
  FolderOpen,
  FileText,
  Presentation,
  MoreHorizontal,
  Send,
  Heart,
  MessageCircle,
  Share2,
  FolderDown,
  Building2,
  Newspaper,
  Users,
  Link2,
  Copy,
  X,
  Check,
  PenLine,
  RefreshCw,
  Flame,
  UploadCloud,
  ChevronRight,
  History,
  PanelRight,
  Database,
  Clock3,
  Workflow,
  LoaderCircle,
  Eye,
  LayoutTemplate,
  Info,
  Bookmark,
  CheckCircle2,
  CircleUserRound,
  Settings,
  ShieldCheck,
  LogOut,
  Maximize2,
  Trash2,
  SlidersHorizontal,
  Rss,
  Globe2,
  Mail,
  Bot,
  Crown,
  UserPlus,
  FolderKanban,
  UserCog,
  LockKeyhole,
  Bold,
  Italic,
  List,
  Smile,
  AtSign,
  Image,
} from "lucide-react";
import { articles, abilities, templates } from "./data";
import PublishEditor, { MarkdownView } from "./PublishEditor";

const initialProjects = [
  {
    id: "p1",
    name: "基础课程未来学习中心",
    color: "#5a5cf6",
    folders: [
      {
        id: "research",
        name: "研究资料",
        items: [
          { id: "r1", type: "reference", article: articles[0] },
          { id: "r2", type: "reference", article: articles[1] },
          { id: "r3", type: "pdf", name: "海外AI产品周度观察.pdf" },
        ],
      },
      {
        id: "documents",
        name: "项目文档",
        items: [
          { id: "d1", type: "doc", name: "项目申报材料初稿.docx" },
          { id: "d2", type: "doc", name: "需求调研访谈纪要.docx" },
          { id: "d3", type: "sheet", name: "项目预算测算表.xlsx" },
        ],
      },
    ],
  },
  { id: "p2", name: "星河计划共创", color: "#1ca77a", folders: emptyFolders() },
  {
    id: "p3",
    name: "华东区售前资产库",
    color: "#dd8c32",
    folders: emptyFolders(),
  },
];
function emptyFolders() {
  return [
    { id: "research", name: "研究资料", items: [] },
    { id: "documents", name: "项目文档", items: [] },
  ];
}
function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark">
        <i />
        <b />
      </span>
      <span>
        Agentic<span>Feed</span>
      </span>
    </div>
  );
}
function Avatar({ size = 36 }) {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      林
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("feed"),
    [projects, setProjects] = useState(initialProjects),
    [activeId, setActiveId] = useState("p1"),
    [toast, setToast] = useState(""),
    [profile, setProfile] = useState(false),
    [reviewStatuses, setReviewStatuses] = useState({}),
    [studioDraft, setStudioDraft] = useState("");
  const notify = (t) => {
    setToast(t);
    clearTimeout(window.__t);
    window.__t = setTimeout(() => setToast(""), 2400);
  };
  const saveArticle = (article, pid, fid) => {
    setProjects((ps) =>
      ps.map((p) =>
        p.id !== pid
          ? p
          : {
              ...p,
              folders: p.folders.map((f) =>
                f.id !== fid
                  ? f
                  : {
                      ...f,
                      items: f.items.some((x) => x.article?.id === article.id)
                        ? f.items
                        : [
                            ...f.items,
                            {
                              id: `r${Date.now()}`,
                              type: "reference",
                              article,
                            },
                          ],
                    },
              ),
            },
      ),
    );
    setActiveId(pid);
    notify("已保存到 Studio 项目文件夹");
  };
  return (
    <>
      <Header
        page={page}
        setPage={setPage}
        profile={profile}
        setProfile={setProfile}
      />
      {page === "feed" ? (
        <Feed
          projects={projects}
          saveArticle={saveArticle}
          openStudio={(draft = "") => { setStudioDraft(typeof draft === "string" ? draft : ""); setPage("studio"); }}
          notify={notify}
        />
      ) : page === "studio" ? (
        <Studio
          initialInput={studioDraft}
          projects={projects}
          setProjects={setProjects}
          activeId={activeId}
          setActiveId={setActiveId}
          notify={notify}
        />
      ) : page === "admin" ? (
        <ReviewPage statuses={reviewStatuses} setStatuses={setReviewStatuses} />
      ) : page === "ai-org" ? (
        <AIOrganization projects={projects} notify={notify} />
      ) : (
        <Profile
          projects={projects}
          setPage={setPage}
          initialTab={page === "preferences" ? "preferences" : "overview"}
          notify={notify}
        />
      )}{" "}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </>
  );
}
function Header({ page, setPage, profile, setProfile }) {
  return (
    <header className="global-header">
      <button className="brand-button" onClick={() => setPage("feed")}>
        <Logo />
      </button>
      <nav className="primary-nav">
        <button
          className={page === "feed" ? "active" : ""}
          onClick={() => setPage("feed")}
        >
          Feed
        </button>
        <button
          className={page === "studio" ? "active" : ""}
          onClick={() => setPage("studio")}
        >
          <Sparkles size={17} />
          studio
        </button>
      </nav>
      <div className="header-actions">
        <button className="icon-button">
          <Bell size={20} />
          <i className="unread-dot" />
        </button>
        <div className="profile-anchor">
          <button
            className="avatar-button"
            onClick={() => setProfile(!profile)}
          >
            <Avatar />
            <ChevronDown size={15} />
          </button>
          {profile && (
            <div className="profile-menu">
              <div className="profile-summary">
                <Avatar size={44} />
                <div>
                  <strong>林小满</strong>
                  <span>数字创新中心 · 产品经理</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setPage("profile");
                  setProfile(false);
                }}
              >
                <CircleUserRound size={18} />
                用户中心
              </button>
              <button
                onClick={() => {
                  setPage("preferences");
                  setProfile(false);
                }}
              >
                <Settings size={18} />
                偏好设置
              </button>
              <button onClick={() => { setPage("admin"); setProfile(false); }}>
                <ShieldCheck size={18} />
                管理员
              </button>
              <div className="menu-line" />
              <button>
                <LogOut size={18} />
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Feed({ projects, saveArticle, openStudio, notify }) {
  const tabs = [
    "推荐",
    "通知公告",
    "部门动态",
    "行业资讯",
    "技术分享",
    "项目动态",
  ];
  const [tab, setTab] = useState("推荐"),
    [q, setQ] = useState(""),
    [ai, setAi] = useState(null),
    [saving, setSaving] = useState(null),
    [sharing, setSharing] = useState(null),
    [liked, setLiked] = useState([1]),
    [followed, setFollowed] = useState(["数字创新中心"]),
    [sort, setSort] = useState("智能排序"),
    [mode, setMode] = useState("list"),
    [feedArticles, setFeedArticles] = useState(articles),
    [detail, setDetail] = useState(null),
    [articleComments, setArticleComments] = useState({});
  const list = useMemo(() => {
    const filtered = feedArticles.filter(
      (a) =>
        (tab === "推荐" || a.category === tab) &&
        (!q || `${a.title}${a.summary}${a.org}`.includes(q)),
    );
    return sort === "最新消息"
      ? [...filtered].sort((a, b) => b.id - a.id)
      : filtered;
  }, [tab, q, sort, feedArticles]);
  if (detail) {
    return (
      <ArticleDetail
        article={detail}
        comments={articleComments[detail.id] || []}
        close={() => setDetail(null)}
        liked={liked.includes(detail.id)}
        onLike={() =>
          setLiked(
            liked.includes(detail.id)
              ? liked.filter((x) => x !== detail.id)
              : [...liked, detail.id],
          )
        }
        onComment={(text) => {
          setArticleComments((items) => ({
            ...items,
            [detail.id]: [
              ...(items[detail.id] || []),
              { id: Date.now(), name: "林小满", role: "数字创新中心", text },
            ],
          }));
          setFeedArticles((items) =>
            items.map((item) =>
              item.id === detail.id
                ? { ...item, comments: (item.comments || 0) + 1 }
                : item,
            ),
          );
          setDetail((item) => ({ ...item, comments: (item.comments || 0) + 1 }));
          notify("评论已发布");
        }}
      />
    );
  }
  return (
    <main className="headline-feed">
      <section className="feed-masthead">
        <div>
          <span>
            <Sparkles size={15} />
            企业智能信息流
          </span>
          <h1>让重要信息，主动抵达每个人</h1>
          <p>聚合组织动态与行业洞察，并将每条信息无缝带入项目创作。</p>
        </div>
        <form className="mast-search" onSubmit={(e) => e.preventDefault()}>
          <Search size={20} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索资讯、项目、部门或关键词"
          />
          {q && (
            <button onClick={() => setQ("")}>
              <X size={16} />
            </button>
          )}
          <button className="search-submit" type="submit">
            搜索
          </button>
        </form>
      </section>
      <div className="feed-category-bar">
        <div>
          {tabs.map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
              {t === "通知公告" && <i />}
            </button>
          ))}
        </div>
        <div>
          <button className="feed-publish" onClick={() => setMode("publish")}>
            <PenLine size={16} />
            发布动态
          </button>
          <button>
            <RefreshCw size={16} />
            刷新
          </button>
        </div>
      </div>
      <div className="headline-layout">
        <section className="headline-main">
          <div className="stream-title">
            <div>
              <h2>{tab}</h2>
              <span>根据岗位、部门与阅读偏好智能排序</span>
            </div>
            <button
              className="sort-switch"
              onClick={() =>
                setSort(sort === "智能排序" ? "最新消息" : "智能排序")
              }
            >
              {sort} <ChevronDown size={14} />
            </button>
          </div>
          <div className="headline-list">
            {list.map((a, i) => (
              <HeadlineItem
                key={a.id}
                a={a}
                lead={i === 0}
                liked={liked.includes(a.id)}
                onLike={() =>
                  setLiked(
                    liked.includes(a.id)
                      ? liked.filter((x) => x !== a.id)
                      : [...liked, a.id],
                  )
                }
                onAI={() => setAi(a)}
                onSave={() => setSaving(a)}
                onShare={() => setSharing(a)}
                onOpen={() => setDetail(a)}
                followed={followed.includes(a.org)}
                onFollow={() =>
                  setFollowed(
                    followed.includes(a.org)
                      ? followed.filter((x) => x !== a.org)
                      : [...followed, a.org],
                  )
                }
              />
            ))}
          </div>
        </section>
        <aside className="headline-right">
          <div className="login-project-card">
            <div>
              <FolderOpen size={20} />
              <strong>我的 Studio 项目</strong>
            </div>
            {projects.map((p) => (
              <button key={p.id} onClick={openStudio}>
                <i style={{ background: p.color }} />
                <span>{p.name}</span>
                <em>
                  {p.folders.reduce((n, f) => n + f.items.length, 0)} 项资料
                </em>
                <ChevronRight size={15} />
              </button>
            ))}
            <button className="open-studio" onClick={openStudio}>
              <Sparkles size={16} />
              进入创作者中心
            </button>
          </div>
          <div className="hot-ranking">
            <div className="ranking-title">
              <span>
                <Flame size={19} />
                实时热点
              </span>
              <button>换一换</button>
            </div>
            {[
              "GPT 工具调用与长任务能力更新",
              "Claude 强化企业文件理解",
              "Gemini 扩展多模态研究工作流",
              "Llama 发布端侧部署参考",
              "Copilot Studio 更新 Agent 编排",
            ].map((x, i) => (
              <button key={x}>
                <b>{i + 1}</b>
                <span>{x}</span>
                {i < 2 && <em>热</em>}
              </button>
            ))}
          </div>
          <div className="source-follow-card">
            <div className="ranking-title">
              <span>
                <Newspaper size={18} />
                推荐信息源
              </span>
              <button>更多</button>
            </div>
            {["OpenAI Newsroom", "Anthropic Updates", "Google DeepMind"].map(
              (source, i) => (
                <div className="source-follow-row" key={source}>
                  <span className="source-logo">{source[0]}</span>
                  <div>
                    <strong>{source}</strong>
                    <em>
                      {
                        [
                          "GPT 与开发者生态",
                          "Claude 产品与安全",
                          "Gemini 与前沿研究",
                        ][i]
                      }
                    </em>
                  </div>
                  <button
                    className={followed.includes(source) ? "followed" : ""}
                    onClick={() =>
                      setFollowed(
                        followed.includes(source)
                          ? followed.filter((x) => x !== source)
                          : [...followed, source],
                      )
                    }
                  >
                    {followed.includes(source) ? "已关注" : "+ 关注"}
                  </button>
                </div>
              ),
            )}
          </div>
          <div className="department-reading-card">
            <div>
              <Users size={18} />
              <strong>同部门人在看</strong>
              <span>12 人</span>
            </div>
            <div className="department-avatars">
              <Avatar size={30} />
              <Avatar size={30} />
              <Avatar size={30} />
              <Avatar size={30} />
              <em>+8</em>
            </div>
            <p>数字创新中心同事最近集中关注“企业 Agent 落地”与“数据治理”。</p>
            <button>
              查看部门阅读榜 <ChevronRight size={14} />
            </button>
          </div>
        </aside>
      </div>
      <PublishComposer open={mode === "publish"} close={() => setMode("list")} openStudio={openStudio} notify={notify} publish={(item) => {
        setFeedArticles((items) => [item, ...items]);
        setTab(item.category);
        setMode("list");
        notify("动态已发布");
      }} />
      {ai && (
        <AIDrawer
          article={ai}
          close={() => setAi(null)}
          save={() => setSaving(ai)}
        />
      )}{" "}
      {saving && (
        <SaveModal
          article={saving}
          projects={projects}
          close={() => setSaving(null)}
          save={(p, f) => {
            saveArticle(saving, p, f);
            setSaving(null);
          }}
        />
      )}
      {sharing && (
        <ShareModal
          article={sharing}
          close={() => setSharing(null)}
          notify={notify}
        />
      )}
    </main>
  );
}
function HeadlineItem({
  a,
  lead,
  liked,
  onLike,
  onAI,
  onSave,
  onShare,
  onOpen,
  followed,
  onFollow,
}) {
  return (
    <article className={`headline-item ${lead ? "lead" : ""}`}>
      {a.image && (
        <button className="headline-thumb" onClick={onOpen} aria-label={`查看 ${a.title}`}>
          <img src={a.image} alt="" />
          <span>{a.category}</span>
        </button>
      )}
      <div className="headline-content">
        <div className="headline-source">
          <span className="source-logo">{a.org[0]}</span>
          <strong>{a.org}</strong>
          <button
            className={followed ? "inline-follow followed" : "inline-follow"}
            onClick={onFollow}
          >
            {followed ? "已关注" : "+ 关注"}
          </button>
          <em>{a.time}</em>
        </div>
        <button className="headline-open" onClick={onOpen}>
          <h3>{a.title}</h3>
          <p>{a.summary}</p>
        </button>
        <div className="headline-tags">
          {a.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="headline-actions">
          <button className={liked ? "liked" : ""} onClick={onLike}>
            <Heart size={17} fill={liked ? "currentColor" : "none"} />
            {a.likes + (liked ? 1 : 0)}
          </button>
          <button onClick={onOpen}>
            <MessageCircle size={17} />
            {a.comments}
          </button>
          <button onClick={onShare}>
            <Share2 size={17} />
            转发
          </button>
          <button onClick={onSave}>
            <FolderDown size={17} />
            保存到 Studio
          </button>
          <button className="discuss-ai" onClick={onAI}>
            <span>
              <Sparkles size={16} />
            </span>
            AI 解读与讨论
          </button>
        </div>
      </div>
    </article>
  );
}

function ContentEditor({
  title,
  setTitle,
  content,
  setContent,
  placeholder,
  compact = false,
}) {
  const textareaRef = useRef(null);
  const insert = (before, after = before) => {
    const node = textareaRef.current;
    if (!node) return;
    const start = node.selectionStart;
    const end = node.selectionEnd;
    const selected = content.slice(start, end);
    setContent(`${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`);
    requestAnimationFrame(() => {
      node.focus();
      node.setSelectionRange(start + before.length, end + before.length);
    });
  };
  return (
    <div className={`content-editor ${compact ? "compact" : ""}`}>
      {setTitle && (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="填写清晰、具体的标题"
          aria-label="动态标题"
        />
      )}
      <div className="editor-toolbar" aria-label="编辑工具">
        <button type="button" title="粗体" onClick={() => insert("**")}><Bold size={17} /></button>
        <button type="button" title="斜体" onClick={() => insert("*")}><Italic size={17} /></button>
        <button type="button" title="列表" onClick={() => insert("- ", "")}><List size={17} /></button>
        <button type="button" title="插入链接" onClick={() => insert("[", "](https://)")}><Link2 size={17} /></button>
        <button type="button" title="提及成员" onClick={() => insert("@", "")}><AtSign size={17} /></button>
        <button type="button" title="添加图片" onClick={() => insert("![图片](", ")")}><Image size={17} /></button>
        <button type="button" title="添加表情" onClick={() => insert(":sparkles:", "")}><Smile size={17} /></button>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        aria-label={compact ? "评论内容" : "正文内容"}
      />
    </div>
  );
}

const MarkdownPreview = MarkdownView;

function ArticleDetail({ article, close, liked, onLike, comments, onComment }) {
  const [draft, setDraft] = useState("");
  const mockComments = [
    { id: "m1", name: "周一", role: "AI 产品组", text: "这条信息很有启发，尤其是对企业场景的落地建议。" },
    { id: "m2", name: "思冬", role: "社区助人之星", text: "建议继续关注模型成本和权限治理，期待后续更新。" },
  ];
  const allComments = [...mockComments, ...comments];
  const submit = () => {
    if (!draft.trim()) return;
    onComment(draft.trim());
    setDraft("");
  };
  return (
    <main className="article-detail-page">
      <div className="article-detail-head">
        <button onClick={close}><ChevronRight size={18} style={{ transform: "rotate(180deg)" }} /> 返回 Feed</button>
        <span>Mock 信息 · {article.category}</span>
      </div>
      <div className="article-reading-grid">
        <aside className="detail-rail">
          <button className={liked ? "liked" : ""} onClick={onLike}><Heart size={24} fill={liked ? "currentColor" : "none"} /><span>{article.likes + (liked ? 1 : 0)}</span></button>
          <button onClick={() => document.getElementById("article-comments").scrollIntoView({ behavior: "smooth" })}><MessageCircle size={24} /><span>{article.comments}</span></button>
          <button><Bookmark size={24} /><span>收藏</span></button>
          <button><Share2 size={24} /><span>分享</span></button>
        </aside>
        <article className="article-detail-main">
          <h1>{article.title}</h1>
          <div className="detail-meta">{article.time} · {article.org}</div>
          <div className="detail-disclaimer">作品声明：Mock 演示内容，仅供产品功能参考</div>
          {article.format ? (article.format !== "text" ? <MarkdownPreview value={article.content} /> : <p className="plain-article-body">{article.content}</p>) : <>
          <p className="detail-lead">{article.summary}</p>
          <p>{article.content || "这是一条用于产品演示的 Mock 信息。内容聚合了行业动态、产品变化与组织实践，方便团队在同一个页面阅读、讨论并沉淀到 Studio 项目中。"}</p>
          {article.image && <img className="detail-image" src={article.image} alt="" />}
          <h2>为什么值得关注</h2>
          <ul><li>模型能力正在从单点问答走向长任务和工具协作。</li><li>企业落地需要同时考虑成本、权限与审计。</li><li>建议从高频场景开始，逐步验证投入产出。</li></ul>
          </>}
        </article>
        <div className="detail-sidebar">
        <aside className="detail-author">
          <span className="detail-author-avatar">{article.org[0]}</span>
          <strong>{article.org}</strong>
          <p>最新行业资讯与组织实践，带你全面解读。</p>
          <button>关注</button>
          <div><span>TA 的热门内容</span></div>
          {["企业 Agent 工作流进入规模化验证", "多模态模型如何重塑内容生产", "AI 治理与权限边界实践"].map((title) => <a key={title}>{title}<small>1.8万阅读</small></a>)}
        </aside>
      <section id="article-comments" className="detail-comments-section">
        <div className="comments-heading"><h2>评论</h2><span>{article.comments} 条讨论</span></div>
        <div className="detail-comment-composer">
          <Avatar size={42} />
          <div>
            <ContentEditor compact content={draft} setContent={setDraft} placeholder="说说你的看法…" />
            <div className="comment-submit-row"><span>文明讨论，友善交流</span><button disabled={!draft.trim()} onClick={submit}><Send size={15} /> 发布评论</button></div>
          </div>
        </div>
        <div className="comment-list">
          {allComments.map((comment) => <div className="comment-item" key={comment.id}>
            <Avatar size={42} /><div><div className="comment-author"><strong>{comment.name}</strong><span>{comment.role}</span><time>刚刚</time></div><p>{comment.text}</p><div className="comment-tools"><button><Heart size={14} /> 赞</button><button onClick={() => setDraft(`@${comment.name} `)}>回复</button></div></div>
          </div>)}
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}

function PublishComposer({ open, close, publish, openStudio, notify }) {
  const dialogRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [format, setFormat] = useState("text");
  const [category, setCategory] = useState("部门动态");
  const [tags, setTags] = useState("");
  const [expanded, setExpanded] = useState(false);
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (open) dialog.showModal();
    else dialog.close();
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  const reset = () => { setTitle(""); setContent(""); setTags(""); setFormat("text"); setExpanded(false); };
  const full = format === "md" || expanded;
  return <dialog ref={dialogRef} className={`publish-dialog ${full ? "fullscreen" : ""} ${format === "md" ? "markdown-mode" : ""}`} aria-label="发布动态" onCancel={close}>
    <div className="composer-handle" />
    <header className="composer-header"><button className="primary-button" onClick={() => { close(); openStudio(`请根据以下素材生成一篇可发布的动态：\n${title}\n\n${content}`); }}><Sparkles size={17} /> 使用 Studio 生成 <ChevronRight size={16} /></button><div><button aria-label={full ? "收起为文本弹窗" : "全屏编辑"} onClick={() => { if (full) { setFormat("text"); setExpanded(false); } else setExpanded(true); }}><Maximize2 size={19} /></button><button aria-label="最小化编辑器" onClick={close}>—</button><button aria-label="关闭编辑器" onClick={close}><X size={20} /></button></div></header>
    <div className="composer-body"><section className="composer-input-pane">
      <input autoFocus className="composer-title" aria-label="动态标题" placeholder="输入标题，或在此处粘贴链接" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="composer-meta"><select aria-label="动态分类" value={category} onChange={(e) => setCategory(e.target.value)}>{["部门动态", "技术分享", "项目动态", "通知公告"].map((item) => <option key={item}>{item}</option>)}</select><input aria-label="动态标签" placeholder="可选标签，以逗号分隔" value={tags} onChange={(e) => setTags(e.target.value)} /></div>
      <div className="composer-editor"><PublishEditor content={content} setContent={setContent} format={format} setFormat={(next) => { setFormat(next); if (next === "text") setExpanded(false); }} notify={notify} /></div>
    </section>{format === "md" && <section className="composer-preview" aria-label="正文预览"><MarkdownPreview value={content} title={title} /></section>}</div>
    <footer className="composer-footer"><button className="primary-button" disabled={!title.trim() || !content.trim()} onClick={() => { publish({ id: Date.now(), category, org: "数字创新中心", time: "刚刚", title: title.trim(), summary: content.slice(0, 180), content, format: format === "text" ? "rich" : "md", tags: tags.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean), likes: 0, comments: 0 }); reset(); }}><PenLine size={16} /> 发布动态</button><button onClick={() => { reset(); close(); }}>舍弃</button><button onClick={() => { close(); notify("草稿已保留，可再次点击发布动态继续编辑"); }}>保存草稿</button></footer>
  </dialog>;
}
function AIDrawer({ article, close, save }) {
  const [loading, setLoading] = useState(true),
    [input, setInput] = useState(""),
    [messages, setMessages] = useState([]);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [article.id]);
  const send = () => {
    if (!input.trim()) return;
    const q = input;
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "ai",
        text: "从文章看，关键不在单一模型能力，而在组织流程、权限治理和高质量业务上下文能否形成闭环。建议先选择 2—3 个高频场景验证投入产出。",
      },
    ]);
  };
  return (
    <>
      <div className="drawer-mask" onClick={close} />
      <aside className="article-ai-drawer">
        <div className="ai-drawer-head">
          <div>
            <span>
              <Sparkles size={17} />
            </span>
            <div>
              <strong>文章 AI 助手</strong>
              <em>已读取当前内容</em>
            </div>
          </div>
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
        <div className="ai-article-ref">
          <span className="source-logo">{article.org[0]}</span>
          <div>
            <strong>{article.title}</strong>
            <p>
              {article.org} · {article.time}
            </p>
          </div>
        </div>
        <div className="ai-chat-scroll">
          {loading ? (
            <div className="summary-loading">
              <LoaderCircle className="spin" size={20} />
              <strong>正在阅读并总结文章…</strong>
              <span>提取观点、事实与行动建议</span>
            </div>
          ) : (
            <>
              <div className="ai-bubble">
                <div className="bubble-label">
                  <Sparkles size={14} />
                  自动摘要
                </div>
                <h4>这篇文章讲了什么？</h4>
                <p>{article.summary}</p>
                <ul>
                  <li>企业智能化开始从单点工具转向业务协同。</li>
                  <li>上下文、组织权限与流程治理需要同步建设。</li>
                  <li>建议从可量化的高频场景开始验证。</li>
                </ul>
                <div className="summary-source">
                  <Link2 size={14} />
                  摘要仅基于当前文章生成
                </div>
              </div>
              <div className="quick-questions">
                <span>继续追问</span>
                {[
                  "这对我们部门有什么影响？",
                  "提炼成 3 条汇报观点",
                  "有哪些潜在风险？",
                ].map((x) => (
                  <button key={x} onClick={() => setInput(x)}>
                    {x}
                  </button>
                ))}
              </div>
              {messages.map((m, i) => (
                <div className={`drawer-message ${m.role}`} key={i}>
                  <p>{m.text}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="ai-drawer-actions">
          <button onClick={save}>
            <FolderDown size={16} />
            保存到项目
          </button>
          <button>
            <Share2 size={16} />
            转发对话
          </button>
        </div>
        <div className="drawer-composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="针对这篇文章继续提问…"
          />
          <button onClick={send}>
            <Send size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
function SaveModal({ article, projects, close, save }) {
  const [pid, setPid] = useState(projects[0].id),
    [fid, setFid] = useState("research"),
    p = projects.find((x) => x.id === pid);
  return (
    <Modal
      title="保存到 Studio"
      subtitle="选择项目与文件夹，内容将成为项目可引用资料"
      close={close}
    >
      <div className="save-article-preview">
        <Newspaper size={20} />
        <div>
          <strong>{article.title}</strong>
          <span>{article.org}</span>
        </div>
      </div>
      <label className="field-label">选择项目</label>
      <div className="project-choice-list">
        {projects.map((x) => (
          <button
            className={pid === x.id ? "active" : ""}
            key={x.id}
            onClick={() => {
              setPid(x.id);
              setFid(x.folders[0].id);
            }}
          >
            <i style={{ background: x.color }} />
            <span>{x.name}</span>
            <Check size={16} />
          </button>
        ))}
      </div>
      <label className="field-label">保存到文件夹</label>
      <div className="folder-choice-list">
        {p.folders.map((f) => (
          <button
            className={fid === f.id ? "active" : ""}
            key={f.id}
            onClick={() => setFid(f.id)}
          >
            <Folder size={17} />
            {f.name}
            <span>{f.items.length}</span>
          </button>
        ))}
      </div>
      <div className="save-tip">
        <Info size={16} />
        保存后可在该项目的对话、文档与生成任务中引用。
      </div>
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>
          取消
        </button>
        <button className="primary-button" onClick={() => save(pid, fid)}>
          保存到此文件夹
        </button>
      </div>
    </Modal>
  );
}
function ShareModal({ article, close, notify }) {
  return (
    <Modal title="转发内容" subtitle="创建可控权限的独立分享链接" close={close}>
      <div className="save-article-preview">
        <Share2 size={20} />
        <div>
          <strong>{article.title}</strong>
          <span>{article.org}</span>
        </div>
      </div>
      <div className="scope-options">
        <button className="active">
          <Building2 size={20} />
          <div>
            <strong>企业内部公开</strong>
            <span>所有员工可访问</span>
          </div>
          <Check size={18} />
        </button>
        <button>
          <Users size={20} />
          <div>
            <strong>指定范围</strong>
            <span>选择部门或人员</span>
          </div>
          <Check size={18} />
        </button>
      </div>
      <div className="link-box">
        <Link2 size={17} />
        <span>agenticfeed.cn/s/{article.id}a8f2</span>
        <button onClick={() => notify("链接已复制")}>
          <Copy size={16} />
          复制
        </button>
      </div>
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>
          取消
        </button>
        <button
          className="primary-button"
          onClick={() => {
            notify("转发链接已创建");
            close();
          }}
        >
          创建链接
        </button>
      </div>
    </Modal>
  );
}

const initialAiGroups = [
  {
    id: "g1",
    name: "智能产品观察组",
    description: "跟踪 AI 产品动态，共享研究进展与项目洞察",
    color: "#5a5cf6",
    leader: "林小满",
    isLeader: true,
    members: ["林小满", "周辰", "赵欣", "陈妍"],
    aiMembers: [
      {
        id: "bot1",
        name: "小研",
        role: "AI 研究助理",
        owner: "林小满",
        projectIds: ["p1", "p3"],
        focus: "海外 AI 产品、项目进展与研究资料",
      },
      {
        id: "bot2",
        name: "知更",
        role: "AI 情报员",
        owner: "周辰",
        projectIds: ["p2"],
        focus: "行业快讯、竞品变化与团队关注主题",
      },
    ],
  },
  {
    id: "g2",
    name: "数字创新周报组",
    description: "汇总团队工作进展并生成部门周报",
    color: "#20a27a",
    leader: "陈妍",
    isLeader: false,
    members: ["陈妍", "林小满", "高远"],
    aiMembers: [
      {
        id: "bot3",
        name: "周周",
        role: "AI 周报助理",
        owner: "陈妍",
        projectIds: ["p1"],
        focus: "里程碑、风险与本周完成事项",
      },
    ],
  },
  {
    id: "g3",
    name: "售前方案共创组",
    description: "复用售前项目资料与方案经验",
    color: "#e38b35",
    leader: "高远",
    isLeader: false,
    members: ["高远", "林小满", "孙琪", "陆扬", "许诺"],
    aiMembers: [
      {
        id: "bot4",
        name: "方案通",
        role: "AI 售前顾问",
        owner: "高远",
        projectIds: ["p3"],
        focus: "客户需求、解决方案与复用案例",
      },
    ],
  },
];

function AIOrganization({ projects, notify }) {
  const [groups, setGroups] = useState(initialAiGroups),
    [activeGroupId, setActiveGroupId] = useState("g1"),
    [activeBotId, setActiveBotId] = useState("bot1"),
    [input, setInput] = useState(""),
    [configOpen, setConfigOpen] = useState(false),
    [messages, setMessages] = useState([
      {
        role: "ai",
        text: "大家好，我是小研。我已获得林小满授权，可只读访问指定的 Studio 项目资料。你可以问我项目进度或最近关注的行业消息。",
      },
    ]);
  const group = groups.find((item) => item.id === activeGroupId) || groups[0];
  const activeBot =
    group.aiMembers.find((item) => item.id === activeBotId) ||
    group.aiMembers[0];
  const authorizedProjects = projects.filter((project) =>
    activeBot?.projectIds.includes(project.id),
  );
  const openGroup = (nextGroup) => {
    const nextBot = nextGroup.aiMembers[0];
    setActiveGroupId(nextGroup.id);
    setActiveBotId(nextBot?.id || null);
    setMessages([
      {
        role: "ai",
        text: nextBot
          ? `我是${nextBot.name}，负责${nextBot.focus}。我只会读取已授权的 Studio 项目范围。`
          : "当前小组尚未配置 AI 组员。",
      },
    ]);
  };
  const openBot = (bot) => {
    setActiveBotId(bot.id);
    setMessages([
      {
        role: "ai",
        text: `我是${bot.name}，${bot.role}。我的关注范围是${bot.focus}，可以基于已授权项目回答小组成员的问题。`,
      },
    ]);
  };
  const answer = (question) => {
    if (/进度|项目/.test(question)) {
      const target = authorizedProjects[0];
      if (!target)
        return "我目前没有获得任何 Studio 项目的读取授权，请联系小组 Leader 调整我的数据范围。";
      const fileCount = target.folders.reduce(
        (count, folder) => count + folder.items.length,
        0,
      );
      return `“${target.name}”目前处于材料分析与成果整理阶段。已归集 ${fileCount} 项项目资料，最近完成了申报材料分析和汇报内容梳理；下一步是确认关键里程碑并补充风险清单。信息来自 ${activeBot.owner} 授权的 Studio 项目。`;
    }
    if (/最近|关注|新消息|资讯/.test(question)) {
      return "我最近重点关注三条消息：GPT 工具调用与长任务能力更新、Claude 的企业文件理解能力，以及 Gemini 多模态研究工作流。这些变化都可能影响团队下一阶段的企业 AI 方案设计。";
    }
    return `我会基于 ${authorizedProjects.length} 个已授权 Studio 项目和小组共享信息回答。你可以继续问具体项目、里程碑、风险或近期行业动态。`;
  };
  const send = (preset) => {
    const question = (preset || input).trim();
    if (!question || !activeBot) return;
    setMessages((all) => [
      ...all,
      { role: "user", text: question },
      { role: "ai", text: answer(question) },
    ]);
    setInput("");
  };
  const addBot = (bot) => {
    setGroups((all) =>
      all.map((item) =>
        item.id === group.id
          ? { ...item, aiMembers: [...item.aiMembers, bot] }
          : item,
      ),
    );
    setActiveBotId(bot.id);
    setConfigOpen(false);
    setMessages([
      {
        role: "ai",
        text: `我是${bot.name}，已完成配置。我只会读取 ${bot.projectIds.length} 个已授权 Studio 项目。`,
      },
    ]);
    notify(`AI 组员“${bot.name}”已加入${group.name}`);
  };
  return (
    <main className="ai-org-page">
      <aside className="ai-group-sidebar">
        <div className="ai-group-heading">
          <div>
            <strong>我的 AI 小组</strong>
            <span>已加入 {groups.length} 个小组</span>
          </div>
          <button title="加入小组" onClick={() => notify("已打开小组邀请码入口")}> 
            <UserPlus size={17} />
          </button>
        </div>
        <div className="ai-group-list">
          {groups.map((item) => (
            <button
              key={item.id}
              className={item.id === group.id ? "active" : ""}
              onClick={() => openGroup(item)}
            >
              <i style={{ background: item.color }}>{item.name.slice(0, 1)}</i>
              <div>
                <strong>{item.name}</strong>
                <span>{item.members.length} 位成员 · {item.aiMembers.length} 位 AI</span>
              </div>
              {item.isLeader && <Crown size={14} />}
            </button>
          ))}
        </div>
        <div className="ai-org-safety-note">
          <LockKeyhole size={16} />
          <span>AI 组员仅可读取员工明确授权的 Studio 项目。</span>
        </div>
      </aside>
      <section className="ai-org-main">
        <header className="ai-org-header">
          <div>
            <i style={{ background: group.color }}>{group.name.slice(0, 1)}</i>
            <div>
              <span>{group.isLeader && <><Crown size={13} /> 你是小组 Leader</>}</span>
              <h1>{group.name}</h1>
              <p>{group.description}</p>
            </div>
          </div>
          {group.isLeader ? (
            <button onClick={() => setConfigOpen(true)}>
              <UserCog size={17} /> 配置 AI 组员
            </button>
          ) : (
            <span className="leader-only-tip">Leader：{group.leader}</span>
          )}
        </header>
        <div className="ai-chat-context">
          <div className="ai-chat-bot-avatar"><Bot size={20} /></div>
          <div>
            <strong>{activeBot?.name || "等待配置"}</strong>
            <span>{activeBot?.role || "暂无 AI 组员"} · 由 {activeBot?.owner || group.leader} 授权</span>
          </div>
          <div className="ai-access-state">
            <LockKeyhole size={13} />
            只读 {authorizedProjects.length} 个 Studio 项目
          </div>
        </div>
        <div className="ai-org-chat-scroll">
          <div className="ai-org-chat-thread">
            {messages.map((message, index) => (
              <div className={`ai-org-message ${message.role}`} key={index}>
                <span>{message.role === "ai" ? <Bot size={16} /> : "林"}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ai-org-composer-wrap">
          <div className="ai-org-quick-prompts">
            {["某项目进度如何了？", "你最近在关注什么新消息？"].map((text) => (
              <button key={text} onClick={() => send(text)}>{text}</button>
            ))}
          </div>
          <div className="ai-org-composer">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              placeholder={`询问 ${activeBot?.name || "AI 组员"} 项目进度或最新关注…`}
            />
            <button onClick={() => send()}><Send size={17} /></button>
          </div>
          <span>AI 回答基于已授权数据，重要信息请向项目成员确认。</span>
        </div>
      </section>
      <aside className="ai-member-panel">
        <div className="ai-member-title">
          <div><strong>AI 组员</strong><span>{group.aiMembers.length} 位在线</span></div>
          {group.isLeader && <button onClick={() => setConfigOpen(true)}><Plus size={16} /></button>}
        </div>
        <div className="ai-member-list">
          {group.aiMembers.map((bot) => (
            <button
              key={bot.id}
              className={activeBot?.id === bot.id ? "active" : ""}
              onClick={() => openBot(bot)}
            >
              <span><Bot size={18} /></span>
              <div><strong>{bot.name}</strong><em>{bot.role}</em></div>
              <i />
            </button>
          ))}
        </div>
        {activeBot && (
          <div className="ai-access-card">
            <div><FolderKanban size={16} /><strong>可读取的项目</strong></div>
            <p>由员工 {activeBot.owner} 授权，仅限回答小组内问题。</p>
            {authorizedProjects.map((project) => (
              <span key={project.id}>
                <i style={{ background: project.color }} />
                {project.name}
              </span>
            ))}
          </div>
        )}
        <div className="human-member-card">
          <strong>小组成员</strong>
          <div>
            {group.members.map((member) => <span key={member}>{member.slice(0, 1)}</span>)}
            <em>{group.members.length} 人</em>
          </div>
        </div>
      </aside>
      {configOpen && (
        <AIConfigModal
          projects={projects}
          close={() => setConfigOpen(false)}
          create={addBot}
        />
      )}
    </main>
  );
}

function AIConfigModal({ projects, close, create }) {
  const [name, setName] = useState(""),
    [owner, setOwner] = useState("林小满"),
    [projectIds, setProjectIds] = useState([projects[0]?.id].filter(Boolean));
  const toggleProject = (id) =>
    setProjectIds((all) =>
      all.includes(id) ? all.filter((item) => item !== id) : [...all, id],
    );
  return (
    <Modal title="配置 AI 组员" subtitle="指定负责人及可只读访问的 Studio 项目" close={close}>
      <label className="field-label">AI 组员名称</label>
      <input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="例如：项目雷达" autoFocus />
      <label className="field-label ai-config-label">对应员工</label>
      <select className="field-input" value={owner} onChange={(event) => setOwner(event.target.value)}>
        <option>林小满</option><option>周辰</option><option>赵欣</option><option>陈妍</option>
      </select>
      <label className="field-label ai-config-label">Studio 项目读取范围</label>
      <div className="ai-config-projects">
        {projects.map((project) => (
          <button key={project.id} className={projectIds.includes(project.id) ? "active" : ""} onClick={() => toggleProject(project.id)}>
            <i>{projectIds.includes(project.id) && <Check size={11} />}</i>
            <FolderOpen size={16} style={{ color: project.color }} />
            <span>{project.name}</span>
          </button>
        ))}
      </div>
      <div className="ai-config-permission-note"><LockKeyhole size={15} />AI 组员无权修改、删除或导出员工项目文件。</div>
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>取消</button>
        <button className="primary-button" disabled={!name.trim() || !projectIds.length} onClick={() => create({ id: `bot${Date.now()}`, name: name.trim(), role: "AI 项目助理", owner, projectIds, focus: "已授权项目进展与资料摘要" })}>完成配置</button>
      </div>
    </Modal>
  );
}

function Studio({ projects, setProjects, activeId, setActiveId, notify, initialInput = "" }) {
  const project = projects.find((p) => p.id === activeId) || projects[0],
    [workspaceMode] = useState("project"),
    [activeConversationId, setActiveConversationId] = useState("c1"),
    [conversations, setConversations] = useState([
      { id: "c1", projectId: "p1", title: "海外 AI 趋势讨论", time: "今天 10:24" },
      { id: "c2", projectId: "p1", title: "周报结构优化", time: "昨天" },
      { id: "c3", projectId: "p2", title: "共创方案初稿", time: "8月19日" },
      { id: "c4", projectId: "p3", title: "售前案例整理", time: "8月18日" },
    ]),
    [folderId, setFolderId] = useState("documents"),
    [right, setRight] = useState(true),
    [input, setInput] = useState(initialInput),
    [selectedAbility, setSelectedAbility] = useState(abilities[4]),
    [msgs, setMsgs] = useState([
      {
        role: "ai",
        text: "我已读取当前项目中的研究资料与项目文档。下面是项目申报材料的初步分析，你可以继续追问或选择生成项。",
        detail: true,
      },
    ]),
    [generating, setGenerating] = useState(false),
    [newOpen, setNewOpen] = useState(false),
    [folderOpen, setFolderOpen] = useState(false),
    [templateOpen, setTemplateOpen] = useState(false),
    [expandedAsset, setExpandedAsset] = useState("o1"),
    [assetTab, setAssetTab] = useState("results"),
    [selectedSources, setSelectedSources] = useState(["r1", "d1"]),
    [selectedAssets, setSelectedAssets] = useState([]),
    [previewAsset, setPreviewAsset] = useState(null),
    [previewFullscreen, setPreviewFullscreen] = useState(false),
    [projectOutputs, setProjectOutputs] = useState({
      p1: [
        {
          id: "o1",
          type: "ppt",
          name: "项目申报材料汇报.pptx",
          createdAt: "今天 15:34",
        },
        {
          id: "o2",
          type: "doc",
          name: "海外 AI 趋势分析报告.docx",
          createdAt: "今天 11:10",
        },
      ],
    }),
    [standaloneOutputs, setStandaloneOutputs] = useState([]),
    [taskHistory, setTaskHistory] = useState([
      { id: "t1", projectId: "p1", name: "报告文档-2026-08-20 15:34:53", time: "15:34", duration: "3分16秒", status: "已完成", ability: "报告文档", prompt: "基于项目资料生成申报材料分析报告", sources: 2, result: "项目申报材料分析报告.docx" },
      { id: "t2", projectId: "p1", name: "视频脚本-2026-08-20 14:18:06", time: "14:18", duration: "2分7秒", status: "失败", ability: "视频生成", prompt: "将研究结论整理为三分钟视频脚本", sources: 2, error: "生成服务响应超时，可重新发起任务" },
      { id: "t3", projectId: "p1", name: "全图PPT-2026-08-20 11:10:45", time: "11:10", duration: "6分48秒", status: "已完成", tag: "全图", ability: "PPT 生成", prompt: "生成面向管理层的项目汇报 PPT", sources: 3, result: "项目申报材料汇报.pptx" },
      { id: "t4", projectId: "p1", name: "行业研究报告-生成中", time: "刚刚", duration: "42%", status: "生成中", ability: "报告文档", prompt: "汇总海外 AI 趋势并形成行业研究报告", sources: 2 },
      { id: "t5", projectId: "p1", name: "可编辑PPT-2026-08-19 11:04", time: "昨天", duration: "4分23秒", status: "已完成", tag: "可编辑", ability: "PPT 生成", prompt: "输出可编辑的阶段复盘汇报", sources: 2, result: "项目阶段复盘.pptx" },
    ]);
  const fileRef = useRef();
  const projectFileRef = useRef();
  const folder =
      project.folders.find((f) => f.id === folderId) || project.folders[0],
    refs = project.folders
      .flatMap((f) => f.items)
      .filter((x) => x.type === "reference");
  const send = () => {
    const t = input.trim() || `基于项目资料生成${selectedAbility.name}`;
    const taskId = `t${Date.now()}`;
    const selectedNames = project.folders
      .flatMap((item) => item.items)
      .filter((item) => selectedSources.includes(item.id))
      .map((item) => item.article?.title || item.name);
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setTaskHistory((all) => [
      {
        id: taskId,
        projectId: project.id,
        name: `${selectedAbility.name}-生成中`,
        time: "刚刚",
        duration: "12%",
        status: "生成中",
        ability: selectedAbility.name,
        prompt: t,
        sources: selectedSources.length,
      },
      ...all,
    ]);
    setInput("");
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const result = {
        id: `o${Date.now()}`,
        type: selectedAbility.id === "ppt" ? "ppt" : "doc",
        name: `${selectedAbility.name} · ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`,
      };
      if (workspaceMode === "project") {
        setProjectOutputs((all) => ({
          ...all,
          [project.id]: [result, ...(all[project.id] || [])],
        }));
      } else {
        setStandaloneOutputs((all) => [result, ...all]);
      }
      setExpandedAsset(result.id);
      setTaskHistory((all) =>
        all.map((task) =>
          task.id === taskId
            ? {
                ...task,
                name: `${selectedAbility.name}-${new Date().toLocaleString("zh-CN", { hour12: false })}`,
                duration: "1分6秒",
                status: "已完成",
                result: result.name,
              }
            : task,
        ),
      );
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text:
            workspaceMode === "project"
              ? `已结合勾选的 ${selectedSources.length} 项来源${selectedNames.length ? `（${selectedNames.slice(0, 2).join("、")}${selectedNames.length > 2 ? "等" : ""}）` : ""}完成${selectedAbility.name}，结果已进入任务历史。`
              : `已完成${selectedAbility.name}，结果已保存至本次独立对话的产物区。`,
          artifact: true,
          artifactName: result.name,
        },
      ]);
    }, 1100);
  };
  const addFolder = (name) => {
    setProjects((all) =>
      all.map((p) =>
        p.id !== project.id
          ? p
          : {
              ...p,
              folders: [
                ...p.folders,
                { id: `f${Date.now()}`, name, items: [] },
              ],
            },
      ),
    );
    setFolderOpen(false);
    notify("子文件夹已创建");
  };
  const outputs =
    workspaceMode === "project"
      ? projectOutputs[project.id] || []
      : standaloneOutputs;
  const sourceItems = project.folders.flatMap((f) => f.items);
  const projectTasks = taskHistory.filter((task) => task.projectId === project.id);
  const activeFolderItems = folder.items;
  const toggleSource = (id) =>
    setSelectedSources((all) =>
      all.includes(id) ? all.filter((x) => x !== id) : [...all, id],
    );
  const toggleFolderSources = () => {
    const ids = activeFolderItems.map((x) => x.id);
    const allSelected =
      ids.length > 0 && ids.every((id) => selectedSources.includes(id));
    setSelectedSources((all) =>
      allSelected
        ? all.filter((id) => !ids.includes(id))
        : [...new Set([...all, ...ids])],
    );
  };
  const toggleProjectSources = (items) => {
    const ids = items.map((item) => item.id);
    const allSelected =
      ids.length > 0 && ids.every((id) => selectedSources.includes(id));
    setSelectedSources((all) =>
      allSelected
        ? all.filter((id) => !ids.includes(id))
        : [...new Set([...all, ...ids])],
    );
  };
  const uploadProjectFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const stamp = Date.now();
    const uploaded = files.map((file, index) => ({
      id: `u${stamp}-${index}`,
      type: "upload",
      name: file.name,
      size:
        file.size >= 1024 * 1024
          ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      mime: file.type || "本地文件",
      origin: "local",
    }));
    setProjects((all) =>
      all.map((item) => {
        if (item.id !== project.id) return item;
        const targetId =
          item.folders.find((folderItem) => folderItem.id === "documents")?.id ||
          item.folders[0]?.id;
        return {
          ...item,
          folders: item.folders.map((folderItem) =>
            folderItem.id === targetId
              ? { ...folderItem, items: [...folderItem.items, ...uploaded] }
              : folderItem,
          ),
        };
      }),
    );
    setSelectedSources((all) => [
      ...new Set([...all, ...uploaded.map((item) => item.id)]),
    ]);
    setMsgs((all) => [
      ...all,
      {
        role: "ai",
        text: `已上传并选中 ${uploaded.length} 个本地文件：${uploaded.map((item) => item.name).join("、")}。接下来的对话或内容生成会读取这些文件作为上下文。`,
      },
    ]);
    notify(`已上传 ${uploaded.length} 个文件并加入当前项目`);
  };
  const startConversation = () => {
    const id = `c${Date.now()}`;
    setConversations((all) => [
      { id, projectId: project.id, title: "新对话", time: "刚刚" },
      ...all,
    ]);
    setActiveConversationId(id);
    setAssetTab("results");
    setSelectedAssets([]);
    setMsgs([
      {
        role: "ai",
        text: `已在“${project.name}”中新建对话。我会使用该项目的资料与上下文协助你继续创作。`,
      },
    ]);
    setSelectedSources(sourceItems.map((item) => item.id));
  };
  const openConversation = (c) => {
    setActiveId(c.projectId);
    setActiveConversationId(c.id);
    setAssetTab("results");
    setSelectedAssets([]);
    setMsgs([
      {
        role: "ai",
        text: `已打开项目对话“${c.title}”，你可以基于该项目的资料继续讨论与创作。`,
      },
    ]);
  };
  const openProject = (id) => {
    setActiveId(id);
    const firstConversation = conversations.find((c) => c.projectId === id);
    setActiveConversationId(firstConversation?.id || null);
    setAssetTab("results");
    const nextProject = projects.find((p) => p.id === id);
    setSelectedSources(
      nextProject?.folders.flatMap((f) => f.items.map((item) => item.id)) || [],
    );
    setMsgs([
      {
        role: "ai",
        text: firstConversation
          ? `已打开项目对话“${firstConversation.title}”，你可以继续上次的工作。`
          : "当前项目还没有对话，点击左上角“新对话”开始创作。",
      },
    ]);
  };
  const toggleAsset = (id) =>
    setSelectedAssets((all) =>
      all.includes(id) ? all.filter((x) => x !== id) : [...all, id],
    );
  const toggleAllAssets = () =>
    setSelectedAssets((all) =>
      outputs.length && outputs.every((x) => all.includes(x.id))
        ? all.filter((id) => !outputs.some((x) => x.id === id))
        : [...new Set([...all, ...outputs.map((x) => x.id)])],
    );
  const importAsset = (asset) => {
    setMsgs((all) => [
      ...all,
      { role: "user", text: `请将“${asset.name}”作为本轮对话上下文。` },
      { role: "ai", text: `已导入“${asset.name}”，接下来我会基于该资产继续讨论与创作。` },
    ]);
    setPreviewAsset(null);
    setPreviewFullscreen(false);
    notify("资产已导入当前对话");
  };
  const create = (name) => {
    const p = {
      id: `p${Date.now()}`,
      name,
      color: "#5a5cf6",
      folders: emptyFolders(),
    };
    setProjects([...projects, p]);
    setActiveId(p.id);
    setNewOpen(false);
    notify("项目已创建");
  };
  return (
    <main className={`project-studio ${right ? "" : "assets-collapsed"}`}>
      <aside className="project-sidebar">
        <div className="project-side-tools">
          <button className="new-conversation" onClick={startConversation}>
            <PenLine size={18} />
            新对话
          </button>
          <button className="new-work" onClick={() => setNewOpen(true)}>
            <Plus size={18} />
            新建项目
          </button>
          <button>
            <Search size={18} />
          </button>
        </div>
        <div className="projects-section">
          <div>
            <span>项目</span>
            <button onClick={() => setNewOpen(true)}>
              <Plus size={15} />
            </button>
          </div>
          {projects.map((p) => (
            <div
              className={`project-tree ${workspaceMode === "project" && activeId === p.id ? "active" : ""}`}
              key={p.id}
            >
              <button
                className="project-row"
                onClick={() => openProject(p.id)}
              >
                <FolderOpen size={18} style={{ color: p.color }} />
                <strong>{p.name}</strong>
                <MoreHorizontal size={15} />
              </button>
              {activeId === p.id && (
                <div className="project-content-tree">
                  <div className="project-conversations">
                    <div className="project-subsection-label">
                      <MessageCircle size={12} />
                      <span>对话记录</span>
                    </div>
                    {conversations.filter((c) => c.projectId === p.id).length ? (
                      conversations
                        .filter((c) => c.projectId === p.id)
                        .map((c) => (
                          <button
                            key={c.id}
                            className={activeConversationId === c.id ? "active" : ""}
                            onClick={() => openConversation(c)}
                          >
                            <MessageCircle size={14} />
                            <span>{c.title}</span>
                            <small>{c.time}</small>
                          </button>
                        ))
                    ) : (
                      <span className="empty-project-conversations">暂无对话</span>
                    )}
                  </div>
                  <div className="project-file-panel">
                    <div className="project-file-heading">
                      <div className="project-subsection-label">
                        <FolderKanban size={12} />
                        <span>项目文件</span>
                        <em>
                          {
                            p.folders
                              .flatMap((folderItem) => folderItem.items)
                              .filter((item) => selectedSources.includes(item.id))
                              .length
                          }
                          /{p.folders.flatMap((folderItem) => folderItem.items).length}
                        </em>
                      </div>
                      <input
                        ref={projectFileRef}
                        hidden
                        multiple
                        type="file"
                        onChange={(event) => {
                          uploadProjectFiles(event.target.files);
                          event.target.value = "";
                        }}
                      />
                      <button
                        title="上传本地文件"
                        onClick={() => projectFileRef.current?.click()}
                      >
                        <UploadCloud size={13} />
                        上传
                      </button>
                    </div>
                    {p.folders.flatMap((folderItem) => folderItem.items).length > 0 ? (
                      <>
                        <button
                          className="project-file-select-all"
                          onClick={() =>
                            toggleProjectSources(
                              p.folders.flatMap((folderItem) => folderItem.items),
                            )
                          }
                        >
                          <i
                            className={
                              p.folders
                                .flatMap((folderItem) => folderItem.items)
                                .every((item) => selectedSources.includes(item.id))
                                ? "checked"
                                : ""
                            }
                          >
                            {p.folders
                              .flatMap((folderItem) => folderItem.items)
                              .every((item) => selectedSources.includes(item.id)) && (
                              <Check size={9} />
                            )}
                          </i>
                          <span>全选文件</span>
                        </button>
                        <div className="project-file-list">
                          {p.folders
                            .flatMap((folderItem) => folderItem.items)
                            .map((item) => (
                              <button
                                key={item.id}
                                className={
                                  selectedSources.includes(item.id) ? "selected" : ""
                                }
                                onClick={() => toggleSource(item.id)}
                              >
                                <i
                                  className={
                                    selectedSources.includes(item.id) ? "checked" : ""
                                  }
                                >
                                  {selectedSources.includes(item.id) && (
                                    <Check size={9} />
                                  )}
                                </i>
                                {item.type === "reference" ? (
                                  <Newspaper size={13} />
                                ) : item.name?.toLowerCase().endsWith(".pptx") ? (
                                  <Presentation size={13} />
                                ) : (
                                  <FileText size={13} />
                                )}
                                <span>{item.article?.title || item.name}</span>
                                <small>{item.size || (item.type === "reference" ? "Feed" : "项目")}</small>
                              </button>
                            ))}
                        </div>
                      </>
                    ) : (
                      <button
                        className="empty-project-files"
                        onClick={() => projectFileRef.current?.click()}
                      >
                        <UploadCloud size={14} /> 上传第一个文件
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="storage-meter">
          <div>
            <Database size={16} />
            <span>团队空间</span>
            <em>68%</em>
          </div>
          <i>
            <b />
          </i>
          <small>6.8 GB / 10 GB</small>
        </div>
      </aside>
      <section className="project-center">
        <div className="project-toolbar">
          <div>
            <span>
              {workspaceMode === "project"
                ? project.name
                : conversations.find((c) => c.id === activeConversationId)
                    ?.title || "新对话"}
            </span>
            <ChevronRight size={14} />
            <strong>AI 对话</strong>
          </div>
          <div>
            {workspaceMode === "project" ? (
              <span className="source-count">
                <CheckCircle2 size={15} />
                {selectedSources.length} 项来源已启用
              </span>
            ) : (
              <span className="source-count standalone">
                <MessageCircle size={15} /> 独立对话
              </span>
            )}
          </div>
        </div>
        <div className="studio-chat-scroll">
          <div className="studio-chat-intro">
            <span>
              <Sparkles size={19} />
            </span>
            <div>
              <h1>
                {workspaceMode === "project" ? project.name : "独立 AI 对话"}
              </h1>
              <p>
                {workspaceMode === "project"
                  ? `本次对话已选用 ${selectedSources.length}/${sourceItems.length} 项项目资料作为来源`
                  : "对话单独保存在历史记录中，不归入任何项目"}
              </p>
            </div>
          </div>
          <div className="project-chat-thread">
            {msgs.map((m, i) => (
              <div className={`project-message ${m.role}`} key={i}>
                <div>
                  {m.role === "ai" ? (
                    <Sparkles size={16} />
                  ) : (
                    <Avatar size={29} />
                  )}
                </div>
                <section>
                  <p>{m.text}</p>
                  {m.detail && (
                    <div className="analysis-answer">
                      <h3>项目材料关键结论</h3>
                      <p>
                        <strong>核心目标：</strong>
                        建设覆盖内容汇聚、智能创作与知识沉淀的一体化工作平台。
                      </p>
                      <h4>建议优先说明</h4>
                      <ul>
                        <li>项目如何形成统一的业务上下文与权限治理。</li>
                        <li>Feed 信息如何沉淀为可复用的项目资料。</li>
                        <li>生成成果如何应用企业模板并支持持续迭代。</li>
                      </ul>
                      <blockquote>
                        如需，我可以直接生成申报书、汇报 PPT 或项目风险清单。
                      </blockquote>
                    </div>
                  )}
                  {m.artifact && (
                    <div className="generated-inline">
                      <Presentation size={22} />
                      <div>
                        <strong>{m.artifactName}</strong>
                        <span>已保存至右侧任务历史 · 刚刚</span>
                      </div>
                      <button>
                        <Eye size={16} />
                        预览
                      </button>
                    </div>
                  )}
                </section>
              </div>
            ))}
            {generating && (
              <div className="project-message ai">
                <div>
                  <LoaderCircle className="spin" size={16} />
                </div>
                <section>
                  <p>正在读取项目上下文并生成内容…</p>
                </section>
              </div>
            )}
          </div>
        </div>
        <div className="project-composer ai-centered-composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="发消息或按住空格说话…"
          />
          <div>
            <section>
              <input
                ref={fileRef}
                hidden
                multiple
                type="file"
                onChange={(event) => {
                  uploadProjectFiles(event.target.files);
                  event.target.value = "";
                }}
              />
              <button onClick={() => fileRef.current?.click()}>
                <Plus size={21} />
              </button>
              <i />
              {abilities.map((a) => {
                const I = a.icon;
                return (
                  <button
                    key={a.id}
                    className={selectedAbility.id === a.id ? "active" : ""}
                    onClick={() => {
                      setSelectedAbility(a);
                      if (["ppt", "document"].includes(a.id))
                        setTemplateOpen(true);
                    }}
                  >
                    <I size={16} />
                    {a.name}
                  </button>
                );
              })}
              <button onClick={() => setTemplateOpen(true)}>
                <LayoutTemplate size={16} />
                更多
              </button>
            </section>
            <button className="voice-send" onClick={send}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>
      {right && (
        <aside className="project-assets task-only-sidebar">
          <div className="assets-head">
            <div>
              <strong>任务历史</strong>
              <span>{projectTasks.length} 条任务记录</span>
            </div>
            <div className="asset-head-actions">
              <button title="收起任务历史" onClick={() => setRight(false)}>
                <PanelRight size={17} />
              </button>
            </div>
          </div>
          <TaskHistory
            tasks={projectTasks}
            notify={notify}
            onDelete={(id) => {
              setTaskHistory((all) => all.filter((x) => x.id !== id));
              notify("任务记录已删除");
            }}
            onPreview={(task) => {
              setPreviewAsset({
                id: task.id,
                type: task.name.includes("PPT") ? "ppt" : "doc",
                name: task.result || task.name,
              });
              setPreviewFullscreen(false);
            }}
            onPublish={(task) => {
              setTaskHistory((all) =>
                all.map((item) =>
                  item.id === task.id
                    ? { ...item, publishedName: "GPT系列调研报告" }
                    : item,
                ),
              );
              notify("“GPT系列调研报告”已发布至 Feed");
            }}
          />
        </aside>
      )}
      {!right && (
        <button className="collapsed-assets" onClick={() => setRight(true)}>
          <PanelRight size={18} />
          <span>任务历史</span>
          <em>{projectTasks.length}</em>
        </button>
      )}
      {newOpen && (
        <NewProject close={() => setNewOpen(false)} create={create} />
      )}{" "}
      {folderOpen && (
        <NewFolder close={() => setFolderOpen(false)} create={addFolder} />
      )}
      {templateOpen && (
        <TemplateModal close={() => setTemplateOpen(false)} notify={notify} />
      )}
      {previewAsset && (
        <AssetPreview
          asset={previewAsset}
          projectName={
            workspaceMode === "project" ? project.name : "独立对话产物"
          }
          fullscreen={previewFullscreen}
          setFullscreen={setPreviewFullscreen}
          close={() => {
            setPreviewAsset(null);
            setPreviewFullscreen(false);
          }}
          importAsset={importAsset}
          notify={notify}
        />
      )}
    </main>
  );
}
function TaskHistory({ tasks, notify, onDelete, onPreview, onPublish }) {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <div className="task-history-panel">
      {tasks.length === 0 && (
        <div className="empty-task-history">
          <History size={23} />
          <strong>暂无任务记录</strong>
          <span>在当前项目对话中发起生成任务后，会显示在这里</span>
        </div>
      )}
      {tasks.map((task) => (
        <div
          className={`task-history-row ${expandedId === task.id ? "expanded" : ""}`}
          key={task.id}
        >
          <button
            className="task-history-summary"
            aria-expanded={expandedId === task.id}
            onClick={() =>
              setExpandedId(expandedId === task.id ? null : task.id)
            }
          >
            <History size={16} />
            <div>
              <strong>{task.name}</strong>
              <span>
                2026年8月20日 {task.time} · {task.duration}
              </span>
            </div>
            <section>
              {task.tag && <em>{task.tag}</em>}
              <b className={`status-${task.status}`}>{task.status}</b>
              <ChevronDown size={15} />
            </section>
          </button>
          {task.status === "生成中" && (
            <i className="task-progress">
              <b style={{ width: task.duration }} />
            </i>
          )}
          {expandedId === task.id && (
            <div className="task-history-detail">
              <dl>
                <div>
                  <dt>生成能力</dt>
                  <dd>{task.ability || "智能生成"}</dd>
                </div>
                <div>
                  <dt>项目来源</dt>
                  <dd>{task.sources || 0} 项资料</dd>
                </div>
              </dl>
              <div className="task-prompt">
                <span>任务指令</span>
                <p>{task.prompt || "基于当前项目上下文生成内容"}</p>
              </div>
              {task.result && (
                <div className="task-result">
                  <FileText size={16} />
                  <div>
                    <span>生成结果</span>
                    <strong>{task.result}</strong>
                  </div>
                </div>
              )}
              {task.publishedName && (
                <div className="task-published-state">
                  <CheckCircle2 size={14} />
                  已发布：{task.publishedName}
                </div>
              )}
              {task.error && <p className="task-error">{task.error}</p>}
              <div className="task-detail-actions">
                {task.result && (
                  <button onClick={() => onPreview(task)}>
                    <Eye size={14} /> 预览结果
                  </button>
                )}
                {task.status === "已完成" && (
                  <button
                    className="publish-to-studio"
                    disabled={Boolean(task.publishedName)}
                    onClick={() => onPublish(task)}
                  >
                    <UploadCloud size={14} />
                    {task.publishedName ? "已发布" : "发布至Feed"}
                  </button>
                )}
                <button onClick={() => notify(`已重新发起“${task.name}”`)}>
                  <RefreshCw size={14} /> 再次运行
                </button>
                <button className="danger" onClick={() => onDelete(task.id)}>
                  <Trash2 size={14} /> 删除
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
function AssetPreview({
  asset,
  projectName,
  fullscreen,
  setFullscreen,
  close,
  importAsset,
  notify,
}) {
  return (
    <div className={`asset-preview-modal ${fullscreen ? "fullscreen" : ""}`}>
      <div className="asset-preview-window">
        <header>
          <div>
            {asset.type === "ppt" ? (
              <Presentation size={20} />
            ) : (
              <FileText size={20} />
            )}
            <span>
              <strong>{asset.name}</strong>
              <small>项目资产预览</small>
            </span>
          </div>
          <section>
            <button onClick={() => setFullscreen(!fullscreen)}>
              <Maximize2 size={16} />
              {fullscreen ? "退出全屏" : "全屏查看"}
            </button>
            <button onClick={() => importAsset(asset)}>
              <MessageCircle size={16} />
              导入对话
            </button>
            <button onClick={() => notify(`正在下载“${asset.name}”`)}>
              <FolderDown size={16} />
              下载
            </button>
            <button className="preview-close" onClick={close}>
              <X size={18} />
            </button>
          </section>
        </header>
        <main>
          <div className="asset-preview-page">
            <span>AGENTICFEED · PROJECT ASSET</span>
            <h1>{projectName}</h1>
            <h2>{asset.name}</h2>
            <i />
            <p>
              已结合选中的项目文件、Feed 引用与当前对话上下文生成，可继续导入对话进行改写、补充和版本迭代。
            </p>
            <div>
              <b>01</b>
              <section>
                <strong>核心结论</strong>
                <span>形成统一内容上下文与可复用的项目资产</span>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
function ProjectDoc({ project, refs }) {
  return (
    <div className="document-body">
      <div className="doc-cover-block">
        <span>项目申报材料</span>
        <h2>{project.name}</h2>
        <p>数字创新中心 · 2026 年 8 月</p>
      </div>
      <h2>一、项目背景与建设目标</h2>
      <p>
        面向企业数字化转型与人才能力升级需求，本项目拟建设覆盖内容汇聚、智能创作、知识沉淀与业务协同的一体化工作平台。
      </p>
      <blockquote>
        <Sparkles size={17} />
        <span>
          AI
          建议：突出“业务场景牵引、组织权限治理、成果持续沉淀”三项差异化能力。
        </span>
      </blockquote>
      <h2>二、核心建设内容</h2>
      <ol>
        <li>
          <strong>统一项目工作空间：</strong>
          项目文件、引用资料与生成资产围绕同一业务目标持续沉淀。
        </li>
        <li>
          <strong>企业级智能创作：</strong>
          支持文档、PPT、图像、视频及企业专属工作流。
        </li>
        <li>
          <strong>信息与创作联动：</strong>Feed
          内容可定向保存至项目文件夹并作为生成上下文。
        </li>
      </ol>
      {refs.length > 0 && (
        <div className="doc-references">
          <strong>项目引用资料（{refs.length}）</strong>
          {refs.map((r) => (
            <span key={r.id}>
              <Newspaper size={15} />
              {r.article.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
function ReferenceView({ item }) {
  const a = item.article;
  return (
    <div className="document-body article-reference-view">
      <div className="reference-banner">
        <Bookmark size={18} />
        <span>来自 Feed 的项目引用</span>
        <em>{a.category}</em>
      </div>
      <p className="reference-source">
        {a.org} · {a.time}
      </p>
      {a.image && <img src={a.image} />}
      <p>{a.summary}</p>
      <h2>AI 摘要</h2>
      <ul>
        <li>文章聚焦企业智能化从单点工具向业务协同的转变。</li>
        <li>落地关键是上下文、权限与流程治理同步建设。</li>
        <li>建议从可量化、高频且资料基础好的场景开始验证。</li>
      </ul>
    </div>
  );
}
function NewProject({ close, create }) {
  const [name, setName] = useState("");
  return (
    <Modal
      title="新建 Studio 项目"
      subtitle="项目统一管理资料、模板与独立生成资产"
      close={close}
    >
      <label className="field-label">项目名称</label>
      <input
        className="field-input"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="例如：2026 年度品牌升级"
      />
      <div className="default-folders">
        {["研究资料", "项目文档"].map((x) => (
          <span key={x}>
            <Folder size={16} />
            {x}
          </span>
        ))}
      </div>
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>
          取消
        </button>
        <button
          className="primary-button"
          disabled={!name.trim()}
          onClick={() => create(name)}
        >
          创建项目
        </button>
      </div>
    </Modal>
  );
}
function NewFolder({ close, create }) {
  const [name, setName] = useState("");
  return (
    <Modal
      title="新建子文件夹"
      subtitle="在当前项目中分类管理资料与文件"
      close={close}
    >
      <label className="field-label">文件夹名称</label>
      <input
        className="field-input"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="例如：客户访谈、合同资料"
      />
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>
          取消
        </button>
        <button
          className="primary-button"
          disabled={!name.trim()}
          onClick={() => create(name)}
        >
          创建文件夹
        </button>
      </div>
    </Modal>
  );
}
function TemplateModal({ close, notify }) {
  const [selected, setSelected] = useState(templates[0].id);
  return (
    <Modal
      title="选择企业模板"
      subtitle="模板将应用于当前项目生成任务"
      close={close}
      wide
    >
      <div className="template-grid">
        {templates.map((t) => (
          <button
            className={`template-card ${selected === t.id ? "active" : ""}`}
            key={t.id}
            onClick={() => setSelected(t.id)}
          >
            <div
              className="template-preview"
              style={{ "--template-color": t.color }}
            >
              <span>AgenticFeed</span>
              <i />
              <b>{t.type}</b>
            </div>
            <div>
              <strong>{t.name}</strong>
              <span>{t.desc}</span>
            </div>
            {selected === t.id && (
              <em>
                <Check size={14} />
              </em>
            )}
          </button>
        ))}
      </div>
      <div className="modal-footer">
        <button className="soft-button" onClick={close}>
          取消
        </button>
        <button
          className="primary-button"
          onClick={() => {
            notify("企业模板已应用");
            close();
          }}
        >
          应用模板
        </button>
      </div>
    </Modal>
  );
}
const preferenceSources = [
  { id: "openai", name: "OpenAI Newsroom", domain: "openai.com", category: "模型厂商", language: "英文", mark: "O", color: "#111827", description: "GPT、API 与开发者生态官方动态", selected: true },
  { id: "anthropic", name: "Anthropic Updates", domain: "anthropic.com", category: "模型厂商", language: "英文", mark: "A", color: "#c56b3f", description: "Claude 产品、安全与企业能力更新", selected: true },
  { id: "deepmind", name: "Google DeepMind", domain: "deepmind.google", category: "研究机构", language: "英文", mark: "G", color: "#4285f4", description: "Gemini、多模态与前沿研究成果", selected: true },
  { id: "meta", name: "Meta AI Research", domain: "ai.meta.com", category: "研究机构", language: "英文", mark: "M", color: "#1677ff", description: "Llama、开源模型与基础研究", selected: false },
  { id: "microsoft", name: "Microsoft AI Blog", domain: "blogs.microsoft.com", category: "模型厂商", language: "英文", mark: "M", color: "#5e5ce6", description: "Copilot、Agent 与企业解决方案", selected: true },
  { id: "nvidia", name: "NVIDIA AI", domain: "nvidia.com", category: "基础设施", language: "英文", mark: "N", color: "#76b900", description: "AI 芯片、推理平台与开发工具", selected: false },
  { id: "huggingface", name: "Hugging Face", domain: "huggingface.co", category: "开发社区", language: "英文", mark: "HF", color: "#f5b942", description: "开源模型、数据集与开发者社区", selected: true },
  { id: "arxiv", name: "arXiv AI", domain: "arxiv.org", category: "学术论文", language: "英文", mark: "ar", color: "#b31b1b", description: "人工智能与机器学习最新论文", selected: false },
  { id: "mit", name: "MIT Technology Review AI", domain: "technologyreview.com", category: "行业媒体", language: "英文", mark: "MIT", color: "#ef4444", description: "AI 技术趋势、产业影响与治理观察", selected: false },
  { id: "techcrunch", name: "TechCrunch AI", domain: "techcrunch.com", category: "行业媒体", language: "英文", mark: "TC", color: "#0a9e50", description: "AI 创业、融资与产品发布资讯", selected: false },
];

function Profile({ projects, setPage, initialTab, notify }) {
  const [tab, setTab] = useState(initialTab),
    [sources, setSources] = useState(preferenceSources),
    [sourceQuery, setSourceQuery] = useState(""),
    [sourceCategory, setSourceCategory] = useState("全部"),
    [customOpen, setCustomOpen] = useState(false),
    [customName, setCustomName] = useState(""),
    [customUrl, setCustomUrl] = useState(""),
    [interests, setInterests] = useState(["大模型", "企业 Agent", "多模态"]),
    [smartSort, setSmartSort] = useState(true),
    [departmentSignal, setDepartmentSignal] = useState(true),
    [emailBrief, setEmailBrief] = useState(false),
    [breakingNotice, setBreakingNotice] = useState(true),
    [language, setLanguage] = useState("中英双语");
  const categories = ["全部", ...new Set(sources.map((x) => x.category))];
  const visibleSources = sources.filter(
    (x) =>
      (sourceCategory === "全部" || x.category === sourceCategory) &&
      `${x.name}${x.domain}${x.description}`
        .toLowerCase()
        .includes(sourceQuery.toLowerCase()),
  );
  const selectedCount = sources.filter((x) => x.selected).length;
  const toggleSource = (id) =>
    setSources((all) =>
      all.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)),
    );
  const addCustomSource = () => {
    const name = customName.trim();
    const url = customUrl.trim();
    if (!name || !url) return;
    setSources((all) => [
      {
        id: `custom-${Date.now()}`,
        name,
        domain: url.replace(/^https?:\/\//, "").split("/")[0],
        category: "自定义",
        language: "自动识别",
        mark: name.slice(0, 2).toUpperCase(),
        color: "#5a5cf6",
        description: "用户自定义添加的信息源",
        selected: true,
      },
      ...all,
    ]);
    setCustomName("");
    setCustomUrl("");
    setCustomOpen(false);
    notify("自定义信息源已添加");
  };
  const navItems = [
    { id: "overview", name: "个人主页", icon: CircleUserRound },
    { id: "projects", name: "我的项目", icon: FolderOpen, count: projects.length },
    { id: "preferences", name: "偏好设置", icon: SlidersHorizontal },
    { id: "security", name: "账号与权限", icon: ShieldCheck },
  ];
  return (
    <main className="profile-page profile-hub">
      <section className="profile-hero-card compact-profile-hero">
        <div className="profile-identity">
          <Avatar size={68} />
          <div>
            <span>企业账号</span>
            <h1>林小满</h1>
            <p>数字创新中心 · 产品经理 · 工号 AF-8160</p>
          </div>
        </div>
        <button className="primary-button" onClick={() => setPage("studio")}>
          <Sparkles size={17} /> 进入 Studio
        </button>
      </section>
      <div className="profile-layout">
        <aside className="profile-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={tab === item.id ? "active" : ""}
                onClick={() => setTab(item.id)}
              >
                <Icon size={17} /> {item.name}
                {item.count && <span>{item.count}</span>}
              </button>
            );
          })}
          <i />
          <button onClick={() => setPage("feed")}>
            <Newspaper size={17} /> 返回信息 Feed
          </button>
        </aside>
        <section className="profile-content">
          {tab === "preferences" ? (
            <PreferenceSettings
              sources={sources}
              visibleSources={visibleSources}
              selectedCount={selectedCount}
              sourceQuery={sourceQuery}
              setSourceQuery={setSourceQuery}
              sourceCategory={sourceCategory}
              setSourceCategory={setSourceCategory}
              categories={categories}
              toggleSource={toggleSource}
              customOpen={customOpen}
              setCustomOpen={setCustomOpen}
              customName={customName}
              setCustomName={setCustomName}
              customUrl={customUrl}
              setCustomUrl={setCustomUrl}
              addCustomSource={addCustomSource}
              interests={interests}
              setInterests={setInterests}
              smartSort={smartSort}
              setSmartSort={setSmartSort}
              departmentSignal={departmentSignal}
              setDepartmentSignal={setDepartmentSignal}
              emailBrief={emailBrief}
              setEmailBrief={setEmailBrief}
              breakingNotice={breakingNotice}
              setBreakingNotice={setBreakingNotice}
              language={language}
              setLanguage={setLanguage}
              notify={notify}
            />
          ) : tab === "projects" ? (
            <ProfileProjects projects={projects} setPage={setPage} />
          ) : tab === "security" ? (
            <SecuritySettings />
          ) : (
            <ProfileOverview projects={projects} setTab={setTab} />
          )}
        </section>
      </div>
    </main>
  );
}

function ProfileOverview({ projects, setTab }) {
  return (
    <>
      <div className="profile-section-title">
        <div><h2>个人主页</h2><p>查看账号使用概况与最近活动</p></div>
        <span>数据更新于今天 09:30</span>
      </div>
      <div className="stats-grid">
        {[["已关注来源", "5", Rss], ["本周阅读", "48", Newspaper], ["Studio 项目", `${projects.length}`, FolderOpen], ["生成资产", "12", Sparkles]].map(([label, value, Icon]) => (
          <div className="stat-card" key={label}><span><Icon size={18} /></span><div><strong>{value}</strong><p>{label}</p></div></div>
        ))}
      </div>
      <div className="profile-panels">
        <div className="activity-panel">
          <h3>最近活动</h3>
          {[
            ["保存至 Studio", "GPT 系列模型更新开发者工具链", "12分钟前"],
            ["生成项目资产", "海外 AI 趋势分析报告.docx", "2小时前"],
            ["关注信息源", "Hugging Face", "昨天"],
          ].map(([title, desc, time]) => <div className="activity" key={desc}><span><Clock3 size={15} /></span><div><strong>{title}</strong><p>{desc}</p></div><em>{time}</em></div>)}
        </div>
        <div className="org-info">
          <h3>组织信息</h3>
          <dl><dt>所属部门</dt><dd>数字创新中心</dd><dt>岗位</dt><dd>产品经理</dd><dt>数据范围</dt><dd>本部门及公开内容</dd><dt>账号状态</dt><dd>正常</dd></dl>
          <button className="preference-entry" onClick={() => setTab("preferences")}><SlidersHorizontal size={15} /> 调整内容偏好 <ChevronRight size={14} /></button>
        </div>
      </div>
    </>
  );
}

function ProfileProjects({ projects, setPage }) {
  return <><div className="profile-section-title"><div><h2>我的项目</h2><p>管理你拥有或参与的 Studio 项目</p></div><button className="primary-button" onClick={() => setPage("studio")}><Plus size={15} /> 新建项目</button></div><div className="creation-grid">{projects.map((p) => <div key={p.id}><span className="file-icon"><FolderOpen size={21} /></span><strong>{p.name}</strong><span>{p.folders.reduce((n, f) => n + f.items.length, 0)} 项资料</span><button><ChevronRight size={16} /></button></div>)}</div></>;
}

function PreferenceSettings(props) {
  const allInterests = ["大模型", "企业 Agent", "多模态", "AI 编程", "开源模型", "具身智能", "数据治理", "AI 安全"];
  return (
    <div className="preference-page">
      <div className="profile-section-title preference-title">
        <div><h2>偏好设置</h2><p>管理 Feed 的信息来源、推荐依据和触达方式</p></div>
        <button className="primary-button" onClick={() => props.notify("偏好设置已保存，将用于后续 Feed 推荐")}><Check size={15} /> 保存设置</button>
      </div>
      <section className="preference-block source-preferences">
        <div className="preference-block-head">
          <div><span><Rss size={17} /></span><div><h3>信息源选择</h3><p>已选择 {props.selectedCount} 个来源；上线后由信息源接口提供可订阅列表与状态</p></div></div>
          <button onClick={() => props.setCustomOpen(!props.customOpen)}><Plus size={15} /> 添加自定义来源</button>
        </div>
        {props.customOpen && <div className="custom-source-form"><input value={props.customName} onChange={(e) => props.setCustomName(e.target.value)} placeholder="信息源名称" /><input value={props.customUrl} onChange={(e) => props.setCustomUrl(e.target.value)} placeholder="RSS、官网或 API 地址" /><button onClick={props.addCustomSource} disabled={!props.customName.trim() || !props.customUrl.trim()}>添加</button><button onClick={() => props.setCustomOpen(false)}><X size={15} /></button></div>}
        <div className="source-preference-tools">
          <div><Search size={16} /><input value={props.sourceQuery} onChange={(e) => props.setSourceQuery(e.target.value)} placeholder="搜索名称、域名或简介" /></div>
          <section>{props.categories.map((x) => <button key={x} className={props.sourceCategory === x ? "active" : ""} onClick={() => props.setSourceCategory(x)}>{x}</button>)}</section>
        </div>
        <div className="preference-source-list">
          {props.visibleSources.map((source) => <div className="preference-source-row" key={source.id}><span className="preference-source-logo" style={{ background: source.color }}>{source.mark}</span><div><strong>{source.name}</strong><p>{source.description}</p><small>{source.domain} · {source.language} · {source.category}</small></div><button className={source.selected ? "selected" : ""} onClick={() => props.toggleSource(source.id)}>{source.selected ? <><Check size={14} /> 已添加</> : <><Plus size={14} /> 添加</>}</button></div>)}
          {!props.visibleSources.length && <div className="preference-empty"><Search size={22} /><strong>没有匹配的信息源</strong><span>换个关键词，或添加自定义来源</span></div>}
        </div>
      </section>
      <div className="preference-two-column">
        <section className="preference-block"><div className="preference-block-head"><div><span><SlidersHorizontal size={17} /></span><div><h3>内容与推荐</h3><p>用于智能排序及同部门趋势融合</p></div></div></div><label>关注主题</label><div className="interest-tags">{allInterests.map((x) => <button key={x} className={props.interests.includes(x) ? "active" : ""} onClick={() => props.setInterests((all) => all.includes(x) ? all.filter((i) => i !== x) : [...all, x])}>{props.interests.includes(x) && <Check size={12} />}{x}</button>)}</div><label>内容语言</label><div className="segmented-setting">{["中文优先", "中英双语", "英文原文"].map((x) => <button key={x} className={props.language === x ? "active" : ""} onClick={() => props.setLanguage(x)}>{x}</button>)}</div><PreferenceToggle title="默认启用智能排序" desc="结合岗位、阅读历史和关注来源进行排序" value={props.smartSort} setValue={props.setSmartSort} /><PreferenceToggle title="参考同部门趋势" desc="仅使用匿名聚合数据，不展示个人阅读记录" value={props.departmentSignal} setValue={props.setDepartmentSignal} /></section>
        <section className="preference-block"><div className="preference-block-head"><div><span><Bell size={17} /></span><div><h3>通知与简报</h3><p>控制重要内容的触达频率</p></div></div></div><PreferenceToggle title="重要资讯提醒" desc="关注来源发布高优先级动态时通知" value={props.breakingNotice} setValue={props.setBreakingNotice} /><PreferenceToggle title="工作日邮件简报" desc="每个工作日 09:00 汇总推荐内容" value={props.emailBrief} setValue={props.setEmailBrief} /><div className="delivery-account"><Mail size={17} /><div><strong>简报接收邮箱</strong><span>linxiaoman@agenticfeed.cn</span></div><button>修改</button></div><div className="privacy-note"><ShieldCheck size={16} /><span>偏好仅用于当前企业账号的推荐与通知，可随时修改或重置。</span></div></section>
      </div>
    </div>
  );
}

function PreferenceToggle({ title, desc, value, setValue }) {
  return <div className="preference-toggle"><div><strong>{title}</strong><span>{desc}</span></div><button className={value ? "on" : ""} aria-label={title} onClick={() => setValue(!value)}><i /></button></div>;
}

function SecuritySettings() {
  return <><div className="profile-section-title"><div><h2>账号与权限</h2><p>查看企业身份、数据范围与登录安全</p></div></div><div className="security-cards"><div><ShieldCheck size={22} /><section><strong>企业身份已验证</strong><span>数字创新中心 · 产品经理</span></section><em>正常</em></div><div><Globe2 size={22} /><section><strong>最近登录</strong><span>成都 · 企业内网 · 今天 09:18</span></section><button>查看记录</button></div></div></>;
}
function Modal({ title, subtitle, close, children, wide = false }) {
  return (
    <div
      className="modal-mask"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className={`modal ${wide ? "wide" : ""}`}>
        <div className="modal-title">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button onClick={close}>
            <X size={21} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ReviewPage({ statuses, setStatuses }) {
  const [filter, setFilter] = useState("待审核");
  const queue = articles.filter((item) => item.category === "通知公告");
  const visible = queue.filter((item) => filter === "全部" || (statuses[item.id] || "待审核") === filter);
  return <main className="review-page">
    <div className="review-heading"><div><span className="eyebrow"><ShieldCheck size={18} /> 管理员</span><h1>内容审核</h1><p>审核通知公告的标题、来源与正文。当前为 Mock 演示，操作仅在本次会话生效。</p></div><span>{queue.filter((item) => !statuses[item.id]).length} 条待审核</span></div>
    <nav className="review-tabs" aria-label="审核状态">{["待审核", "已通过", "已驳回", "全部"].map((tab) => <button key={tab} className={filter === tab ? "active" : ""} onClick={() => setFilter(tab)}>{tab}</button>)}</nav>
    <div className="review-list">{visible.map((item) => <article className="review-card" key={item.id}><div className="review-card-meta"><span>{item.category} · {item.org} · {item.time}</span><strong>{statuses[item.id] || "待审核"}</strong></div><h2>{item.title}</h2><p>{item.summary}</p><details><summary>查看送审正文</summary><p>{item.content}</p></details>{!statuses[item.id] && <div className="review-actions"><button className="soft-button" onClick={() => setStatuses((values) => ({ ...values, [item.id]: "已驳回" }))}>驳回</button><button className="primary-button" onClick={() => setStatuses((values) => ({ ...values, [item.id]: "已通过" }))}><Check size={16} /> 通过审核</button></div>}</article>)}{!visible.length && <div className="empty-state"><CheckCircle2 size={28} /><h3>暂无{filter}内容</h3><p>可切换其他状态查看审核记录。</p></div>}</div>
  </main>;
}
