import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The technologies stacked around the core are the same real nodes shown
// later in the System section — this scene previews that story rather
// than inventing a new one.
const NODES = [
  { label: "CLIENT", angle: 0.2, radius: 2.2, y: 1.0, size: 0.4 },
  { label: "SPRING BOOT", angle: 1.15, radius: 2.5, y: -0.7, size: 0.5 },
  { label: "POSTGRESQL", angle: 2.05, radius: 2.1, y: 1.3, size: 0.42 },
  { label: "REDIS", angle: 3.0, radius: 2.4, y: -1.1, size: 0.36 },
  { label: "KAFKA", angle: 4.0, radius: 2.3, y: 0.35, size: 0.45 },
  { label: "DOCKER", angle: 5.0, radius: 2.4, y: -0.25, size: 0.38 },
];

/**
 * Mounts a genuinely three-dimensional scene into `container`: a solid,
 * brightly-lit core structure ("the interface") with real cast shadows, a
 * grid floor for depth cues, a glowing accent core, and the actual stack
 * nodes as orbiting cubes connected to the core — all clearly readable as
 * a 3D object even before any scroll or mouse interaction, thanks to a
 * constant auto-rotation and a large on-screen presence.
 *
 * `reducedMotion` keeps the object rendering (so the visitor still sees a
 * genuine 3D scene) but skips the scroll-jacking camera pin — only the
 * aggressive motion is removed, not the whole scene.
 *
 * Returns a `dispose()` to tear everything down.
 */
