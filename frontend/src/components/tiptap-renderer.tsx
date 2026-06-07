"use client";

/**
 * Renders TipTap JSON content as HTML on the client.
 * Uses the @tiptap/react generateHTML utility for SSR-safe rendering.
 */

import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useMemo } from "react";

const EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
  Image,
  Link,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
];

interface TipTapRendererProps {
  content: string; // JSON string
}

export function TipTapRenderer({ content }: TipTapRendererProps) {
  const html = useMemo(() => {
    try {
      const json = JSON.parse(content);
      return generateHTML(json, EXTENSIONS);
    } catch {
      return content;
    }
  }, [content]);

  return (
    <>
      <div
        className="tiptap-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .tiptap-content { font-size: 16px; line-height: 1.85; color: #1F2937; }
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
