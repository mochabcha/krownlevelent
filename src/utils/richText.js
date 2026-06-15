const allowedTags = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR', 'P', 'UL', 'OL', 'LI', 'A']);
const blockTags = new Set(['P', 'UL', 'OL', 'LI']);

function sanitizeNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent || '');
  if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();

  const tag = node.tagName;
  const element = allowedTags.has(tag) ? document.createElement(tag.toLowerCase()) : document.createDocumentFragment();

  if (tag === 'A' && element.nodeType === Node.ELEMENT_NODE) {
    const href = node.getAttribute('href') || '';
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) {
      element.setAttribute('href', href);
      element.setAttribute('rel', 'noopener noreferrer');
    }
  }

  Array.from(node.childNodes).forEach((child) => {
    element.appendChild(sanitizeNode(child));
  });

  return element;
}

export function sanitizeRichText(value = '') {
  if (typeof window === 'undefined' || !value) return value || '';
  const template = document.createElement('template');
  template.innerHTML = value;
  const fragment = document.createDocumentFragment();
  Array.from(template.content.childNodes).forEach((node) => {
    fragment.appendChild(sanitizeNode(node));
  });
  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}

export function hasRichText(value = '') {
  return /<\/?(strong|b|em|i|u|p|ul|ol|li|a|br)\b/i.test(value);
}

export function normalizeRichText(value = '') {
  const safe = sanitizeRichText(value);
  if (!safe) return '';
  const template = document.createElement('template');
  template.innerHTML = safe;
  const hasBlock = Array.from(template.content.childNodes).some((node) => blockTags.has(node.tagName));
  return hasBlock ? safe : `<p>${safe}</p>`;
}
