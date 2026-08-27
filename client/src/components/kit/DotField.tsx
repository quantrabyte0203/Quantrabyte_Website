import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Base dot colour (line grey) and the accent it lifts toward near the cursor. */
const BASE = [168, 170, 158];
const ACCENT = [176, 222, 40];

interface DotFieldProps {
  className?: string;
  /** Grid pitch in CSS px. */
  spacing?: number;
  /** Cursor influence radius in CSS px. */
  radius?: number;
}

/**
 * Technical dot matrix that reacts to the pointer: dots near the cursor grow,
 * shift outward and warm toward lime, over a slow idle wave so the field is
 * never completely static.
 *
 * Canvas-based (one element, no DOM churn), paused when off-screen, and
 * reduced to a plain static grid for reduced-motion or touch input.
 */
const DotField = ({ className, spacing = 26, radius = 150 }: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const interactive = !reduced && !coarse;

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let onScreen = true;
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const r2 = radius * radius;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Slow diagonal breath
          const wave = reduced
            ? 0.5
            : Math.sin((x + y) * 0.011 + time) * 0.5 + 0.5;

          let px = x;
          let py = y;
          let dotRadius = 1.15 + wave * 0.35;
          let alpha = 0.55 + wave * 0.22;
          let mix = 0;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist2 = dx * dx + dy * dy;

            if (dist2 < r2) {
              const dist = Math.sqrt(dist2) || 0.001;
              const falloff = 1 - dist / radius;
              const eased = falloff * falloff;

              dotRadius += eased * 2.6;
              alpha = Math.min(1, alpha + eased * 0.45);
              mix = eased;

              const push = eased * 9;
              px += (dx / dist) * push;
              py += (dy / dist) * push;
            }
          }

          const cr = Math.round(BASE[0] + (ACCENT[0] - BASE[0]) * mix);
          const cg = Math.round(BASE[1] + (ACCENT[1] - BASE[1]) * mix);
          const cb = Math.round(BASE[2] + (ACCENT[2] - BASE[2]) * mix);

          ctx.beginPath();
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      time += 0.006;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame && onScreen && interactive) frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -radius &&
        pointer.x < width + radius &&
        pointer.y > -radius &&
        pointer.y < height + radius;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    // Only burn frames while the field is actually on screen
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    if (interactive) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onPointerLeave);
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [spacing, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
};

export default DotField;
