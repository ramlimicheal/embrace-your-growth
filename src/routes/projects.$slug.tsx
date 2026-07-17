import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, findProject, type Project, type CaseStudyChapter } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — Ramli T. Michael`;
    const description = project.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8 font-mono">
      <div className="text-center space-y-3">
        <p className="text-red-400/90">error: project not found</p>
        <Link to="/" className="text-primary hover:underline">← back to portfolio</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8 font-mono">
      <div className="text-center space-y-3">
        <p className="text-red-400/90">error: {error.message}</p>
        <button onClick={reset} className="text-primary hover:underline">retry</button>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const isLink = project.href.startsWith("http");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 font-mono">
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          cd ..
        </Link>

        <div className="mt-10 text-[13px] text-muted-foreground">
          <span className="text-primary">$</span> cat projects/{project.slug}/README.md
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span><span className="text-primary">year</span> · {project.year}</span>
          <span><span className="text-primary">role</span> · {project.role}</span>
          {isLink && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"
            >
              {project.href.replace(/^https?:\/\//, "")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {project.caseStudy || project.caseStudyEmbedUrl ? (
          <CaseStudyView project={project} />
        ) : (
          <>
            <section className="mt-14 space-y-10 text-[15px] leading-relaxed">
              <Block label="problem" body={project.problem} />
              <Block label="process" body={project.process} />
              <Block label="outcome" body={project.outcome} />
            </section>

            <section className="mt-14">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">stack</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border/70 px-2 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.k} className="rounded-lg border border-border/60 p-4">
                  <div className="text-2xl font-semibold tracking-tight text-foreground">{m.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{m.v}</div>
                </div>
              ))}
            </section>
          </>
        )}

        <div className="mt-20 border-t border-border pt-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">more projects</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECTS.filter((p) => p.slug !== project.slug).map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group rounded-lg border border-border/60 p-4 hover:border-foreground/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary">▸</span>
                  <span className="text-foreground">{p.slug}/</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:text-foreground" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{p.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-primary">{label}</div>
      <p className="mt-3 text-foreground/90">{body}</p>
    </div>
  );
}

function CaseStudyView({ project }: { project: Project }) {
  if (project.caseStudyEmbedUrl) {
    return (
      <div className="mt-12 font-sans">
        <LiveCaseStudyEmbed url={project.caseStudyEmbedUrl} />
      </div>
    );
  }
  const cs = project.caseStudy!;
  return (
    <div className="mt-16 space-y-20 font-sans max-w-4xl">
      {/* Hero */}
      <section className="border-t border-border/60 pt-10">
        <div className="text-[10px] uppercase tracking-[0.22em] text-primary">{cs.eyebrow}</div>
        <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          {cs.headline}
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {cs.intro}
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {cs.heroMetrics.map((m) => (
            <div key={m.k} className="rounded-lg border border-border/60 p-4">
              <div className="text-3xl font-semibold tracking-tight text-foreground">{m.k}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">{m.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-xs md:text-sm text-muted-foreground leading-relaxed">
          {cs.stackLine}
        </div>
      </section>

      {cs.chapters.map((ch) => (
        <Chapter key={ch.n} chapter={ch} />
      ))}

      {/* CTAs */}
      <section className="border-t border-border/60 pt-10">
        <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Try it yourself</div>
        <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
          See the product the case study is about.
        </h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {cs.ctas.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border/70 px-4 py-2.5 text-sm hover:border-foreground/50 hover:text-foreground transition-colors"
            >
              {c.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Chapter({ chapter }: { chapter: CaseStudyChapter }) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Chapter {chapter.n} · <span className="text-primary">{chapter.eyebrow}</span>
      </div>
      <h3 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
        {chapter.title}
      </h3>
      {chapter.body && (
        <p className="mt-5 text-base text-foreground/85 max-w-2xl leading-relaxed">
          {chapter.body}
        </p>
      )}
      {chapter.quote && (
        <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 italic text-foreground/80 max-w-2xl">
          {chapter.quote}
        </blockquote>
      )}
      {chapter.cards && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {chapter.cards.map((c) => (
            <div key={c.title} className="rounded-lg border border-border/60 p-5">
              <div className="text-sm font-semibold text-foreground">{c.title}</div>
              <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{c.body}</div>
            </div>
          ))}
        </div>
      )}
      {chapter.bullets && (
        <ul className="mt-6 space-y-2 max-w-2xl">
          {chapter.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-foreground/85">
              <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {chapter.table && (
        <div className="mt-8 overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                {chapter.table.head.map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chapter.table.rows.map((r, i) => (
                <tr key={i} className="border-t border-border/50">
                  {r.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-foreground/85">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function LiveCaseStudyEmbed({ url }: { url: string }) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Live Case Study</div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          Open original
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
      <div className="rounded-xl overflow-hidden border border-border/70 bg-background shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-muted/40 border-b border-border/60">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 rounded-md bg-background/80 border border-border/60 text-[11px] text-muted-foreground font-mono truncate max-w-md">
              {host}
            </div>
          </div>
          <div className="w-14" />
        </div>
        <iframe
          src={url}
          title="Live case study"
          loading="lazy"
          className="block w-full h-[85vh] min-h-[900px] bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Embedded from {host}. If it doesn't load, the site may block framing —{" "}
        <a href={url} target="_blank" rel="noreferrer" className="underline hover:text-foreground">open it in a new tab</a>.
      </p>
    </section>
  );
}
