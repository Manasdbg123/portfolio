import { useEffect } from "react";
import { setLenis } from "./lenisInstance";

// Sitewide smooth/inertial scrolling via Lenis — the "premium scroll feel"
// layer. Runs for everyone: prefers-reduced-motion tones the easing down
// (shorter duration, no touch multiplier) rather than disabling it, since
// that OS setting is on by default for a large share of visitors and
// fully skipping it made most people see plain unstyled native scrolling.
export default function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis;
    let raf;
    let disposed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({
        duration: reduced ? 0.5 : 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
      });
      setLenis(lenis);

      // A hash in the URL at mount time (direct load or full navigation to
      // /#section) may have already been jumped to natively by the browser
      // *before* Lenis existed. Lenis otherwise assumes its own initial
      // scroll target is wherever the page was at construction and will
      // fight/undo that jump on its next tick — so re-target it explicitly.
      if (window.location.hash) {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) requestAnimationFrame(() => lenis.scrollTo(el, { immediate: true, offset: -70 }));
      }

      const tick = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Let GSAP ScrollTrigger (used by the hero 3D scene) stay in sync
      // with Lenis's virtual scroll position.
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        lenis.on("scroll", ScrollTrigger.update);
      }).catch(() => {});

      // Anchor links (#system, #projects, …) should ease through Lenis too.
      const onClick = (e) => {
        const link = e.target.closest?.('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -70 });
        }
      };
      document.addEventListener("click", onClick);
      lenis.__onClick = onClick;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (lenis) {
        document.removeEventListener("click", lenis.__onClick);
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);
}
