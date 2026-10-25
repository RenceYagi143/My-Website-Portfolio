import './projects.css';
import { projects } from './projects.data.js';
import { makeSection, media, chips, bullets } from '../../core/helpers.js';

const dir = (slug) => `/images/projects/${slug}`;

export function renderProjects() {
  const sec = makeSection('projects', 'Projects', 'Built to measure the environment.',
    'Drones, sensor networks and inclusive platforms. Open a project to see its details and gallery.');
  const grid = document.createElement('div');
  grid.className = 'grid';
  const dlg = document.createElement('dialog');
  dlg.className = 'modal';
  dlg.setAttribute('aria-label', 'Project details');

  projects.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card tilt reveal';
    card.append(media(`${dir(p.slug)}/cover.jpg`, `${p.name} cover`));
    const pad = document.createElement('div');
    pad.className = 'pad';
    pad.innerHTML = `<div class="mono date">${p.role} · ${p.years}</div><b>${p.name}</b><p>${p.summary}</p>${chips(p.tags)}`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn ghost open';
    btn.textContent = 'View details';
    btn.addEventListener('click', () => openModal(p, dlg));
    pad.append(btn);
    card.append(pad);
    grid.append(card);
  });
  sec.firstElementChild.append(grid, dlg);
  return sec;
}

function openModal(p, dlg) {
  dlg.innerHTML = `
    <div class="mbody">
      <button type="button" class="x" aria-label="Close">×</button>
      <div class="mono date">${p.role} · ${p.years}</div>
      <h3>${p.name}</h3>
      ${bullets(p.bullets)}
      ${chips(p.tags)}
      ${p.video ? `<p><a class="btn pri" href="${p.video}" target="_blank" rel="noopener">Watch demo video</a></p>` : ''}
      <p class="hint">Photos coming soon.</p>
      <div class="gal"></div>
    </div>`;
  const gal = dlg.querySelector('.gal');
  const hint = dlg.querySelector('.hint');
  for (let i = 1; i <= 4; i++) {
    const im = new Image();
    im.alt = `${p.name} photo ${i}`;
    im.onload = () => hint.remove();
    im.onerror = () => im.remove();
    im.src = `${dir(p.slug)}/gallery-${i}.jpg`;
    gal.append(im);
  }
  dlg.querySelector('.x').onclick = () => dlg.close();
  dlg.onclick = (e) => { if (e.target === dlg) dlg.close(); };
  dlg.showModal();
}
