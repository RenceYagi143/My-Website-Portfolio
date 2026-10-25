import './story.css';
import { story } from './story.data.js';
import { makeSection, media } from '../../core/helpers.js';

export function renderStory() {
  const sec = makeSection('story', 'My Story', 'The market taught me systems.',
    'Supply chains and engineering architecture share the same core: systemic problem-solving.');
  const grid = document.createElement('div');
  grid.className = 'grid';
  story.forEach((s) => {
    const card = document.createElement('article');
    card.className = 'card tilt reveal';
    card.append(media(`/images/story/${s.image}`, s.title));
    const pad = document.createElement('div');
    pad.className = 'pad';
    pad.innerHTML = `<div class="mono date">${s.when}</div><b>${s.title}</b><p>${s.text}</p>`;
    card.append(pad);
    grid.append(card);
  });
  sec.firstElementChild.append(grid);
  return sec;
}
