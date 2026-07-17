import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Home, User, Briefcase, Wrench, FolderGit2, MessageCircle, Sparkles, Quote, ArrowUpRight, Star } from "lucide-react";
import { TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { ScrollBrightText } from "@/components/ui/scroll-bright-text";
import { Dock, DockIcon } from "@/components/ui/dock";
import { BorderBeam } from "@/components/ui/border-beam";
import { RamliChat } from "@/components/RamliChat";
import { IdeShell } from "@/components/ide/IdeShell";
import { ProjectTerminal } from "@/components/ProjectTerminal";
import { PROJECTS } from "@/lib/projects";

import portraitAsset from "@/assets/ramli-portrait.png.asset.json";
import portraitHoverAsset from "@/assets/ramli-portrait-hover.png.asset.json";




export const Route = createFileRoute("/")({
  component: Index,
});

const EMAIL = "hiremike.lee@gmail.com";
const PHONE = "+91 9731345524";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ramli-michael-6662b133" },
  { label: "GitHub", href: "https://github.com/ramlimicheal" },
  { label: "BibleDecoder", href: "https://bibledecoder.sbs" },
  { label: "Email", href: `mailto:${EMAIL}` },
];

const NAME_TRANSLATIONS = [
  "ராம்லி டி. மைக்கேல்",       // Tamil (first)
  "Ramli T. Michael",       // English
  "रामली टी. माइकल",         // Hindi
  "ರಾಮ್ಲಿ ಟಿ. ಮೈಕಲ್",          // Kannada
  "拉姆利·T·迈克尔",           // Chinese
  "ラムリ・T・マイケル",         // Japanese
  "라믈리 T. 마이클",           // Korean
  "رملي ت. مايكل",           // Arabic
  "Рамли Т. Майкл",         // Russian
  "Ραμλί Τ. Μάικλ",         // Greek
  "רמלי ט. מייקל",           // Hebrew
];


const TOOL_GROUPS = [
  {
    title: "AI & Vibe Coding",
    items: ["Lovable (L4 Platinum)", "Cursor", "Claude", "ChatGPT", "Windsurf"],
  },
  {
    title: "Design & Prototyping",
    items: ["Figma", "Adobe XD", "Sketch", "InVision", "Axure"],
  },
  {
    title: "Creative & Motion",
    items: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "InDesign"],
  },
  {
    title: "Generative Media",
    items: ["MidJourney", "Runway", "Prompt Engineering", "LLM Workflows"],
  },
];

const WORK_HISTORY = [
  {
    company: "The Branding Machans",
    role: "Founder & Creative Technologist",
    period: "Mar 2022 — Present",
    bullets: [
      "Founded and scaled a branding consultancy serving 40+ SMEs, NGOs, and businesses across India, the US, and Oman.",
      "Transitioned the studio into AI-powered product development — shipping functional websites, dashboards, and web apps beyond mockups.",
      "Solo-designed and deployed BibleDecoder.sbs — a production AI-native platform — using Lovable, Cursor, and Claude.",
      "Integrated MidJourney, Runway, and generative AI into client workflows, reducing average delivery time by 40%.",
    ],
  },
  {
    company: "Indegene",
    role: "Associate Creative Lead",
    period: "Mar 2021 — Mar 2022",
    bullets: [
      "Directed HCP engagement campaigns and digital detailing assets for AstraZeneca's oncology portfolio, including Calquence launch collateral.",
      "Executed 12–15 digital campaigns per year across AstraZeneca, Mundipharma, and Calquence, increasing client engagement by 15%.",
      "Supervised 5–7 designers across 20–25 concurrent projects, reducing design inconsistencies by 22%.",
    ],
  },
  {
    company: "BEEHUB (acquired by InMobi)",
    role: "Senior Art Director",
    period: "Sep 2019 — Aug 2020",
    bullets: [
      "Art-directed the complete in-house brand identity for a short-form news platform later acquired by InMobi.",
      "Maintained 98% brand consistency across app, website, social, and print touchpoints.",
      "Coordinated with cross-functional teams of 8+ to produce branded content across email, video, and digital.",
    ],
  },
  {
    company: "Zenoti",
    role: "Creative Director",
    period: "Jul 2015 — Dec 2015",
    bullets: [
      "Directed creative output for a B2B SaaS platform serving 30,000+ businesses in 50+ countries.",
      "Designed 20+ marketing collateral pieces, landing pages, and sales decks used to pitch salon chains and enterprise spa groups.",
      "Led creative sessions and supervised a team of 4+, enforcing quality and brand consistency across all output.",
    ],
  },
  {
    company: "Trivone Content Services",
    role: "Senior Creative Designer / Team Lead",
    period: "Jul 2014 — Feb 2015",
    bullets: [
      "Led a design team of 6+ across Bangalore and Mumbai for clients in IT/ITeS, BFSI, Telecom, and Media.",
      "Designed 15+ corporate presentations, white papers, and microsites for Vodafone and Airtel.",
      "Contributed creative assets for Satyamev Jayate, Digital India, and MyGov.in campaigns.",
    ],
  },
  {
    company: "ONEIC — Muscat, Oman",
    role: "Assistant Media Head",
    period: "Apr 2011 — Jul 2013",
    bullets: [
      "Founded the ONEIC Media department from scratch, reporting to the CEO.",
      "Produced 10+ video ads for Nawras, Omantel, and BankMuscat, deployed on digital signage across Oman.",
      "Established a 50+ location digital signage network that became a significant revenue stream.",
    ],
  },
];

