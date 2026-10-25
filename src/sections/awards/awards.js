import './awards.css';
import gsap from 'gsap';
import { awards, levels } from './awards.data.js';
import { makeSection, media, $$ } from '../../core/helpers.js';

export function renderAwards() {
  const sec = makeSection('awards', 'Awards & Recognition', 'Recognition from Iligan to Malaysia.',
    'Filter by level to browse competitions, hackathons and pitching events.');
  const wrap = sec.firstElementChild;

  const filters = document.createElement('div');
  filters.className = 'filters';
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter awards');
  filters.innerHTML = levels.map((l, i) =>
    `<button type="button" data-f="${l}" class="${i ? '' : 'on'}" aria-pressed="${!i}">${l}${i ? '' : ` (${awards.length})`}</button>`).join('');

  const grid = document.createElement('div');
  grid.className = 'grid';
  awards.forEach((a) => {
    const card = document.createElement('article');
    card.className = 'card tilt aw';
    card.dataset.l = a.level;
    card.append(media(`/images/awards/${a.image}`, 'Award photo / certificate', a.level));
    const pad = document.createElement('div');
    pad.className = 'pad';
    pad.innerHTML = `<div class="mono date">${a.when}</div><b>${a.title}</b><span class="org">${a.event}</span><p>${a.text}</p>`;
    card.append(pad);
    grid.append(card);
  });

  filters.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('button', filters).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    const f = b.dataset.f;
    const shown = [];
    $$('.aw', grid).forEach((c) => {
      const show = f === 'All' || c.dataset.l === f;
      c.style.display = show ? '' : 'none';
      if (show) shown.push(c);
    });
    gsap.fromTo(shown, { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, overwrite: true });
  });

  wrap.append(filters, grid);
  return sec;
}
