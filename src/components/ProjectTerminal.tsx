import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PROJECTS, findProject } from "@/lib/projects";
import { LAB } from "@/lib/lab";

type Line = { id: number; type: "in" | "out" | "err" | "sys"; content: React.ReactNode };

const HELP = [
  "available commands:",
  "  help              show this message",
  "  ls                list categories",
  "  ls projects/      list shipped products",
  "  ls lab/           list ideas & concepts",
  "  cat <slug>        preview project README",
  "  open <slug>       open project detail page",
  "  clear             clear the terminal",
  "  whoami            about me",
];

export function ProjectTerminal() {
  const navigate = useNavigate();
  const [lines, setLines] = useState<Line[]>([
    { id: 0, type: "sys", content: "ramli-os v1.0 — type 'help' to begin. try: open bibledecoder" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (type: Line["type"], content: React.ReactNode) => {
    setLines((prev) => [...prev, { id: idRef.current++, type, content }]);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    push("in", <><span className="text-muted-foreground">~/ramli</span> <span className="text-primary">$</span> {cmd}</>);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHIdx(-1);

    const [verb, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (verb.toLowerCase()) {
      case "help":
        push("out", <pre className="whitespace-pre-wrap leading-relaxed">{HELP.join("\n")}</pre>);
        break;
      case "clear":
        setLines([]);
        break;
      case "ls": {
        const target = arg.replace(/\/$/, "").toLowerCase();
        if (!target || target === ".") {
          push(
            "out",
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
              <button onClick={() => runCommand("ls projects/")} className="text-left hover:text-primary transition-colors">
                <span className="text-primary">▸</span> projects/ <span className="text-muted-foreground/70">({PROJECTS.length})</span>
              </button>
              <button onClick={() => runCommand("ls lab/")} className="text-left hover:text-primary transition-colors">
                <span className="text-primary">▸</span> lab/ <span className="text-muted-foreground/70">({LAB.length})</span>
              </button>
              <div className="text-muted-foreground/50">▸ branding/</div>
              <div className="text-muted-foreground/50">▸ websites/</div>
            </div>,
          );
          break;
        }
        if (target === "projects") {
          push(
            "out",
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => runCommand(`open ${p.slug}`)}
                  className="text-left hover:text-primary transition-colors"
                >
                  <span className="text-primary">▸</span> {p.slug}/
                  <span className="text-muted-foreground/70"> — {p.tagline}</span>
                </button>
              ))}
            </div>,
          );
          break;
        }
        if (target === "lab") {
          push(
            "out",
            <div className="space-y-1">
              {LAB.map((l) => (
                <button
                  key={l.slug}
                  onClick={() => runCommand(`cat ${l.slug}`)}
                  className="block w-full text-left hover:text-primary transition-colors"
                >
                  <span className="text-primary">▸</span> {l.slug}
                  <span className="ml-2 rounded border border-border px-1.5 py-[1px] text-[10px] uppercase tracking-wider text-muted-foreground">{l.kind}</span>
                  <span className="text-muted-foreground/70"> — {l.tagline}</span>
                </button>
              ))}
            </div>,
          );
          break;
        }
        if (["branding", "websites", "ecommerce"].includes(target)) {
          push("out", <span className="text-muted-foreground italic">(coming soon — populating shortly)</span>);
          break;
        }
        push("err", `ls: ${arg}: no such directory`);
        break;
      }
      case "whoami":
        push(
          "out",
          "Ramli T. Michael — Creative Technologist & AI-First Designer, 18+ yrs. Bengaluru, India.",
        );
        break;
      case "cat": {
        const p = findProject(arg);
        if (!p) return push("err", `cat: ${arg || "<slug>"}: no such project. try 'ls'`);
        push(
          "out",
          <div className="space-y-1.5">
            <div className="text-foreground/90"># {p.title} <span className="text-muted-foreground">· {p.year}</span></div>
            <div><span className="text-primary">problem</span> — {p.problem}</div>
            <div><span className="text-primary">process</span> — {p.process}</div>
            <div><span className="text-primary">outcome</span> — {p.outcome}</div>
            <div className="pt-1 text-muted-foreground/80">→ run <span className="text-foreground">open {p.slug}</span> for full case study</div>
          </div>,
        );
        break;
      }
      case "open": {
        const p = findProject(arg);
        if (!p) return push("err", `open: ${arg || "<slug>"}: no such project. try 'ls'`);
        push("sys", `opening ${p.slug}…`);
        setTimeout(() => navigate({ to: "/projects/$slug", params: { slug: p.slug } }), 250);
        break;
      }
      default:
        push("err", `command not found: ${verb} — type 'help'`);
    }
  }

  function runCommand(c: string) {
    setInput("");
    run(c);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const ni = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const ni = hIdx + 1;
      if (ni >= history.length) { setHIdx(-1); setInput(""); }
      else { setHIdx(ni); setInput(history[ni]); }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="rounded-xl border border-border bg-card/30 overflow-hidden font-mono text-[13px]"
    >
      {/* fake title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background/40">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          ramli@portfolio: ~/projects
        </span>
      </div>

      <div ref={scrollRef} className="h-[420px] overflow-y-auto px-5 py-4 space-y-2">
        {lines.map((l) => (
          <div
            key={l.id}
            className={
              l.type === "err"
                ? "text-red-400/90"
                : l.type === "sys"
                ? "text-muted-foreground italic"
                : l.type === "in"
                ? "text-foreground"
                : "text-muted-foreground"
            }
          >
            {l.content}
          </div>
        ))}

        {/* live prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-muted-foreground">~/ramli</span>
          <span className="text-primary">$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            className="flex-1 bg-transparent text-foreground caret-primary outline-none"
            placeholder="try: open bibledecoder"
          />
        </div>
      </div>
    </div>
  );
}
