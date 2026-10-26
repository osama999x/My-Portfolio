import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import effects from "../../config/effects";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { ThemeContext } from "./theme";
import "./visual.css";

const PARTICLE_COUNT = 42;

const VisualChrome = ({ children }) => {
  const reduced = usePrefersReducedMotion();
  const [theme, setTheme] = useState("dark");
  const [booting, setBooting] = useState(true);
  const bar = useRef(null);
  const spot = useRef(null);
  const particles = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (reduced) {
      setBooting(false);
      return undefined;
    }
    const start = performance.now();
    let frame = 0;
    const finish = window.setTimeout(() => setBooting(false), 1200);
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1100);
      if (count.current) count.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else setBooting(false);
    };
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(finish);
    };
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const next = height > 0 ? window.scrollY / height : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${next})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const motionOn = effects.enabled && !reduced;
    if (!motionOn || !effects.smoothScroll) return undefined;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let frame = 0;
    const loop = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    const canvas = particles.current;
    const motionOn = effects.enabled && effects.particles && !reduced;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!canvas || !motionOn || !fine) return undefined;

    const context = canvas.getContext("2d");
    const pointer = { x: 0, y: 0 };
    const dots = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: -(Math.random() * 0.0007 + 0.00025),
      r: Math.random() * 1.6 + 0.5,
    }));
    let frame = 0;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const onMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
      if (spot.current) {
        spot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    const draw = () => {
      if (!running) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = window.scrollY * 0.04;
      dots.forEach((dotItem) => {
        dotItem.x += dotItem.vx + pointer.x * 0.0004;
        dotItem.y += dotItem.vy + pointer.y * 0.0004;
        if (dotItem.x < 0 || dotItem.x > 1) dotItem.vx *= -1;
        if (dotItem.y < -0.05) dotItem.y = 1.05;
        context.beginPath();
        context.fillStyle = "rgba(45, 220, 184, 0.8)";
        context.arc(dotItem.x * canvas.width, (dotItem.y * canvas.height - scroll) % canvas.height, dotItem.r, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    frame = window.requestAnimationFrame(draw);
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  useEffect(() => {
    const motionOn = effects.enabled && effects.cursor && !reduced;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!motionOn || !fine) return undefined;

    document.documentElement.classList.add("has-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;

    const nodeFrom = (event) => (event.target instanceof Element ? event.target : null);
    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const node = nodeFrom(event);
      const card = node && node.closest("[data-cursor]");
      const interactive = node && node.closest("a, button, .projectCard");
      if (ring.current) {
        ring.current.dataset.label = card ? card.getAttribute("data-cursor") || "" : "";
        ring.current.classList.toggle("is-hot", Boolean(interactive));
      }
      if (spot.current) spot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const follow = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(follow);
    };
    let magnet = null;
    const pull = (event) => {
      const node = event.target instanceof Element ? event.target : null;
      const button = node && node.closest(".btn, .filterBtn, .theme-toggle");
      if (magnet && magnet !== button) magnet.style.transform = "";
      magnet = button;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      button.style.transform = `translate3d(${dx * 0.16}px, ${dy * 0.2}px, 0)`;
    };
    const onClick = (event) => {
      const node = event.target instanceof Element ? event.target : null;
      const button = node && node.closest(".btn, .filterBtn, .theme-toggle");
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointermove", pull);
    window.addEventListener("click", onClick);
    frame = window.requestAnimationFrame(follow);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", pull);
      window.removeEventListener("click", onClick);
      window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="atmosphere" aria-hidden="true">
        <div className="grid-overlay" />
        <div className="scanline" />
        <canvas className="particle-field" ref={particles} />
        <div className="spotlight" ref={spot} />
        <div className="grain" />
      </div>
      <div className="scroll-progress" ref={bar} />
      <div className={`preloader ${booting ? "is-active" : "is-done"}`} aria-hidden={!booting}>
        <p className="preloader-count" ref={count}>000</p>
        <div className="preloader-bar" />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="app-content">{children}</div>
    </ThemeContext.Provider>
  );
};

export default VisualChrome;
