/**
 * Generates a Table of Contents from TipTap JSON content.
 * Extracts heading nodes and creates anchor IDs.
 */

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown> & { level?: number };
  content?: TipTapNode[];
  text?: string;
}

function getTextContent(node: TipTapNode): string {
  if (node.text) return node.text;
  if (node.content) return node.content.map(getTextContent).join("");
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * Walks top-level headings and assigns each a unique anchor ID.
 * Shared by the ToC and the renderer so the links always match the headings.
 */
function collectHeadings(doc: { content?: TipTapNode[] }): (TocItem & { node: TipTapNode })[] {
  if (!doc.content) return [];

  const items: (TocItem & { node: TipTapNode })[] = [];
  const idCounts: Record<string, number> = {};

  for (const node of doc.content) {
    if (node.type === "heading" && node.attrs?.level) {
      const text = getTextContent(node);
      if (!text.trim()) continue;

      let id = slugify(text);
      if (idCounts[id] !== undefined) {
        idCounts[id]++;
        id = `${id}-${idCounts[id]}`;
      } else {
        idCounts[id] = 0;
      }

      items.push({ id, text: text.trim(), level: node.attrs.level, node });
    }
  }

  return items;
}

export function generateToc(contentJson: string): TocItem[] {
  let doc: { content?: TipTapNode[] };
  try {
    doc = JSON.parse(contentJson);
  } catch {
    return [];
  }

  return collectHeadings(doc).map(({ id, text, level }) => ({ id, text, level }));
}

/** Mutates the doc so every ToC heading carries its anchor ID in `attrs.id`. */
export function addHeadingIds(doc: { content?: TipTapNode[] }): void {
  for (const { node, id } of collectHeadings(doc)) {
    node.attrs = { ...node.attrs, id };
  }
}
