import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";

// Browser-only: three.js + gsap. Never import statically.
const BrainCanvas = lazy(() => import("@/components/BrainCanvas"));

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
      { property: "og:description", content: "Pick a hemisphere: logic or creative." },
    ],
  }),
  component: BrainLanding,
});

function BrainSkeleton() {
  return (
    <div className="grid h-[560px] w-full place-items-center">
      <div className="h-64 w-64 animate-pulse rounded-full border border-foreground/10" />
    </div>
  );
}

function BrainLanding() {
  const [hover, setHover] = useState<"creative" | "logic" | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>Ramli T. Michael</span>
        <span className="hidden sm:inline">Portfolio · 2026</span>
      </header>

      {/* Hemisphere labels */}
      <div className="relative z-20 mx-auto flex max-w-[1200px] items-start justify-between px-8 pt-2">
        <div
          className={`transition-colors ${
            hover === "creative" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <div className="text-[10px] uppercase tracking-[0.4em]">
            <span className="font-serif italic">Left · Creative</span>
          </div>
          <div className="mt-1 font-serif text-xs italic text-muted-foreground/80">
            graphic · motion · music · image
          </div>
        </div>
        <div
          className={`text-right transition-colors ${
            hover === "logic" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <div className="text-[10px] uppercase tracking-[0.4em]">
            <span className="font-mono">Right · Logic</span>
          </div>
          <div className="mt-1 font-mono text-xs text-muted-foreground/80">
            ai · systems · vibe coding
          </div>
        </div>
      </div>

      {/* Stage */}
      <main className="relative mx-auto flex items-center justify-center px-4">
        <div className="relative w-full max-w-[1200px]">
          {/* 3D brain */}
          <div className="relative flex items-center justify-center [&_canvas]:!bg-transparent">
            <ClientOnly fallback={<BrainSkeleton />}>
              <Suspense fallback={<BrainSkeleton />}>
                <BrainCanvas width={1000} height={640} />
              </Suspense>
            </ClientOnly>
          </div>

          {/* Hemisphere hit-zones */}
          <Link
            to="/creative"
            onMouseEnter={() => setHover("creative")}
            onMouseLeave={() => setHover(null)}
            aria-label="Enter the creative side"
            className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer"
          />
          <Link
            to="/logic"
            onMouseEnter={() => setHover("logic")}
            onMouseLeave={() => setHover(null)}
            aria-label="Enter the logic side"
            className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer"
          />

          {/* central divider */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-6 bottom-6 z-[1] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/15 to-transparent"
          />

          {/* Center prompt */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pointer-events-none absolute inset-x-0 top-4 z-20 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Choose a hemisphere
            </p>
            <h1 className="mt-3">
              <span className="block font-serif text-3xl italic sm:text-5xl">
                two minds,
              </span>
              <span className="mt-1 block font-mono text-xl sm:text-3xl">
                one_maker
              </span>
            </h1>
          </motion.div>

          {/* Hover CTAs */}
          <div
            className={`pointer-events-none absolute left-8 bottom-8 z-20 transition-all duration-500 ${
              hover === "creative"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            <div className="font-serif text-xs uppercase tracking-[0.32em] text-foreground/60">
              Left brain
            </div>
            <div className="mt-1 font-serif text-2xl italic sm:text-3xl">
              enter the creative →
            </div>
          </div>
          <div
            className={`pointer-events-none absolute right-8 bottom-8 z-20 text-right transition-all duration-500 ${
              hover === "logic"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <div className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
              Right brain
            </div>
            <div className="mt-1 font-mono text-2xl sm:text-3xl">← ./logic</div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
