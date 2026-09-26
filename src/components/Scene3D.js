import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-page 3D backdrop: a slowly turning star field and floating low-poly
// shapes that drift with the pointer and scroll. It sits behind the content
// (pointer-events: none) and never carries information, so if WebGL is not
// available the page simply keeps its CSS gradient background.

const ACCENTS = [0x22d3ee, 0x8b5cf6, 0x38bdf8, 0xa78bfa, 0x2dd4bf];

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

function makeStars(count, radius) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const a = new THREE.Color(0x22d3ee);
  const b = new THREE.Color(0xa78bfa);
  for (let i = 0; i < count; i++) {
    // Points on a thick spherical shell, so the field has depth in every direction.
    const r = radius * (0.45 + Math.random() * 0.55);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const c = a.clone().lerp(b, Math.random());
    colors.set([c.r, c.g, c.b], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

function makeShape(geometry, color) {
  const group = new THREE.Group();
  const solid = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: color,
      emissiveIntensity: 0.1,
      metalness: 0.6,
      roughness: 0.35,
      flatShading: true,
      transparent: true,
      opacity: 0.7,
    })
  );
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 1),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })
  );
  group.add(solid, edges);
  return group;
}

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webglAvailable()) return undefined;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "low-power" });
    } catch (e) {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050814, 0.045);
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const cyan = new THREE.PointLight(0x22d3ee, 40, 40);
    cyan.position.set(-8, 6, 8);
    const violet = new THREE.PointLight(0x8b5cf6, 40, 40);
    violet.position.set(8, -6, 6);
    scene.add(cyan, violet);

    const stars = makeStars(small ? 450 : 1200, 26);
    scene.add(stars);

    // Shapes sit towards the edges so they never sit behind the text column.
    // side: -1 left edge, 1 right edge. Shapes hug the screen edges so they
    // never sit behind text; x is worked out from the visible width below.
    const specs = [
      { geo: new THREE.IcosahedronGeometry(1.25, 0), side: -1, y: 3.4, z: -3 },
      { geo: new THREE.TorusKnotGeometry(0.8, 0.26, 120, 14), side: 1, y: 4.2, z: -5 },
      { geo: new THREE.OctahedronGeometry(1.05, 0), side: 1, y: -4.2, z: -3 },
      { geo: new THREE.DodecahedronGeometry(1, 0), side: -1, y: -5, z: -4 },
      { geo: new THREE.TorusGeometry(1, 0.28, 12, 40), side: -1, y: -11, z: -5 },
      { geo: new THREE.IcosahedronGeometry(0.8, 0), side: 1, y: -12.5, z: -3 },
      { geo: new THREE.OctahedronGeometry(0.9, 0), side: -1, y: -17, z: -4 },
      { geo: new THREE.TorusKnotGeometry(0.6, 0.2, 100, 12), side: 1, y: -19.5, z: -5 },
    ];
    const used = small ? specs.filter((_, i) => i % 2 === 0) : specs;
    const shapes = used.map(({ geo, side, y, z }, i) => {
      const shape = makeShape(geo, ACCENTS[i % ACCENTS.length]);
      shape.position.set(0, y, z);
      shape.scale.setScalar(small ? 0.55 : 1);
      shape.userData = { side, baseY: y, speed: 0.15 + Math.random() * 0.25, phase: Math.random() * Math.PI * 2 };
      scene.add(shape);
      return shape;
    });
    const placeShapes = () => {
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      shapes.forEach((s) => {
        const halfWidth = Math.tan(halfFov) * (camera.position.z - s.position.z) * camera.aspect;
        // Phones are narrow, so shapes peek in from just past the edge.
        s.position.x = s.userData.side * halfWidth * (small ? 1.0 : 0.9);
      });
    };
    placeShapes();

    const pointer = { x: 0, y: 0 };
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      placeShapes();
    };

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      const progress = scrollProgress();
      // Scrolling travels the camera down through the shapes; the pointer adds parallax.
      camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-progress * 14 - pointer.y * 0.5 - camera.position.y) * 0.06;
      camera.lookAt(0, camera.position.y, 0);
      stars.rotation.y = t * 0.02 + progress * 0.6;
      stars.rotation.x = t * 0.01;
      shapes.forEach((s) => {
        const { baseY, speed, phase } = s.userData;
        s.rotation.x = t * speed + progress * 2;
        s.rotation.y = t * speed * 1.3 + phase;
        s.position.y = baseY + Math.sin(t * 0.6 + phase) * 0.35;
      });
      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      frame = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) loop();
    };

    window.addEventListener("resize", onResize);
    if (reduceMotion) {
      // One still frame, redrawn only when the layout changes.
      render();
      window.addEventListener("resize", render);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      loop();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", render);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />;
}
