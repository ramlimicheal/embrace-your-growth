import { useState } from "react";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  FileCog,
  Activity,
  BarChart3,
  Sparkles,
  Mail,
  Circle,
} from "lucide-react";

export type TreeFile = {
  type: "file";
  name: string;
  /** section id in the page to scroll to */
  sectionId: string;
  ext?: "tsx" | "md" | "json" | "yaml" | "log" | "matrix" | "txt";
};

export type TreeFolder = {
  type: "folder";
  name: string;
  children: TreeNode[];
  defaultOpen?: boolean;
};

export type TreeNode = TreeFile | TreeFolder;

function iconFor(ext?: TreeFile["ext"]) {
  switch (ext) {
    case "tsx":
      return <FileCode className="h-3.5 w-3.5 text-sky-400/90" />;
    case "md":
      return <FileText className="h-3.5 w-3.5 text-blue-300/90" />;
    case "json":
      return <FileJson className="h-3.5 w-3.5 text-amber-300/90" />;
    case "yaml":
      return <FileCog className="h-3.5 w-3.5 text-emerald-300/90" />;
    case "log":
      return <Activity className="h-3.5 w-3.5 text-rose-300/90" />;
    case "matrix":
      return <BarChart3 className="h-3.5 w-3.5 text-fuchsia-300/90" />;
    case "txt":
      return <Mail className="h-3.5 w-3.5 text-muted-foreground" />;
    default:
      return <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />;
  }
}

function Node({
  node,
  depth,
  activeId,
  onOpen,
}: {
  node: TreeNode;
  depth: number;
  activeId: string;
  onOpen: (f: TreeFile) => void;
}) {
  const [open, setOpen] = useState(
    node.type === "folder" ? node.defaultOpen !== false : false,
  );

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center gap-1 rounded px-1.5 py-0.5 text-left text-[13px] text-foreground/80 hover:bg-foreground/5"
          style={{ paddingLeft: 6 + depth * 12 }}
        >
          <ChevronRight
            className={`h-3 w-3 shrink-0 text-muted-foreground transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
          {open ? (
            <FolderOpen className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
          ) : (
            <Folder className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {open && (
          <div>
            {node.children.map((c, i) => (
              <Node
                key={i}
                node={c}
                depth={depth + 1}
                activeId={activeId}
                onOpen={onOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const active = activeId === node.sectionId;
  return (
    <button
      onClick={() => onOpen(node)}
      className={`group flex w-full items-center gap-1.5 rounded px-1.5 py-0.5 text-left text-[13px] transition-colors ${
        active
          ? "bg-primary/15 text-foreground"
          : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
      }`}
      style={{ paddingLeft: 20 + depth * 12 }}
    >
      {iconFor(node.ext)}
      <span className="truncate">{node.name}</span>
      {active && (
        <Circle className="ml-auto h-1.5 w-1.5 shrink-0 fill-primary text-primary" />
      )}
    </button>
  );
}

export function FileTree({
  tree,
  activeId,
  onOpen,
}: {
  tree: TreeNode[];
  activeId: string;
  onOpen: (f: TreeFile) => void;
}) {
  return (
    <div className="py-2">
      {tree.map((n, i) => (
        <Node
          key={i}
          node={n}
          depth={0}
          activeId={activeId}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
