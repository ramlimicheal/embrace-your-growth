import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ExternalLink, X } from "lucide-react";
import { ARTICLES } from "@/lib/articles";

export function ArticleSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ARTICLES;
    return ARTICLES.filter((a) =>
      [a.title, a.excerpt, a.source, ...a.tags]
        .join(" ")
        .toLowerCase()
        .includes(s),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
      >
        {/* header / input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, tags, sources…"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No articles match "{q}".
            </div>
          ) : (
            <ul className="divide-y divide-border/70">
              {results.map((a) => (
                <li key={a.slug}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-foreground/5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                          {a.title}
                        </span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[12px] text-muted-foreground">
                        {a.excerpt}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        <span>{a.source}</span>
                        <span>·</span>
                        <span>
                          {new Date(a.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {a.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-border px-1.5 py-[1px] text-[9px] normal-case tracking-normal"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-background/60 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{results.length} article{results.length === 1 ? "" : "s"}</span>
          <span>
            <kbd className="rounded border border-border px-1.5 py-[1px] text-[9px]">
              esc
            </kbd>{" "}
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
