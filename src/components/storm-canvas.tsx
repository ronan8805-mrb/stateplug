import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Bolt = {
  pts: { x: number; y: number }[];
  life: number;
  max: number;
  width: number;
};

function buildBolt(
  w: number,
  h: number,
  target: { x: number; y: number } | null,
): Bolt {
  const startX = target ? target.x + (Math.random() - 0.5) * 80 : Math.random() * w;
  const startY = -10;
  const endX = target ? target.x : startX + (Math.random() - 0.5) * w * 0.35;
  const endY = target ? target.y : h * (0.35 + Math.random() * 0.5);
  const pts = [{ x: startX, y: startY }];
  const segs = 10 + Math.floor(Math.random() * 6);
  for (let i = 1; i <= segs; i++) {
    const t = i / segs;
    pts.push({
      x: startX + (endX - startX) * t + (Math.random() - 0.5) * 46 * (1 - t),
      y: startY + (endY - startY) * t,
    });
  }
  return { pts, life: 1, max: 0.18 + Math.random() * 0.16, width: 1.2 + Math.random() * 1.6 };
}

export function StormCanvas({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number; y: number; t: number } | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bolts: Bolt[] = [];
    let next = 400;
    let raf = 0;
    let last = performance.now();
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(40, now - last);
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      next -= dt * intensity;
      if (next <= 0) {
        const fresh = mouse.current && now - mouse.current.t < 240;
        bolts.push(buildBolt(w, h, fresh ? mouse.current : null));
        if (Math.random() < 0.35) bolts.push(buildBolt(w, h, fresh ? mouse.current : null));
        next = (1400 + Math.random() * 2600) / Math.max(0.4, intensity);
      }

      bolts = bolts.filter((b) => {
        b.life -= dt / 1000 / b.max;
        if (b.life <= 0) return false;
        const a = Math.max(0, b.life);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(57,255,20,${0.18 * a})`;
        ctx.lineWidth = b.width * 6;
        ctx.lineJoin = "round";
        ctx.beginPath();
        b.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.stroke();
        ctx.strokeStyle = `rgba(200,255,210,${0.85 * a})`;
        ctx.lineWidth = b.width;
        ctx.beginPath();
        b.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.stroke();
        ctx.restore();
        return true;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intensity, reduced]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
