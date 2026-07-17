import * as React from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { sendChatMessage, getChatHistory } from "@/lib/chat.functions";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import portraitAsset from "@/assets/ramli-portrait.png.asset.json";

type ChatMsg = { id: string; role: "user" | "assistant"; content: string };

const SESSION_KEY = "ramli-chat-session-id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36))
      .replace(/-/g, "")
      .slice(0, 32);
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const SUGGESTIONS = [
  "What do you do?",
  "Tell me about BibleDecoder",
  "Which tools do you use?",
  "Are you available for work?",
];

export function RamliChat({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const setOpen = onOpenChange;
  const [sessionId, setSessionId] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const send = useServerFn(sendChatMessage);
  const loadHistory = useServerFn(getChatHistory);

  React.useEffect(() => {
    if (!open) return;
    // Fresh conversation every time the chat opens
    const fresh = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36))
      .replace(/-/g, "")
      .slice(0, 32);
    setSessionId(fresh);
    setMessages([]);
    setError(null);
    setInput("");
  }, [open]);


  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading || !sessionId) return;
    setError(null);
    setInput("");
    const optimistic: ChatMsg = {
      id: `local-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages((m) => [...m, optimistic]);
    setLoading(true);
    try {
      const res = await send({ data: { sessionId, message: content } });
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "assistant", content: res.reply },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed bottom-44 right-4 z-[60] flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl",
              "md:bottom-24 md:right-6",
              "border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl",
              "h-[min(65vh,560px)] md:h-[min(70vh,560px)]",
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                <img
                  src={portraitAsset.url}
                  alt="Ramli"
                  className="h-full w-full object-cover grayscale contrast-125 brightness-110"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium leading-tight text-foreground">Ramli</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Usually replies in a minute
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-foreground/90">
                    Hey — I'm Ramli. Ask me anything about my work, projects or how I can help.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm whitespace-pre-wrap"
                        : "bg-muted text-foreground rounded-bl-sm",
                    )}
                  >
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0 prose-headings:mt-2 prose-headings:mb-1 prose-pre:my-1.5 prose-code:text-xs prose-a:text-primary">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    thinking…
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border/60 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-border/70 bg-background px-3 py-2 focus-within:border-foreground/40">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything…"
                  className="max-h-32 flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