const SELECTED_WORK = [
  {
    title: "BibleDecoder",
    description: "Solo-designed and shipped production web platform using Lovable, Cursor, and Claude — prompt-engineered end to end.",
    source: "Live Site",
    year: "2025",
    href: "https://bibledecoder.sbs",
  },
  {
    title: "AstraZeneca — Calquence Launch",
    description: "Directed HCP engagement and launch collateral for AstraZeneca's oncology portfolio across multiple markets.",
    source: "Case Study",
    year: "2021",
    href: "#",
  },
  {
    title: "BEEHUB Brand Identity",
    description: "Complete in-house brand system for a short-form news platform, later acquired by InMobi.",
    source: "Case Study",
    year: "2020",
    href: "#",
  },
];

// Deep case studies (bento)
const CASE_STUDIES = [
  {
    title: "BibleDecoder",
    tagline: "AI-native scripture exploration platform",
    year: "2025",
    href: "https://bibledecoder.sbs",
    role: "Founder, Designer, Prompt Engineer",
    stack: ["Lovable", "Claude", "Supabase", "OpenAI"],
    span: "md:col-span-2 md:row-span-2",
    tone: "from-amber-500/10 via-transparent to-transparent",
    problem: "Bible study apps are locked in denominational silos, with clunky UX and zero contextual AI.",
    process: "Solo-shipped end-to-end in 6 weeks — prompt-engineered the semantic search layer, designed the reading UI in Figma, and built the full stack with Lovable + Claude. Iterated 40+ prompt cycles for a hallucination-free study experience.",
    outcome: "Live production platform serving readers across 12 countries in its first month.",
    metrics: [
      { k: "6 wks", v: "solo build" },
      { k: "12", v: "countries" },
      { k: "40+", v: "prompt iterations" },
    ],
  },
  {
    title: "AstraZeneca · Calquence",
    tagline: "HCP engagement for oncology launch",
    year: "2021",
    href: "#",
    role: "Associate Creative Lead, Indegene",
    stack: ["Digital detailing", "eDetail", "Motion"],
    span: "",
    tone: "from-rose-500/10 via-transparent to-transparent",
    problem: "Launching Calquence to hematologists across markets during a fully remote era.",
    process: "Directed the digital detailing suite — interactive eDetails, HCP portals, launch collateral — with a team of 5–7 designers across 20+ concurrent workstreams.",
    outcome: "15% increase in HCP engagement across the campaign portfolio.",
    metrics: [
      { k: "+15%", v: "engagement" },
      { k: "12–15", v: "campaigns/yr" },
    ],
  },
  {
    title: "BEEHUB Brand System",
    tagline: "Identity for a news app acquired by InMobi",
    year: "2020",
    href: "#",
    role: "Senior Art Director",
    stack: ["Brand", "Motion", "Product"],
    span: "",
    tone: "from-sky-500/10 via-transparent to-transparent",
    problem: "Zero brand equity for a launch-stage short-form news product.",
    process: "Built the full identity system — logo, motion, product UI, social — from scratch in-house.",
    outcome: "98% brand consistency across every surface. Company acquired by InMobi.",
    metrics: [
      { k: "98%", v: "consistency" },
      { k: "8+", v: "team members" },
    ],
  },
];




