// THE BRAIN: imports every section, mounts them in order, then starts 3D + animations.
import './styles/variables.css';
import './styles/base.css';

import { renderNavbar, activateNavbar } from './sections/navbar/navbar.js';
import { renderHero } from './sections/hero/hero.js';
import { renderStory } from './sections/story/story.js';
import { renderProjects } from './sections/projects/projects.js';
import { renderExperience } from './sections/experience/experience.js';
import { renderAwards } from './sections/awards/awards.js';
import { renderSkills } from './sections/skills/skills.js';
import { renderContact } from './sections/contact/contact.js';
import { renderFooter } from './sections/footer/footer.js';

import './styles/responsive.css'; // keep last so it can override section styles

import { initScene3D } from './core/scene3d.js';
import { initAnimations } from './core/animations.js';
import { initTilt } from './core/tilt.js';

const app = document.getElementById('app');
const main = document.createElement('main');
main.append(
  renderHero(),
  renderStory(),
  renderProjects(),
  renderExperience(),
  renderAwards(),
  renderSkills(),
  renderContact()
);
app.append(renderNavbar(), main, renderFooter());

initScene3D(document.getElementById('bg'));
initAnimations();
activateNavbar();
initTilt();
