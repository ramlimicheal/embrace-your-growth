import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FileTree, type TreeFile, type TreeNode } from "./FileTree";
import { ArticleSearch } from "./ArticleSearch";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  X,
  PanelLeft,
  GitBranch,
  Wifi,
  Bell,
  Search,
  Check,
  BookOpen,
  FlaskConical,
  Gamepad2,
  Home,
  User,
  Briefcase,
  Wrench,
  FolderGit2,
} from "lucide-react";

export const IDE_TREE: TreeNode[] = [
  {
    type: "folder",
    name: "portfolio",
    defaultOpen: true,
    children: [
      { type: "file", name: "hero.tsx", sectionId: "home", ext: "tsx" },
      { type: "file", name: "about.md", sectionId: "about", ext: "md" },
    ],
  },
  {
    type: "folder",
    name: "experience",
    defaultOpen: true,
    children: [
      { type: "file", name: "work-history.json", sectionId: "work", ext: "json" },
    ],
  },
  {
    type: "folder",
    name: "skills",
    defaultOpen: true,
    children: [
      { type: "file", name: "tools.yaml", sectionId: "tools", ext: "yaml" },
      { type: "file", name: "skills.matrix", sectionId: "skills", ext: "matrix" },
    ],
  },
  {
    type: "folder",
    name: "projects",
    defaultOpen: true,
    children: [
      { type: "file", name: "case-studies.tsx", sectionId: "projects", ext: "tsx" },
      { type: "file", name: "testimonials.md", sectionId: "testimonials", ext: "md" },
    ],
  },
];


// flat file lookup
function flatten(nodes: TreeNode[]): TreeFile[] {
  const out: TreeFile[] = [];
  const walk = (ns: TreeNode[]) => {
    for (const n of ns) {
      if (n.type === "folder") walk(n.children);
      else out.push(n);
    }
  };
  walk(nodes);
  return out;
}

const ALL_FILES = flatten(IDE_TREE);

function langFor(ext?: string) {
  switch (ext) {
    case "tsx":
      return "TypeScript React";
    case "md":
      return "Markdown";
    case "json":
      return "JSON";
    case "yaml":
      return "YAML";
    case "log":
      return "Log";
    case "matrix":
      return "Matrix";
    default:
      return "Plain Text";
  }
}