// Skills matrix — proficiency + years
const SKILL_MATRIX = [
  { group: "AI & Vibe Coding", skills: [
    { name: "Lovable (L4 Platinum)", level: 98, years: 2 },
    { name: "Prompt Engineering", level: 95, years: 3 },
    { name: "Claude / Cursor / Windsurf", level: 92, years: 2 },
    { name: "LLM Workflow Design", level: 88, years: 2 },
  ]},
  { group: "Design & Brand", skills: [
    { name: "Brand Strategy", level: 96, years: 18 },
    { name: "Art Direction", level: 95, years: 15 },
    { name: "UI / UX Design", level: 92, years: 12 },
    { name: "Design Systems", level: 88, years: 8 },
  ]},
  { group: "Creative & Motion", skills: [
    { name: "Figma", level: 95, years: 8 },
    { name: "Adobe Suite", level: 96, years: 18 },
    { name: "After Effects · Motion", level: 82, years: 10 },
    { name: "MidJourney · Runway", level: 90, years: 3 },
  ]},
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "Ramli translated our messy vision into a launch-ready brand system in weeks. Rare combination of taste and speed.",
    name: "Product Director",
    org: "InMobi (BEEHUB)",
  },
  {
    quote: "The Calquence detailing suite raised the bar for HCP engagement in the region. His creative direction was surgical.",
    name: "Client Lead",
    org: "AstraZeneca (via Indegene)",
  },
  {
    quote: "Watching him ship a full production platform solo with Lovable convinced me AI-native design is the real deal.",
    name: "Founder",
    org: "Early BibleDecoder user",
  },
];

// Playground — AI experiments & side projects
const PLAYGROUND = [
  { title: "Prompt libraries", desc: "Reusable prompt packs for brand voice, UX copy, and design critique." },
  { title: "Generative moodboards", desc: "MidJourney + Runway workflows that compress mood-boarding from days to minutes." },
  { title: "AI-native wireframes", desc: "Design tokens that map straight to Lovable prompts." },
  { title: "Micro-tools", desc: "One-shot utilities built with Lovable in a single sitting." },
  { title: "Talks & teardowns", desc: "Public design teardowns of shipped AI products." },
  { title: "L4 Platinum practice", desc: "Ongoing Lovable certification work and community mentorship." },
];

const BRAND_LOGOS = [
  "AstraZeneca", "Mundipharma", "Vodafone", "Airtel", "Zenoti", "InMobi", "Omantel", "BankMuscat", "MyGov.in",
];


function useTypewriter(words: string[], typeMs = 90, deleteMs = 40, holdMs = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((n) => (n + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
      );
    }, deleting ? deleteMs : typeMs);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeMs, deleteMs, holdMs]);

  return text;
}

