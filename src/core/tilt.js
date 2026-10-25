import gsap from 'gsap';
import { calm } from './helpers.js';

export function initTilt() {
  if (calm) return;
  document.addEventListener('mousemove', (e) => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (!t) return;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(t, { rotationY: x * 12, rotationX: -y * 12, transformPerspective: 900, duration: 0.4, overwrite: 'auto' });
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (t && !t.contains(e.relatedTarget)) gsap.to(t, { rotationX: 0, rotationY: 0, duration: 0.6 });
  });
}
