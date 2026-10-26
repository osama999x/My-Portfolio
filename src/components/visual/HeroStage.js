import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import effects from "../../config/effects";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import canUseWebGL, { isSmallScreen } from "../../utils/canUseWebGL";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

const HeroStage = () => {
  const reduced = usePrefersReducedMotion();
  const host = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 8 : 8;
    setEnabled(
      effects.enabled &&
      effects.hero3d &&
      effects.developerScene &&
      !reduced &&
      !isSmallScreen() &&
      cores >= 4 &&
      canUseWebGL()
    );
  }, [reduced]);

  useEffect(() => {
    const node = host.current;
    if (!node || !enabled) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div className={enabled ? "hero-stage is-live" : "hero-stage"} ref={host} aria-hidden="true">
      <div className="hero-fallback" />
      {enabled && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroCanvas active={visible} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
};

export default HeroStage;
