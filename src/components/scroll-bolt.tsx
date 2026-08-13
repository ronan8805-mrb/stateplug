import { useEffect, useState } from "react";

export function ScrollBolt() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-24 right-3 z-30 hidden h-[42dvh] w-px bg-raised sm:block"
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-1/2 w-0.5 -translate-x-1/2 bg-neon shadow-[0_0_12px_#39ff14]"
        style={{ height: `${Math.max(8, p * 100)}%` }}
      />
    </div>
  );
}
