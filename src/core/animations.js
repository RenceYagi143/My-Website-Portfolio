import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { calm, $$ } from './helpers.js';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // scroll progress line under the nav (always on)
  gsap.to('#bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
  if (calm) return;

  gsap.from('.hero h1 span', { y: 70, opacity: 0, rotationX: -60, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2 });
  gsap.from('.photo', { scale: 0.7, opacity: 0, duration: 1.2, ease: 'back.out(1.6)', delay: 0.4 });
  gsap.to('.ring', { rotation: 360, duration: 24, repeat: -1, ease: 'none' });
  gsap.to('.ring.r2', { rotation: -360, duration: 40, repeat: -1, ease: 'none' });

  $$('.reveal, .aw').forEach((el) =>
    gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
  );
}
