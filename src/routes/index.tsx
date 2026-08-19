import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExtendedSections, faqList } from "@/components/ExtendedSections";
import { ResearchRecommendation } from "@/components/ResearchRecommendation";
import AlumniReviews from "@/components/AlumniReviews";
import {
  AuthorByline,
  AuthorEEAT,
  ExperienceNote,
} from "@/components/AuthorEEAT";
import { AUTHOR } from "@/lib/author";
import { LINKS } from "@/lib/links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "LogicMojo vs Scaler: Which AI Course Is Better in 2026?",
      },
      {
        name: "description",
        content:
          "An honest, transparent comparison of LogicMojo vs Scaler AI & ML programs in 2026 — curriculum, fees, projects, mentorship, placements, and value for money, with a published scoring rubric.",
      },
      { name: "author", content: "LogicMojo" },
      {
        property: "og:title",
        content: "LogicMojo vs Scaler: Which AI Course Is Better in 2026?",
      },
      {
        property: "og:description",
        content:
          "A transparent, methodology-published comparison of the LogicMojo and Scaler AI & ML programs — curriculum, fees, projects, mentorship, placements, and value for money.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@LogicMojo" },
    ],
  }),
  component: Article,
});

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Row = {
  dimension: string;
  logicmojo: string;
  scaler: string;
  edge: string;
  edgeSide: "lm" | "sc" | "tie" | "dep";
};

const comparisonRows: Row[] = [
  {
    dimension: "Provider type",
    logicmojo:
      "Focused upskilling provider; interview-prep heritage (DSA + System Design)",
    scaler:
      "Large-scale EdTech ecosystem (Scaler Academy, DSML/AI, School of Technology)",
    edge: "Depends on preference",
    edgeSide: "dep",
  },
  {
    dimension: "Program length",
    logicmojo: "~7 months",
    scaler: "~12 months (shorter ~7-month “Advanced” track for those who test in)",
    edge: "LogicMojo for time-to-capability; Scaler for runway depth",
    edgeSide: "lm",
  },
  {
    dimension: "Listed fee (indicative)",
    logicmojo: "₹65,000, GST inclusive",
    scaler:
      "~₹2.5L–₹3.7L band (aggregators list ~₹3.69L; scholarships up to ~₹25K reported)",
    edge: "LogicMojo — roughly one-fifth the cost",
    edgeSide: "lm",
  },
  {
    dimension: "EMI availability",
    logicmojo: "Yes (provider cites EMIs around ₹5,160/month)",
    scaler: "Yes (EMI and financing partners; terms vary)",
    edge: "LogicMojo (smaller principal = lower EMI burden and risk)",
    edgeSide: "lm",
  },
  {
    dimension: "2026 AI stack coverage (GenAI, RAG, agents)",
    logicmojo:
      "Yes — LLMs, RAG, agentic AI are core curriculum, not add-on modules",
    scaler: "Yes — program updated for RAG, multi-agent systems, LLMOps",
    edge: "Tie on coverage; LogicMojo edges on proportion of course devoted to it",
    edgeSide: "lm",
  },
  {
    dimension: "Classical ML & deep learning foundations",
    logicmojo: "Covered end-to-end (Python → ML → DL)",
    scaler:
      "Covered end-to-end with a longer foundations runway (Excel, SQL, statistics onward)",
    edge: "Scaler for absolute-beginner runway length",
    edgeSide: "sc",
  },
  {
    dimension: "DSA & problem-solving",
    logicmojo:
      "Strong heritage — dedicated DSA + System Design track; interview-calibrated problem solving in AI course",
    scaler:
      "Deep problem-solving culture; in-house coding platform and judges; exhaustive DSA in Academy track",
    edge: "Scaler for exhaustive depth; LogicMojo for interview-efficient coverage",
    edgeSide: "tie",
  },
  {
    dimension: "Projects",
    logicmojo: "15+ hands-on projects incl. GenAI/RAG/agent builds; portfolio-oriented capstones",
    scaler: "Module-by-module projects tied to business cases; interview-ready builds",
    edge: "Broadly tie — different shapes (see Projects section)",
    edgeSide: "tie",
  },
  {
    dimension: "Mentorship model",
    logicmojo: "1-on-1 mentorship + direct instructor access; live doubt resolution",
    scaler: "Structured 1:1 mentor sessions at scale; structured career check-ins",
    edge: "Tie — genuinely strong on both sides, different models",
    edgeSide: "tie",
  },
  {
    dimension: "Live classes",
    logicmojo:
      "Live cohort classes, weekend-friendly scheduling; ~8–10 hrs/week class load reported by learners",
    scaler: "Live classes, multiple sessions weekly; schedule varies by batch",
    edge: "LogicMojo for working-professional scheduling",
    edgeSide: "lm",
  },
  {
    dimension: "Recorded access",
    logicmojo: "Lifetime access to recordings and updated content (provider-stated)",
    scaler: "Lifetime access to recorded content (provider-stated)",
    edge: "Tie",
    edgeSide: "tie",
  },
  {
    dimension: "Entrance barrier",
    logicmojo: "Open enrolment; counselling call to assess fit",
    scaler: "30-minute MCQ entrance test determines level/track",
    edge: "Depends — Scaler’s test aids cohort levelling; LogicMojo’s open door is faster",
    edgeSide: "dep",
  },
  {
    dimension: "Batch size & attention",
    logicmojo: "Smaller cohorts; instructor-led attention (provider-positioned)",
    scaler: "Large cohorts; scale-driven delivery with strong systems",
    edge: "LogicMojo for attention; Scaler for peer-network size",
    edgeSide: "tie",
  },
  {
    dimension: "Alumni network",
    logicmojo: "Growing; concentrated in product companies (provider-reported)",
    scaler: "1,00,000+ alumni community (provider-reported) — one of India’s largest",
    edge: "Scaler, clearly",
    edgeSide: "sc",
  },
  {
    dimension: "Brand recognition with recruiters",
    logicmojo: "Moderate and growing; judged on skills/portfolio",
    scaler: "High — among the strongest EdTech brands in Indian tech hiring",
    edge: "Scaler, clearly",
    edgeSide: "sc",
  },
  {
    dimension: "Career support",
    logicmojo: "Placement assistance, resume/portfolio review, mock interviews, referrals",
    scaler: "Mature placement operation, career coaches, AI mock interview platform, structured check-ins",
    edge: "Scaler on machinery scale; LogicMojo competitive on per-learner attention",
    edgeSide: "sc",
  },
  {
    dimension: "Placement claims",
    logicmojo: "Provider-reported alumni outcomes; no independent audit",
    scaler: "Provider-reported partner counts and outcomes; no independent audit",
    edge: "Tie — neither is independently audited; treat both accordingly",
    edgeSide: "tie",
  },
  {
    dimension: "Certificate",
    logicmojo: "LogicMojo AI Engineer certification",
    scaler: "Scaler program certificate",
    edge: "Scaler on brand recall; neither is a university degree",
    edgeSide: "sc",
  },
  {
    dimension: "Weekly time needed",
    logicmojo: "~10–15 hrs (classes + assignments)",
    scaler: "~15–20 hrs typical for full value across 12 months",
    edge: "LogicMojo for job-compatibility",
    edgeSide: "lm",
  },
  {
    dimension: "Financial risk if life interrupts",
    logicmojo: "Lower — smaller fee, shorter commitment",
    scaler: "Higher — larger fee, longer commitment, EMI continues regardless",
    edge: "LogicMojo",
    edgeSide: "lm",
  },
  {
    dimension: "Best for",
    logicmojo: "Working professionals, career switchers staying employed, value-focused learners, freshers on a budget",
    scaler: "Learners with 12+ months and ₹3L+ budget wanting maximum structure, brand, and network",
    edge: "—",
    edgeSide: "dep",
  },
];

