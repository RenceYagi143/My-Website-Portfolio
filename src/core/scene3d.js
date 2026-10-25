import * as THREE from 'three';
import { calm } from './helpers.js';

export function initScene3D(canvas) {
  try {
    const R = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    cam.position.set(0, 0, 9);

    // sensor-grid wave
    const N = 64;
    const pos = new Float32Array(N * N * 3);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const k = (i * N + j) * 3;
      pos[k] = (i - N / 2) * 0.5;
      pos[k + 2] = (j - N / 2) * 0.5 - 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const grid = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x2563eb, size: 0.06, transparent: true, opacity: 0.6 }));
    grid.position.y = -4;
    scene.add(grid);

    // wireframe shapes
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), new THREE.MeshBasicMaterial({ color: 0x1d4ed8, wireframe: true, transparent: true, opacity: 0.45 }));
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true }));
    const group = new THREE.Group();
    group.add(ico, core);
    scene.add(group);

    let mx = 0, my = 0;
    addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });

    const baseY = () => (innerWidth > 800 ? 0.6 : 2.6);
    function resize() {
      R.setSize(innerWidth, innerHeight, false);
      cam.aspect = innerWidth / innerHeight;
      cam.updateProjectionMatrix();
      group.position.set(innerWidth > 800 ? 3.6 : 0, baseY(), 0);
      group.scale.setScalar(innerWidth > 800 ? 1 : 0.7);
    }
    resize();
    addEventListener('resize', resize);

    const t0 = performance.now();
    (function loop() {
      const t = calm ? 0 : (performance.now() - t0) / 1000;
      const sy = scrollY;
      const p = geo.attributes.position.array;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const k = (i * N + j) * 3;
        p[k + 1] = Math.sin(p[k] * 0.7 + t) * Math.cos(p[k + 2] * 0.7 + t * 0.8) * 0.6;
      }
      geo.attributes.position.needsUpdate = true;
      ico.rotation.set(t * 0.25 + sy * 0.002, t * 0.35, 0);
      core.rotation.set(-t * 0.5, -t * 0.3 + sy * 0.003, 0);
      group.position.y += (baseY() - sy * 0.002 - group.position.y) * 0.1;
      cam.position.x += (mx * 1.2 - cam.position.x) * 0.05;
      cam.position.y += (-my * 0.8 - cam.position.y) * 0.05;
      cam.lookAt(0, 0, 0);
      R.render(scene, cam);
      requestAnimationFrame(loop);
    })();
  } catch (err) {
    console.warn('3D background disabled:', err);
  }
}
