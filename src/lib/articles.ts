export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  source: string; // e.g. "90days.blog", "Medium"
  url: string;
  date: string; // ISO
  tags: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "ai-first-design",
    title: "Designing for the AI-First Era",
    excerpt:
      "Why prompts, latency and confidence scores are the new UX primitives — and how to design around them.",
    source: "90days.blog",
    url: "https://90days.blog",
    date: "2025-11-02",
    tags: ["ai", "ux", "design"],
  },
  {
    slug: "solo-founder-stack",
    title: "The Solo Founder Stack in 2026",
    excerpt:
      "The tools I lean on to ship products alone — from ideation to production.",
    source: "90days.blog",
    url: "https://90days.blog",
    date: "2025-10-15",
    tags: ["founder", "stack", "tools"],
  },
  {
    slug: "bibledecoder-notes",
    title: "Building BibleDecoder — Notes from the trenches",
    excerpt:
      "Lessons from shipping a spiritual-tech product with AI at its core.",
    source: "90days.blog",
    url: "https://90days.blog",
    date: "2025-09-08",
    tags: ["case-study", "ai", "product"],
  },
];
