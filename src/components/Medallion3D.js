import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

// The portrait as a real 3D object: a thick, polished medallion with the photo
// on its face, circled by two tilted orbit rings and technology labels that
// pass in front of and behind it. It leans towards the pointer and turns
// gently on its own, so the depth of the rim is always visible.

const LABELS = ["Java", "Spring Boot", "Python", "FastAPI", "Kafka", "LLM Agents"];

function labelTexture(text) {
  const scale = 4;
  const font = `600 ${15 * scale}px Inter, system-ui, sans-serif`;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + 44 * scale;
  const h = 34 * scale;
  canvas.width = w;
  canvas.height = h;
  ctx.font = font;
  const r = h / 2;
  ctx.fillStyle = "rgba(12, 18, 38, 0.92)";
  ctx.strokeStyle = "rgba(125, 211, 252, 0.55)";
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(r, 1 * scale);
  ctx.arcTo(w - 1 * scale, 1 * scale, w - 1 * scale, h - 1 * scale, r - scale);
  ctx.arcTo(w - 1 * scale, h - 1 * scale, 1 * scale, h - 1 * scale, r - scale);
  ctx.arcTo(1 * scale, h - 1 * scale, 1 * scale, 1 * scale, r - scale);
  ctx.arcTo(1 * scale, 1 * scale, w - 1 * scale, 1 * scale, r - scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#22d3ee";
  ctx.beginPath();
  ctx.arc(20 * scale, h / 2, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8edf7";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 32 * scale, h / 2 + scale);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: w / h };
}

export default function Medallion3D({ photo, interactive, onFail }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      onFail && onFail();
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 15.5);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 6);
    const cyan = new THREE.PointLight(0x22d3ee, 30, 20);
    cyan.position.set(-4, 2, 3);
    const violet = new THREE.PointLight(0x8b5cf6, 30, 20);
    violet.position.set(4, -3, 3);
    scene.add(key, cyan, violet, new THREE.AmbientLight(0xffffff, 0.25));

    // ── Medallion: rim, photo face, back plate ──
    const medal = new THREE.Group();
    const R = 2.45;
    const depth = 0.42;
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: 0x9ad8ff,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      iridescence: 0.6,
      iridescenceIOR: 1.6,
    });
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.16, R + 0.16, depth, 128, 1, true), rimMat);
    rim.rotation.x = Math.PI / 2;
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(R + 0.08, 0.12, 24, 128), rimMat);
    bezel.position.z = depth / 2;
    const bezelBack = bezel.clone();
    bezelBack.position.z = -depth / 2;

    const faceTex = new THREE.TextureLoader().load(photo, () => draw());
    faceTex.colorSpace = THREE.SRGBColorSpace;
    faceTex.anisotropy = 8;
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(R, 128),
      new THREE.MeshBasicMaterial({ map: faceTex, toneMapped: false })
    );
    face.position.z = depth / 2 + 0.002;
    const glass = new THREE.Mesh(
      new THREE.CircleGeometry(R, 128),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 0, transparent: true, opacity: 0.08, clearcoat: 1 })
    );
    glass.position.z = depth / 2 + 0.01;
    const back = new THREE.Mesh(
      new THREE.CircleGeometry(R, 96),
      new THREE.MeshPhysicalMaterial({ color: 0x1e1b4b, metalness: 0.9, roughness: 0.3, clearcoat: 1 })
    );
    back.position.z = -depth / 2 - 0.002;
    back.rotation.y = Math.PI;
    // "KR" engraved on the back, seen when the medallion turns.
    const kr = document.createElement("canvas");
    kr.width = kr.height = 512;
    const kctx = kr.getContext("2d");
    const grad = kctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, "#22d3ee");
    grad.addColorStop(1, "#a78bfa");
    kctx.fillStyle = grad;
    kctx.font = "700 220px 'Space Grotesk', Inter, sans-serif";
    kctx.textAlign = "center";
    kctx.textBaseline = "middle";
    kctx.fillText("KR", 256, 270);
    const krTex = new THREE.CanvasTexture(kr);
    krTex.colorSpace = THREE.SRGBColorSpace;
    const krMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.9), new THREE.MeshBasicMaterial({ map: krTex, transparent: true }));
    krMesh.position.z = -depth / 2 - 0.01;
    krMesh.rotation.y = Math.PI;
    medal.add(rim, bezel, bezelBack, face, glass, back, krMesh);

    // Soft glow disc behind everything.
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 256;
    const g = glowCanvas.getContext("2d");
    const rg = g.createRadialGradient(128, 128, 20, 128, 128, 128);
    rg.addColorStop(0, "rgba(56,189,248,0.55)");
    rg.addColorStop(0.5, "rgba(139,92,246,0.25)");
    rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 256, 256);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(8.4, 8.4),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    glow.position.z = -2.5;

    // ── Orbits: two tilted rings with glowing satellites ──
    const orbitGroup = new THREE.Group();
    const makeOrbit = (radius, tiltX, tiltZ, color) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(tiltX, 0, tiltZ);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.018, 12, 200),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 })
      );
      const spin = new THREE.Group();
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), new THREE.MeshBasicMaterial({ color }));
      sat.position.x = radius;
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 24),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      halo.position.x = radius;
      spin.add(sat, halo);
      pivot.add(ring, spin);
      orbitGroup.add(pivot);
      return spin;
    };
    const spinA = makeOrbit(3.25, 1.2, 0.35, 0x22d3ee);
    const spinB = makeOrbit(3.6, 1.35, -0.55, 0xa78bfa);

    // ── Technology labels orbiting on a tilted ellipse ──
    const labels = LABELS.map((text, i) => {
      const { tex, aspect } = labelTexture(text);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      const h = 0.42;
      sprite.scale.set(h * aspect, h, 1);
      sprite.userData.angle = (i / LABELS.length) * Math.PI * 2;
      scene.add(sprite);
      return sprite;
    });

    scene.add(glow, medal, orbitGroup);

    // ── Sizing ──
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw();
    };
    const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(mount);
    else window.addEventListener("resize", resize);

    // ── Interaction ──
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      mount.addEventListener("pointerleave", onLeave);
    }

    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;
    function draw() {
      const t = reduceMotion ? 0 : clock.getElapsedTime();
      // Idle sway shows the rim; the pointer adds up to ~25° on each axis.
      // Resting slightly turned, so the rim's thickness shows even when still.
      const swayY = 0.3 + Math.sin(t * 0.5) * 0.28;
      const swayX = Math.sin(t * 0.37) * 0.1;
      medal.rotation.y += (swayY + target.x * 0.45 - medal.rotation.y) * 0.06;
      medal.rotation.x += (swayX + target.y * 0.3 - medal.rotation.x) * 0.06;
      medal.position.y = Math.sin(t * 0.8) * 0.08;
      spinA.rotation.z = t * 0.6;
      spinB.rotation.z = -t * 0.42;
      orbitGroup.rotation.y = medal.rotation.y * 0.4;
      labels.forEach((s) => {
        const a = s.userData.angle + t * 0.22;
        const x = Math.cos(a) * 3.3;
        const z = Math.sin(a) * 2.2;
        s.position.set(x, Math.sin(a) * 0.9 - 0.1, z);
        // Labels fade a little as they swing behind the medallion.
        s.material.opacity = 0.55 + 0.45 * ((z + 2.2) / 4.4);
      });
      renderer.render(scene, camera);
    }
    const loop = () => {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    // Only animate while the hero is on screen.
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
    if (io) io.observe(mount);
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (!reduceMotion) loop();

    return () => {
      cancelAnimationFrame(frame);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      if (io) io.disconnect();
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [photo, interactive, onFail]);

  return <div className="medallion3d" ref={mountRef} aria-hidden="true" />;
}
