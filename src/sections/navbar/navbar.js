import './navbar.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../../core/helpers.js';

const links = [
  ['home', 'Home'], ['story', 'My Story'], ['projects', 'Projects'],
  ['experience', 'Experience'], ['awards', 'Awards'], ['skills', 'Skills'], ['contact', 'Contact']
];

export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Main');
  nav.innerHTML = `
    <div class="in">
      <a class="logo" href="#home"><b>TJ</b><span>Terence Jay Eborda</span></a>
      <div class="links">${links.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</div>
    </div>
    <div id="bar"></div>`;
  return nav;
}

/** Highlights the link of the section currently on screen. Call after everything is mounted. */
export function activateNavbar() {
  gsap.registerPlugin(ScrollTrigger);
  const anchors = $$('.links a');
  anchors.forEach((a) => {
    ScrollTrigger.create({
      trigger: $(a.getAttribute('href')),
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (t) => {
        if (!t.isActive) return;
        anchors.forEach((x) => x.classList.toggle('on', x === a));
        a.scrollIntoView({ inline: 'center', block: 'nearest' });
      }
    });
  });
}