type Score = {
  criterion: string;
  weight: string;
  lm: number;
  sc: number;
  reason: string;
  winner: "lm" | "sc" | "tie";
};

const scores: Score[] = [
  {
    criterion: "Curriculum & 2026 currency",
    weight: "20%",
    lm: 9.0,
    sc: 8.0,
    reason:
      "Both cover the modern stack; LogicMojo dedicates a larger share of a shorter program to GenAI/RAG/agents, while Scaler spends more of its runway on extended foundations.",
    winner: "lm",
  },
  {
    criterion: "Projects & portfolio",
    weight: "15%",
    lm: 8.5,
    sc: 8.0,
    reason:
      "LogicMojo’s 15+ projects skew toward deployable GenAI builds; Scaler’s module-tied projects are strong but sit inside a longer, broader arc.",
    winner: "lm",
  },
  {
    criterion: "Mentorship & support",
    weight: "15%",
    lm: 8.5,
    sc: 8.5,
    reason:
      "Genuine tie: LogicMojo’s instructor-proximate 1:1 model vs Scaler’s structured mentor network at scale — different mechanisms, comparable outcomes.",
    winner: "tie",
  },
  {
    criterion: "Format & flexibility",
    weight: "15%",
    lm: 9.0,
    sc: 6.5,
    reason:
      "Weekend-friendly 7-month cohorts with lifetime recordings vs a 12-month multi-session-per-week commitment; the gap is structural, not qualitative.",
    winner: "lm",
  },
  {
    criterion: "Career support & placements",
    weight: "15%",
    lm: 7.5,
    sc: 8.5,
    reason:
      "Scaler’s placement machinery, alumni scale, and brand recall are a real advantage; LogicMojo competes on per-learner attention and referrals but at smaller scale.",
    winner: "sc",
  },
  {
    criterion: "Value for money",
    weight: "20%",
    lm: 9.5,
    sc: 6.0,
    reason:
      "₹65,000 for the current stack in 7 months vs a ₹2.5L–₹3.7L, 12-month commitment; the capability-per-rupee gap is the largest in the comparison.",
    winner: "lm",
  },
];

const toc = [
  { id: "author-eeat", n: "00", title: "Who Wrote This & Why Trust It" },
  { id: "why-this-comparison-exists", n: "1", title: "Why This Comparison Exists" },
  { id: "two-platforms-two-philosophies", n: "2", title: "Two Platforms, Two Philosophies" },
  { id: "the-full-comparison-table", n: "3", title: "The Full Comparison Table" },
  { id: "scoring-system", n: "4", title: "Our Scoring System" },
  { id: "curriculum", n: "5", title: "Curriculum" },
  { id: "dsa", n: "6", title: "DSA & Problem-Solving" },
  { id: "projects", n: "7", title: "Projects & Portfolio" },
  { id: "mentorship", n: "8", title: "Mentorship & Support" },
  { id: "format-duration", n: "9", title: "Format, Duration & Weekly Commitment" },
  { id: "fees", n: "10", title: "Fees & the Real Cost" },
  { id: "flexibility", n: "11", title: "Flexibility Alongside a Job" },
  { id: "placements", n: "12", title: "Career Support & Placements" },
  { id: "who-should-choose-logicmojo", n: "13", title: "Who Should Choose LogicMojo" },
  { id: "who-should-choose-scaler", n: "14", title: "Who Should Choose Scaler" },
  { id: "pros-and-cons", n: "15", title: "Pros and Cons" },
  { id: "value-for-money", n: "16", title: "Value for Money" },
  { id: "verdict", n: "17", title: "The 2026 Verdict" },
  { id: "faqs", n: "18", title: "Frequently Asked Questions" },
  { id: "methodology", n: "19", title: "Methodology & Disclosure" },
  { id: "update-log", n: "20", title: "Editorial Update Log" },
  { id: "research-backed-recommendation", n: "21", title: "My Research-Backed Recommendations" },
  { id: "genai-topics", n: "22", title: "2026 GenAI Syllabus Checklist" },
  { id: "beginner-scorecard", n: "23", title: "Beginner Scorecard" },
  { id: "beginner-audiences", n: "24", title: "Which Course Is Better For You" },
  { id: "placement-truth", n: "25", title: "Assistance vs Guarantee" },
  { id: "course-quiz", n: "26", title: "Find Your Fit — Quiz" },
  { id: "how-i-researched", n: "27", title: "How I Researched This" },
  { id: "alumni-reviews", n: "28", title: "Real Alumni Reviews" },
];

const navLinks = [
  { id: "author-eeat", label: "Who wrote this" },
  { id: "the-full-comparison-table", label: "Comparison" },
  { id: "scoring-system", label: "Scoring" },
  { id: "curriculum", label: "Curriculum" },
  { id: "fees", label: "Fees" },
  { id: "placements", label: "Placements" },
  { id: "research-backed-recommendation", label: "Recommendation" },
  { id: "course-quiz", label: "Quiz" },
  { id: "alumni-reviews", label: "Alumni reviews" },
  { id: "verdict", label: "Verdict" },
  { id: "faqs", label: "FAQs" },
];


