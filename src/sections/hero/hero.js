import './hero.css';
import { hero } from './hero.data.js';

export function renderHero() {
  const s = document.createElement('section');
  s.id = 'home';
  s.className = 'hero';
  s.innerHTML = `
    <div class="wrap">
      <div>
        <div class="mono eyebrow">${hero.eyebrow}</div>
        <h1>${hero.words.map((w) => `<span${w.g ? ' class="grad"' : ''}>${w.t}</span>`).join(' ')}</h1>
        <p class="sub">${hero.intro}</p>
        <a class="btn pri" href="#projects">View Projects</a>
        <a class="btn ghost" href="#contact">Contact Me</a>
        <div class="stats">${hero.stats.map((x) => `<div><b>${x.value}</b><span>${x.label}</span></div>`).join('')}</div>
      </div>
      <div class="photo tilt">
        <div class="ring r2"></div>
        <div class="ring"><i class="dot"></i></div>
        <div class="disc"><img src="${hero.photo}" alt="Portrait of Terence Jay Eborda"></div>
      </div>
    </div>`;
  return s;
}
