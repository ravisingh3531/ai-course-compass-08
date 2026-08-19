import { useEffect, useMemo, useState } from "react";
import { LINKS } from "@/lib/links";
import { ScrollableTable } from "@/components/ScrollableTable";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-10 font-heading text-2xl text-ink">{children}</h3>;
}

function EvidenceTag({ kind }: { kind: "official" | "verified" | "market" }) {
  const map = {
    official: {
      label: "Provider-stated",
      cls: "border-primary/40 bg-primary/10 text-primary",
    },
    verified: {
      label: "Independently checkable",
      cls: "border-accent/50 bg-accent/10 text-accent",
    },
    market: {
      label: "Market data",
      cls: "border-border bg-secondary text-muted-foreground",
    },
  } as const;
  const t = map[kind];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-body text-[0.68rem] font-semibold uppercase tracking-wide ${t.cls}`}
    >
      {t.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const beginnerScores: {
  criterion: string;
  lm: number;
  sc: number;
  note: string;
}[] = [
  {
    criterion: "Curriculum currency (2026 stack)",
    lm: 9.0,
    sc: 8.5,
    note: "Both publish LLM/GenAI modules on their current course pages. LogicMojo folds GenAI into the core track; Scaler sequences it after a longer foundations runway.",
  },
  {
    criterion: "Beginner support & onboarding",
    lm: 8.5,
    sc: 8.5,
    note: "Scaler's Beginner track is the longer ramp for non-coders. LogicMojo compresses fundamentals but keeps 1-on-1 mentor access, which matters more than track length for most learners.",
  },
  {
    criterion: "GenAI depth (RAG, agents, fine-tuning)",
    lm: 9.0,
    sc: 8.0,
    note: "LogicMojo's advertised syllabus reaches RAG, LangChain, vector DBs and agents inside 7 months; Scaler covers the same territory over a longer arc.",
  },
  {
    criterion: "Projects & portfolio",
    lm: 9.0,
    sc: 8.5,
    note: "LogicMojo states 15+ projects; Scaler states an extensive capstone-led portfolio. Both are provider-stated — ask for the current project list in writing.",
  },
  {
    criterion: "Placement & job assistance",
    lm: 8.5,
    sc: 8.5,
    note: "Neither publishes audited placement data. Both operate resume, mock-interview and referral machinery. Verify with named alumni, not aggregate percentages.",
  },
  {
    criterion: "Interview preparation",
    lm: 9.0,
    sc: 8.5,
    note: "LogicMojo's DSA-and-system-design heritage is directly reusable in AI-engineer loops that still test coding rounds.",
  },
  {
    criterion: "Mentorship (1-on-1 access)",
    lm: 9.0,
    sc: 8.0,
    note: "Smaller cohorts mean more per-learner mentor time; Scaler's process is more systematised but more crowded.",
  },
  {
    criterion: "Career guidance & hiring network",
    lm: 8.0,
    sc: 9.0,
    note: "Scaler's larger alumni base is a genuine, verifiable advantage — the network effect is the clearest thing Scaler wins on.",
  },
  {
    criterion: "Affordability / value for money",
    lm: 9.5,
    sc: 6.0,
    note: "₹65,000 over 7 months vs ₹2.5L–₹3.7L over ~12 months, per each provider's current listed pricing.",
  },
];

const lmBeginner = 8.83;
const scBeginner = 8.17;

const genaiTopics: { topic: string; what: string; whyItMatters: string }[] = [
  {
    topic: "LLMs & transformer intuition",
    what: "Tokenisation, attention, context windows, model families, when to prompt vs fine-tune.",
    whyItMatters:
      "Every downstream GenAI decision — cost, latency, quality — traces back to understanding what the model can and cannot hold in context.",
  },
  {
    topic: "Prompt engineering",
    what: "System vs user prompts, few-shot patterns, structured output, evaluation harnesses.",
    whyItMatters:
      "The cheapest lever in production. Interview loops in 2026 routinely ask candidates to debug a badly-behaving prompt live.",
  },
  {
    topic: "RAG (retrieval-augmented generation)",
    what: "Chunking strategy, embeddings, hybrid retrieval, reranking, grounding and citation.",
    whyItMatters:
      "The single most common enterprise GenAI pattern. A portfolio without one working RAG system reads as theoretical.",
  },
  {
    topic: "LangChain / orchestration frameworks",
    what: "Chains, tools, memory, and the equivalent primitives in LlamaIndex or plain SDK code.",
    whyItMatters:
      "Frameworks change fast; the transferable skill is orchestration thinking, not one library's API surface.",
  },
  {
    topic: "Vector databases",
    what: "FAISS, Pinecone, Chroma, pgvector; index types, metadata filtering, recall vs latency trade-offs.",
    whyItMatters:
      "Retrieval quality is usually the bottleneck in a weak RAG demo, and it is almost always an indexing decision.",
  },
  {
    topic: "AI agents",
    what: "Tool calling, planning loops, multi-step execution, guardrails, failure recovery and cost control.",
    whyItMatters:
      "The 2026 hiring frontier. Employers want engineers who have shipped an agent that fails safely, not one that demos once.",
  },
  {
    topic: "Fine-tuning & adaptation",
    what: "LoRA/QLoRA, instruction tuning, dataset curation, evaluation, and when fine-tuning is the wrong answer.",
    whyItMatters:
      "Knowing when *not* to fine-tune — because RAG or prompting solves it cheaper — is itself a senior signal.",
  },
  {
    topic: "GenAI deployment & MLOps",
    what: "APIs, containerisation, streaming responses, caching, observability, evals in CI, cost monitoring.",
    whyItMatters:
      "Deployment is the line between a notebook learner and an AI engineer. It is the most common gap in bootcamp portfolios.",
  },
];

const audienceRows: [string, string, string][] = [
  [
    "Complete beginners (no coding at all)",
    "Close call, edge to LogicMojo",
    "Scaler's longer beginner runway is genuinely useful, but the deciding factor for absolute beginners is mentor access when they get stuck — and per-learner mentor time is higher in smaller cohorts. Choose Scaler instead if you know you need externally-imposed structure to keep going.",
  ],
  [
    "Freshers / final-year students",
    "LogicMojo",
    "Freshers face coding-heavy screening rounds. A 7-month program that pairs DSA and system-design preparation with a GenAI portfolio matches how fresher AI hiring actually screens. Scaler's alumni network is the counter-argument if you have no professional network at all.",
  ],
  [
    "Working professionals",
    "LogicMojo, decisively",
    "Weekend-anchored live classes, lifetime recordings, ~10–15 hours a week and a visible 7-month finish line fit around a full-time job. Scaler's ~12-month multi-session cadence assumes weekly hours most employed learners cannot sustain.",
  ],
  [
    "Career switchers (non-CS background)",
    "LogicMojo",
    "Switchers are judged on demonstrable artefacts, not credentials. 15+ projects including RAG and agent systems inside 7 months gets you to interviews roughly five months sooner, with ~₹2 lakh still unspent.",
  ],
];

const redFlags: { flag: string; why: string }[] = [
  {
    flag: '"100% placement guarantee"',
    why: "No education provider controls hiring decisions. A real guarantee would be a contractual, refund-backed clause with eligibility conditions — ask to read that clause. If it does not exist in writing, the guarantee does not exist.",
  },
  {
    flag: "Aggregate placement percentages with no audit",
    why: "Almost no Indian EdTech company publishes independently audited placement statistics. A 90%+ figure with no defined denominator (who counts as 'placed'? within how many months? excluding whom?) is marketing, not data.",
  },
  {
    flag: "Average / highest CTC without a cohort size",
    why: "A 'highest package' is one person. An 'average' without the number of learners it averages over, and without the exclusion criteria, cannot be checked.",
  },
  {
    flag: "Hiring-partner logo walls",
    why: "A logo means someone from the program was once interviewed or hired there — not that the company recruits from the program. Ask when the last hire at that company happened.",
  },
  {
    flag: "Anonymous or stock-photo testimonials",
    why: "Verifiable outcomes carry a full name and a findable LinkedIn profile. Named, checkable stories are the only testimonials worth weighting.",
  },
  {
    flag: "Countdown timers and 'last 2 seats'",
    why: "Manufactured urgency is a sales technique, not an admissions constraint. Any program worth ₹65,000–₹3,70,000 will still exist next month.",
  },
  {
    flag: "Verbal counsellor promises",
    why: "Refund windows, deferral rights, pause policies and job-assistance scope change over time. If a counsellor states it and the contract does not, it is not a policy.",
  },
];

const researchMethod: { source: string; used: string; limits: string }[] = [
  {
    source: "Official course pages",
    used: "Curriculum modules, duration, batch format, listed fees and stated project counts were read directly from each provider's current public course pages.",
    limits: "These are marketing surfaces. Everything sourced here is labelled provider-stated, never verified.",
  },
  {
    source: "Alumni outcome pages",
    used: "LogicMojo's success-story page was used as the reference point for named learner outcomes: logicmojo.com/success-story.",
    limits: "Provider-curated pages show successes, not the distribution. Treat them as existence proof, not base rates.",
  },
  {
    source: "LinkedIn",
    used: "Named alumni profiles can be cross-checked for the role and company a story claims, and for the date the role started.",
    limits: "Profiles show titles, not whether the course caused the outcome.",
  },
  {
    source: "Student reviews on aggregator sites",
    used: "Read for recurring operational themes — mentor responsiveness, batch rescheduling, refund handling — rather than star ratings.",
    limits: "Review platforms carry both incentivised positives and competitor negatives. Only repeated, specific complaints were weighted.",
  },
  {
    source: "Reddit and Quora discussions",
    used: "Used to surface unprompted friction points that never appear in official material, especially around weekly workload reality.",
    limits: "Self-selected, unverifiable, often outdated. Used only to generate questions to ask providers, never as evidence.",
  },
  {
    source: "YouTube reviews",
    used: "Screen recordings of the actual learning platform, class recordings and dashboards are the most useful part — you can see the product.",
    limits: "Most review videos carry affiliate links. Sponsored content was discounted entirely.",
  },
  {
    source: "2026 GenAI job requirements",
    used: "Live AI/ML engineer postings were read for the stack actually demanded — RAG, vector stores, agent frameworks, evaluation and deployment — and both syllabi were scored against that list.",
    limits: "Job descriptions overstate requirements. The list was reduced to skills appearing across many independent postings.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz                                                               */
/* ------------------------------------------------------------------ */

type QuizKey =
  | "experience"
  | "education"
  | "goal"
  | "budget"
  | "placement"
  | "mode"
  | "hours"
  | "foundations";

const quizQuestions: {
  key: QuizKey;
  q: string;
  options: { label: string; value: string; lm: number; sc: number }[];
}[] = [
  {
    key: "experience",
    q: "What is your current experience level?",
    options: [
      { label: "Complete beginner — no coding", value: "none", lm: 1, sc: 2 },
      { label: "Some Python, no ML", value: "some", lm: 2, sc: 1 },
      { label: "0–3 years working in tech", value: "junior", lm: 3, sc: 1 },
      { label: "3+ years working in tech", value: "senior", lm: 3, sc: 0 },
    ],
  },
  {
    key: "education",
    q: "What is your educational background?",
    options: [
      { label: "CS / IT degree", value: "cs", lm: 2, sc: 1 },
      { label: "Other engineering branch", value: "eng", lm: 2, sc: 1 },
      { label: "Non-engineering degree", value: "non", lm: 1, sc: 2 },
      { label: "Still studying", value: "student", lm: 2, sc: 2 },
    ],
  },
  {
    key: "goal",
    q: "What is your career goal?",
    options: [
      { label: "Become an AI / GenAI engineer", value: "ai", lm: 3, sc: 2 },
      { label: "Switch from non-tech into tech", value: "switch", lm: 3, sc: 2 },
      { label: "Get promoted in my current role", value: "promo", lm: 2, sc: 2 },
      { label: "Crack a big-brand product company", value: "brand", lm: 2, sc: 3 },
    ],
  },
  {
    key: "budget",
    q: "What is your realistic budget?",
    options: [
      { label: "Under ₹1 lakh", value: "low", lm: 4, sc: 0 },
      { label: "₹1–2 lakh", value: "mid", lm: 3, sc: 1 },
      { label: "₹2–3 lakh", value: "high", lm: 1, sc: 3 },
      { label: "₹3 lakh+, comfortably", value: "vhigh", lm: 1, sc: 4 },
    ],
  },
  {
    key: "placement",
    q: "How important is structured placement support?",
    options: [
      { label: "Critical — it is why I am paying", value: "critical", lm: 2, sc: 2 },
      { label: "Important, but skills come first", value: "important", lm: 3, sc: 2 },
      { label: "Nice to have — I can self-apply", value: "nice", lm: 3, sc: 1 },
    ],
  },
  {
    key: "mode",
    q: "Which learning mode suits you?",
    options: [
      { label: "Live weekend classes", value: "weekend", lm: 4, sc: 1 },
      { label: "Live weekday evening classes", value: "weekday", lm: 2, sc: 3 },
      { label: "Mostly self-paced recordings", value: "self", lm: 3, sc: 1 },
      { label: "Maximum external structure", value: "structured", lm: 1, sc: 4 },
    ],
  },
  {
    key: "hours",
    q: "How many hours a week can you truly commit?",
    options: [
      { label: "Under 10 hours", value: "u10", lm: 3, sc: 0 },
      { label: "10–15 hours", value: "10_15", lm: 4, sc: 1 },
      { label: "15–25 hours", value: "15_25", lm: 2, sc: 3 },
      { label: "25+ hours — full immersion", value: "25p", lm: 1, sc: 4 },
    ],
  },
  {
    key: "foundations",
    q: "Do you need Python and ML foundations from scratch?",
    options: [
      { label: "Yes, completely from zero", value: "yes", lm: 2, sc: 3 },
      { label: "Partly — I know basic Python", value: "partly", lm: 3, sc: 2 },
      { label: "No, I want to start at GenAI", value: "no", lm: 4, sc: 1 },
    ],
  },
];

type Answers = Partial<Record<QuizKey, string>>;

function buildRecommendation(answers: Answers) {
  let lm = 0;
  let sc = 0;
  for (const q of quizQuestions) {
    const v = answers[q.key];
    const opt = q.options.find((o) => o.value === v);
    if (opt) {
      lm += opt.lm;
      sc += opt.sc;
    }
  }
  const total = lm + sc || 1;
  const winner: "lm" | "sc" = lm >= sc ? "lm" : "sc";
  const confidence = Math.round((Math.max(lm, sc) / total) * 100);

  const reasons: string[] = [];
  if (answers.budget === "low" || answers.budget === "mid") {
    reasons.push(
      winner === "lm"
        ? "Your budget maps to LogicMojo's ₹65,000 listed fee rather than a ₹2.5L–₹3.7L commitment."
        : "Your answers point to Scaler despite the budget gap — confirm EMI terms in writing before enrolling.",
    );
  }
  if (answers.hours === "u10" || answers.hours === "10_15") {
    reasons.push(
      "Your weekly availability suits a weekend-anchored, ~10–15 hour format with lifetime recordings.",
    );
  }
  if (answers.hours === "25p" || answers.mode === "structured") {
    reasons.push(
      "You can sustain immersion hours and want maximum external structure — the case where a longer, heavily-scaffolded cohort earns its price.",
    );
  }
  if (answers.foundations === "yes") {
    reasons.push(
      "You need Python and ML from zero, so confirm the foundations runway length with the provider before you pay.",
    );
  }
  if (answers.foundations === "no") {
    reasons.push(
      "You want to start near GenAI, so a shorter foundations phase is an advantage, not a gap.",
    );
  }
  if (answers.goal === "brand") {
    reasons.push(
      "Brand recall and a very large alumni network are real Scaler strengths; weigh them honestly against cost and duration.",
    );
  }
  if (reasons.length === 0) {
    reasons.push(
      "Your answers do not point strongly in either direction — treat cost and weekly hours as the tie-breakers.",
    );
  }

  return { winner, lm, sc, confidence, reasons: reasons.slice(0, 3) };
}

function QuizModal({
  answers,
  onClose,
}: {
  answers: Answers;
  onClose: () => void;
}) {
  const rec = useMemo(() => buildRecommendation(answers), [answers]);
  const isLm = rec.winner === "lm";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Your course recommendation"
      onClick={onClose}
    >
      <div
        className="quiz-modal max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-card p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Your recommendation
            </p>
            <h3 className="mt-2 font-heading text-3xl leading-tight text-ink">
              {isLm ? "LogicMojo AI & ML Course" : "Scaler AI / ML Program"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close recommendation"
            className="rounded-full border border-border px-3 py-1 font-body text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-semibold text-primary">
            Fit score {isLm ? rec.lm : rec.sc} / {rec.lm + rec.sc}
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 font-body text-xs font-semibold text-muted-foreground">
            {rec.confidence}% lean
          </span>
        </div>

        <div className="mt-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Why this fits you
          </p>
          <ul className="mt-2 list-none space-y-2 pl-0">
            {rec.reasons.map((r) => (
              <li
                key={r}
                className="flex list-none gap-2 font-body text-sm leading-relaxed text-foreground"
              >
                <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="note-card mt-6 p-4">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            GenAI modules you should confirm on the syllabus
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "LLMs",
              "Prompt engineering",
              "RAG",
              "LangChain",
              "Vector databases",
              "AI agents",
              "Fine-tuning (LoRA)",
              "Deployment & evals",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-2.5 py-1 font-body text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-secondary/60 p-4">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Placement information
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
            {isLm
              ? "LogicMojo provides job assistance — resume and LinkedIn overhaul, portfolio review, mock interviews and referrals. Named learner outcomes are published on its success-story page and can be cross-checked on LinkedIn."
              : "Scaler provides a systematised career-services track with coaches, mock interviews and a large hiring-partner list."}{" "}
            Neither provider publishes independently audited placement statistics, and nothing here is a placement or salary guarantee. Ask for the current job-assistance scope in writing before you pay.
          </p>
          <a
            href={LINKS.logicmojoSuccess}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-body text-sm font-semibold text-primary underline underline-offset-4"
          >
            See LogicMojo named success stories →
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={isLm ? LINKS.logicmojoCourse : LINKS.scalerCourse}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isLm
              ? "Explore the LogicMojo AI & ML Course"
              : "Explore the Scaler Data Science & AI-ML Program"}
          </a>
          <a
            href={isLm ? LINKS.scalerCourse : LINKS.logicmojoCourse}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-secondary"
          >
            {isLm ? "Compare with Scaler" : "Compare with LogicMojo"}
          </a>
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-border px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-secondary"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [open, setOpen] = useState(false);
  const answered = Object.keys(answers).length;
  const complete = answered === quizQuestions.length;

  return (
    <div className="mt-8 rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-card p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Interactive
          </p>
          <h3 className="mt-1 font-heading text-2xl text-ink">
            Which course fits you? — 8 questions
          </h3>
        </div>
        <span className="font-body text-sm text-muted-foreground">
          {answered}/{quizQuestions.length} answered
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${(answered / quizQuestions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 space-y-6">
        {quizQuestions.map((q, i) => (
          <div key={q.key}>
            <p className="font-body text-sm font-semibold text-ink">
              <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {q.q}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {q.options.map((o) => {
                const active = answers[q.key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.key]: o.value }))
                    }
                    className={`rounded-full border px-4 py-2 font-body text-sm transition-all duration-200 ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-secondary"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!complete}
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Show my recommendation
        </button>
        {answered > 0 && (
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="font-body text-sm text-muted-foreground underline underline-offset-4 hover:text-ink"
          >
            Reset answers
          </button>
        )}
      </div>

      {open && <QuizModal answers={answers} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export function ResearchRecommendation() {
  return (
    <>
      {/* 21 — Research-backed recommendation */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="21" id="research-backed-recommendation">
          My Experience-Based Solution: My Research-Backed Recommendations
        </SectionHeading>

        <div className="note-card mt-6 p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            How to read this section
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
            Everything below is built from documents you can open yourself: each
            provider's current course pages, LogicMojo's named{" "}
            <a
              href={LINKS.logicmojoSuccess}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              success stories
            </a>
            , and live 2026 AI-engineer job requirements. No placement percentage,
            salary figure, testimonial or personal anecdote is invented here. Where a
            number exists, it is labelled either <em>provider-stated</em> or{" "}
            <em>independently checkable</em>. Where a number does not exist in a
            verifiable form, this page says so instead of filling the gap.
          </p>
        </div>

        <p className="mt-6">
          <strong>The recommendation, stated plainly:</strong> for most beginners
          entering GenAI in 2026, LogicMojo's AI &amp; ML Course is the stronger
          choice — not because Scaler is weak, but because the beginner's real
          constraints are money, weekly hours, and time-to-first-interview, and
          LogicMojo wins all three on published, checkable facts rather than on
          claims. Scaler remains the better answer for a specific minority, and this
          page names exactly who they are.
        </p>

        <SubHeading>Why LogicMojo suits a GenAI beginner</SubHeading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            {
              h: "Placement-first sequencing",
              b: "The program is ordered around getting you interview-ready: foundations, applied projects, then interview machinery — DSA, system design, mock rounds. For a beginner, that ordering matters more than syllabus length, because an unfinished course places nobody.",
              tag: "official" as const,
            },
            {
              h: "Structured job assistance",
              b: "Resume and LinkedIn overhaul, portfolio review, mock technical and HR interviews, and referrals. This is job assistance, not a guarantee — and the named outcomes on the success-story page are cross-checkable on LinkedIn, which is more than an aggregate percentage offers.",
              tag: "verified" as const,
            },
            {
              h: "Beginner-friendly foundations",
              b: "Python, statistics and core ML are taught from the ground up before deep learning and GenAI, with 1-on-1 mentor access when a beginner stalls. Smaller cohorts mean the mentor ratio — the thing that actually rescues beginners — is favourable.",
              tag: "official" as const,
            },
            {
              h: "GenAI woven into the core, not bolted on",
              b: "LLMs, prompt engineering, RAG, LangChain, vector databases, agents, fine-tuning and deployment sit inside the main 7-month track. A beginner reaches shippable GenAI work months earlier, which is what a portfolio needs.",
              tag: "official" as const,
            },
          ].map((c) => (
            <div key={c.h} className="surface-card p-5">
              <EvidenceTag kind={c.tag} />
              <h4 className="mt-3 font-heading text-xl text-ink">{c.h}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                {c.b}
              </p>
            </div>
          ))}
        </div>

        <SubHeading>Where Scaler is genuinely stronger</SubHeading>
        <p className="mt-4">
          Fairness is the point of an evidence-based comparison. Scaler's alumni base
          is one of the largest in Indian tech education, and for a fresher with no
          professional network that network effect is a real, verifiable asset — you
          can open LinkedIn and count the alumni. Its career-services function is
          more systematised, its brand recall opens some recruiter doors faster, and
          its longer foundations runway suits learners who know they need externally
          imposed structure. Its practice platform is best-in-class at its scale.
          None of that is disputed here. The question is whether those advantages are
          worth roughly four to five times the fee and roughly five extra months for a
          beginner whose main risk is not finishing.
        </p>

        <SubHeading>Mini case studies — what checkable evidence looks like</SubHeading>
        <p className="mt-4">
          Rather than reproduce numbers that cannot be audited, here is the method to
          turn any provider's success page into evidence you trust — applied to
          LogicMojo's{" "}
          <a
            href={LINKS.logicmojoSuccess}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-4"
          >
            success-story page
          </a>
          , and equally applicable to Scaler's.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: "Case A",
              h: "The named-profile check",
              b: "Pick three stories with a full name, company and role. Search each on LinkedIn. Confirm the role and company match and note the start date. Three matches out of three is meaningful; three misses is decisive.",
            },
            {
              n: "Case B",
              h: "The recency check",
              b: "Filter for outcomes dated within the last 12 months. A page dense with 2019–2021 stories tells you about a program that no longer exists in the same form. GenAI hiring changed after 2023.",
            },
            {
              n: "Case C",
              h: "The background-match check",
              b: "Find the story whose starting point resembles yours — same background, same years of experience, same city. One matched profile predicts your odds far better than any average.",
            },
          ].map((c) => (
            <div key={c.n} className="surface-card p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
                {c.n}
              </p>
              <h4 className="mt-2 font-heading text-lg leading-snug text-ink">{c.h}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                {c.b}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 font-body text-sm italic text-muted-foreground">
          This page deliberately publishes no placement percentage, no average CTC and
          no testimonial quote for either provider, because no independently audited
          source for those figures exists for either company as of August 2026.
        </p>
      </section>

      {/* 22 — GenAI syllabus checklist */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="22" id="genai-topics">
          The 2026 GenAI Syllabus Checklist — What Either Course Must Cover
        </SectionHeading>
        <p className="mt-5">
          Both providers publish GenAI modules. Use this list as the audit sheet: ask
          each counsellor to point to the specific module, the number of live hours, and
          the project that ships it. A topic without a project attached is a slide deck.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {genaiTopics.map((t, i) => (
            <div key={t.topic} className="surface-card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-heading text-xl text-ink">{t.topic}</h4>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                {t.what}
              </p>
              <p className="mt-2 border-l-2 border-accent/40 pl-3 font-body text-sm leading-relaxed text-muted-foreground">
                {t.whyItMatters}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 23 — Beginner scoring table */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="23" id="beginner-scorecard">
          Transparent Beginner Scorecard — LogicMojo vs Scaler
        </SectionHeading>
        <p className="mt-5">
          Scored from a beginner's perspective on a 10-point scale, using published
          course pages and current listed pricing. Scores are editorial judgements
          about publicly stated facts, not measurements of outcomes — the reasoning
          column is included so you can disagree with any row and recompute.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="surface-card border-accent/40 p-5 text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
              LogicMojo — beginner score
            </p>
            <p className="mt-2 font-heading text-5xl text-ink">{lmBeginner.toFixed(2)}</p>
            <p className="mt-1 font-body text-xs text-muted-foreground">
              across 9 beginner-weighted criteria
            </p>
          </div>
          <div className="surface-card border-primary/30 p-5 text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
              Scaler — beginner score
            </p>
            <p className="mt-2 font-heading text-5xl text-ink">{scBeginner.toFixed(2)}</p>
            <p className="mt-1 font-body text-xs text-muted-foreground">
              across the same 9 criteria
            </p>
          </div>
        </div>

        <ScrollableTable>
              <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Criterion
                </th>
                <th className="py-3 pr-4 font-heading text-base text-ink">LogicMojo</th>
                <th className="py-3 pr-4 font-heading text-base text-ink">Scaler</th>
                <th className="py-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Reasoning
                </th>
              </tr>
            </thead>
            <tbody>
              {beginnerScores.map((r) => (
                <tr key={r.criterion} className="border-b border-border/70 align-top">
                  <td className="py-4 pr-4 font-body text-sm font-semibold text-ink">
                    {r.criterion}
                  </td>
                  <td className="py-4 pr-4">
                    <ScoreCell value={r.lm} tone="accent" />
                  </td>
                  <td className="py-4 pr-4">
                    <ScoreCell value={r.sc} tone="primary" />
                  </td>
                  <td className="py-4 font-body text-xs leading-relaxed text-muted-foreground">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </ScrollableTable>
      </section>

      {/* 24 — Who should pick what */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="24" id="beginner-audiences">
          Which Course Is Better For You — Beginners, Freshers, Professionals, Switchers
        </SectionHeading>
        <div className="mt-6 space-y-4">
          {audienceRows.map(([who, pick, why]) => (
            <div key={who} className="surface-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-heading text-xl text-ink">{who}</h4>
                <span
                  className={`rounded-full border px-3 py-1 font-body text-xs font-semibold ${
                    pick.startsWith("Scaler")
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-accent/50 bg-accent/10 text-accent"
                  }`}
                >
                  {pick}
                </span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
                {why}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 25 — Assistance vs guarantee */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="25" id="placement-truth">
          Placement Assistance vs Placement Guarantee — and How to Verify Claims
        </SectionHeading>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="surface-card border-accent/40 p-5">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
              Placement assistance
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
              A set of services: resume and LinkedIn work, portfolio review, mock
              interviews, referrals into a partner network, and interview scheduling
              help. It improves your odds. It carries no obligation to produce a job
              and no refund if none appears. Both LogicMojo and Scaler operate in this
              category — this is the honest, normal model.
            </p>
          </div>
          <div className="surface-card border-primary/30 p-5">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
              Placement guarantee
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
              A contractual promise with a defined remedy — usually a partial or full
              refund — triggered when specific conditions are met. A real guarantee
              always comes with eligibility rules: attendance thresholds, assignment
              completion, minimum applications, geography and CTC limits. If you cannot
              read those clauses in the agreement, there is no guarantee.
            </p>
          </div>
        </div>

        <SubHeading>A five-step verification routine</SubHeading>
        <ol className="mt-4 list-none space-y-3 pl-0">
          {[
            "Ask for the definition: what does 'placed' mean here — any offer, a relevant AI role, within how many months, and who is excluded from the count?",
            "Ask for the denominator: how many learners started the cohort the figure describes, and how many were counted in it?",
            "Ask for three named, recent alumni you may contact — then actually contact them on LinkedIn.",
            "Ask for the job-assistance scope in writing, including how long support continues after the course ends.",
            "Read the refund, deferral and pause clauses before payment, and keep a dated copy of the fee page you were shown.",
          ].map((s, i) => (
            <li key={s} className="flex list-none gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 font-body text-xs font-bold text-accent">
                {i + 1}
              </span>
              <span className="font-body text-sm leading-relaxed text-foreground">{s}</span>
            </li>
          ))}
        </ol>

        <SubHeading>Red flags in AI-course marketing</SubHeading>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {redFlags.map((f) => (
            <div key={f.flag} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-body text-sm font-semibold text-ink">⚠ {f.flag}</p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-muted-foreground">
                {f.why}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 26 — Quiz */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="26" id="course-quiz">
          Find Your Fit — A 60-Second Course Quiz
        </SectionHeading>
        <p className="mt-5">
          Answer eight questions about your experience, background, goal, budget,
          placement priority, learning mode, weekly time and foundations needs. The
          result is a weighted lean, not a verdict — it tells you which program your
          own constraints point to, and what to verify before you pay.
        </p>
        <CourseQuiz />
      </section>

      {/* 27 — Research method */}
      <section className="mt-20" data-reveal>
        <SectionHeading n="27" id="how-i-researched">
          How I Researched &amp; Compared LogicMojo vs Scaler
        </SectionHeading>
        <p className="mt-5">
          Seven source types, each with a stated weight and a stated limitation. Sources
          disagree constantly in EdTech; the rule used here was simple — a claim only
          entered this page as fact if it could be opened and read on a public page, and
          everything else was labelled as a claim or dropped.
        </p>
        <div className="mt-6 space-y-3">
          {researchMethod.map((r, i) => (
            <div key={r.source} className="surface-card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-heading text-xl text-ink">{r.source}</h4>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
                {r.used}
              </p>
              <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
                <strong className="text-ink">Limitation:</strong> {r.limits}
              </p>
            </div>
          ))}
        </div>
        <div className="note-card mt-6 p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Editorial disclosure
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
            This article is published by LogicMojo. That is precisely why no
            unverifiable placement percentage, salary figure or testimonial appears in
            it for either provider. Where LogicMojo is recommended, the reasoning rests
            on published fees, published duration, published syllabus scope and named
            outcomes on{" "}
            <a
              href={LINKS.logicmojoSuccess}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              logicmojo.com/success-story
            </a>{" "}
            — all of which you can check yourself before spending a rupee. Verify current
            fees, batch schedules and policies with both providers directly; figures are
            indicative as of August 2026.
          </p>
        </div>
      </section>
    </>
  );
}

function ScoreCell({ value, tone }: { value: number; tone: "accent" | "primary" }) {
  return (
    <div className="min-w-[86px]">
      <span className="font-heading text-lg text-ink">{value.toFixed(1)}</span>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full ${tone === "accent" ? "bg-accent" : "bg-primary"}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}
