import React, { useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/viewer';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';

export function MarkdownView({ value, title }) {
  const host = useRef(null);
  const viewer = useRef(null);
  useEffect(() => {
    const mount = document.createElement('div');
    host.current.appendChild(mount);
    const instance = new Viewer({ el: mount, initialValue: '', usageStatistics: false });
    viewer.current = instance;
    return () => { instance.destroy(); mount.remove(); };
  }, []);
  useEffect(() => { viewer.current.setMarkdown(value); }, [value]);
  return <div className="markdown-preview">{title && <h1>{title}</h1>}<div ref={host} />{!value && <span className="preview-empty">正文将在这里实时预览</span>}</div>;
}

export default function PublishEditor({ content, setContent, format, setFormat, notify }) {
  const host = useRef(null);
  const editor = useRef(null);
  const callbacks = useRef({ setContent, setFormat, notify });
  callbacks.current = { setContent, setFormat, notify };
  useEffect(() => {
    const modeItem = (name, mode) => ({ name: `${mode}Mode`, tooltip: name, text: name, command: `${mode}Mode`, className: `rich-mode-button rich-${mode}-button` });
    const popupBody = (entries, action) => {
      const container = document.createElement('div');
      container.className = 'rich-insert-menu';
      entries.forEach(([label, value]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.onmousedown = (event) => event.preventDefault();
        button.onclick = () => { action(value); editor.current.eventEmitter.emit('closePopup'); };
        container.appendChild(button);
      });
      return container;
    };
    const emoji = popupBody(['😀', '😊', '🎉', '👍', '❤️', '🚀', '💡', '✅'].map((item) => [item, item]), (text) => editor.current.insertText(text));
    const more = popupBody([['插入表格', 'addTable'], ['有序列表', 'orderedList'], ['任务清单', 'taskList'], ['分隔线', 'hr']], (command) => editor.current.exec(command, command === 'addTable' ? { rowCount: 3, columnCount: 3 } : undefined));
    const mount = document.createElement("div");
    mount.style.height = "100%";
    host.current.appendChild(mount);
    const instance = new Editor({
      el: mount, initialValue: '', initialEditType: 'wysiwyg', height: '100%', minHeight: '160px',
      hideModeSwitch: true, previewStyle: 'tab', language: 'zh-CN', usageStatistics: false,
      placeholder: '在此处输入。选中文字后使用工具栏编辑，支持粘贴或拖入图片。',
      toolbarItems: [[modeItem('MD', 'md'), modeItem('文本', 'text'), 'bold', 'italic', 'heading', 'link', 'quote', 'codeblock', 'image', 'ul',
        { name: 'emoji', tooltip: '表情', text: '☺', className: 'rich-extra-button', popup: { body: emoji, style: { width: '200px' } } },
        { name: 'more', tooltip: '更多插入', text: '⊕', className: 'rich-extra-button', popup: { body: more, style: { width: '180px' } } }]],
      hooks: { addImageBlobHook: (file, callback) => {
        if (!['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
          callbacks.current.notify('请选择不超过 10MB 的 PNG、JPG、GIF 或 WebP 图片');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => callback(reader.result, file.name || '图片');
        reader.onerror = () => callbacks.current.notify('图片读取失败，请重试');
        reader.readAsDataURL(file);
      } },
      events: { change: () => callbacks.current.setContent(instance.getMarkdown()) },
    });
    editor.current = instance;
    for (const type of ['markdown', 'wysiwyg']) {
      for (const mode of ['md', 'text']) instance.addCommand(type, `${mode}Mode`, () => { callbacks.current.setFormat(mode); return true; });
    }
    host.current.querySelectorAll('[contenteditable=true]').forEach((node) => {
      node.setAttribute('role', 'textbox');
      node.setAttribute('aria-label', '正文内容');
      node.setAttribute('aria-multiline', 'true');
    });
    return () => {
      instance.off('change');
      mount.remove();
      editor.current = null;
      // TOAST UI queues a trailing resize for 200ms; let it finish on its detached root.
      window.setTimeout(() => instance.destroy(), 300);
    };
  }, []);
  useEffect(() => {
    const instance = editor.current;
    if (instance.getMarkdown() !== content) instance.setMarkdown(content, false);
  }, [content]);
  useEffect(() => {
    editor.current.changeMode(format === 'md' ? 'markdown' : 'wysiwyg', true);
    for (const mode of ['md', 'text']) host.current.querySelector(`.rich-${mode}-button`)?.setAttribute('aria-pressed', String(mode === format));
  }, [format]);
  return <div className={`rich-publish-editor rich-format-${format}`} ref={host} />;
}
