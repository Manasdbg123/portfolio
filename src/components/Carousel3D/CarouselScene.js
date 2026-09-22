import * as THREE from "three";

const CARD_W = 2.4;
const CARD_H = 1.5;

// Draws one project onto a canvas, used as a texture on its 3D card — kept
// as flat 2D drawing (name, tagline, tech chips) rather than a photo since
// there are no real product screenshots to show honestly.
function drawCardTexture(project) {
  const w = 640, h = 400;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#131316";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, w - 2, h - 2);

  // accent corner + flagship tag
  ctx.fillStyle = "#7cf7c4";
  ctx.fillRect(0, 0, 64, 5);
  ctx.font = "600 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#7cf7c4";
  ctx.fillText("FLAGSHIP", 32, 42);

  // name
  ctx.fillStyle = "#ededf0";
  ctx.font = "600 38px Inter, sans-serif";
  wrapText(ctx, project.name, 32, 110, w - 64, 42, 2);

  // tagline
  ctx.fillStyle = "#9a9aa2";
  ctx.font = "400 19px Inter, sans-serif";
  wrapText(ctx, project.tagline, 32, 210, w - 64, 27, 3);

  // tech chips
  let cx = 32, cy = h - 54;
  ctx.font = "500 15px 'JetBrains Mono', monospace";
  project.technologies.slice(0, 4).forEach((t) => {
    const tw = ctx.measureText(t).width + 24;
    if (cx + tw > w - 32) return;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(cx, cy, tw, 32);
    ctx.fillStyle = "#c9c9ce";
    ctx.fillText(t, cx + 12, cy + 21);
    cx += tw + 10;
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
      lines++;
      if (lines >= maxLines - 1) {
        const rest = words.slice(i + 1).join(" ");
        ctx.fillText(line + (rest ? "…" : ""), x, y);
        return;
      }
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

/**
 * Mounts a draggable/scrollable 3D circular carousel of project cards into
 * `container`. Cards sit evenly spaced around a ring; dragging or
 * scrolling over the canvas rotates the ring, it eases to rest on the
 * nearest card, and clicking a card calls `onSelect(slug)`. `select(i)`
 * lets the caller (e.g. clicking the existing tab list) drive the ring
 * from outside too, so the two controls stay in sync.
 */
export function mountCarouselScene(container, { projects, onSelect, reducedMotion = false } = {}) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const count = projects.length;
  const angleStep = (Math.PI * 2) / count;
  const radius = Math.max(3.6, count * 0.62);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, radius + 3.1);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x7cf7c4, 8, 12);
  rim.position.set(0, 0, radius);
  scene.add(rim);

  const ring = new THREE.Group();
  scene.add(ring);

  const cards = projects.map((project, i) => {
    const angle = i * angleStep;
    const geo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    const tex = drawCardTexture(project);
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0.1, side: THREE.FrontSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
    mesh.rotation.y = angle;
    mesh.userData = { slug: project.slug, index: i, baseScale: 1 };
    ring.add(mesh);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x7cf7c4, transparent: true, opacity: 0 })
    );
    mesh.add(edges);
    mesh.userData.edges = edges;

    return mesh;
  });

  // ---- Rotation state ----
  let currentAngle = 0;
  let targetAngle = 0;
  let activeIndex = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartAngle = 0;
  let dragMoved = 0;
  let idleTimer = 0;

  function nearestIndexFor(angle) {
    const norm = ((-angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.round(norm / angleStep) % count;
  }

  function snapTo(index, notify = true) {
    activeIndex = ((index % count) + count) % count;
    targetAngle = -activeIndex * angleStep;
    if (notify && onSelect) onSelect(projects[activeIndex].slug);
  }

  const dom = renderer.domElement;
  dom.style.touchAction = "pan-y";
  dom.style.cursor = "grab";

  const onDown = (e) => {
    dragging = true;
    idleTimer = 0;
    dom.style.cursor = "grabbing";
    dragStartX = (e.touches ? e.touches[0].clientX : e.clientX);
    dragStartAngle = targetAngle;
    dragMoved = 0;
  };
  const onMove = (e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - dragStartX;
    dragMoved = Math.max(dragMoved, Math.abs(dx));
    targetAngle = dragStartAngle + dx * 0.006;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    dom.style.cursor = "grab";
    if (dragMoved < 6) return; // treat as a click, handled by onClick
    snapTo(nearestIndexFor(targetAngle));
  };
  const onWheel = (e) => {
    e.preventDefault();
    idleTimer = 0;
    targetAngle -= (e.deltaY || e.deltaX) * 0.0022;
  };
  const raycaster = new THREE.Raycaster();
  const onClick = (e) => {
    if (dragMoved >= 6) return;
    const rect = dom.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera({ x: px, y: py }, camera);
    const hit = raycaster.intersectObjects(cards)[0];
    if (hit) snapTo(hit.object.userData.index);
  };

  dom.addEventListener("mousedown", onDown);
  dom.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);
  dom.addEventListener("wheel", onWheel, { passive: false });
  dom.addEventListener("click", onClick);

  // ---- Render loop ----
  let raf;
  const idleSpeed = reducedMotion ? 0 : 0.00025;
  const tick = () => {
    if (!dragging) idleTimer += 1;
    // gentle auto-drift only while nobody has interacted in a while, and
    // reduced-motion visitors get none at all
    if (!dragging && idleTimer > 240 && idleSpeed) targetAngle -= idleSpeed;

    currentAngle += (targetAngle - currentAngle) * 0.08;
    ring.rotation.y = currentAngle;

    const active = nearestIndexFor(currentAngle);
    cards.forEach((mesh, i) => {
      const isActive = i === active;
      const targetScale = isActive ? 1.12 : 0.92;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.12);
      mesh.userData.edges.material.opacity += ((isActive ? 0.9 : 0) - mesh.userData.edges.material.opacity) * 0.12;
      mesh.material.color.lerp(new THREE.Color(isActive ? 0xffffff : 0x999999), 0.12);
    });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

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
    dom.removeEventListener("mousedown", onDown);
    dom.removeEventListener("touchstart", onDown);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchend", onUp);
    dom.removeEventListener("wheel", onWheel);
    dom.removeEventListener("click", onClick);
    ro.disconnect();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    });
    renderer.dispose();
    if (dom.parentNode) dom.parentNode.removeChild(dom);
  }

  return {
    dispose,
    select(index) {
      idleTimer = 0;
      snapTo(index, false);
    },
  };
}
