import { useEffect, useState } from "react";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

// Gate for the WebGL hero scene. Real hard requirements block it: a fine
// pointer (mouse/trackpad — this is a desktop composition with a
// scroll-jacking camera pin, which fights touch scrolling and burns
// battery on a phone GPU for no benefit), a wide-enough viewport, and
// actual WebGL support — never a broken/half-loaded canvas. Pointer type
// is checked (not just width) so a phone in landscape doesn't slip
// through and get the same experience that broke on mobile.
//
// prefers-reduced-motion does NOT hide the 3D scene entirely on desktop
// (a visitor with that preference still sees the object; only the
// aggressive scroll-jacking camera pin is skipped for them — see
// HeroScene's `reducedMotion` option). Many systems ship with that OS
// setting on by default, and hiding the whole scene behind it was making
// the hero look flatter than intended for most desktop visitors.
export default function useCanRender3D() {
  const [state, setState] = useState({ can: false, reducedMotion: false });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.innerWidth >= 720;
    const webgl = detectWebGL();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState({ can: finePointer && wideEnough && webgl, reducedMotion });
  }, []);

  return state;
}
