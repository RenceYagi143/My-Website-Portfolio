import './experience.css';
import { experience } from './experience.data.js';
import { makeSection, media, bullets } from '../../core/helpers.js';

export function renderExperience() {
  const sec = makeSection('experience', 'Experience', 'Where I’ve worked.',
    'Roles in research, engineering, data and the family business, with what I delivered in each.');
  const tl = document.createElement('div');
  tl.className = 'tl';
  experience.forEach((e) => {
    const card = document.createElement('article');
    card.className = 'card tilt reveal';
    card.append(media(`/images/experience/${e.image}`, e.title));
    const pad = document.createElement('div');
    pad.className = 'pad';
    pad.innerHTML = `<div class="mono date">${e.when}</div><b>${e.title}</b><span class="org">${e.org}</span>${bullets(e.points)}`;
    card.append(pad);
    tl.append(card);
  });
  sec.firstElementChild.append(tl);
  return sec;
}
