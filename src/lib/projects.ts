export type CaseStudyChapter = {
  n: string;
  eyebrow: string;
  title: string;
  body?: string;
  quote?: string;
  bullets?: string[];
  cards?: { title: string; body: string }[];
  table?: { head: string[]; rows: string[][] };
};

export type CaseStudy = {
  eyebrow: string;
  headline: string;
  intro: string;
  heroMetrics: { k: string; v: string }[];
  stackLine: string;
  chapters: CaseStudyChapter[];
  ctas: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  href: string;
  role: string;
  stack: string[];
  problem: string;
  process: string;
  outcome: string;
  metrics: { k: string; v: string }[];
  caseStudy?: CaseStudy;
  caseStudyEmbedUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "preachr",
    title: "Preachr",
    tagline: "A study bible that thinks with you — built for pastors.",
    year: "2025",
    href: "https://preachr.church",
    caseStudyEmbedUrl: "https://preachr.church/case-study",
    role: "Founder, Designer, Full-stack Builder",
    stack: ["React 18", "Vite", "Tailwind", "shadcn/ui", "Lovable Cloud", "Gemini", "Framer Motion"],
    problem:
      "Pastors were juggling 9 tabs — commentaries, Blue Letter Bible, docs, ChatGPT, Logos — to prep one sermon. Context-switching killed the study.",
    process:
      "Collapsed the entire sermon workflow into a single three-panel workspace. Shipped 12 AI research tools sharing one streaming edge function, 395+ components, and a 'Sacred Editorial' design language (parchment, oxblood, antique gilt).",
    outcome: "Live production platform for pastors — a leather-bound commentary that thinks with you.",
    metrics: [
      { k: "12", v: "AI tools" },
      { k: "395+", v: "components" },
      { k: "3-panel", v: "workspace" },
    ],
  },
  {
    slug: "bibledecoder",
    title: "BibleDecoder",
    tagline: "AI-native scripture exploration platform",
    year: "2025",
    href: "https://bibledecoder.sbs",
    caseStudyEmbedUrl: "https://bibledecoder.sbs/case-study",
    role: "Founder, Designer, Prompt Engineer",
    stack: ["Lovable", "Claude", "Supabase", "OpenAI"],
    problem:
      "Bible study apps are locked in denominational silos, with clunky UX and zero contextual AI.",
    process:
      "Solo-shipped end-to-end in 6 weeks — prompt-engineered the semantic search layer, designed the reading UI in Figma, and built the full stack with Lovable + Claude. Iterated 40+ prompt cycles for a hallucination-free study experience.",
    outcome: "Live production platform serving readers across 12 countries in its first month.",
    metrics: [
      { k: "6 wks", v: "solo build" },
      { k: "12", v: "countries" },
      { k: "40+", v: "prompt iterations" },
    ],
    caseStudy: {
      eyebrow: "Case Study · 2026",
      headline: "Building Bible Decoder — from blank canvas to launch-ready product.",
      intro:
        "A solo journey designing and shipping an AI-native scripture study platform — the research, decisions, and craft behind every screen.",
      heroMetrics: [
        { k: "70+", v: "Custom routes shipped" },
        { k: "45+", v: "Edge Functions" },
        { k: "18", v: "Bible languages" },
        { k: "1", v: "Solo builder" },
      ],
      stackLine:
        "React · TypeScript · Tailwind · Framer Motion · Lovable Cloud (Postgres · Edge Fns) · Gemini 2.5 Flash · Paddle MoR · Remotion · ElevenLabs",
      chapters: [
        {
          n: "01",
          eyebrow: "Overview",
          title: "The one-liner.",
          body:
            "A cathedral-quality AI companion for scripture — respectful of the text, generous to the reader, priced within reach of anyone serious about study.",
          cards: [
            { title: "Decode", body: "Any verse → four-lens study (Understand · Context · Apply · Explore) in seconds." },
            { title: "Live it", body: "Insight becomes prayer, journal, and daily rhythm." },
            { title: "Grow", body: "Streaks, heatmaps, Faith Wrapped and mastery graphs make formation visible." },
          ],
        },
        {
          n: "02",
          eyebrow: "The Problem",
          title: "A gap between devotion and scholarship.",
          quote:
            "Serious believers deserve a tool as beautiful as a coffee-table Bible and as smart as a seminary library.",
          cards: [
            { title: "Devotional apps", body: "YouVersion, Hallow, Glorify — beautiful, but shallow. Reading plans and verses-of-the-day don't teach you what a passage means." },
            { title: "Scholarly platforms", body: "Logos and Accordance are unmatched in depth but priced for pastors ($400+), desktop-first, and impenetrable to lay readers." },
          ],
          bullets: [
            "Surface-level readings that ignore language and history",
            "Generic ChatGPT wrappers that hallucinate scripture",
            "Fragmented workflow: read here, journal there, cross-reference elsewhere",
            "No spiritual-formation loop — study rarely turns into prayer or memory",
          ],
        },
        {
          n: "03",
          eyebrow: "Vision",
          title: "Reframing the product as a decoder.",
          body:
            "Not another Bible app — a lens that reveals what's already there. Every feature had to earn its place against that single promise.",
          quote:
            "Users don't want more content. They want more understanding — and they want it to change them.",
          cards: [
            { title: "Fast", body: "Any verse decoded scholar-grade in under 10 seconds." },
            { title: "Grounded", body: "Real verse text injected into every AI call. No hallucinations." },
            { title: "Beautiful", body: "Editorial typography. Zero SaaS purple. Feels like a book." },
          ],
        },
        {
          n: "04",
          eyebrow: "Design System",
          title: "Sanctuary Editorial.",
          body:
            "I rejected the default SaaS aesthetic — purple gradients, Inter everywhere, glassmorphism. A tool people open before prayer should feel like a well-bound book.",
          cards: [
            { title: "Ink Navy", body: "#0B1A24" },
            { title: "Sage Deep", body: "#6B8E5A" },
            { title: "Sage Light", body: "#C6E0A6" },
            { title: "Gold", body: "#B8925A" },
            { title: "Parchment", body: "#F5F5F0" },
            { title: "Typography", body: "Playfair Display for editorial headings + italic accents. Inter for body. Oversized display (60–96px), tight leading, decorative eyebrow rules." },
          ],
        },
        {
          n: "05",
          eyebrow: "Architecture",
          title: "Four zones, one mental model.",
          table: {
            head: ["Zone", "Purpose", "Signature Feature"],
            rows: [
              ["Study", "Decode any verse or chapter", "Scripture Decoder + AI Study Partner"],
              ["Read", "Multilingual Bible + audio", "18-language reader + audio mixer"],
              ["Devotion", "Daily practice loop", "Prayer Rhythm + Verse Journal"],
              ["Grow", "Long-arc formation", "Faith Wrapped + Streaks + Mastery"],
            ],
          },
        },
        {
          n: "06",
          eyebrow: "Feature Deep-Dives",
          title: "What actually shipped.",
          cards: [
            { title: "01 · Scripture Decoder", body: "The flagship. Any reference → four-lens decode (Understand · Context · Apply · Explore). Every output grounded in the real fetched verse text." },
            { title: "02 · AI Study Partner + Voice Chat", body: "Text chat buddy for study conversations + voice-first modal partner (ElevenLabs TTS) for hands-free reflection. Both grounded on the current verse." },
            { title: "03 · Multilingual Reader", body: "18 languages incl. Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Arabic, Mandarin, Spanish, Portuguese, Swahili. Tiered fallback across four Bible APIs." },
            { title: "04 · Sermon Builder", body: "Homiletical framework (Intro · 3 Points · Conclusion) with cross-reference weaving. Exports as premium PDF via jsPDF + html2canvas." },
            { title: "05 · Journal · Rhythm · Playlists", body: "The devotion loop. Journal any verse with mood + gratitude. AI-generated morning/noon/night prompts. Themed audio playlists." },
            { title: "06 · Faith Wrapped", body: "Monthly Spotify-Wrapped-style report. AI aggregates decodes, streaks, journal entries and topic mastery into a story-card sequence." },
            { title: "07 · Live Study Rooms", body: "Supabase Realtime presence. Invite-code rooms where a group studies the same passage together with shared decode state." },
            { title: "08 · Product Tour + Docs", body: "15-step driver.js in-app tour themed to the Sanctuary aesthetic. Backed by a searchable /docs page with 15 detailed sections." },
          ],
        },
        {
          n: "07",
          eyebrow: "AI Engine",
          title: "Grounded, guarded, metered.",
          cards: [
            { title: "Server-side by default", body: "Every AI call routes through Supabase Edge Functions. Keys never touch the browser. Auth validated inside every function." },
            { title: "Grounded prompts", body: "Fetched verse text is injected verbatim. The model interprets, never quotes scripture from memory." },
            { title: "Usage guards", body: "Decodes · chats · TTS minutes all metered server-side before the model is hit, so free tier can't leak compute." },
            { title: "Model choice", body: "Gemini 2.5 Flash for reasoning; Flash-Lite for cheap prompts. Lovable AI Gateway handles routing, retries, cost." },
          ],
        },
        {
          n: "07.5",
          eyebrow: "RAG Memory",
          title: "The AI that remembers you.",
          body:
            "Retrieval-Augmented Generation grounds every answer in two sources of truth: the actual scripture text, and the user's own study history. No hallucinated verses, no generic advice.",
          cards: [
            { title: "Scripture ground truth", body: "Verse text is fetched fresh per request and injected verbatim. The model interprets — it never quotes from parametric memory." },
            { title: "Personal memory index", body: "Every decode + journal entry auto-embeds into a pgvector store (user_memory_embeddings, 1536-dim, text-embedding-3-small)." },
            { title: "Contextual retrieval", body: "Top-5 semantic matches pulled per query via match_user_memories RPC, shown in-chat as 'Grounded in your study' chips." },
          ],
          bullets: [
            "Zero hallucination on scripture — the highest-stakes failure mode for a Bible product.",
            "Continuity — the AI recalls prior study sessions instead of restarting cold every time.",
            "Personal, not generic — answers cite the user's own past reflections back to them.",
            "Backfill safe — a Settings tool re-embeds historical entries on demand.",
          ],
        },
        {
          n: "08",
          eyebrow: "Backend & Security",
          title: "Locked down from day one.",
          body:
            "Postgres with RLS on every user-facing table, dedicated roles table with SECURITY DEFINER helpers, and a passed security scan with memory documented for future scans.",
          bullets: [
            "RLS enabled on 100% of user-facing tables with explicit GRANTs per role",
            "Roles stored in a dedicated user_roles table with has_role() SECURITY DEFINER",
            "Client INSERT/UPDATE removed on usage_tracking, streaks, achievements",
            "SECURITY DEFINER functions revoked from anon/authenticated where not needed",
            "Google OAuth via managed provider — no risky password fallback pushed",
            "10 security findings resolved · guidance stored in security memory",
          ],
        },
        {
          n: "09",
          eyebrow: "Monetization",
          title: "Four tiers · real free · global tax handled.",
          body:
            "Paddle as merchant of record handles global tax and compliance. The free tier is a one-time lifetime quota — not a monthly leak.",
          table: {
            head: ["Tier", "Price", "Decodes", "For"],
            rows: [
              ["Free", "$0", "5 lifetime", "Try the product"],
              ["Starter", "$7 / mo", "75 / mo", "Curious reader"],
              ["Pro", "$15 / mo", "300 / mo", "Serious student"],
              ["Unlimited", "$29 / mo", "1,000 / mo", "Pastors & teachers"],
            ],
          },
        },
        {
          n: "10",
          eyebrow: "Launch Readiness",
          title: "Shipped for launch, not for demo.",
          cards: [
            { title: "Legal", body: "Terms · Privacy · Refund policies aligned to Paddle MoR requirements." },
            { title: "Account deletion", body: "Full DB purge + Paddle cancellation in one flow." },
            { title: "Onboarding", body: "7-step branded flow triggered for every new user — Google included." },
            { title: "Self-service", body: "Product tour + /docs eliminate the first wave of support tickets." },
            { title: "Admin panel", body: "/admin/testers to gift subscriptions without touching Paddle." },
            { title: "Marketing", body: "Remotion-generated 60-second explainer embedded on hero 'Watch Demo'." },
          ],
        },
        {
          n: "11",
          eyebrow: "Metrics",
          title: "The numbers behind the build.",
          cards: [
            { title: "70+", body: "Custom routes shipped" },
            { title: "45+", body: "Edge Functions in production" },
            { title: "18", body: "Bible languages supported" },
            { title: "15", body: "Interactive tour steps" },
            { title: "10", body: "Security findings resolved" },
            { title: "4", body: "Paddle pricing tiers" },
          ],
        },
        {
          n: "12",
          eyebrow: "Lessons",
          title: "What I'd tell the next founder.",
          cards: [
            { title: "Design consistency compounds", body: "Every feature shipped outside the system stood out — and not in a good way. Treat the design system as a hard dependency." },
            { title: "Ground the AI or die by hallucination", body: "Early decode outputs mis-quoted verses. Fixing that meant fetching real text server-side and injecting it into every prompt." },
            { title: "Free tier is a business decision", body: "Monthly-resetting free tiers bleed compute forever. A lifetime free quota preserved try-before-you-buy while capping the loss." },
            { title: "RLS is not optional", body: "Every table got policies + GRANTs from day one. A security scan later validated the discipline — 10 findings, zero incidents." },
          ],
        },
      ],
      ctas: [
        { label: "Explore Bible Decoder", href: "https://www.bibledecoder.sbs/" },
        { label: "Read the Docs", href: "https://www.bibledecoder.sbs/docs" },
      ],
    },
  },


  {
    slug: "helpnow",
    title: "HelpNow",
    tagline: "On-demand help, one tap away.",
    year: "2025",
    href: "https://helpnow.fun",
    caseStudyEmbedUrl: "https://helpnow.fun/case-study",
    role: "Founder, Designer, Full-stack Builder",
    stack: ["React", "Vite", "Tailwind", "Lovable Cloud", "Realtime"],
    problem:
      "Getting quick, trusted help for everyday tasks is fragmented across chats, calls, and classifieds.",
    process:
      "Designed and shipped a single-tap request flow with realtime matching, transparent status, and a minimal, calm UI.",
    outcome: "Live product connecting seekers and helpers with clarity and speed.",
    metrics: [
      { k: "1-tap", v: "request flow" },
      { k: "realtime", v: "matching" },
      { k: "live", v: "in production" },
    ],
  },

  {
    slug: "suvadi",
    title: "Suvadi",
    tagline: "A new taste of the web — case study embedded.",
    year: "2025",
    href: "https://suvadi.space",
    caseStudyEmbedUrl: "https://suvadi.space/case-study",
    role: "Founder, Designer, Full-stack Builder",
    stack: ["React", "Vite", "Tailwind", "Lovable Cloud"],
    problem: "See embedded case study.",
    process: "See embedded case study.",
    outcome: "See embedded case study.",
    metrics: [
      { k: "live", v: "in production" },
    ],
  },

  {
    slug: "epicmusic",
    title: "EpicMusic",
    tagline: "AI-powered music discovery & creation — case study embedded.",
    year: "2025",
    href: "https://epicmusic.cloud",
    caseStudyEmbedUrl: "https://www.epicmusic.cloud/case-study",
    role: "Founder, Designer, Full-stack Builder",
    stack: ["React", "Vite", "Tailwind", "Lovable Cloud"],
    problem: "See embedded case study.",
    process: "See embedded case study.",
    outcome: "See embedded case study.",
    metrics: [
      { k: "live", v: "in production" },
    ],
  },
];


export function findProject(slug: string): Project | undefined {
  const q = slug.toLowerCase().trim();
  return PROJECTS.find(
    (p) => p.slug === q || p.title.toLowerCase().includes(q),
  );
}
