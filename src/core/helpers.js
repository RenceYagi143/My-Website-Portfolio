export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Empty <section> with a heading block. Append content to section.firstElementChild. */
export function makeSection(id, eyebrow, title, sub = '') {
  const sec = document.createElement('section');
  sec.id = id;
  sec.innerHTML = `<div class="wrap"><div class="mono eyebrow">${eyebrow}</div><h2>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div>`;
  return sec;
}

/** Picture box. Shows the labeled placeholder until the file at `src` exists. */
export function media(src, label, badge = '') {
  const box = document.createElement('div');
  box.className = 'ph';
  if (badge) {
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = badge;
    box.append(b);
  }
  const text = document.createElement('span');
  text.textContent = `[ ${label} ]`;
  box.append(text);
  if (src) {
    const img = new Image();
    img.alt = label;
    img.loading = 'lazy';
    img.onload = () => { text.style.visibility = 'hidden'; };
    img.onerror = () => img.remove();
    img.src = src;
    box.append(img);
  }
  return box;
}

export const chips = (list) => `<div class="chips">${list.map((t) => `<span class="chip">${t}</span>`).join('')}</div>`;
export const bullets = (list) => `<ul>${list.map((x) => `<li>${x}</li>`).join('')}</ul>`;
