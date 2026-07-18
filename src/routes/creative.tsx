import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/creative")({
  head: () => ({
    meta: [
      { title: "Creative — Ramli T. Michael" },
      {
        name: "description",
        content:
          "The creative hemisphere: graphic design, motion, music, image. A different aesthetic to the systems side.",
      },
      { property: "og:title", content: "Creative — Ramli T. Michael" },
      {
        property: "og:description",
        content: "Graphic, motion, music, image.",
      },
    ],
  }),
  component: CreativePage,
});

function CreativePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">← brain</Link>
        <span>Left hemisphere</span>
        <Link to="/logic" className="font-mono hover:text-foreground">/logic →</Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-24">
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Creative
        </p>
        <h1 className="mt-4 font-serif text-6xl italic leading-[0.95] sm:text-8xl">
          the making, <br />
          before the shipping.
        </h1>
        <p className="mt-8 max-w-xl font-serif text-lg italic text-foreground/70">
          Graphic design, motion, music, image. This hemisphere is being
          composed — expect brushstrokes, not commits.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {["Graphic", "Motion", "Music", "Image"].map((c) => (
            <div
              key={c}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-border/40 bg-card/40 p-6 transition-colors hover:bg-card"
            >
              <div className="font-serif text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Coming soon
              </div>
              <div className="mt-auto font-serif text-4xl italic">{c}</div>
              <div className="absolute inset-0 -z-10 opacity-40 transition-opacity group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 80% at 20% 10%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