/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "lm" | "sc" | "tie" | "dep";
}) {
  const map = {
    lm: "border-accent/50 bg-accent/10 text-accent-foreground",
    sc: "border-primary/40 bg-primary/10 text-primary",
    tie: "border-border bg-secondary text-muted-foreground",
    dep: "border-border bg-transparent text-muted-foreground",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function SectionHeading({
  n,
  id,
  children,
}: {
  n: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 font-heading text-3xl leading-tight text-ink sm:text-4xl"
    >
      <span className="mr-3 font-body text-sm font-semibold tracking-[0.2em] text-accent">
        {n}
      </span>
      {children}
    </h2>
  );
}

function ScoreBar({ value, tone }: { value: number; tone: "lm" | "sc" }) {
  const pct = (value / 10) * 100;
  const bar = tone === "lm" ? "bg-accent" : "bg-primary";
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${bar} transition-[width] duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-sm font-semibold text-ink">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Active-section tracking for the sidebar TOC                         */
/* ------------------------------------------------------------------ */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal] > *"),
    );
    nodes.forEach((n) => n.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay = "0ms";
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function Article() {
  const active = useActiveSection(toc.map((t) => t.id));
  const progress = useScrollProgress();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqList.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />

      {/* ---------------- Sticky header ---------------- */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            className="flex items-baseline gap-2 font-heading text-xl text-ink"
          >
            <span className="gradient-text font-semibold">Logic</span>Mojo
            <span className="hidden font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              · Editorial
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="relative font-body text-sm text-muted-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={LINKS.logicmojoCourse}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 font-body text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
          >
            Explore the Course
          </a>
        </div>
        <div
          className="h-0.5 origin-left bg-[image:var(--gradient-brand)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </header>

      {/* ---------------- Hero ---------------- */}
      <section
        id="top"
        className="gradient-hero relative overflow-hidden border-b border-border/70"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(70% 60% at 50% 20%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 20%, black, transparent 75%)",
          }}
        />
        <div
          data-reveal
          className="relative mx-auto max-w-3xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/70 px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
            2026 Comparison
          </p>
          <h1 className="mt-6 font-heading text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
            LogicMojo vs <span className="gradient-text">Scaler</span>:
            <br className="hidden sm:block" /> Which AI Course Is Better in 2026?
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-sm text-muted-foreground">
            <span className="font-medium text-ink">Last updated: August 2026</span>
            <span aria-hidden>·</span>
            <span>~35 min read</span>
            <span aria-hidden>·</span>
            <span>Published by LogicMojo</span>
          </div>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              { k: "₹65,000", v: "LogicMojo fee" },
              { k: "₹2.5–3.7L", v: "Scaler band" },
              { k: "8.7 / 7.5", v: "Overall score" },
            ].map((s) => (
              <div key={s.v} className="surface-card px-3 py-4">
                <p className="font-heading text-xl text-ink sm:text-2xl">{s.k}</p>
                <p className="mt-1 font-body text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-ink">Disclosure:</strong>{" "}
            This comparison is published by LogicMojo, which offers one of the two
            programs reviewed here. Every claim is labelled, the scoring rubric is
            published in full, and Scaler’s genuine advantages are stated as plainly
            as LogicMojo’s. Read the methodology before you trust any single number.
          </p>
        </div>
      </section>


      {/* ---------------- 30-second answer ---------------- */}
      <section className="border-b border-border/70 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The 30-second answer
              </p>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-ink sm:text-4xl">
                The honest summary, in half a minute.
              </h2>
            </div>
            <div className="space-y-4">
              <div className="surface-card border-accent/40 p-5">
                <p className="font-body text-sm text-muted-foreground">
                  Best for most learners
                </p>
                <p className="mt-1 font-heading text-2xl text-ink">
                  LogicMojo AI & ML Course
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  A 7-month, live, mentor-led program covering the full 2026 AI stack
                  (ML, deep learning, GenAI, RAG, AI agents) at a listed fee of{" "}
                  <strong className="font-semibold text-ink">₹65,000</strong> (GST
                  inclusive, EMI available) — roughly one-fifth of Scaler’s listed
                  fee — with a weekend-friendly schedule. Weighted score:{" "}
                  <strong className="font-semibold text-accent">8.7 / 10</strong>.
                </p>
                <a
                  href={LINKS.logicmojoCourse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex font-body text-sm font-semibold text-accent underline underline-offset-4 hover:text-primary"
                >
                  View the official LogicMojo AI &amp; ML course page ↗
                </a>
              </div>
              <div className="surface-card border-primary/30 p-5">
                <p className="font-body text-sm text-muted-foreground">
                  Best for a 12-month immersive runway
                </p>
                <p className="mt-1 font-heading text-2xl text-ink">
                  Scaler AI & Machine Learning
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Longer, broader, backed by a large alumni network and a mature
                  placement machine, at a listed fee in the{" "}
                  <strong className="font-semibold text-ink">₹2.5L–₹3.7L</strong> band.
                  Weighted score:{" "}
                  <strong className="font-semibold text-primary">7.5 / 10</strong>.
                </p>
                <a
                  href={LINKS.scalerCourse}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-3 inline-flex font-body text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent"
                >
                  View the official Scaler DS/AI &amp; ML program page ↗
                </a>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                The deciding variables: your budget, your weekly time, and whether you
                need a 12-month structured immersion or a focused, current, applied AI
                capability in roughly half the time and a fraction of the cost. All fees
                are indicative as of August 2026; confirm current pricing with each
                provider. Nothing here is a placement or salary guarantee — from either
                provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Body: sidebar + content ---------------- */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 py-14 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14 lg:py-20">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Contents
              </p>
              <ol className="mt-4 space-y-1.5 border-l border-border pl-4">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`flex items-baseline gap-2 py-1 font-body text-sm transition-colors ${
                        active === t.id
                          ? "font-semibold text-accent"
                          : "text-muted-foreground hover:text-ink"
                      }`}
                    >
                      <span className="font-mono text-xs text-accent/70">{t.n}</span>
                      <span>{t.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <a
                href={LINKS.logicmojoCourse}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 font-body text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore LogicMojo AI
              </a>
            </div>
          </aside>

          {/* Main content */}
          <article data-reveal className="prose-article max-w-2xl">
            {/* 1 */}
            <SectionHeading n="01" id="why-this-comparison-exists">
              Why This Comparison Exists
            </SectionHeading>
            <p className="mt-6">
              Search &ldquo;LogicMojo vs Scaler&rdquo; in 2026 and you will find two kinds
              of content: forum threads where anonymous commenters argue from single data
              points, and affiliate pages that recommend whichever platform pays the
              higher commission. Neither helps you make a{" "}
              <strong>₹65,000-to-₹3.7-lakh decision</strong> that will consume six to
              twelve months of your life.
            </p>
            <p>
              This page attempts something harder: a comparison published by one of the
              two providers that is still worth reading. The only way that works is
              radical transparency. Every fee figure is drawn from publicly listed
              pricing as of August 2026 and marked indicative. Every outcome claim —
              placements, salaries, hiring partners — is labelled either{" "}
              <em>verified</em> (independently checkable) or{" "}
              <em>provider-reported</em> (the platform’s own claim), and Scaler’s
              provider-reported claims and LogicMojo’s receive identical treatment.
              The scoring rubric is published with its weights, so if you care more about
              brand recognition than value for money, you can re-weight it and reach a
              different conclusion — and for some readers, you honestly should.
            </p>
            <p>
              The comparison also matters more in 2026 than it would have three years
              ago, for one structural reason: <strong>the AI education market has
              bifurcated.</strong> On one side sit long-duration, high-fee,
              career-transformation programs — 10 to 15 months, ₹2.5 lakh and up, built
              on the assumption that you can commit 15–20 hours a week for a year. On the
              other side sit focused, live, applied programs — 6 to 8 months, under ₹1
              lakh, built on the assumption that you have a full-time job, a family, and
              8–10 hours a week at best. Scaler is the strongest brand in the first
              category. LogicMojo has built its AI course deliberately in the second.{" "}
              <strong>
                Which category fits your life is the real question underneath
                &ldquo;LogicMojo or Scaler&rdquo; — and most comparison pages never surface
                it.
              </strong>
            </p>
            <p>
              One more thing before we begin. Both of these are legitimate, serious
              programs. This is not a comparison between a real course and a scam, and we
              will not pretend otherwise. Scaler has trained a very large number of
              Indian engineers, maintains a genuinely impressive alumni network, and runs
              one of the more sophisticated placement operations in Indian EdTech. If our
              verdict favours LogicMojo — and it does, for most learner profiles — it is
              because of fit, focus, time-cost, and value for money, not because Scaler
              is a bad product.
            </p>

            {/* 2 */}
            <div className="mt-16">
              <SectionHeading n="02" id="two-platforms-two-philosophies">
                Two Platforms, Two Philosophies
              </SectionHeading>
            </div>
            <h3 className="mt-8 font-heading text-2xl text-ink">
              LogicMojo: The Focused, Instructor-Led Upskilling Model
            </h3>
            <p className="mt-4">
              LogicMojo is a Bengaluru-based EdTech provider that built its reputation on
              interview preparation — its long-running Data Structures, Algorithms and
              System Design (HLD + LLD) program for working software engineers targeting
              product-company roles. That heritage matters in two ways. First, LogicMojo’s
              teaching DNA is <em>interview-outcome-oriented</em>: courses are built
              backwards from what hiring panels actually ask, not forwards from academic
              syllabi. Second, the platform grew up serving working professionals with
              jobs — its formats, schedules and support model were shaped by learners who
              could not attend a weekday 11 a.m. lecture.
            </p>
            <p>
              LogicMojo’s{" "}
              <a
                href={LINKS.logicmojoCourse}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4 hover:text-primary"
              >
                AI &amp; ML Course
              </a>{" "}
              applies that model to the
              2026 AI stack: a roughly <strong>7-month, live, cohort-based program</strong>{" "}
              covering Python, machine learning, deep learning, and — critically for 2026 —
              generative AI, LLMs, RAG systems, and agentic AI, delivered through live
              weekend-friendly classes with recorded access, 1-on-1 mentorship, 15+
              hands-on projects, and placement assistance. The publicly listed fee is{" "}
              <strong>₹65,000 (GST inclusive)</strong> with EMI options — LogicMojo’s own{" "}
              <a
                href={LINKS.logicmojoFees}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4 hover:text-primary"
              >
                fee-comparison page
              </a>{" "}
              cites monthly EMIs around ₹5,160.
            </p>
            <p>
              The trade-off is equally clear, and we will keep returning to it: LogicMojo
              is a <strong>smaller brand</strong> than Scaler. Its alumni network is
              smaller, its recruiter name-recognition is lower, and it offers no
              university affiliation. The curriculum and the artifacts you build are the
              argument — not the logo on the certificate.
            </p>
            <h3 className="mt-8 font-heading text-2xl text-ink">
              Scaler: The Immersive, Ecosystem-Scale Transformation Model
            </h3>
            <p className="mt-4">
              Scaler (by InterviewBit) is one of India’s largest tech-upskilling
              companies, best known for{" "}
              <a
                href={LINKS.scalerAcademy}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium text-primary underline underline-offset-4 hover:text-accent"
              >
                Scaler Academy
              </a>{" "}
              and, relevant here, its{" "}
              <a
                href={LINKS.scalerCourse}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-semibold text-primary underline underline-offset-4 hover:text-accent"
              >
                Data Science / AI &amp; Machine Learning program
              </a>
              . Scaler’s
              2026 AI/ML offering is a serious, current product: a roughly{" "}
              <strong>12-month</strong> curriculum updated for the modern stack — RAG,
              multi-agent systems, and LLMOps — delivered through live classes,
              module-by-module projects, structured 1:1 mentorship, an in-house coding
              platform with AI-powered mock interviews, lifetime recorded access, and
              access to what Scaler reports as a <strong>1,00,000+ alumni community</strong>.
              Third-party aggregators list fees at around <strong>₹3.69 lakh</strong> for
              the 12-month track, with community discussions citing all-in costs around
              ₹3 lakh, scholarship offsets up to ₹25,000, and EMI financing. Treat all of
              these as indicative.
            </p>
            <p>
              Scaler’s philosophy is <strong>immersion at scale</strong>: give a
              learner a long runway, heavy structure, a large peer cohort, dedicated
              mentors, and a placement ecosystem, and transform their career trajectory
              over roughly a year. When a learner has the time, the money, and the
              stamina, this model genuinely works.
            </p>
            <p>
              The trade-offs are the mirror image of LogicMojo’s. The fee is roughly{" "}
              <strong>four to five times higher</strong> at listed prices. The duration is
              roughly <strong>70% longer</strong>. The weekly commitment that makes a
              12-month immersive program worthwhile is difficult to sustain alongside a
              demanding full-time job — a theme that appears repeatedly in independent
              learner discussions of long-format programs, where the honest consensus is
              some version of: <em>the course is good if you stay consistent; if you
              attend passively, it will feel overpriced.</em>
            </p>
            <div className="note-card mt-6">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                The one-sentence version of each philosophy
              </p>
              <ul className="mt-4">
                <li>
                  <strong>LogicMojo:</strong>{" "}
                  <em>Teach a working professional the current, hireable AI stack in 7
                  months, live, at a price that doesn’t require a loan.</em>
                </li>
                <li>
                  <strong>Scaler:</strong>{" "}
                  <em>Immerse a committed learner in a 12-month, ecosystem-backed
                  transformation with maximum structure and a large placement machine.</em>
                </li>
              </ul>
            </div>

            {/* 3 — full comparison table */}
            <div className="mt-16">
              <SectionHeading n="03" id="the-full-comparison-table">
                The Full Comparison Table
              </SectionHeading>
            </div>
            <p className="mt-6">
              This is the single most important table on the page. Read the{" "}
              <em>Edge</em> column honestly: LogicMojo does not win every row, and a
              comparison in which it did would not be worth your trust. All figures are
              indicative as of August 2026.
            </p>
            <div className="mt-6 -mx-1 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink/80">
                    <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Dimension
                    </th>
                    <th className="p-3 font-heading text-base text-ink">
                      LogicMojo
                    </th>
                    <th className="p-3 font-heading text-base text-ink">Scaler</th>
                    <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Edge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr
                      key={r.dimension}
                      className={`border-b border-border align-top ${
                        i % 2 === 1 ? "bg-paper/60" : ""
                      }`}
                    >
                      <td className="p-3 font-body text-sm font-semibold text-ink">
                        {r.dimension}
                      </td>
                      <td className="p-3 font-body text-sm text-foreground">
                        {r.logicmojo}
                      </td>
                      <td className="p-3 font-body text-sm text-foreground">
                        {r.scaler}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          <Pill tone={r.edgeSide}>
                            {r.edgeSide === "lm"
                              ? "LogicMojo"
                              : r.edgeSide === "sc"
                                ? "Scaler"
                                : r.edgeSide === "tie"
                                  ? "Tie"
                                  : "Depends"}
                          </Pill>
                          <span className="font-body text-xs leading-snug text-muted-foreground">
                            {r.edge}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 font-body text-sm italic text-muted-foreground">
              How to read this table: count the rows that matter <em>to you</em>, not the
              total. If brand and network dominate your decision, Scaler wins several rows
              that should weigh heavily. If cost, time, schedule compatibility, and
              2026-currency-per-rupee dominate, LogicMojo wins the rows that matter most.
            </p>

            {/* 4 — scoring */}
            <div className="mt-16">
              <SectionHeading n="04" id="scoring-system">
                Our Scoring System
              </SectionHeading>
            </div>
            <p className="mt-6">
              Six criteria, their weights, why each weight is what it is, and both
              platforms’ scores with the reasoning stated. If your priorities differ,
              re-weight and recompute — the arithmetic is deliberately simple.
            </p>
            <div className="mt-6 space-y-3">
              {scores.map((s) => (
                <div
                  key={s.criterion}
                  className="surface-card p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-body text-sm font-semibold text-ink">
                      {s.criterion}
                    </p>
                    <span className="font-mono text-xs text-accent">{s.weight}</span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-body text-xs font-medium text-muted-foreground">
                          LogicMojo
                        </span>
                        {s.winner === "lm" && (
                          <Pill tone="lm">Winner</Pill>
                        )}
                      </div>
                      <ScoreBar value={s.lm} tone="lm" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-body text-xs font-medium text-muted-foreground">
                          Scaler
                        </span>
                        {s.winner === "sc" && (
                          <Pill tone="sc">Winner</Pill>
                        )}
                      </div>
                      <ScoreBar value={s.sc} tone="sc" />
                    </div>
                  </div>
                  <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">
                    {s.reason}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="surface-card border-accent/50 bg-accent/10 p-5 text-center">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  LogicMojo weighted total
                </p>
                <p className="mt-1 font-heading text-5xl text-accent">8.7</p>
                <p className="font-body text-xs text-muted-foreground">out of 10</p>
              </div>
              <div className="surface-card border-primary/40 bg-primary/10 p-5 text-center">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Scaler weighted total
                </p>
                <p className="mt-1 font-heading text-5xl text-primary">7.5</p>
                <p className="font-body text-xs text-muted-foreground">out of 10</p>
              </div>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
              Arithmetic: LogicMojo = 9.0×0.20 + 8.5×0.15 + 8.5×0.15 + 9.0×0.15 + 7.5×0.15 +
              9.5×0.20 = 8.73. Scaler = 8.0×0.20 + 8.0×0.15 + 8.5×0.15 + 6.5×0.15 + 8.5×0.15 +
              6.0×0.20 = 7.53.
            </p>
            <div className="note-card mt-6">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                What the scores do and don’t mean
              </p>
              <ul className="mt-4">
                <li>
                  <strong>Scaler wins a category outright.</strong> Career support and
                  placement machinery is a genuine Scaler strength. If placement machinery
                  is your top criterion, move its weight to 30–40% and Scaler closes most
                  of the gap.
                </li>
                <li>
                  <strong>The two biggest gaps are structural, not qualitative.</strong>{" "}
                  Format/flexibility and value-for-money stem from program design decisions
                  (7 months vs 12, ₹65K vs ₹3L+, weekend-first vs immersion-first), not
                  from one team teaching better than the other.
                </li>
                <li>
                  <strong>No score reflects audited outcome data.</strong> Neither provider
                  publishes independently audited placement statistics — almost no Indian
                  EdTech does. The career-support scores reflect visible machinery, not
                  verified placement rates.
                </li>
              </ul>
            </div>

            {/* 5 — curriculum */}
            <div className="mt-16">
              <SectionHeading n="05" id="curriculum">
                Curriculum: What Each Program Teaches in 2026
              </SectionHeading>
            </div>
            <p className="mt-6">
              The single most expensive mistake in AI education is buying a curriculum
              built for 2022 at 2026 prices. So the first question for both programs is
              the same: <strong>how much of the course is the stack employers are hiring
              for right now — LLMs, RAG, agents, deployment — and how much is runway?</strong>
            </p>
            <h3 className="mt-8 font-heading text-2xl text-ink">LogicMojo’s Curriculum</h3>
            <p className="mt-4">
              LogicMojo’s ~7-month program runs as a single continuous arc from
              programming foundations to production-grade AI systems: Python for AI/ML;
              statistics and data handling; core machine learning (regression,
              classification, clustering, ensembles, model evaluation); deep learning
              (neural networks, CNNs, NLP fundamentals); and — occupying a substantial back
              portion — the <strong>generative AI and agentic stack</strong>: LLM
              fundamentals, prompt engineering, RAG architecture and implementation,
              fine-tuning concepts, AI agents and multi-agent workflows, and deployment of
              AI applications. The provider positions the GenAI/agentic portion as core
              curriculum, not an appended module.
            </p>
            <p>
              Because the program is 7 months rather than 12, the <em>proportional</em>{" "}
              weight of current-stack content is high: a learner reaches LLM and RAG
              territory within the first half of the course rather than in month nine.
            </p>
            <div className="note-card mt-5 p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
                Honest limitation
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-foreground">
                A 7-month arc necessarily compresses the classical foundations. A learner
                who wants an extended, unhurried runway through statistics, SQL, and
                classical ML before touching a neural network will find LogicMojo’s pace
                brisker than Scaler’s. Passive learners will feel it.
              </p>
            </div>
            <h3 className="mt-8 font-heading text-2xl text-ink">Scaler’s Curriculum</h3>
            <p className="mt-4">
              Scaler’s ~12-month program is, to its credit, genuinely updated for 2026.
              The program page explicitly frames it as &ldquo;built for how AI roles work
              now,&rdquo; covering RAG, multi-agent systems, and LLMOps. The longer arc buys
              a more expansive foundations phase — Scaler’s track famously begins from
              Excel and SQL before progressing through statistics, Python, ML, and DL to
              the advanced AI content. Learners are placed into beginner, intermediate, or
              advanced tracks via a 30-minute entrance MCQ.
            </p>
            <div className="note-card mt-5 p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                Honest strength
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-foreground">
                For a true beginner — someone who has never written Python and is shaky on
                statistics — Scaler’s longer runway is a genuine pedagogical advantage.
                The levelled entry test and twelve months of enforced structure reduce the
                risk of being overwhelmed early.
              </p>
            </div>
            <div className="note-card mt-3 p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                Honest limitation
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-foreground">
                The same length that helps beginners costs everyone else. A working
                professional who already knows Python and basic ML spends a meaningful
                fraction of a ₹3L+, 12-month program on content they could skip. The
                cutting-edge content that defines 2026 hireability occupies a smaller share
                of the total program than it does at LogicMojo.
              </p>
            </div>
            <p className="mt-6">
              Both programs teach the current stack — this is not modern-vs-obsolete. The
              difference is <strong>architecture</strong>: LogicMojo concentrates the 2026
              stack into a shorter, denser arc; Scaler spreads a broader syllabus across a
              longer immersion. <strong>Score: LogicMojo 9.0, Scaler 8.0.</strong>
            </p>

            {/* 6 — DSA */}
            <div className="mt-16">
              <SectionHeading n="06" id="dsa">
                DSA and Problem-Solving: Depth vs Efficiency
              </SectionHeading>
            </div>
            <p className="mt-6">
              Data structures and algorithms sit in an odd position here, because both
              companies built their reputations on DSA — from opposite directions — and
              because the honest 2026 answer about how much DSA an AI aspirant needs is
              &ldquo;less than either company’s marketing historically implied, but
              more than zero.&rdquo;
            </p>
            <p>
              <strong>Where the credibility comes from.</strong> Scaler’s flagship
              Academy program made its name on exhaustive DSA and system design training —
              a long, rigorous problem-solving culture backed by an in-house judge
              platform. LogicMojo’s founding product is a DSA + System Design course
              for working professionals, covering DSA in Java/Python/C++, microservices,
              design patterns, and both high-level and low-level design.{" "}
              <strong>Neither platform is bluffing on DSA.</strong>
            </p>
            <p>
              <strong>How much DSA does an AI role actually require in 2026?</strong>{" "}
              Interview loops for ML engineer, AI engineer and data science roles at Indian
              product companies typically include one or two coding rounds at an
              easy-to-medium difficulty — array, string, hashmap, basic DP territory —
              alongside ML system design and applied rounds. They rarely demand
              competitive-programming depth.
            </p>
            <ul className="mt-2">
              <li>
                <strong>LogicMojo’s approach</strong> integrates interview-calibrated
                problem solving into the AI course and lets learners who need more take its
                dedicated DSA + System Design track separately. You get the DSA an AI
                interview actually tests without months on advanced graph algorithms an ML
                loop will never ask.
              </li>
              <li>
                <strong>Scaler’s approach</strong> delivers problem-solving depth
                through its platform and culture, with the truly exhaustive DSA immersion
                living in the Academy (software development) track. The in-house judges
                and AI mock interviews are genuinely good tooling.
              </li>
            </ul>
            <p>
              <strong>The verdict, stated carefully.</strong> If your goal is a pure SDE
              role with brutal DSA bars, this page is the wrong comparison — evaluate Scaler
              Academy against LogicMojo’s DSA + System Design course instead. If your
              goal is an <strong>AI/ML role</strong>, LogicMojo’s
              calibrated-DSA-inside-the-AI-course approach gives most learners what
              interviews actually test with far less time spent. Slight edge to Scaler on
              absolute depth and tooling; clear edge to LogicMojo on relevance-per-hour for
              AI aspirants.
            </p>

            {/* 7 — projects */}
            <div className="mt-16">
              <SectionHeading n="07" id="projects">
                Projects and Portfolio Output
              </SectionHeading>
            </div>
            <p className="mt-6">
              In 2026 AI hiring, the portfolio <em>is</em> the credential. Hiring managers
              screening AI candidates increasingly ask one question before any other:{" "}
              <em>show me something you built.</em> So the project comparison is not about
              counting — it is about what a hiring manager can inspect at the end.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="surface-card border-accent/40 p-5">
                <p className="font-heading text-xl text-ink">LogicMojo</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Built around <strong>15+ hands-on projects</strong>: classical ML builds,
                  deep learning applications (CV and NLP), and the portfolio differentiators
                  — <strong>GenAI-stack projects</strong>: RAG apps over real document
                  corpora, LLM-powered tools, and agentic workflows taken through to
                  deployment. Every project is designed to be defensible in an interview.
                </p>
              </div>
              <div className="surface-card border-primary/30 p-5">
                <p className="font-heading text-xl text-ink">Scaler</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Projects <strong>module by module, tied to real business cases</strong> —
                  designing discount strategies from consumer behaviour, optimising
                  delivery-time predictions, analysing chat conversations for fraud
                  detection. The business-case framing teaches an underrated skill:
                  connecting a model to a commercial outcome.
                </p>
              </div>
            </div>
            <p className="mt-5">
              Both models produce real portfolios; the difference is shape. LogicMojo’s
              set is <strong>denser in 2026-stack builds per month of study</strong> — a
              learner exits at month 7 with deployed RAG and agent projects on their GitHub.
              Scaler’s set is <strong>broader across the classical-to-modern
              spectrum</strong>. There is also a completion-risk asymmetry: a 12-month
              project sequence has more opportunities for a busy professional’s
              portfolio to end half-built than a 7-month one — and a half-finished portfolio
              from an expensive program is worth less than a completed one from an
              affordable one. <strong>Score: LogicMojo 8.5, Scaler 8.0.</strong>
            </p>

            {/* 8 — mentorship */}
            <div className="mt-16">
              <SectionHeading n="08" id="mentorship">
                Mentorship and Doubt Support
              </SectionHeading>
            </div>
            <p className="mt-6">
              Ask people who abandoned an online course why, and the most common answer is
              not &ldquo;the content was bad.&rdquo; It is &ldquo;I got stuck, nobody
              answered, and I fell behind.&rdquo; Mentorship is the anti-dropout mechanism,
              and both platforms invest in it seriously. This is the closest category in
              our entire comparison.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="surface-card border-accent/40 p-5">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
                  LogicMojo
                </p>
                <p className="mt-1 font-heading text-lg text-ink">Instructor proximity</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Smaller cohorts, live classes taught by working senior engineers,
                  real-time doubt resolution, and <strong>1-on-1 mentorship</strong>{" "}
                  outside sessions — code review, concept clarification, career-path
                  guidance. The distance between learner and instructor is short.
                </p>
              </div>
              <div className="surface-card border-primary/30 p-5">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                  Scaler
                </p>
                <p className="mt-1 font-heading text-lg text-ink">Structured mentorship at scale</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Industry mentors for <strong>structured 1:1 sessions</strong>, career
                  check-ins, teaching assistants for doubt support, and an active peer
                  community. The enforced cadence suits learners who benefit from
                  accountability. The structural risk is variance: experience depends
                  partly on the mentor match.
                </p>
              </div>
            </div>
            <p className="mt-5">
              <strong>Verdict: a genuine tie, chosen by temperament.</strong> If you want
              short-distance access to the person who teaches you, LogicMojo’s model
              fits. If you want a formally scheduled mentor cadence inside a big support
              system, Scaler’s fits. We score both <strong>8.5</strong> and advise
              readers to weight this category by self-knowledge: which support structure
              have you actually used well in the past?
            </p>

            {/* 9 — format */}
            <div className="mt-16">
              <SectionHeading n="09" id="format-duration">
                Format, Duration, and Weekly Commitment
              </SectionHeading>
            </div>
            <p className="mt-6">
              Curriculum decides what you <em>could</em> learn. Format decides what you{" "}
              <em>will</em> learn — because the best syllabus in the world delivers nothing
              to a learner who cannot attend it. This is where the two programs diverge
              most sharply.
            </p>
            <div className="mt-6 -mx-1 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink/80">
                    <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Format factor
                    </th>
                    <th className="p-3 font-heading text-base text-ink">LogicMojo</th>
                    <th className="p-3 font-heading text-base text-ink">Scaler</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  {[
                    ["Delivery", "Live cohort + lifetime recordings", "Live classes + lifetime recordings"],
                    ["Scheduling", "Weekend-first, built around a working week", "Multi-session weekly cadence across 12 months"],
                    ["Reported class load", "~8–10 hrs/week live + 4–6 hrs assignments", "~15–20 hrs/week typical for full value"],
                    ["Duration", "~7 months", "~12 months (~7-month advanced track)"],
                    ["Catch-up mechanism", "Recordings, mentor sessions, assignment support", "Recordings, TA support, mentor sessions"],
                    ["Total time (indicative)", "~350–450 hours over 7 months", "~700–900 hours over 12 months"],
                  ].map((row, i) => (
                    <tr key={row[0]} className={`border-b border-border align-top ${i % 2 === 1 ? "bg-paper/60" : ""}`}>
                      <td className="p-3 font-semibold text-ink">{row[0]}</td>
                      <td className="p-3 text-foreground">{row[1]}</td>
                      <td className="p-3 text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-8 font-heading text-2xl text-ink">
              Why Duration Is a Cost, Not Just a Feature
            </h3>
            <p className="mt-4">
              EdTech marketing treats longer as better. Buyers should invert that instinct
              and ask what a month of program duration <em>costs</em>, because it costs
              three things:
            </p>
            <ul className="mt-2">
              <li>
                <strong>Sustained motivation.</strong> Completion risk compounds monthly.
                Life events are near-certain across 12 months and merely likely across 7.
                Independent discussions converge on this: the program rewards consistency
                and punishes passivity, and consistency across a full year alongside a job
                is genuinely hard.
              </li>
              <li>
                <strong>Delayed payoff.</strong> A LogicMojo learner is interview-ready
                with a deployed GenAI portfolio around month 7–8. A Scaler learner reaches
                the equivalent point around month 12–13. In a field moving this fast, five
                months of earlier market entry is a head start measured in interview
                cycles.
              </li>
              <li>
                <strong>Compounding fees.</strong> Longer programs cost more to run and
                therefore to buy, which is part of why the fee gap is as large as it is.
              </li>
            </ul>
            <p className="mt-5">
              Scaler’s format is a well-run version of the immersion model, and its
              recordings, TAs, and structure genuinely mitigate the load. But the load
              itself is a design choice, and it is the design choice least compatible with a
              full-time job. LogicMojo’s weekend-first, 7-month format was built for
              exactly the learner Scaler’s format strains.{" "}
              <strong>Score: LogicMojo 9.0, Scaler 6.5 — the widest quality-adjusted gap on
              the page, and a structural one.</strong>
            </p>

            {/* 10 — fees */}
            <div className="mt-16">
              <SectionHeading n="10" id="fees">
                Fees, EMI, and the Real Cost
              </SectionHeading>
            </div>
            <p className="mt-6">
              Here are the numbers, stated as precisely as public information allows, with
              every figure flagged for what it is. <strong>All fees are indicative as of
              August 2026; confirm current pricing, GST treatment, discounts, and EMI terms
              directly with each provider before enrolling.</strong>
            </p>
            <div className="mt-6 -mx-1 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink/80">
                    <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Cost component
                    </th>
                    <th className="p-3 font-heading text-base text-ink">LogicMojo</th>
                    <th className="p-3 font-heading text-base text-ink">Scaler</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  {[
                    ["Listed program fee", "₹65,000 (GST inclusive) — publicly listed", "~₹3.69L via aggregators; realistic band ₹2.5L–₹3.7L"],
                    ["Scholarships / discounts", "Batch offers vary; confirm at counselling", "Scholarships up to ~₹25,000 reported; confirm"],
                    ["EMI", "Available; ~₹5,160/month cited", "Financing partners; ~₹13,000–₹27,000/month on ₹3L"],
                    ["Hidden-cost exposure", "Low — GST-inclusive listing", "Confirm inclusions in writing"],
                    ["Entrance cost", "None", "Free 30-minute MCQ test (time only)"],
                  ].map((row, i) => (
                    <tr key={row[0]} className={`border-b border-border align-top ${i % 2 === 1 ? "bg-paper/60" : ""}`}>
                      <td className="p-3 font-semibold text-ink">{row[0]}</td>
                      <td className="p-3 text-foreground">{row[1]}</td>
                      <td className="p-3 text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-8 font-heading text-2xl text-ink">Three Observations the Table Forces</h3>
            <ul className="mt-2">
              <li>
                <strong>First, the ratio.</strong> At listed prices, Scaler costs roughly{" "}
                <strong>four to five times</strong> LogicMojo’s. That is the difference
                between a purchase most professionals can absorb from savings and one that
                requires financing. For the gap to be worth it, Scaler must deliver 4–5×
                the capability — or capability LogicMojo cannot deliver at all. It delivers
                more runway, more brand, and more network — real things — but not a
                different order of capability in the 2026 stack itself.
              </li>
              <li>
                <strong>Second, the EMI asymmetry.</strong> EMI availability does not
                neutralise price; it converts a price difference into a <em>risk</em>{" "}
                difference. A ~₹5,000/month commitment is subscription-sized and survivable
                through a job change. A ₹13,000–₹27,000/month commitment for one to two
                years continues whether or not you continue attending — and &ldquo;paying
                EMIs on a course I stopped attending in month five&rdquo; is one of the most
                common regret patterns in Indian EdTech forums.
              </li>
              <li>
                <strong>Third, the interest line.</strong> Financed purchases cost more
                than their sticker price. Always ask both providers, in writing:{" "}
                <em>what is the total amount I will pay, including all interest and charges,
                by the final EMI?</em>
              </li>
            </ul>
            <p className="mt-5">
              Strip away brand and the fee decision reduces to one question:{" "}
              <strong>what specific capability, network access, or credential does the
              ₹2L–₹3L difference buy — and do you, personally, need that specific thing?</strong>{" "}
              For most working professionals, the honest answer is that the difference buys
              duration and brand they don’t need at a price that funds an emergency
              corpus they do. <strong>Value-for-money score: LogicMojo 9.5, Scaler 6.0.</strong>
            </p>

            {/* 11 — flexibility */}
            <div className="mt-16">
              <SectionHeading n="11" id="flexibility">
                Flexibility: Can You Actually Finish This Alongside a Job?
              </SectionHeading>
            </div>
            <p className="mt-6">
              Flexibility is not a soft criterion. It is the criterion that decides whether
              every other criterion matters, because an unfinished course delivers a
              fraction of its promised value at 100% of its price. Evaluate both programs
              against the real texture of your week — not the idealised week you plan to
              have.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="surface-card border-accent/40 p-5">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
                  LogicMojo’s flexibility profile
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Weekend-anchored live classes keep the core commitment out of the
                  work-week’s blast radius. Lifetime recordings mean a missed session
                  is a delayed session, not a lost one. The 7-month total means the finish
                  line is visible from the start — a completion factor research consistently
                  flags as significant. Demands real hours (~10–15/week); flexible, not
                  effortless.
                </p>
              </div>
              <div className="surface-card border-primary/30 p-5">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                  Scaler’s flexibility profile
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                  Recordings and lifetime access exist here too, and the structured cadence
                  is a flexibility <em>substitute</em> — it replaces self-discipline with
                  external structure, which some learners need. But the multi-session
                  weekly cadence across 12 months means the program lives inside your
                  work-week, and falling behind in a long, sequenced cohort compounds.
                </p>
              </div>
            </div>
            <p className="mt-5">
              <strong>Pause, deferral, and refund policies</strong> matter more for a
              12-month commitment than a 7-month one, and both providers’ current
              policies should be obtained <em>in writing</em> before payment — batch-deferral
              terms, refund windows, and pause options change over time at every Indian
              EdTech company, and verbal counsellor assurances are not policies.
            </p>
            <p>
              <strong>Verdict:</strong> for the employed learner, LogicMojo’s format
              is the one engineered around your constraints; Scaler’s is the one that
              asks your constraints to move.
            </p>

            <ExtendedSections />

            <ResearchRecommendation />

            <AlumniReviews />

            {/* CTA */}
            <div className="mt-16 rounded-3xl border border-accent/40 bg-gradient-to-br from-paper to-card p-8 text-center sm:p-12">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The 2026 decision, in one line
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-ink sm:text-4xl">
                Most 2026 learners need a focused, current, applied AI capability — in
                half the time, at a fraction of the cost.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                LogicMojo’s AI & ML Course covers the full 2026 stack — ML, deep
                learning, GenAI, RAG, AI agents — live, weekend-friendly, with 1-on-1
                mentorship and 15+ projects. Listed fee ₹65,000, GST inclusive, EMI
                available.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={LINKS.logicmojoCourse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explore LogicMojo AI & ML
                </a>
                <a
                  href="#the-full-comparison-table"
                  className="inline-flex items-center rounded-full border border-border px-7 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-secondary"
                >
                  Re-read the comparison
                </a>
                <a
                  href={LINKS.scalerCourse}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center rounded-full border border-border px-7 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-secondary"
                >
                  Check Scaler’s official page
                </a>
              </div>
              <p className="mt-6 font-body text-xs text-muted-foreground">
                All fees indicative as of August 2026. Nothing here is a placement or salary
                guarantee. Read the methodology before enrolling.
              </p>
            </div>

            <footer className="mt-12 border-t border-border pt-8">
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                This article is published by LogicMojo as editorial content. Every effort
                has been made to label provider-reported claims and indicative fees
                transparently for both platforms. Confirm current pricing, GST treatment,
                and EMI terms with each provider directly before enrolling.
              </p>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
