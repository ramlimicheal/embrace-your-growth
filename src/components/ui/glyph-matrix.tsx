import { useEffect, useRef } from "react";

interface GlyphMatrixProps {
  color?: string;
  glyphs?: string;
  cellSize?: number;
  speed?: number;
  className?: string;
}

/**
 * Animated grid of glyphs that shimmer/change over time.
 * Renders to a canvas so it stays cheap even at large sizes.
 */
export function GlyphMatrix({
  color = "#ffffff",
  glyphs = "01<>/*+-=$#@&%",
  cellSize = 16,
  speed = 0.08,
  className,
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cells: { g: string; a: string; phase: number }[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      cells = Array.from({ length: cols * rows }, () => ({
        g: glyphs[Math.floor(Math.random() * glyphs.length)],
        a: glyphs[Math.floor(Math.random() * glyphs.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    ctx.font = `${cellSize - 4}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textBaseline = "top";

    let t = 0;
    const render = () => {
      t += speed;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${cellSize - 4}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const x = (i % cols) * cellSize;
        const y = Math.floor(i / cols) * cellSize;
        const alpha = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(t + c.phase));
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillText(c.g, x, y);
        // occasional glyph swap
        if (Math.random() < 0.003) {
          c.g = glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, glyphs, cellSize, speed]);

  return <canvas ref={canvasRef} className={className} />;
}
