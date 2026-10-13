"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * The hero background: a twisting ribbon of light lines with bright pulses
 * running along it. Plain 2D canvas, no libraries.
 *
 * Performance guardrails:
 * - fewer lines, coarser steps, and a lower pixel ratio on small screens
 * - pauses when scrolled offscreen or when the tab is hidden
 * - draws a single still frame when reduced motion is preferred
 */
export function EnergyField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const small = window.matchMedia("(max-width: 768px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const LINES = small ? 18 : 34;
    const STEP = small ? 16 : 10;

    let width = 0;
    let height = 0;
    let raf = 0;
    let inView = true;
    let gradients: CanvasGradient[] = [];
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gradients = Array.from({ length: LINES }, (_, i) => {
        const p = i / (LINES - 1);
        const edge = Math.sin(p * Math.PI); // brightest in the middle of the ribbon
        const a = 0.05 + 0.3 * edge;
        const g = ctx.createLinearGradient(0, 0, width, 0);
        g.addColorStop(0, "rgba(79,125,255,0)");
        g.addColorStop(0.2, `rgba(79,125,255,${a * 0.6})`);
        g.addColorStop(0.5, `rgba(67,226,255,${a})`);
        g.addColorStop(0.8, `rgba(47,217,169,${a * 0.7})`);
        g.addColorStop(1, "rgba(47,217,169,0)");
        return g;
      });
    };

    /** y position of line p (0..1) at x, time t (ms) */
    const yAt = (x: number, p: number, t: number) => {
      const u = x / Math.max(width, 1);
      const center =
        height * (small ? 0.7 : 0.62) +
        Math.sin(u * 3.2 + t * 0.00022) * height * 0.07 +
        Math.sin(u * 7.1 - t * 0.00031) * height * 0.018;
      const twist = Math.sin(u * 4.4 - t * 0.00028 + 0.6);
      const spread = height * (0.05 + 0.2 * (0.5 + 0.5 * twist)) * (0.35 + u * 0.9);
      let y = center + (p - 0.5) * spread * 2 + Math.sin(u * 12 + p * 6 + t * 0.0006) * 2;

      if (pointer.x > -1e3) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const r = 140;
        if (d2 < r * r * 6) y += Math.sign(dy || 1) * Math.exp(-d2 / (2 * r * r)) * 26;
      }
      return y;
    };

    const draw = (now: number) => {
      const t = now - start;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1;

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        ctx.strokeStyle = gradients[i];
        ctx.beginPath();
        for (let x = -STEP; x <= width + STEP; x += STEP) {
          const y = yAt(x, p, t);
          if (x === -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Pulses: short bright trails traveling along a few lines
      const pulses = small ? 4 : 7;
      for (let k = 0; k < pulses; k++) {
        const line = Math.floor(((k * 5 + 3) % LINES) as number);
        const p = line / (LINES - 1);
        const speed = 0.07 + (k % 3) * 0.025;
        const span = width + 400;
        const head = ((t * speed + k * 397) % span) - 200;
        const tail = 140;
        const grad = ctx.createLinearGradient(head - tail, 0, head, 0);
        const color = k % 3 === 0 ? "255,181,71" : "120,236,255";
        grad.addColorStop(0, `rgba(${color},0)`);
        grad.addColorStop(1, `rgba(${color},0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let x = head - tail; x <= head; x += 6) {
          const y = yAt(x, p, t);
          if (x === head - tail) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const hy = yAt(head, p, t);
        const glow = ctx.createRadialGradient(head, hy, 0, head, hy, 10);
        glow.addColorStop(0, `rgba(${color},0.9)`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head, hy, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (!raf && inView && !document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(start + 4000);

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else pause();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (pointer.x < -1e3) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -1e4;
      pointer.x = pointer.y = -1e4;
    };
    if (finePointer && !reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