function SkillBar({ name, level, years }: { name: string; level: number; years: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <li ref={ref}>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-foreground/90">{name}</span>
        <span className="text-xs text-muted-foreground">{years}y</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border/70">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-foreground/85"
        />
      </div>
    </li>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [terminalKey, setTerminalKey] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTerminalKey((k) => k + 1), 9000);
    return () => clearInterval(id);
  }, []);
  const typed = useTypewriter(NAME_TRANSLATIONS);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // no-op
    }
  };

  return (
    <IdeShell>
    <div className="bg-background text-foreground">
      <header className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">

        <a href="/" className="min-w-0 truncate text-sm font-medium tracking-tight" aria-label="Ramli T. Michael">
          <span>{typed}</span>
          <span className="ml-0.5 inline-block w-[1ch] text-muted-foreground animate-pulse">_</span>
        </a>

        <nav className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground sm:gap-4">
          <span className="hidden lg:inline">Open to full-time and contract work</span>
          <span className="hidden lg:inline text-muted-foreground/60">/</span>
          <a
            href={`mailto:${EMAIL}`}
            className="hidden md:inline text-foreground/90 hover:text-foreground transition-colors"
          >
            {EMAIL}
          </a>
          <button
            onClick={copyEmail}
            className="shrink-0 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Copy email address"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 pb-32">
        {/* Hero */}
        <section id="home" className="relative pt-16 sm:pt-20 md:pt-28">

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16">
            <div className="relative max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Available
                </p>
              </div>


              <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                  Ramli T. Michael
                </span>
              </h1>

              {/* Frameless terminal — the wow */}
              <pre className="mt-8 font-mono text-sm sm:text-[15px] leading-relaxed text-foreground/90">
                <code key={terminalKey} className="grid gap-y-1">
                  <TypingAnimation className="text-muted-foreground">
                    {"> whoami"}
                  </TypingAnimation>
                  <AnimatedSpan delay={1200} className="text-foreground">
                    Creative Technologist · AI-First Designer
                  </AnimatedSpan>
                  <TypingAnimation delay={1800} className="text-muted-foreground">
                    {"> cat stack.txt"}
                  </TypingAnimation>
                  <AnimatedSpan delay={3200} className="text-foreground/80">
                    ✔ 18+ yrs · brand · UI/UX · art direction
                  </AnimatedSpan>
                  <AnimatedSpan delay={3500} className="text-foreground/80">
                    ✔ AI product dev · Lovable L4 Platinum
                  </AnimatedSpan>
                  <AnimatedSpan delay={3800} className="text-foreground/80">
                    ✔ shipped: BibleDecoder
                  </AnimatedSpan>
                  <TypingAnimation delay={4400} className="text-muted-foreground">
                    {"> status --hire"}
                  </TypingAnimation>
                  <AnimatedSpan delay={5600} className="text-foreground/80">
                    ℹ Open to full-time &amp; founding roles
                  </AnimatedSpan>
                  <AnimatedSpan delay={5900} className="flex items-center gap-1 text-foreground">
                    <span>{"$"}</span>
                    <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
                  </AnimatedSpan>
                </code>
              </pre>

            </div>

            <div className="group relative order-first md:order-last shrink-0 mx-auto md:mx-0 md:-my-16">
              <img
                src={portraitAsset.url}
                alt="Ramli T. Michael"
                className="h-96 w-96 sm:h-[30rem] sm:w-[30rem] md:h-[38rem] md:w-[38rem] object-cover grayscale contrast-125 brightness-110 mix-blend-lighten transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 95%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 55%, transparent 95%)",
                }}
                loading="eager"
              />
              <img
                src={portraitHoverAsset.url}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-96 w-96 sm:h-[30rem] sm:w-[30rem] md:h-[38rem] md:w-[38rem] object-cover contrast-110 brightness-105 mix-blend-lighten opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 95%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 55%, transparent 95%)",
                }}
                loading="eager"
              />
            </div>






          </div>
        </section>




        {/* Keyword marquee */}
        <div className="mt-16 md:mt-20 relative overflow-hidden border-y border-border/60 py-3 -mx-4 sm:-mx-6 md:-mx-10">
          <div
            className="flex gap-10 whitespace-nowrap text-xs uppercase tracking-[0.24em] text-muted-foreground"
            style={{ animation: "marquee 32s linear infinite" }}
          >
            {[
              "Brand Strategy", "Art Direction", "UI / UX", "AI Products",
              "Vibe Coding", "Design Systems", "Motion", "Prototyping",
              "Brand Strategy", "Art Direction", "UI / UX", "AI Products",
              "Vibe Coding", "Design Systems", "Motion", "Prototyping",
            ].map((k, i) => (
              <span key={i} className="flex items-center gap-10">
                {k}
                <span aria-hidden className="text-muted-foreground/40">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Meta / socials */}
        <section className="mt-10 md:mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-10">

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>Bengaluru, India</span>
            <span className="text-muted-foreground/50">/</span>
            <span>{PHONE}</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {SOCIALS.map((link, i, arr) => (
              <li key={link.label} className="flex items-center gap-3">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground/50">/</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section id="about" className="grid grid-cols-1 gap-10 pt-16 md:grid-cols-3 md:pt-24">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            About
          </h2>
          <ScrollBrightText
            className="md:col-span-2 space-y-6 text-base md:text-lg leading-relaxed text-foreground max-w-2xl"
            paragraphClassName=""
          >
            {[
              "I'm a Creative Technologist with 18+ years across brand strategy, art direction, UI/UX, and AI-powered product development. I've led creative teams in Bengaluru, Mumbai, and Muscat for AstraZeneca, Vodafone, Airtel, and Zenoti, and founded two creative studios along the way.",
              "Over the past two years I've rebuilt my studio around AI — prompt engineering, LLM-assisted development, and generative workflows — shipping BibleDecoder.sbs, a production AI-native web platform, solo using Lovable, Cursor, and Claude. I'm Lovable L4 Platinum certified.",
              "Based in Bengaluru. Available for full-time, contract, and advisory work with founders, agencies, and product teams.",
            ]}


          </ScrollBrightText>
        </section>




        {/* Work history */}
        <section id="work" className="grid grid-cols-1 gap-10 border-t border-border pt-16 mt-16 md:grid-cols-[minmax(0,1fr)_2fr] md:pt-24 md:mt-24">

          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Work History
          </h2>
          <div className="divide-y divide-border">
            {WORK_HISTORY.map((job, i) => (
              <article
                key={job.company}
                className={i === 0 ? "pb-10" : "py-10"}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-base md:text-lg">
                    <span className="font-semibold text-foreground">{job.company}</span>
                    <span className="mx-2 text-muted-foreground/50">/</span>
                    <span className="text-foreground/90">{job.role}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <ul className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground max-w-2xl">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Tools */}
        {/* Projects — interactive terminal */}
        <section id="projects" className="border-t border-border pt-16 mt-16 md:pt-24 md:mt-24">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Projects
              </h2>
              <p className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight max-w-2xl">
                <span className="text-muted-foreground">~/ramli</span> $ ls projects/
              </p>
            </div>
            <span className="text-sm text-muted-foreground">{PROJECTS.length} items · 2020 — 2025</span>
          </div>

          <div className="mt-10">
            <ProjectTerminal />
          </div>

          <p className="mt-4 text-xs text-muted-foreground font-mono">
            <span className="text-primary">↳</span> type <span className="text-foreground">help</span>, <span className="text-foreground">ls</span>, or <span className="text-foreground">open bibledecoder</span>
          </p>
        </section>

        <section id="tools" className="grid grid-cols-1 gap-10 border-t border-border pt-16 mt-16 md:grid-cols-3 md:pt-24 md:mt-24">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Tools
          </h2>
          <div className="md:col-span-2 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {TOOL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3 text-base md:text-lg">
                  {group.items.map((item) => (
                    <li key={item} className="text-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>



        {/* Skills Matrix */}
        <section id="skills" className="grid grid-cols-1 gap-10 border-t border-border pt-16 mt-16 md:grid-cols-[minmax(0,1fr)_2fr] md:pt-24 md:mt-24">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Skills Matrix</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xs">
              Proficiency + years across the disciplines I ship in.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {SKILL_MATRIX.map((g) => (
              <div key={g.group}>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{g.group}</h3>
                <ul className="mt-5 space-y-4">
                  {g.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} years={s.years} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials + Brands */}
        <section id="testimonials" className="border-t border-border pt-16 mt-16 md:pt-24 md:mt-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_2fr]">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Testimonials</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.figure
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-2xl border border-border bg-card/40 p-6"
                >
                  <Quote className="h-5 w-5 text-muted-foreground/60" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 text-xs text-muted-foreground">
                    <div className="font-medium text-foreground/80">{t.name}</div>
                    <div>{t.org}</div>
                  </figcaption>
                  <div className="mt-4 flex gap-0.5 text-foreground/80">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </motion.figure>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_2fr] md:items-center">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Trusted by</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-lg md:text-xl font-medium text-muted-foreground">
              {BRAND_LOGOS.map((b) => (
                <span key={b} className="hover:text-foreground transition-colors">{b}</span>
              ))}
            </div>
          </div>
        </section>

      </main>


      {/* Footer */}
      <footer className="mt-24 md:mt-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-base font-semibold">Ramli T. Michael</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Open to full-time and contract work
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-foreground/90 hover:text-foreground transition-colors"
              >
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">© 2026 Ramli T. Michael</p>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              {SOCIALS.map((link, i, arr) => (
                <li key={link.label} className="flex items-center gap-3">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground/50">/</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating chat launcher (same dock styling) */}
      <div className="pointer-events-none fixed bottom-28 right-4 z-50 md:bottom-10 md:right-6">
        <div className="pointer-events-auto relative rounded-2xl">
          <Dock className="relative">
            <DockIcon>
              <button
                onClick={() => setChatOpen((v) => !v)}
                aria-label="Chat with Ramli"
                title="Chat with Ramli"
                className="relative flex h-full w-full items-center justify-center"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              </button>
            </DockIcon>
          </Dock>
          <BorderBeam size={80} duration={6} colorFrom="var(--primary)" colorTo="transparent" />
          <BorderBeam size={80} duration={6} delay={3} colorFrom="var(--primary)" colorTo="transparent" />
        </div>
      </div>



      <RamliChat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
    </IdeShell>

  );
}