export function mountHeroScene(container, { scrollTriggerElement, reducedMotion = false } = {}) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0c, 7, 18);

  // The camera looks straight down -z at a FIXED point (not tracking the
  // object's x) — that's what actually places the object off to the right
  // of the frame instead of always re-centering on it.
  const LOOK_AT = new THREE.Vector3(0.4, 0.5, 0);
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(0.4, 1.5, 8.6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ---- Lighting: bright key + cool fill + strong accent rim, casting
  // real shadows so the object unmistakably reads as solid and 3D ----
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(4, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 20;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x8fb8ff, 0.55);
  fill.position.set(-5, 2, -3);
  scene.add(fill);

  const rim = new THREE.PointLight(0x7cf7c4, 32, 16);
  rim.position.set(-2.5, -1, -1.5);
  scene.add(rim);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // ---- Root group (everything moves/rotates/orbits together) ----
  const root = new THREE.Group();
  root.position.x = 3.4; // off the camera's forward axis, so it renders on the right of the frame
  scene.add(root);

  // ---- Core structure: a stack of solid, brightly-edged platforms — a
  // floating engineering console, unmistakably three-dimensional ----
  const coreGroup = new THREE.Group();
  root.add(coreGroup);

  const platformMat = new THREE.MeshStandardMaterial({ color: 0x1b1b20, metalness: 0.45, roughness: 0.3 });
  const platformTopMat = new THREE.MeshStandardMaterial({ color: 0x232329, metalness: 0.35, roughness: 0.35 });

  const layerDefs = [
    { w: 2.2, d: 1.6, h: 0.24, y: 0 },
    { w: 1.75, d: 1.3, h: 0.24, y: 0.52 },
    { w: 1.25, d: 0.95, h: 0.24, y: 1.04 },
  ];
  layerDefs.forEach((def, i) => {
    const geo = new THREE.BoxGeometry(def.w, def.h, def.d);
    const mesh = new THREE.Mesh(geo, i === layerDefs.length - 1 ? platformTopMat : platformMat);
    mesh.position.y = def.y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    coreGroup.add(mesh);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x7cf7c4, transparent: true, opacity: 0.85 })
    );
    mesh.add(edges);
  });

  // A glowing accent core floating at the center-top — the "system" heart
  const coreLight = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.32, 1),
    new THREE.MeshStandardMaterial({ color: 0x7cf7c4, emissive: 0x7cf7c4, emissiveIntensity: 2.2, roughness: 0.15 })
  );
  coreLight.position.y = 1.85;
  coreLight.castShadow = true;
  coreGroup.add(coreLight);

  // Soft additive glow sprite behind the core so the accent colour actually
  // reads as a glow against the near-black background, not just a dot.
  const glowTexture = (() => {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(124,247,196,0.85)");
    g.addColorStop(1, "rgba(124,247,196,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  })();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.set(2.6, 2.6, 1);
  glow.position.y = 1.85;
  coreGroup.add(glow);

  // ---- Orbiting stack-node cubes + connection lines down to the core ----
  const nodeMat = new THREE.MeshStandardMaterial({ color: 0x20202a, metalness: 0.3, roughness: 0.4 });
  const nodeEdgeMat = new THREE.LineBasicMaterial({ color: 0x7cf7c4, transparent: true, opacity: 0.9 });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x7cf7c4, transparent: true, opacity: 0.3 });

  const nodeMeshes = NODES.map((n) => {
    const geo = new THREE.BoxGeometry(n.size, n.size, n.size);
    const mesh = new THREE.Mesh(geo, nodeMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const x = Math.cos(n.angle) * n.radius;
    const z = Math.sin(n.angle) * n.radius * 0.7;
    mesh.position.set(x, n.y, z);
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), nodeEdgeMat));
    root.add(mesh);

    const points = [new THREE.Vector3(0, 0.5, 0), mesh.position.clone()];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat);
    root.add(line);

    return { mesh, line, baseAngle: n.angle, radius: n.radius, y: n.y };
  });

  // ---- Floor: a large plane + grid well below the scene, so perspective
  // and cast shadows are unmistakable ----
  const floorGeo = new THREE.PlaneGeometry(40, 40);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0d0d10, metalness: 0.2, roughness: 0.9 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.6;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(40, 40, 0x33333c, 0x1a1a1f);
  grid.position.y = -2.59;
  scene.add(grid);

  // ---- Faint depth particles ----
  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 5 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta) * 0.5);
    positions[i * 3 + 2] = r * Math.cos(phi) - 3;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0xededf0, size: 0.03, transparent: true, opacity: 0.35 })
  );
  scene.add(particles);

  // ---- Pointer parallax target ----
  const pointer = { x: 0, y: 0 };
  const targetRotation = { x: 0, y: 0 };
  const onPointerMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    targetRotation.y = pointer.x * 0.22;
    targetRotation.x = -pointer.y * 0.12;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // ---- Scroll-driven camera dolly (GSAP ScrollTrigger) — skipped for
  // reduced-motion visitors; the object still renders and rotates gently. ----
  const scrollState = { progress: 0 };
  let st = null;
  if (scrollTriggerElement && !reducedMotion) {
    st = ScrollTrigger.create({
      trigger: scrollTriggerElement,
      start: "top top",
      end: "+=90%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });
  }

  // ---- Render loop ----
  let raf;
  const clock = new THREE.Clock();
  const idleSpeed = reducedMotion ? 0.02 : 0.09;
  const tick = () => {
    const t = clock.getElapsedTime();
    const p = scrollState.progress;

    camera.position.z = THREE.MathUtils.lerp(8.6, 5.2, p);
    camera.position.y = THREE.MathUtils.lerp(1.5, 0.5, p);
    camera.lookAt(LOOK_AT);

    // gentle bounded sway (not a full spin) so the object reads as 3D at
    // rest without ever swinging back over the text on its rotation cycle,
    // plus pointer parallax and a small scroll-driven turn on top of it
    const idle = Math.sin(t * idleSpeed) * 0.22;
    root.rotation.y += (targetRotation.y + p * 0.4 + idle - root.rotation.y) * 0.05;
    root.rotation.x += (targetRotation.x - root.rotation.x) * 0.05;
    coreGroup.rotation.y = t * (reducedMotion ? 0.05 : 0.14);
    coreLight.rotation.y = t * 0.6;
    const bob = Math.sin(t * 0.8) * 0.06;
    coreLight.position.y = 1.85 + bob;
    glow.position.y = 1.85 + bob;

    nodeMeshes.forEach(({ mesh, line, baseAngle, radius, y }, i) => {
      const a = baseAngle + t * (reducedMotion ? 0.02 : 0.1);
      mesh.position.x = Math.cos(a) * radius;
      mesh.position.z = Math.sin(a) * radius * 0.7;
      mesh.position.y = y + Math.sin(t * 0.6 + i) * 0.08;
      mesh.rotation.y = t * 0.4;
      mesh.rotation.x = t * 0.25;
      const posAttr = line.geometry.attributes.position;
      posAttr.setXYZ(1, mesh.position.x, mesh.position.y, mesh.position.z);
      posAttr.needsUpdate = true;
    });

    particles.rotation.y = t * 0.015;

    // fade the whole scene out as the hero hands off to the System section
    const fade = 1 - THREE.MathUtils.smoothstep(p, 0.72, 1);
    renderer.domElement.style.opacity = String(fade);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

  // ---- Resize ----
  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);

  function dispose() {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointerMove);
    ro.disconnect();
    if (st) st.kill();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    glowTexture.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }

  return { dispose };
}
