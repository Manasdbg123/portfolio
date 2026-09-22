import { useEffect, useState } from "react";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

// Gate for the WebGL hero scene. Only real hard requirements block it:
// a wide-enough viewport (it's a desktop composition, not built for phone
// widths) and actual WebGL support — never a broken/half-loaded canvas.
//
// prefers-reduced-motion does NOT hide the 3D scene entirely (a visitor
// with that preference still sees the object; only the aggressive
// scroll-jacking camera pin is skipped for them — see HeroScene's
// `reducedMotion` option). Many systems ship with that OS setting on by
// default, and hiding the whole scene behind it was making the hero look
// flatter than intended for most visitors.
export default function useCanRender3D() {
  const [state, setState] = useState({ can: false, reducedMotion: false });

  useEffect(() => {
    const wideEnough = window.innerWidth >= 720;
    const webgl = detectWebGL();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState({ can: wideEnough && webgl, reducedMotion });
  }, []);

  return state;
}
