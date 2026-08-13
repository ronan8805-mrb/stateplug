import { useEffect, useRef } from "react";

export function ElectricCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.documentElement.classList.add("plug-cursor");

    const trail: { x: number; y: number }[] = [];
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hidden = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      hidden = false;
      const t = e.target as HTMLElement | null;
      if (t && t.closest("input, textarea, select")) hidden = true;
    };
    const onLeave = () => {
      hidden = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const cvs = canvas.current;
    const ctx = cvs?.getContext("2d") ?? null;

    const resize = () => {
      if (!cvs) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cvs.width = Math.floor(innerWidth * dpr);
      cvs.height = Math.floor(innerHeight * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px,${y - 3}px,0)`;
        dot.current.style.opacity = hidden ? "0" : "1";
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 16}px,${ry - 16}px,0)`;
        ring.current.style.opacity = hidden ? "0" : "1";
      }
      trail.push({ x, y });
      if (trail.length > 14) trail.shift();
      if (ctx && cvs) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        if (!hidden && trail.length > 1) {
          ctx.beginPath();
          trail.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.strokeStyle = "rgba(57,255,20,0.35)";
          ctx.lineWidth = 1.4;
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("plug-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block" aria-hidden="true">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div
        ref={ring}
        className="absolute size-8 rounded-full border border-neon/70 transition-opacity duration-150"
      />
      <div ref={dot} className="absolute size-1.5 rounded-full bg-neon shadow-[0_0_10px_#39ff14]" />
    </div>
  );
}
