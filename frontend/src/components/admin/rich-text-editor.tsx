"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { useCallback, useRef } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (json: string) => void;
}

const TOOLBAR_BTN: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  border: "none",
  borderRadius: "5px",
  background: "transparent",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 700,
  color: "#374151",
  transition: "all 0.1s",
};

const TOOLBAR_BTN_ACTIVE: React.CSSProperties = {
  ...TOOLBAR_BTN,
  background: "#EFF6FF",
  color: "#2563EB",
};

const SEP: React.CSSProperties = {
  width: "1px",
  height: "20px",
  background: "#E5E7EB",
  margin: "0 4px",
};

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Start writing your content here…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      CharacterCount,
    ],
    content: (() => {
      if (!content) return "";
      try {
        return JSON.parse(content);
      } catch {
        return content;
      }
    })(),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Enter URL:", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadType", "image");
    const res = await fetch("/api/xp-cms/upload", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });
    if (res.ok) {
      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    } else {
      alert("Image upload failed.");
    }
  }, [editor]);

  if (!editor) return null;

  const isActive = (type: string, attrs?: Record<string, unknown>) =>
    editor.isActive(type, attrs);

  return (
    <div style={{ border: "1.5px solid #E5E7EB", borderRadius: "10px", background: "#fff", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "2px",
        padding: "8px 10px",
        borderBottom: "1px solid #E5E7EB",
        background: "#F9FAFB",
      }}>
        {/* Headings */}
        {([1, 2, 3] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            title={`Heading ${lvl}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
            style={isActive("heading", { level: lvl }) ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
          >
            H{lvl}
          </button>
        ))}

        <span style={SEP} />

        {/* Inline marks */}
        <button type="button" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} style={isActive("bold") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}><b>B</b></button>
        <button type="button" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} style={isActive("italic") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}><i>I</i></button>
        <button type="button" title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} style={isActive("underline") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}><u>U</u></button>
        <button type="button" title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} style={isActive("strike") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}><s>S</s></button>
        <button type="button" title="Code" onClick={() => editor.chain().focus().toggleCode().run()} style={isActive("code") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}>{"<>"}</button>

        <span style={SEP} />

        {/* Alignment */}
        <button type="button" title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} style={TOOLBAR_BTN}>⬅</button>
        <button type="button" title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} style={TOOLBAR_BTN}>↔</button>
        <button type="button" title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} style={TOOLBAR_BTN}>➡</button>

        <span style={SEP} />

        {/* Lists */}
        <button type="button" title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} style={isActive("bulletList") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}>• List</button>
        <button type="button" title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={isActive("orderedList") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}>1. List</button>
        <button type="button" title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={isActive("blockquote") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}>&ldquo;&rdquo;</button>

        <span style={SEP} />

        {/* Link & Image */}
        <button type="button" title="Insert Link" onClick={setLink} style={isActive("link") ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}>🔗</button>
        <button type="button" title="Upload Image" onClick={() => fileInputRef.current?.click()} style={TOOLBAR_BTN}>🖼</button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
            e.target.value = "";
          }}
        />

        <span style={SEP} />

        {/* Undo/Redo */}
        <button type="button" title="Undo" onClick={() => editor.chain().focus().undo().run()} style={TOOLBAR_BTN}>↩</button>
        <button type="button" title="Redo" onClick={() => editor.chain().focus().redo().run()} style={TOOLBAR_BTN}>↪</button>

        {/* Word count */}
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "#9CA3AF" }}>
          {editor.storage.characterCount?.words()} words
        </span>
      </div>


      <EditorContent
        editor={editor}
        style={{ minHeight: "500px", padding: "20px 24px" }}
        className="prose-editor"
      />

      <style>{`
        .prose-editor .tiptap {
          outline: none;
          font-size: 15px;
          line-height: 1.8;
          color: #1F2937;
          min-height: 460px;
        }
        .prose-editor .tiptap p { margin: 0 0 14px; }
        .prose-editor .tiptap h1 { font-size: 28px; font-weight: 800; margin: 24px 0 12px; }
        .prose-editor .tiptap h2 { font-size: 22px; font-weight: 700; margin: 20px 0 10px; }
        .prose-editor .tiptap h3 { font-size: 18px; font-weight: 700; margin: 18px 0 8px; }
        .prose-editor .tiptap h4 { font-size: 15px; font-weight: 700; margin: 16px 0 6px; }
        .prose-editor .tiptap blockquote { border-left: 3px solid #3B82F6; margin: 16px 0; padding: 8px 16px; color: #6B7280; font-style: italic; }
        .prose-editor .tiptap ul, .prose-editor .tiptap ol { padding-left: 24px; margin: 0 0 14px; }
        .prose-editor .tiptap li { margin-bottom: 4px; }
        .prose-editor .tiptap code { background: #F3F4F6; border-radius: 4px; padding: 2px 6px; font-family: monospace; font-size: 13px; }
        .prose-editor .tiptap a { color: #2563EB; text-decoration: underline; }
        .prose-editor .tiptap img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
        .prose-editor .tiptap .is-editor-empty::before { content: attr(data-placeholder); color: #9CA3AF; pointer-events: none; height: 0; float: left; }
      `}</style>
    </div>
  );
}
