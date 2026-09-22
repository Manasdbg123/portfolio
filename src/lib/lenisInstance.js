// Tiny shared handle so ScrollToTop (and anything else) can route through
// the active Lenis instance instead of fighting it with native scrollTo.
let instance = null;

export function setLenis(l) {
  instance = l;
}

export function getLenis() {
  return instance;
}
