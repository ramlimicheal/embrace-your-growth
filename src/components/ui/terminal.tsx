import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type TerminalProps = {
  children: ReactNode;
  className?: string;
};

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "border-border bg-background/80 backdrop-blur-sm z-0 w-full max-w-xl rounded-xl border shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ~/ramli — zsh
        </span>
      </div>
      <pre className="p-4 text-sm leading-relaxed font-mono">
        <code className="grid gap-y-1">{children}</code>
      </pre>
    </div>
  );
}

type TypingProps = {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
};

export function TypingAnimation({
  children,
  className,
  delay = 0,
  duration = 40,
  as: Tag = "span",
}: TypingProps) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(children.slice(0, i));
      if (i >= children.length) clearInterval(id);
    }, duration);
    return () => clearInterval(id);
  }, [started, children, duration]);

  return <Tag className={className}>{text}</Tag>;
}

type AnimatedSpanProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSpan({ children, className, delay = 0 }: AnimatedSpanProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
