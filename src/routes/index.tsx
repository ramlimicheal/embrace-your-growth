import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ramli T. Michael — Two minds, one maker" },
      {
        name: "description",
        content:
          "A dual portfolio: the logical side that ships systems, and the creative side that paints, films, and sounds. Choose a hemisphere.",
      },
      { property: "og:title", content: "Ramli T. Michael — Two minds, one maker" },
      {
        property: "og:description",
        content: "Pick a hemisphere: logic or creative.",
      },
    ],
  }),
  component: BrainLanding,
});

// Words that COMPOSE each hemisphere. Density + varied sizes = the brain shape.
const CREATIVE_WORDS = [
  "paint", "motion", "music", "colour", "story", "image", "sound", "feel",
  "brush", "score", "frame", "grain", "poem", "loop", "hue", "muse",
  "sketch", "shoot", "cut", "mix", "compose", "dream", "verse", "stain",
  "shape", "light", "shadow", "rhythm", "echo", "canvas", "ink", "myth",
];

const LOGIC_WORDS = [
  "const", "function", "system", "ship", "iterate", "prompt", "agent", "type",
  "reason", "debug", "spec", "graph", "async", "hook", "state", "model",
  "logic", "trace", "infer", "diff", "commit", "test", "map", "reduce",
  "build", "deploy", "cache", "route", "stack", "signal", "vector", "token",
];

// Deterministic pseudo-random for consistent layout across renders
function seeded(i: number) {
  const x = Math.sin(i * 9973.13) * 10000;
  return x - Math.floor(x);
}

type HemisphereProps = {
  side: "left" | "right";
  words: string[];
  hovered: boolean;
  fontClass: string;
};

function Hemisphere({ side, words, hovered, fontClass }: HemisphereProps) {
  // Hemisphere as an ellipse mask; words positioned inside via absolute coords
  return (
    <div
      className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-1/2 overflow-hidden`}
      style={{
        WebkitMaskImage:
          side === "left"
            ? "radial-gradient(ellipse 90% 78% at 100% 50%, black 62%, transparent 66%)"
            : "radial-gradient(ellipse 90% 78% at 0% 50%, black 62%, transparent 66%)",
        maskImage:
          side === "left"
            ? "radial-gradient(ellipse 90% 78% at 100% 50%, black 62%, transparent 66%)"
            : "radial-gradient(ellipse 90% 78% at 0% 50%, black 62%, transparent 66%)",
      }}
    >
      {words.map((w, i) => {
        const r1 = seeded(i + (side === "left" ? 0 : 500));
        const r2 = seeded(i * 3 + (side === "left" ? 7 : 91));
        const r3 = seeded(i * 5 + 13);
        // Anchor toward the inner edge (center of brain)
        const top = 6 + r1 * 88; // %
        const inner = 2 + r2 * 55; // % from inner edge
        const size = 0.7 + r3 * 2.4; // rem
        const rot = (r3 - 0.5) * 24; // deg
        const opacity = 0.35 + r1 * 0.65;
        const style: React.CSSProperties = {
          top: `${top}%`,
          fontSize: `${size}rem`,
          transform: `translateY(-50%) rotate(${rot}deg)`,
          opacity: hovered ? Math.min(1, opacity + 0.25) : opacity,
          transition: "opacity 500ms ease, color 500ms ease, letter-spacing 500ms ease",
          letterSpacing: hovered ? "0.02em" : "0",
        };
        if (side === "left") style.right = `${inner}%`;
        else style.left = `${inner}%`;
        return (
          <span
            key={`${side}-${i}`}
            className={`pointer-events-none absolute select-none whitespace-nowrap ${fontClass} ${
              hovered ? "text-foreground" : "text-foreground/70"
            }`}
            style={style}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
}

function BrainLanding() {
  const [hover, setHover] = useState<"creative" | "logic" | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Grain / vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>Ramli T. Michael</span>
        <span className="hidden sm:inline">Portfolio · 2026</span>
      </header>

      {/* Brain stage */}
      <main className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1400px] items-center justify-center px-4">
        <div className="relative aspect-[16/10] w-full max-w-[1200px]">
          {/* Two hemispheres */}
          <Link
            to="/creative"
            onMouseEnter={() => setHover("creative")}
            onMouseLeave={() => setHover(null)}
            aria-label="Enter the creative side"
            className="group absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer"
          >
            <Hemisphere
              side="left"
              words={CREATIVE_WORDS}
              hovered={hover === "creative"}
              fontClass="font-serif italic"
            />
          </Link>

          <Link
            to="/logic"
            onMouseEnter={() => setHover("logic")}
            onMouseLeave={() => setHover(null)}
            aria-label="Enter the logic side"
            className="group absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer"
          >
            <Hemisphere
              side="right"
              words={LOGIC_WORDS}
              hovered={hover === "logic"}
              fontClass="font-mono"
            />
          </Link>

          {/* Central sulcus / brain stem */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[80%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-foreground/25 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-8 w-16 -translate-x-1/2 translate-y-[42%] rounded-b-full border border-t-0 border-foreground/20"
          />

          {/* Center label / prompt */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Choose a hemisphere
              </p>
              <h1 className="mt-3 font-serif text-3xl italic text-foreground/90 sm:text-5xl">
                two minds,{" "}
                <span className="font-mono text-2xl not-italic sm:text-4xl">
                  one_maker
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Hover CTAs */}
          <div
            className={`pointer-events-none absolute left-6 top-1/2 z-20 -translate-y-1/2 transition-all duration-500 ${
              hover === "creative" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <div className="font-serif text-xs uppercase tracking-[0.32em] text-foreground/60">
              Left brain
            </div>
            <div className="mt-1 font-serif text-2xl italic sm:text-3xl">
              enter the creative →
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              graphic, motion, music, image
            </div>
          </div>

          <div
            className={`pointer-events-none absolute right-6 top-1/2 z-20 -translate-y-1/2 text-right transition-all duration-500 ${
              hover === "logic" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <div className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
              Right brain
            </div>
            <div className="mt-1 font-mono text-2xl sm:text-3xl">
              ← ./logic
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              ai · systems · vibe coding
            </div>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="relative z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>Hover · Click</span>
        <div className="flex gap-4">
          <Link to="/logic" className="hover:text-foreground">/logic</Link>
          <Link to="/creative" className="hover:text-foreground">/creative</Link>
        </div>
      </footer>
    </div>
  );
}
