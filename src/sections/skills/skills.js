import './skills.css';
import { skills } from './skills.data.js';
import { makeSection, chips } from '../../core/helpers.js';

export function renderSkills() {
  const sec = makeSection('skills', 'Skills', 'Toolbox.');
  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.innerHTML = skills.map((s) =>
    `<article class="card reveal"><div class="pad"><b>${s.group}</b>${chips(s.items)}</div></article>`).join('');
  sec.firstElementChild.append(grid);
  return sec;
}
