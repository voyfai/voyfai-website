const ALLOWED_TAGS = new Set([
  "P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "A",
  "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "CODE", "PRE", "HR",
  "DIV", "SPAN",
]);

const ALLOWED_ATTRS = {
  A: ["href", "target", "rel"],
};

function sanitizeNode(node) {
  const toRemove = [];
  const children = Array.from(node.children || []);

  for (const child of children) {
    const tag = child.tagName;

    if (!ALLOWED_TAGS.has(tag)) {
      const frag = child.ownerDocument.createDocumentFragment();
      while (child.firstChild) frag.appendChild(child.firstChild);
      child.parentNode.replaceChild(frag, child);
      sanitizeNode(frag);
      continue;
    }

    const allowed = ALLOWED_ATTRS[tag] || [];
    for (const attr of Array.from(child.attributes)) {
      if (!allowed.includes(attr.name.toLowerCase())) {
        child.removeAttribute(attr.name);
      }
    }

    if (tag === "A") {
      const href = child.getAttribute("href") || "";
      const trimmed = href.trim().toLowerCase();
      if (
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("data:") ||
        trimmed.startsWith("vbscript:")
      ) {
        child.removeAttribute("href");
      }
      if (child.getAttribute("target") === "_blank") {
        child.setAttribute("rel", "noopener noreferrer");
      }
    }

    sanitizeNode(child);
  }

  return node;
}

export function sanitizeHtml(raw) {
  if (!raw || typeof raw !== "string") return "";
  if (typeof window === "undefined" || !window.DOMParser) return "";

  const doc = new DOMParser().parseFromString(`<div>${raw}</div>`, "text/html");
  const root = doc.body.firstChild;
  if (!root) return "";

  sanitizeNode(root);
  return root.innerHTML;
}