export function IdeShell({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>("home");
  const [openTabs, setOpenTabs] = useState<TreeFile[]>(() =>
    ALL_FILES.filter((f) => f.sectionId === "home"),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const scrollingRef = useRef(false);

  // ⌘K / Ctrl+K opens the article search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track visible section
  useEffect(() => {
    const ids = ALL_FILES.map((f) => f.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;
        // pick the most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          setActiveId(id);
          setOpenTabs((tabs) =>
            tabs.some((t) => t.sectionId === id)
              ? tabs
              : [...tabs, ALL_FILES.find((f) => f.sectionId === id)!],
          );
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openFile = (f: TreeFile) => {
    setActiveId(f.sectionId);
    setOpenTabs((tabs) =>
      tabs.some((t) => t.sectionId === f.sectionId) ? tabs : [...tabs, f],
    );
    const el = document.getElementById(f.sectionId);
    if (!el) return;
    scrollingRef.current = true;
    const y =
      el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.setTimeout(() => (scrollingRef.current = false), 900);
  };

  const closeTab = (e: React.MouseEvent, sectionId: string) => {
    e.stopPropagation();
    setOpenTabs((tabs) => {
      const next = tabs.filter((t) => t.sectionId !== sectionId);
      if (next.length && activeId === sectionId) {
        setActiveId(next[next.length - 1].sectionId);
      }
      return next;
    });
  };

  const activeFile = useMemo(
    () => ALL_FILES.find((f) => f.sectionId === activeId),
    [activeId],
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground font-mono pb-6">
      {/* Title bar (sticky) */}
      <div className="sticky top-0 z-40 flex h-9 items-center gap-3 border-b border-border/60 bg-card/80 px-3 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="group ml-2 flex items-center gap-1.5 rounded p-1 pr-2 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          aria-label={sidebarOpen ? "Hide explorer" : "Show explorer"}
          title={sidebarOpen ? "Hide explorer (menu)" : "Show explorer (menu)"}
        >
          <PanelLeft className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium tracking-wide">
            {sidebarOpen ? "Hide Menu" : "Show Menu"}
          </span>
        </button>
        <button
          onClick={() => setSearchOpen(true)}
          className="mx-auto flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          aria-label="Search articles"
          title="Search articles (⌘K)"
        >
          <Search className="h-3 w-3" />
          <span className="truncate">
            Search articles
            <span className="ml-2 hidden text-foreground/40 sm:inline">⌘K</span>
          </span>
        </button>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="hidden text-[11px] sm:inline">v2026.1</span>
        </div>
      </div>

      {/* Body: sidebar + editor */}
      <div className="flex">
        {/* Activity bar (sticky) */}
        <div className="sticky top-9 z-30 hidden h-[calc(100vh-2.25rem)] w-10 shrink-0 flex-col items-center gap-3 border-r border-border/60 bg-background py-3 md:flex">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
            <PanelLeft className="h-4 w-4" />
          </div>
          <button
            onClick={() => setSearchOpen(true)}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            aria-label="Search articles"
            title="Search articles (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5">
            <GitBranch className="h-4 w-4" />
          </div>
          <div className="mt-2 h-px w-6 bg-border/60" />
          <a
            href="https://90days.blog"
            target="_blank"
            rel="noreferrer"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            aria-label="Blog · 90days.blog"
            title="Blog · 90days.blog"
          >
            <BookOpen className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            aria-label="Playground · coming soon"
            title="Playground · coming soon"
          >
            <Gamepad2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            aria-label="Lab · coming soon"
            title="Lab · coming soon"
          >
            <FlaskConical className="h-4 w-4" />
          </button>
        </div>




        {/* Sidebar (sticky) */}
        {sidebarOpen && (
          <aside className="sticky top-9 z-30 hidden h-[calc(100vh-2.25rem)] w-60 shrink-0 flex-col border-r border-border/60 bg-background md:flex">
            <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span>Explorer</span>
              <span className="text-muted-foreground/60">portfolio</span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-1">
              <FileTree tree={IDE_TREE} activeId={activeId} onOpen={openFile} />
            </div>
            <div className="border-t border-border/60 px-3 py-2 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                <span>connected · main</span>
              </div>
            </div>
          </aside>
        )}

        {/* Editor pane */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Tabs (sticky under title) */}
          <div className="sticky top-9 z-20 flex h-9 items-end gap-0.5 overflow-x-auto border-b border-border/60 bg-card/80 px-1 backdrop-blur">
            {openTabs.map((tab) => {
              const active = tab.sectionId === activeId;
              return (
                <button
                  key={tab.sectionId}
                  onClick={() => openFile(tab)}
                  className={`group flex h-8 shrink-0 items-center gap-2 rounded-t-md border-t border-l border-r px-3 text-[12px] transition-colors ${
                    active
                      ? "border-border/70 bg-background text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <span className="truncate">{tab.name}</span>
                  <span
                    onClick={(e) => closeTab(e, tab.sectionId)}
                    className="ml-1 grid h-4 w-4 place-items-center rounded opacity-0 transition-opacity hover:bg-foreground/10 group-hover:opacity-100"
                    aria-label={`Close ${tab.name}`}
                    role="button"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Breadcrumb (sticky under tabs) */}
          <div className="sticky top-[4.5rem] z-10 flex h-7 items-center gap-1.5 border-b border-border/60 bg-background/90 px-4 text-[11px] text-muted-foreground backdrop-blur">
            <span>src</span>
            <span className="text-muted-foreground/50">/</span>
            <span>portfolio</span>
            {activeFile && (
              <>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-foreground/80">{activeFile.name}</span>
              </>
            )}
          </div>

          {/* Content (flows with window scroll) */}
          <div className="font-sans">{children}</div>
        </div>
      </div>

      {/* Status bar (fixed) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-6 items-center gap-4 border-t border-border/60 bg-primary/10 px-3 text-[11px] text-foreground/70 backdrop-blur">
        <span className="flex items-center gap-1.5">
          <GitBranch className="h-3 w-3" />
          main
        </span>
        <span className="flex items-center gap-1.5 text-green-400/90">
          <Check className="h-3 w-3" /> 0 problems
        </span>
        <span className="ml-auto hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">LF</span>
        <span>{langFor(activeFile?.ext)}</span>
        <span className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3" /> live
        </span>
        <Bell className="h-3 w-3" />
      </div>

      {/* Mobile bottom dock — nav for small screens */}
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex justify-center px-3 md:hidden">
        <div className="pointer-events-auto">
          <Dock className="border-border/70 bg-background/85">
            <DockIcon>
              <button
                onClick={() => openFile(ALL_FILES.find((f) => f.sectionId === "home")!)}
                aria-label="Home"
                title="Home"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <Home className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <button
                onClick={() => openFile(ALL_FILES.find((f) => f.sectionId === "about")!)}
                aria-label="About"
                title="About"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <User className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <button
                onClick={() => openFile(ALL_FILES.find((f) => f.sectionId === "work")!)}
                aria-label="Work"
                title="Work"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <Briefcase className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <button
                onClick={() => openFile(ALL_FILES.find((f) => f.sectionId === "skills")!)}
                aria-label="Skills"
                title="Skills"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <Wrench className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <button
                onClick={() => openFile(ALL_FILES.find((f) => f.sectionId === "projects")!)}
                aria-label="Projects"
                title="Projects"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <FolderGit2 className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                title="Search"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <Search className="h-4 w-4" />
              </button>
            </DockIcon>
            <DockIcon>
              <a
                href="https://90days.blog"
                target="_blank"
                rel="noreferrer"
                aria-label="Blog"
                title="Blog · 90days.blog"
                className="flex h-full w-full items-center justify-center text-foreground/80"
              >
                <BookOpen className="h-4 w-4" />
              </a>
            </DockIcon>
          </Dock>
        </div>
      </div>

      <ArticleSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
