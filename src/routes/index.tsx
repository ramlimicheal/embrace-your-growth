import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";

const BrainScene = lazy(() => import("@/components/BrainScene"));


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

// Brain hemisphere silhouettes (viewBox 1200x800, midline at x=600).
const HEMI_OUTLINE_L =
  "M 600 120 C 540 108 470 108 410 130 C 340 155 285 200 245 255 C 205 310 180 370 178 430 C 176 495 205 555 250 605 C 305 665 385 700 470 705 C 530 708 575 700 600 686 Z";
const HEMI_OUTLINE_R =
  "M 600 120 C 660 108 730 108 790 130 C 860 155 915 200 955 255 C 995 310 1020 370 1022 430 C 1024 495 995 555 950 605 C 895 665 815 700 730 705 C 670 708 625 700 600 686 Z";

// Internal "gyri" — winding curves inside each hemisphere that carry text.
const GYRI_L: { d: string; size: number; opacity: number }[] = [
  { d: "M 585 155 C 500 150 420 165 355 205 C 300 240 260 285 240 335", size: 13, opacity: 0.55 },
  { d: "M 590 210 C 505 215 430 240 375 285 C 320 330 285 380 275 430", size: 15, opacity: 0.72 },
  { d: "M 592 275 C 500 285 420 320 365 375 C 315 425 290 480 300 530", size: 17, opacity: 0.9  },
  { d: "M 594 345 C 505 360 430 400 385 450 C 345 495 335 545 360 595", size: 16, opacity: 0.85 },
  { d: "M 596 420 C 515 445 455 490 425 535 C 400 575 405 620 445 655", size: 14, opacity: 0.7  },
  { d: "M 598 500 C 540 530 500 570 490 610 C 485 640 505 665 545 680", size: 12, opacity: 0.5  },
  { d: "M 260 380 C 235 430 235 490 265 545 C 295 600 355 645 425 665", size: 11, opacity: 0.4  },
];
const GYRI_R: { d: string; size: number; opacity: number }[] = [
  { d: "M 615 155 C 700 150 780 165 845 205 C 900 240 940 285 960 335", size: 13, opacity: 0.55 },
  { d: "M 610 210 C 695 215 770 240 825 285 C 880 330 915 380 925 430", size: 15, opacity: 0.72 },
  { d: "M 608 275 C 700 285 780 320 835 375 C 885 425 910 480 900 530", size: 17, opacity: 0.9  },
  { d: "M 606 345 C 695 360 770 400 815 450 C 855 495 865 545 840 595", size: 16, opacity: 0.85 },
  { d: "M 604 420 C 685 445 745 490 775 535 C 800 575 795 620 755 655", size: 14, opacity: 0.7  },
  { d: "M 602 500 C 660 530 700 570 710 610 C 715 640 695 665 655 680", size: 12, opacity: 0.5  },
  { d: "M 940 380 C 965 430 965 490 935 545 C 905 600 845 645 775 665", size: 11, opacity: 0.4  },
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
  const outline = side === "L" ? HEMI_OUTLINE_L : HEMI_OUTLINE_R;
  const gyri = side === "L" ? GYRI_L : GYRI_R;
  const clipId = `clip-${side}`;
  return (
    <g
      style={{
        transition: "opacity 500ms ease",
        opacity: hovered ? 1 : 0.82,
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={outline} />
        </clipPath>
      </defs>

      {/* brain silhouette stroke */}
      <path
        d={outline}
        fill="none"
        stroke="currentColor"
        strokeOpacity={hovered ? 0.55 : 0.3}
        strokeWidth={1.1}
        style={{ transition: "stroke-opacity 500ms ease" }}
      />

      {/* winding text-carrying gyri, clipped to the hemisphere shape */}
      <g clipPath={`url(#${clipId})`}>
        {gyri.map((g, i) => {
          const id = `gyrus-${side}-${i}`;
          return (
            <g key={id}>
              <path id={id} d={g.d} fill="none" stroke="none" />
              <text
                fill="currentColor"
                fontFamily={fontFamily}
                fontStyle={fontStyle}
                fontSize={g.size}
                letterSpacing={hovered ? "0.08em" : "0.04em"}
                style={{
                  transition: "letter-spacing 500ms ease, opacity 500ms ease",
                  opacity: hovered ? Math.min(1, g.opacity + 0.15) : g.opacity,
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
    </g>
  );
}

function BrainLanding() {
  const [hover, setHover] = useState<"creative" | "logic" | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* WebGL plasma background */}
      <div className="absolute inset-0 z-0">
        <ClientOnly fallback={<div className="h-full w-full bg-gradient-to-r from-orange-950/40 via-black to-blue-950/40" />}>
          <Suspense fallback={null}>
            <BrainScene hoverSide={hover} />
          </Suspense>
        </ClientOnly>
      </div>

      {/* subtle dot grid over the shader */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <header className="relative z-20 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-white/60">
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
