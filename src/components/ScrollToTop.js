import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../lib/lenisInstance";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Let the target section mount, then scroll to it instead of the top.
      const id = hash.replace("#", "");
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (!el) {
          window.scrollTo(0, 0);
          return;
        }
        const lenis = getLenis();
        // Route through Lenis when it's active so it doesn't fight this
        // jump on its next animation tick (see useSmoothScroll).
        if (lenis) lenis.scrollTo(el, { immediate: true, offset: -70 });
        else el.scrollIntoView({ behavior: "auto", block: "start" });
      };
      const raf = requestAnimationFrame(scrollToHash);
      return () => cancelAnimationFrame(raf);
    }
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default ScrollToTop;
