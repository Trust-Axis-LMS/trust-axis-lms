/**
 * Renders TipTap JSON content on the server.
 * Uses @tiptap/static-renderer, which needs no DOM, so the article body is
 * present in the initial HTML (crawlable, no hydration mismatch).
 */

import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { addHeadingIds, type TipTapNode } from "@/lib/generate-toc";
import { optimizeImageUrl } from "@/lib/image-url";

// Heading with an `id` attribute so the Table of Contents anchors resolve
const AnchoredHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        renderHTML: (attrs) => (attrs.id ? { id: attrs.id } : {}),
      },
    };
  },
}).configure({ levels: [1, 2, 3, 4] });

const EXTENSIONS = [
  StarterKit.configure({ heading: false, link: false, underline: false }),
  AnchoredHeading,
  Image,
  Link,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
];

function optimizeImages(node: TipTapNode): void {
  if (node.type === "image" && typeof node.attrs?.src === "string") {
    node.attrs = { ...node.attrs, src: optimizeImageUrl(node.attrs.src) };
  }
  node.content?.forEach(optimizeImages);
}

interface TipTapRendererProps {
  content: string; // JSON string
}

function renderContent(content: string): React.ReactNode | null {
  try {
    const json = JSON.parse(content) as TipTapNode;
    addHeadingIds(json);
    optimizeImages(json);
    return renderToReactElement({ content: json, extensions: EXTENSIONS });
  } catch {
    return null;
  }
}

export function TipTapRenderer({ content }: TipTapRendererProps) {
  const rendered = renderContent(content);

  return (
    <>
      {rendered !== null ? (
        <div className="tiptap-content">{rendered}</div>
      ) : (
        // Legacy / non-JSON content is stored as HTML
        <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: content }} />
      )}
      <style>{`
        .tiptap-content { font-size: 16px; line-height: 1.85; color: #1F2937; }
        .tiptap-content h1, .tiptap-content h2, .tiptap-content h3, .tiptap-content h4 { scroll-margin-top: 100px; }
        .tiptap-content h1 { font-size: 32px; font-weight: 800; color: #111; margin: 32px 0 16px; line-height: 1.2; }
        .tiptap-content h2 { font-size: 24px; font-weight: 700; color: #111; margin: 28px 0 12px; line-height: 1.3; }
        .tiptap-content h3 { font-size: 20px; font-weight: 700; color: #1F2937; margin: 22px 0 10px; }
        .tiptap-content h4 { font-size: 17px; font-weight: 700; color: #374151; margin: 18px 0 8px; }
        .tiptap-content p { margin: 0 0 16px; }
        .tiptap-content ul, .tiptap-content ol { padding-left: 28px; margin: 0 0 16px; }
        .tiptap-content li { margin-bottom: 6px; }
        .tiptap-content blockquote { border-left: 4px solid #007BFF; margin: 24px 0; padding: 12px 20px; background: #F0F7FF; border-radius: 0 8px 8px 0; color: #374151; font-style: italic; }
        .tiptap-content code { background: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 4px; padding: 2px 8px; font-family: 'SF Mono', Consolas, monospace; font-size: 14px; color: #1F2937; }
        .tiptap-content pre { background: #1F2937; border-radius: 10px; padding: 20px; overflow-x: auto; margin: 20px 0; }
        .tiptap-content pre code { background: transparent; border: none; color: #F9FAFB; padding: 0; }
        .tiptap-content a { color: #007BFF; text-decoration: underline; }
        .tiptap-content a:hover { color: #0056CC; }
        .tiptap-content img { max-width: 100%; border-radius: 10px; margin: 24px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .tiptap-content strong { font-weight: 700; }
        .tiptap-content em { font-style: italic; }
        .tiptap-content u { text-decoration: underline; }
        .tiptap-content s { text-decoration: line-through; }
      `}</style>
    </>
  );
}
