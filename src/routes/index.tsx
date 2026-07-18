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
      { property: "og:description", content: "Pick a hemisphere: logic or creative." },
    ],
  }),
  component: BrainLanding,
});

const CREATIVE = "paint · motion · music · colour · story · image · sound · feel · brush · score · frame · grain · poem · loop · muse · sketch · shoot · cut · mix · compose · dream · verse · canvas · ink · myth · light · shadow · rhythm · echo ·  ";
const LOGIC = "const · function · system · ship · iterate · prompt · agent · type · reason · debug · spec · graph · async · hook · state · model · logic · trace · infer · diff · commit · test · map · reduce · build · deploy · cache · route · stack · signal ·  ";

type ArcConfig = { r: number; size: number; opacity: number };
const ARCS: ArcConfig[] = [
  { r: 60,  size: 11, opacity: 0.35 },
  { r: 110, size: 13, opacity: 0.5  },
  { r: 165, size: 15, opacity: 0.65 },
  { r: 220, size: 17, opacity: 0.78 },
  { r: 275, size: 18, opacity: 0.9  },
  { r: 330, size: 16, opacity: 0.75 },
  { r: 380, size: 14, opacity: 0.55 },
];

function Hemisphere({
  side,
  hovered,
  fontFamily,
  fontStyle = "normal",
  words,
}: {
  side: "L" | "R";
  hovered: boolean;
  fontFamily: string;
  fontStyle?: string;
  words: string;
}) {
  const cx = 600;
  const cy = 400;
  const sweep = side === "L" ? 0 : 1;
  return (
    <g
      style={{
        transition: "opacity 500ms ease, filter 500ms ease",
        opacity: hovered ? 1 : 0.85,
      }}
    >
      {ARCS.map((a, i) => {
        const d = `M ${cx} ${cy - a.r} A ${a.r} ${a.r} 0 0 ${sweep} ${cx} ${cy + a.r}`;
        const id = `arc-${side}-${i}`;
        return (
          <g key={id}>
            <path id={id} d={d} fill="none" stroke="none" />
            <text
              fill="currentColor"
              fontFamily={fontFamily}
              fontStyle={fontStyle}
              fontSize={a.size}
              letterSpacing={hovered ? "0.08em" : "0.04em"}
              style={{
                transition: "letter-spacing 500ms ease, opacity 500ms ease",
                opacity: hovered ? Math.min(1, a.opacity + 0.15) : a.opacity,
              }}
            >
              <textPath href={`#${id}`} startOffset="0">
                {words.repeat(6)}
              </textPath>
            </text>
          </g>
        );
      })}
    </g>
  );
}

function BrainLanding() {
  const [hover, setHover] = useState<"creative" | "logic" | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <header className="relative z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span>Ramli T. Michael</span>
        <span className="hidden sm:inline">Portfolio · 2026</span>
      </header>

      <div className="relative z-20 mx-auto flex max-w-[1200px] items-center justify-between px-8 pt-2 text-[10px] uppercase tracking-[0.4em]">
        <div className={`transition-colors ${hover === "creative" ? "text-foreground" : "text-muted-foreground"}`}>
          <span className="font-serif italic">Left · Creative</span>
          <div className="mt-1 font-serif text-[10px] italic text-muted-foreground/70 normal-case tracking-normal">
            graphic · motion · music · image
          </div>
        </div>
        <div className={`text-right transition-colors ${hover === "logic" ? "text-foreground" : "text-muted-foreground"}`}>
          <span className="font-mono">Right · Logic</span>
          <div className="mt-1 font-mono text-[10px] text-muted-foreground/70 normal-case tracking-normal">
            ai · systems · vibe coding
          </div>
        </div>
      </div>

      <main className="relative mx-auto flex items-center justify-center px-4">
        <div className="relative w-full max-w-[1200px]">
          <svg
            viewBox="0 0 1200 800"
            className="w-full text-foreground"
            role="img"
            aria-label="Typographic brain — choose a hemisphere"
          >
            <Link
              to="/creative"
              onMouseEnter={() => setHover("creative")}
              onMouseLeave={() => setHover(null)}
              aria-label="Enter the creative side"
            >
              <rect x="0" y="0" width="600" height="800" fill="transparent" style={{ cursor: "pointer" }} />
              <Hemisphere
                side="L"
                hovered={hover === "creative"}
                fontFamily="ui-serif, Georgia, 'Times New Roman', serif"
                fontStyle="italic"
                words={CREATIVE}
              />
            </Link>

            <Link
              to="/logic"
              onMouseEnter={() => setHover("logic")}
              onMouseLeave={() => setHover(null)}
              aria-label="Enter the logic side"
            >
              <rect x="600" y="0" width="600" height="800" fill="transparent" style={{ cursor: "pointer" }} />
              <Hemisphere
                side="R"
                hovered={hover === "logic"}
                fontFamily="ui-monospace, 'JetBrains Mono', Menlo, monospace"
                words={LOGIC}
              />
            </Link>

            <line
              x1="600" y1="40" x2="600" y2="760"
              stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6"
            />
            <path
              d="M 578 760 Q 600 800 622 760"
              fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2"
            />

            <g pointerEvents="none">
              <text
                x="600" y="392" textAnchor="middle"
                fill="currentColor" fillOpacity="0.55"
                fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="6"
              >
                CHOOSE A HEMISPHERE
              </text>
            </g>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <h1 className="text-center">
              <span className="block font-serif text-4xl italic text-foreground sm:text-6xl">
                two minds,
              </span>
              <span className="mt-1 block font-mono text-2xl text-foreground sm:text-4xl">
                one_maker
              </span>
            </h1>
          </motion.div>

          <div
            className={`pointer-events-none absolute left-8 bottom-10 transition-all duration-500 ${
              hover === "creative" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <div className="font-serif text-2xl italic sm:text-3xl">enter the creative →</div>
          </div>
          <div
            className={`pointer-events-none absolute right-8 bottom-10 text-right transition-all duration-500 ${
              hover === "logic" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <div className="font-mono text-2xl sm:text-3xl">← ./logic</div>
          </div>
        </div>
      </main>

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
