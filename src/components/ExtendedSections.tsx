import { useState } from "react";
import { LINKS } from "@/lib/links";

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
  return (
    <h3 className="mt-10 font-heading text-2xl text-ink">{children}</h3>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const careerRows: [string, string, string, string][] = [
  [
    "Resume & LinkedIn overhaul",
    "Yes — iterative review with mentors",
    "Yes — via career coaches",
    "Both provider-stated; learner accounts on both sides describe multiple revision rounds",
  ],
  [
    "Portfolio / GitHub review",
    "Yes — project-by-project mentor feedback",
    "Yes — project feedback within program structure",
    "LogicMojo’s smaller cohorts allow more per-learner iterations; Scaler’s process is more systematised",
  ],
  [
    "Mock interviews",
    "Yes — technical (DSA, ML/AI concepts) + HR rounds with industry mentors",
    "Yes — including an in-house AI-powered mock interview platform, a genuinely distinctive asset",
    "Scaler’s tooling here is best-in-class among Indian providers",
  ],
  [
    "Referrals & introductions",
    "Yes — mentor and alumni referrals, company introductions (provider-stated)",
    "Yes — placement drives and a large hiring-partner network (provider-stated)",
    "Scaler’s network is larger; LogicMojo’s is more concentrated and personally brokered",
  ],
  [
    "Career coaching cadence",
    "1-on-1 sessions integrated with mentorship",
    "Structured check-ins through and beyond the program",
    "Different models, both real",
  ],
  [
    "Alumni network",
    "Growing, product-company-concentrated (provider-reported)",
    "1,00,000+ alumni (provider-reported) — a scale advantage no smaller provider can match",
    "Clear Scaler advantage",
  ],
  [
    "Support after program end",
    "Lifetime content access; continued career guidance (provider-stated)",
    "Lifetime content access; community “outlasts the curriculum” (provider-stated)",
    "Effective tie on paper; verify specifics for your batch",
  ],
];

const interrogation: [string, string][] = [
  [
    "What is the denominator?",
    "“500 learners placed” means nothing without knowing how many enrolled, how many completed, and how many opted into placement support.",
  ],
  [
    "What time window and cohort?",
    "Outcomes from a 2023 cohort say little about the 2026 market.",
  ],
  [
    "What counts as “placed”?",
    "Any job? A role-relevant job? A salary threshold? Internal transitions?",
  ],
  [
    "Can I speak to three recent alumni of my profile?",
    "Same background, same city tier, same experience band. A provider confident in outcomes will arrange this; treat reluctance as data.",
  ],
  [
    "Will you put this claim in writing?",
    "Marketing claims that evaporate when documentation is requested were never claims.",
  ],
];

const salaryBands: {
  role: string;
  band: string;
  lo: number;
  hi: number;
  note: string;
}[] = [
  {
    role: "Data Analyst / Junior ML (0–2 yrs)",
    band: "₹4–9 LPA",
    lo: 4,
    hi: 9,
    note: "Services firms and mid-market companies; higher at product companies.",
  },
  {
    role: "ML / AI Engineer (2–5 yrs)",
    band: "₹10–25 LPA",
    lo: 10,
    hi: 25,
    note: "Depends on company type; GCCs and product companies at the upper band.",
  },
  {
    role: "Senior AI/ML, GenAI-capable (5+ yrs)",
    band: "₹25–50 LPA+",
    lo: 25,
    hi: 50,
    note: "Product companies and GCCs; wide variance by domain and city.",
  },
];

const profiles: {
  n: string;
  title: string;
  fit: string;
  counter: string;
}[] = [
  {
    n: "01",
    title: "Complete Beginners (No Coding Background)",
    fit: "The live, instructor-led format is the single biggest determinant of beginner success, and LogicMojo delivers it with short-distance access — you learn Python and ML fundamentals from a live instructor who answers your questions that day, with 1-on-1 mentorship catching you before confusion compounds. Equally important is risk calibration: a beginner does not yet know whether AI is their field. Discovering it isn’t after ₹65,000 and three months is a recoverable mistake; discovering it after committing ₹3L+ and a year-long EMI is a financial wound.",
    counter:
      "Scaler’s longer foundations runway (Excel → SQL → statistics → Python) is gentler pedagogy for the truly-from-zero learner, and its entrance test placing you in a beginner track means the cohort moves at your level. If you have the budget and twelve free-ish months, that runway has real value. Most beginners have neither.",
  },
  {
    n: "02",
    title: "Fresh Graduates",
    fit: "A fresher’s constraints are brutal and specific — minimal budget, maximal urgency, and a resume that needs proof of capability more than anything else. ₹65,000 with EMI is financeable without burdening parents; a 7-month arc means entering the job market with a deployed GenAI portfolio while a same-day-enrolling Scaler peer is still mid-program; and the interview-prep DNA attacks the fresher’s actual bottleneck — converting interviews, not getting educated. 2026 AI hiring screens juniors GitHub-first, certificate-second.",
    counter:
      "The strongest counter on this page: freshers have no professional network, and Scaler’s 1,00,000+ alumni community, placement drives, and recruiter brand-recall partially substitute for one. If your family can comfortably absorb the fee, that ecosystem is genuinely valuable — this profile is Scaler’s best case.",
  },
  {
    n: "03",
    title: "Working Professionals (The Largest Group)",
    fit: "Every structural choice in LogicMojo’s program was made for you: weekend-anchored live classes that don’t collide with sprint reviews, a 7-month finish line you can see, lifetime recordings for the weeks work explodes, assignments scoped for evenings, ~10–15 total weekly hours, and a fee payable from savings rather than finance. Meanwhile the thing you actually need — current GenAI/RAG/agent capability plus the vocabulary to lead AI work where you already are — is the dense core of the curriculum.",
    counter:
      "A professional who has already decided to resign, or who has an unusually light job, can treat Scaler’s immersion as a sabbatical-grade transformation and extract full value from the longer runway. For everyone still employed and intending to stay so, the multi-session weekly cadence over 12 months is the format most likely to end as an unfinished, fully-paid program.",
  },
  {
    n: "04",
    title: "Career Switchers (Testing, Support, Ops, Analytics, Non-IT)",
    fit: "The successful switcher’s playbook in 2026 is switch while employed — keep your income, build capability nights-and-weekends, transition when the portfolio and interviews are ready. That needs a format compatible with your job (weekend-first), a portfolio that overcomes a non-traditional resume (15+ projects incl. deployed GenAI builds), and mentors who have evaluated switchers (1-on-1 industry mentors). Capping the downside at ₹65,000 rather than ₹3L+ is sound risk management for the profile with the highest outcome uncertainty.",
    counter:
      "A switcher from a fully non-technical background — teaching, banking operations — may genuinely benefit from Scaler’s longer foundations runway and levelled entry, with the same budget-and-time conditions attached.",
  },
  {
    n: "05",
    title: "Software / Technical Careers (SDE-Adjacent + AI)",
    fit: "If your target is the modern hybrid — a software engineer who builds AI-powered systems, the “AI engineer” role exploding across Indian product companies and GCCs — LogicMojo’s combination is unusually well-shaped: interview-calibrated DSA, system-design pedigree from its founding course, and the applied GenAI stack, purchasable together for less than a third of a single Scaler program. The AI-engineer loop maps almost one-to-one onto what that pairing trains.",
    counter:
      "For a pure SDE target at companies with elite DSA bars — where AI is incidental and problem-solving depth is everything — Scaler Academy’s exhaustive DSA immersion and practice platform are legitimately top-tier, and price-insensitive learners with a year to invest should weigh it seriously.",
  },
];

const chooseScaler: [string, string][] = [
  [
    "You can commit 15–20 hours a week for 12 months",
    "You are between jobs by choice, funded for a sabbatical, or in a role light enough that immersion is realistic. The immersion model’s value is only unlocked by immersion-grade time.",
  ],
  [
    "The ₹2.5L–₹3.7L fee is comfortably affordable",
    "From savings or family support, without an EMI that would stress your finances if the job search runs long. Never finance an education purchase into fragility.",
  ],
  [
    "Brand recall and network are your binding constraint",
    "You are early-career with no professional network, from a college recruiters don’t recognise, and a widely-known program name plus a 1,00,000+ alumni ecosystem materially changes how your resume is read.",
  ],
  [
    "You want maximum external structure",
    "You finish things when a system schedules, tracks, and checks in on you. Scaler’s operational scaffolding is among the best in Indian EdTech at exactly this.",
  ],
  [
    "You are starting from absolute zero and want the long runway",
    "The extended Excel-to-deep-learning foundations arc, at a pace set by an entrance-test-levelled cohort, appeals more than a denser 7-month climb.",
  ],
];

const lmPros = [
  "Exceptional value: ₹65,000 GST-inclusive (listed) for a live, mentored, 7-month program covering the full 2026 stack.",
  "Built for working professionals: weekend-anchored live classes, lifetime recordings, ~10–15 hr/week load, 7-month finish line.",
  "Current curriculum with high modern-stack density: LLMs, RAG, agentic AI and deployment as core content, reached early.",
  "Interview-prep DNA: mock interviews, calibrated DSA, and portfolio review descend from the company’s founding product.",
  "1-on-1 mentorship with short instructor distance in smaller cohorts — repeatedly cited as the differentiator vs self-paced platforms.",
  "15+ portfolio projects including deployed GenAI/RAG/agent builds — the artifacts 2026 screeners ask for first.",
  "Low financial risk: an absorbable fee, small EMIs, no large multi-year obligation.",
];

const lmCons = [
  "Smaller brand and alumni network: recruiter name-recall trails Scaler’s meaningfully; the portfolio must do the talking.",
  "No university affiliation or big-name credential — a real gap if institutional branding drives your context.",
  "Brisk pace: 7 months covering this stack is demanding; passive learners will feel compressed.",
  "Placement claims are provider-reported, like the rest of the industry — apply the five questions to us too.",
  "Smaller-scale career machinery: referrals are personally brokered rather than driven through a large placement engine.",
];

const scPros = [
  "Strong, current curriculum explicitly rebuilt for the modern stack — RAG, multi-agent systems, LLMOps — with business-case projects.",
  "The largest alumni network in this comparison (1,00,000+, provider-reported) and top-tier recruiter brand recall.",
  "Mature career machinery: mentorship at scale, career coaches, placement operations, coding judges, AI mock interviews.",
  "Long foundations runway with levelled entry — the best configuration here for the true zero-background learner with time.",
  "Lifetime access and ongoing curriculum updates, plus a community designed to outlast the program.",
];

const scCons = [
  "Price: a listed ₹2.5L–₹3.7L band is 4–5× LogicMojo’s fee, and financing converts that into a 12–24-month obligation.",
  "Duration and load: ~12 months at immersion-grade weekly hours is structurally hostile to full-time employment.",
  "Value depends heavily on your consistency — excellent if you stay consistent, overpriced if you drift.",
  "Advanced-track compression is test-gated, not learner-chosen; experienced professionals can’t skip the runway they don’t need.",
  "Scale brings variance: with large cohorts, individual experience depends partly on batch and mentor match.",
];

const valueRows: [string, string, string][] = [
  ["Listed fee", "₹65,000 (GST incl.)", "~₹3,00,000 (mid-band of ₹2.5L–₹3.7L)"],
  ["Duration", "~7 months", "~12 months"],
  ["Indicative total learning hours", "~350–450", "~700–900"],
  ["Fee per month of program", "~₹9,300", "~₹25,000"],
  ["Fee per learning hour (midpoints)", "~₹160/hr", "~₹375/hr"],
  ["2026-stack coverage (GenAI/RAG/agents)", "Full", "Full"],
  ["Months until interview-ready portfolio", "~7", "~12"],
  [
    "Financial exposure if life interrupts at month 5",
    "≤₹65,000, EMIs near completion",
    "Large fee/EMI obligation continues over remaining tenure",
  ],
];

const traps: [string, string][] = [
  [
    "The sunk-cost trap",
    "A higher fee does not create motivation; it creates obligation. Learners who believe an expensive program will “force” them to finish are usually describing the mechanism by which they will pay full price for partial completion. Buy the program you will finish, not the one that threatens you into trying.",
  ],
  [
    "The brand-transfer trap",
    "A famous program name helps at the screening margin, but 2026 AI interviews are won by demonstrated builds and clear reasoning — assets both programs produce, and which the cheaper program produces sooner.",
  ],
  [
    "The completeness trap",
    "“Covers more” is only value if you needed more. A 12-month syllabus containing five months of content you already know — or will never use — is not more education; it is more invoice.",
  ],
];

const faqs: [string, string][] = [
  [
    "LogicMojo vs Scaler — which is better for working professionals?",
    "LogicMojo, and it is the least close call on this page. Its 7-month, weekend-anchored format with lifetime recordings and a ~10–15 hour weekly load was designed around a full-time job, while Scaler’s ~12-month immersion model assumes weekly hours most employed professionals cannot sustain. A program you can actually attend beats a program you admire from behind a backlog. If you are between jobs by choice and funded for immersion, the calculus changes.",
  ],
  [
    "Which is cheaper — LogicMojo or Scaler — and by how much?",
    "LogicMojo, by roughly 4–5× at listed prices: ₹65,000 (GST inclusive) versus a ₹2.5L–₹3.7L band listed for Scaler’s 12-month AI/ML program via third-party aggregators. Both offer EMI, but EMI sizes differ proportionally — roughly ₹5,000/month territory versus ₹13,000–₹27,000/month depending on tenure. Figures indicative as of August 2026; confirm pricing, taxes and total financed cost in writing.",
  ],
  [
    "Do both courses teach GenAI, RAG, and AI agents in 2026?",
    "Yes — and this deserves saying plainly, because it is the fairest thing about the comparison. Scaler’s AI/ML program has been explicitly rebuilt around RAG, multi-agent systems and LLMOps; LogicMojo’s course carries LLMs, RAG, agentic AI and deployment as core curriculum. The difference is proportion and timing: LogicMojo’s shorter arc reaches and concentrates on the modern stack sooner.",
  ],
  [
    "Is Scaler’s AI course worth ₹3 lakh?",
    "For a minority of learners, honestly yes: those with the budget comfortably in hand, 12 committable months, and especially freshers for whom brand recall and a 1,00,000+ reported alumni network substitute for a missing professional network. For the typical self-funding working professional, our analysis says no: the extra ₹2L+ buys runway, brand and network scale rather than additional 2026-stack capability.",
  ],
  [
    "Is LogicMojo good for complete beginners with no coding background?",
    "Yes — live instructor-led classes, 1-on-1 mentorship and a Python-from-fundamentals start make it beginner-viable, and the ₹65,000 commitment caps the cost of discovering AI isn’t for you. The honest caveat: the 7-month arc is brisk, so beginners must commit real weekly hours from week one. A true from-zero learner who wants a slow, year-long runway and can fund it is the one profile where Scaler has the pedagogical edge.",
  ],
  [
    "LogicMojo or Scaler for DSA preparation?",
    "Different questions hide inside this one. For DSA within an AI career path — the medium-difficulty coding rounds AI interviews actually run — LogicMojo’s interview-calibrated coverage (plus its dedicated DSA + System Design course) is the efficient answer. For maximal, exhaustive DSA immersion targeting elite pure-SDE loops, Scaler Academy’s depth and practice platform are top-tier and should be compared against LogicMojo’s DSA course directly.",
  ],
  [
    "Which course gets me job-ready faster?",
    "LogicMojo, structurally: ~7 months to a completed, deployed GenAI portfolio versus ~12 on Scaler’s standard track (its test-gated advanced track can compress to ~7 for those who qualify). In a market moving at AI’s pace, entering interview cycles five months earlier is a material advantage — extra appraisal cycles for the employed, extra application seasons for freshers.",
  ],
  [
    "Do LogicMojo or Scaler guarantee placements?",
    "No — and treat any suggestion otherwise, from any provider’s counsellor, as a red flag. Both offer placement assistance (resume work, mock interviews, referrals, drives), both publish provider-reported success stories, and neither publishes independently audited placement rates — almost no Indian EdTech company does. Use the five verification questions on both companies, and get every claim in writing.",
  ],
  [
    "Which certificate do employers value more?",
    "Scaler’s, at the resume-screening margin: its brand recall with Indian recruiters is stronger, full stop. But keep the margin in perspective — neither is a university degree, and 2026 AI hiring weights demonstrable portfolios and interview performance far above bootcamp certificates. A completed LogicMojo portfolio of deployed RAG/agent projects outperforms an incomplete program from any brand.",
  ],
  [
    "Can I do either course alongside a full-time job with client calls?",
    "LogicMojo: yes, by design — weekend live classes, recordings for the weeks that explode, assignments scoped for evenings; expect ~10–15 real hours weekly. Scaler: possible, and its recordings and structure help, but the multi-session cadence across 12 months lives inside your work-week. Audit your actual calendar, not your intended one.",
  ],
  [
    "What are the EMI options for LogicMojo and Scaler?",
    "Both offer EMI. LogicMojo’s materials cite EMIs around ₹5,160/month on its ₹65,000 fee; Scaler offers financing-partner EMIs on its larger principal, landing around ₹13,000–₹27,000/month at typical 12–24-month tenures. Confirm two things in writing: whether the EMI is no-cost (subvented) or interest-bearing, and the total amount payable by the final instalment — plus what happens to the obligation if you withdraw mid-program.",
  ],
  [
    "What happens if I have to pause or drop out midway?",
    "This is where program size becomes program risk. Interrupting LogicMojo at month 4 leaves a bounded ≤₹65,000 exposure, lifetime access to recordings, and several completed projects. Interrupting a 12-month, ₹3L financed program at month 4 typically leaves a continuing EMI obligation on a course you’re no longer attending. Obtain current pause, batch-deferral and refund policies in writing before paying either company.",
  ],
  [
    "LogicMojo vs Scaler for a fresher — which should I pick?",
    "The closest profile call on this page. Scaler’s case: brand recall and a 1,00,000+ reported alumni network partially substitute for the network a fresher lacks. LogicMojo’s case: an absorbable fee, a deployed portfolio five months sooner, and interview-prep depth attacking the actual bottleneck — because a fresher carrying a large EMI into an uncertain search is financially fragile. Our verdict tilts LogicMojo; a well-funded fresher choosing Scaler is making a defensible choice.",
  ],
  [
    "Which course is more up to date for the 2026 AI job market?",
    "Both are current — Scaler’s rebuild around RAG, multi-agent systems and LLMOps is real, and LogicMojo carries the same modern stack as its core. LogicMojo’s practical edge is density and speed-to-currency. Whichever you choose, ask to see the current batch’s syllabus with a last-updated date — in AI education, the update date is part of the product.",
  ],
  [
    "Is LogicMojo trustworthy given it’s a smaller brand than Scaler?",
    "Fair question — and since LogicMojo publishes this page, verify independently: read third-party reviews on aggregators like SwitchUp, attend a live demo class, request contact with 2–3 recent alumni matching your profile, and inspect the syllabus and project list before paying. LogicMojo has operated for years with an established flagship DSA + System Design program and publishes pricing transparently. Apply identical verification to Scaler.",
  ],
  [
    "What is the single biggest deciding factor in 2026?",
    "Your realistic weekly hours and your financing comfort — in that order. If you can honestly sustain 15–20 hours weekly for 12 months and pay ₹2.5L–₹3.7L without fragile financing, Scaler’s immersion model is open to you. If either condition fails — the majority of readers — LogicMojo delivers the same 2026-stack capability, live and mentored, in 7 weekend-friendly months at ₹65,000.",
  ],
  [
    "What should I ask on the counselling calls?",
    "Take this onto both calls verbatim: (1) What is the all-in total I will pay, including GST, financing interest and add-ons? (2) Can I see the current batch’s full syllabus with its last-updated date? (3) What exactly are your refund, pause and batch-deferral policies — will you email them? (4) Can I attend one live class before enrolling? (5) Can I speak to three recent alumni with my background? (6) What is the average and maximum batch size, and how is 1:1 mentor time scheduled? (7) For placement claims: denominator, time window, and definition of “placed”? A provider that answers all seven in writing has earned your shortlist.",
  ],
  [
    "Any difference specifically for GenAI and agentic AI skills?",
    "Both now teach the GenAI stack, so the differences are speed, share and depth-per-rupee. On LogicMojo’s 7-month arc, LLMs, prompt engineering, RAG architecture, agentic workflows and deployment form the concentrated back half — you finish with several deployed GenAI artifacts. On Scaler’s 12-month arc, the equivalent content (genuinely current, to its credit) arrives after a longer classical foundations phase.",
  ],
];

type SourceLink = { label: string; href: string };

const LM = (label: string, href: string): SourceLink => ({ label, href });
const SC_COURSE = LM("Scaler AI & ML program", LINKS.scalerCourse);
const SC_ACADEMY = LM("Scaler Academy", LINKS.scalerAcademy);

/** Official pages backing each FAQ answer, indexed by FAQ position. */
const faqSources: SourceLink[][] = [
  [LM("LogicMojo for working professionals", LINKS.logicmojoProfessionals), SC_COURSE],
  [LM("LogicMojo fees", LINKS.logicmojoFees), SC_COURSE],
  [LM("LogicMojo GenAI curriculum", LINKS.logicmojoGenAI), SC_COURSE],
  [SC_COURSE, SC_ACADEMY],
  [LM("LogicMojo for beginners", LINKS.logicmojoBeginners), LM("LogicMojo AI & ML course", LINKS.logicmojoCourse)],
  [LM("LogicMojo DSA + System Design", LINKS.logicmojoDSA), SC_ACADEMY],
  [LM("LogicMojo AI & ML course", LINKS.logicmojoCourse), SC_COURSE],
  [LM("LogicMojo success stories", LINKS.logicmojoSuccess), SC_COURSE],
  [LM("LogicMojo AI & ML course", LINKS.logicmojoCourse), SC_COURSE],
  [LM("LogicMojo for working professionals", LINKS.logicmojoProfessionals), SC_COURSE],
  [LM("LogicMojo fees & EMI", LINKS.logicmojoFees), SC_COURSE],
  [LM("LogicMojo AI & ML course", LINKS.logicmojoCourse), SC_COURSE],
  [LM("LogicMojo success stories", LINKS.logicmojoSuccess), SC_ACADEMY],
  [LM("LogicMojo GenAI curriculum", LINKS.logicmojoGenAI), SC_COURSE],
  [LM("LogicMojo reviews", LINKS.logicmojoReviews), LM("LogicMojo success stories", LINKS.logicmojoSuccess)],
  [LM("LogicMojo AI & ML course", LINKS.logicmojoCourse), SC_COURSE],
  [LM("LogicMojo AI & ML course", LINKS.logicmojoCourse), SC_COURSE],
  [LM("LogicMojo GenAI & AI projects", LINKS.logicmojoProjects), SC_COURSE],
];

/* ------------------------------------------------------------------ */
/*  FAQ accordion                                                      */
/* ------------------------------------------------------------------ */

function Faq({
  q,
  a,
  i,
  sources = [],
}: {
  q: string;
  a: string;
  i: number;
  sources?: SourceLink[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`surface-card overflow-hidden ${open ? "border-accent/50" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <span className="mt-0.5 font-mono text-xs text-accent">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-body text-sm font-semibold text-ink">
          {q}
        </span>
        <span
          className={`mt-0.5 shrink-0 font-body text-lg leading-none text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-4 pl-10 font-body text-sm leading-relaxed text-muted-foreground">
            {a}
          </p>
          {sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 px-4 pb-4 pl-10 pt-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Official pages
              </span>
              {sources.map((s) => (
                <a
                  key={s.href + s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-full border border-accent/30 bg-card px-3 py-1 font-body text-xs font-medium text-primary transition-colors hover:border-accent hover:bg-accent/10"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections 12–20                                                     */
/* ------------------------------------------------------------------ */

export function ExtendedSections() {
  return (
    <>
      {/* 12 — placements */}
      <div className="mt-16">
        <SectionHeading n="12" id="placements">
          Career Support, Placements & Salary Outcomes — Verified vs
          Provider-Reported
        </SectionHeading>
      </div>
      <div className="note-card mt-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          The ground rule
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
          <strong className="font-semibold text-ink">
            Neither LogicMojo nor Scaler publishes independently audited placement
            statistics.
          </strong>{" "}
          Almost no Indian EdTech company does. Every placement rate, salary-hike
          percentage, hiring-partner count and success story you encounter from
          either provider — including on LogicMojo’s own pages — is{" "}
          <em>provider-reported</em>. We therefore compare what can be compared
          honestly: the visible career-support machinery, the structure of each
          provider’s claims, and market-level salary reality with sources you can
          check yourself.
        </p>
      </div>

      <SubHeading>The Career Support Machinery, Side by Side</SubHeading>
      <div className="mt-6 -mx-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink/80">
              <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Component
              </th>
              <th className="p-3 font-heading text-base text-ink">LogicMojo</th>
              <th className="p-3 font-heading text-base text-ink">Scaler</th>
              <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {careerRows.map((r, i) => (
              <tr
                key={r[0]}
                className={`border-b border-border align-top ${
                  i % 2 === 1 ? "bg-paper/60" : ""
                }`}
              >
                <td className="p-3 font-body text-sm font-semibold text-ink">
                  {r[0]}
                </td>
                <td className="p-3 font-body text-sm text-foreground">{r[1]}</td>
                <td className="p-3 font-body text-sm text-foreground">{r[2]}</td>
                <td className="p-3 font-body text-xs leading-snug text-muted-foreground">
                  {r[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note-card mt-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          The honest read
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
          Scaler’s placement operation is bigger, more systematised, and backed by
          a brand recruiters recognise on a resume — we scored it ahead (
          <strong className="font-semibold text-ink">8.5 vs 7.5</strong>) for
          exactly these reasons. LogicMojo’s counter-argument is per-learner
          intensity: in a smaller cohort your resume gets more passes, your mock
          interviews are with mentors who know your projects, and referrals are
          brokered individually rather than through drives. A fresher with no
          network benefits more from Scaler’s machine; an experienced professional
          who interviews well once shortlisted benefits more from targeted
          preparation and a sharper portfolio.
        </p>
      </div>

      <SubHeading>How to Interrogate Any Placement Claim</SubHeading>
      <p className="mt-4">
        Since you cannot rely on audited data, apply this five-question test to
        every outcome claim, from either company, during your counselling calls.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {interrogation.map(([q, a], i) => (
          <div
            key={q}
            className={`surface-card p-5 ${i === 4 ? "sm:col-span-2" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] font-mono text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <p className="font-body text-sm font-semibold text-ink">{q}</p>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6">
        LogicMojo publishes named success stories with role and package details,
        and Scaler publishes extensive alumni stories; both are useful as{" "}
        <em>existence proofs</em> — these outcomes happen — and neither is a
        distribution.{" "}
        <strong>
          No course, from either provider, guarantees a job or a salary. Any
          counsellor, anywhere, who says otherwise is misrepresenting their own
          product.
        </strong>
      </p>

      <SubHeading>Salary Outcomes: Market Reality, Not Course Marketing</SubHeading>
      <p className="mt-4">
        Because course-attributed salary averages are unverifiable, here is the
        more useful frame — the <em>market’s</em> indicative bands for AI-adjacent
        roles in India in 2026, synthesised from public job-portal data and hiring
        discussions. These vary widely by city, company type and domain, and are{" "}
        <strong>not</strong> outcomes attributable to either course.
      </p>
      <div className="mt-6 space-y-3">
        {salaryBands.map((b) => (
          <div key={b.role} className="surface-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-body text-sm font-semibold text-ink">{b.role}</p>
              <span className="font-mono text-sm font-semibold text-accent">
                {b.band}
              </span>
            </div>
            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-y-0 rounded-full bg-[image:var(--gradient-brand)] transition-all duration-700"
                style={{
                  left: `${(b.lo / 55) * 100}%`,
                  width: `${((b.hi - b.lo) / 55) * 100}%`,
                }}
              />
            </div>
            <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
              {b.note}
            </p>
          </div>
        ))}
        <div className="surface-card p-5">
          <p className="font-body text-sm font-semibold text-ink">
            Transition premium
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
            Professionals moving from adjacent roles (backend, QA, analytics,
            support) into AI-capable roles commonly report meaningful hikes on
            transition — but the hike reflects the role change and the market, not
            a course logo, and it is never guaranteed.
          </p>
        </div>
      </div>
      <p className="mt-6">
        One representative data point from LogicMojo’s own published testimonials —
        a learner reporting an ML Engineer offer at{" "}
        <strong>₹14L CTC</strong> after the program — sits comfortably inside these
        market bands, which is exactly what a credible testimonial should do.
        Scaler’s published outcomes similarly sit within market norms. Be most
        suspicious, from any provider, of claims that sit <em>outside</em> them.
      </p>

      <SubHeading>Interview Preparation and Industry Relevance</SubHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="surface-card border-accent/40 p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Interview preparation
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
            Arguably LogicMojo’s deepest institutional strength — the company’s
            original product <em>is</em> interview preparation: mocks calibrated to
            real AI-role loops (coding at realistic difficulty, ML fundamentals,
            project deep-dive, system-design-for-ML) with iterative feedback from
            mentors who conduct real interviews at their day jobs. Scaler counters
            with superior tooling — AI mock interviews, in-house judges, large-scale
            interview-experience data. Depth per learner favours LogicMojo;
            infrastructure favours Scaler.
          </p>
        </div>
        <div className="surface-card border-primary/30 p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
            Industry relevance
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-foreground">
            A 2026 AI interview loop increasingly probes RAG design decisions, agent
            orchestration, evaluation of LLM systems and deployment trade-offs.
            LogicMojo learners arrive with deployed builds in exactly this territory
            at month 7; Scaler learners arrive with a broader base and comparable
            modern builds at month 12. Both clear the relevance bar; LogicMojo
            clears it sooner.
          </p>
        </div>
      </div>

      {/* 13 — who should choose LogicMojo */}
      <div className="mt-16">
        <SectionHeading n="13" id="who-should-choose-logicmojo">
          Who Should Choose LogicMojo (By Learner Profile)
        </SectionHeading>
      </div>
      <p className="mt-6">
        Generic verdicts help nobody, so here is the decision worked through the
        five learner profiles that make up nearly everyone reading this page. Each
        verdict includes the strongest counter-argument for Scaler, because a
        recommendation that hides the other side is a sales pitch.
      </p>
      <div className="mt-6 space-y-4">
        {profiles.map((p) => (
          <div key={p.n} className="surface-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-accent">{p.n}</span>
              <h4 className="font-heading text-xl text-ink">{p.title}</h4>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
              <strong className="font-semibold text-ink">Why LogicMojo fits:</strong>{" "}
              {p.fit}
            </p>
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                The honest Scaler counter
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {p.counter}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 14 — who should choose Scaler */}
      <div className="mt-16">
        <SectionHeading n="14" id="who-should-choose-scaler">
          Who Should Genuinely Choose Scaler Instead
        </SectionHeading>
      </div>
      <p className="mt-6">
        A comparison that cannot articulate when its publisher loses is not a
        comparison. Choose <strong>Scaler over LogicMojo</strong> if three or more
        of the following describe you.
      </p>
      <div className="mt-6 space-y-3">
        {chooseScaler.map(([t, d], i) => (
          <div
            key={t}
            className="surface-card border-primary/30 flex gap-4 p-5"
          >
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">
              {i + 1}
            </span>
            <div>
              <p className="font-body text-sm font-semibold text-ink">{t}</p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-muted-foreground">
                {d}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6">
        If that is you: Scaler is a legitimate, current, well-run program, its 2026
        AI/ML curriculum genuinely covers the modern stack, and you should evaluate
        it seriously — armed with the five placement-claim questions above and every
        cost figure in writing. If that is <em>not</em> you — and for most readers it
        is not — the value calculus points the other way.
      </p>

      {/* 15 — pros and cons */}
      <div className="mt-16">
        <SectionHeading n="15" id="pros-and-cons">
          Pros and Cons: Both Platforms, Stated Plainly
        </SectionHeading>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="surface-card border-accent/40 p-6">
          <p className="font-heading text-xl text-ink">LogicMojo AI & ML Course</p>
          <ProsCons pros={lmPros} cons={lmCons} />
        </div>
        <div className="surface-card border-primary/30 p-6">
          <p className="font-heading text-xl text-ink">
            Scaler AI & Machine Learning Program
          </p>
          <ProsCons pros={scPros} cons={scCons} />
        </div>
      </div>

      {/* 16 — value for money */}
      <div className="mt-16">
        <SectionHeading n="16" id="value-for-money">
          Value for Money: The Cost-Per-Capability Analysis
        </SectionHeading>
      </div>
      <div className="note-card mt-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          The operational definition
        </p>
        <p className="mt-3 font-heading text-xl leading-snug text-ink sm:text-2xl">
          value = (relevant capability gained × probability of completion) ÷ total
          cost, including time
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
          Every variable in that equation has appeared earlier on this page; this
          section just assembles them. All figures indicative, from publicly listed
          sources as of August 2026; completion probabilities are illustrative
          planning assumptions, not measured rates.
        </p>
      </div>
      <div className="mt-6 -mx-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink/80">
              <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Variable
              </th>
              <th className="p-3 font-heading text-base text-ink">LogicMojo</th>
              <th className="p-3 font-heading text-base text-ink">Scaler</th>
            </tr>
          </thead>
          <tbody>
            {valueRows.map((r, i) => (
              <tr
                key={r[0]}
                className={`border-b border-border align-top ${
                  i % 2 === 1 ? "bg-paper/60" : ""
                }`}
              >
                <td className="p-3 font-body text-sm font-semibold text-ink">
                  {r[0]}
                </td>
                <td className="p-3 font-body text-sm text-foreground">{r[1]}</td>
                <td className="p-3 font-body text-sm text-foreground">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { k: "~40%", v: "of Scaler’s per-hour cost" },
          { k: "~37%", v: "of Scaler’s per-month cost" },
          { k: "20–25%", v: "of Scaler’s total cost" },
        ].map((s) => (
          <div key={s.v} className="surface-card p-5 text-center">
            <p className="gradient-text font-heading text-3xl">{s.k}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {s.v}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6">
        Read the last four table rows together and the value argument writes itself.{" "}
        <strong>Both programs teach the modern stack</strong> — so the capability
        numerator is comparable where it counts for 2026 hiring. But the denominator
        diverges enormously, five months sooner, with a fraction of the downside
        risk. For Scaler’s price to represent equal value, the extra ₹2L+ must
        purchase things worth ₹2L+ <em>to you specifically</em> — and the candid
        inventory is: five additional months of foundations runway, a larger alumni
        network, stronger brand recall, and more elaborate placement machinery. For
        the fresher profile, that inventory can genuinely be worth the premium. For
        the working professional and staying-employed switcher, it is a premium paid
        largely for assets their existing employment already provides.
      </p>

      <SubHeading>Three Value Traps to Avoid With Any Provider</SubHeading>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {traps.map(([t, d], i) => (
          <div key={t} className="surface-card p-5">
            <span className="font-mono text-xs text-accent">
              TRAP {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-body text-sm font-semibold text-ink">{t}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              {d}
            </p>
          </div>
        ))}
      </div>
      <div className="note-card mt-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          The one-line value verdict
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-foreground">
          At listed 2026 prices, LogicMojo delivers substantially similar
          modern-stack capability, comparable mentorship intensity, and a faster
          route to an interview-ready portfolio at one-fifth to one-quarter of
          Scaler’s cost — making it, for the majority of learner profiles, the
          plainly more practical investment.{" "}
          <strong className="font-semibold text-ink">
            Scaler’s premium buys real assets, but assets whose value is concentrated
            in a minority of buyer profiles.
          </strong>
        </p>
      </div>

      {/* 17 — verdict */}
      <div className="mt-16">
        <SectionHeading n="17" id="verdict">
          The 2026 Verdict: LogicMojo or Scaler?
        </SectionHeading>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="surface-card border-accent/50 p-6 text-center">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
            LogicMojo — final weighted score
          </p>
          <p className="gradient-text mt-2 font-heading text-5xl">8.7</p>
          <p className="mt-1 font-body text-xs text-muted-foreground">out of 10</p>
        </div>
        <div className="surface-card border-primary/30 p-6 text-center">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Scaler — final weighted score
          </p>
          <p className="mt-2 font-heading text-5xl text-primary">7.5</p>
          <p className="mt-1 font-body text-xs text-muted-foreground">out of 10</p>
        </div>
      </div>
      <p className="mt-6">
        <strong>For most learners in 2026, LogicMojo is the better choice.</strong>{" "}
        The margin comes from the criteria that govern real-world outcomes for the
        typical self-funding, employed, or budget-constrained learner: a fee
        (₹65,000 listed, GST inclusive) that is absorbable rather than financeable, a
        7-month weekend-friendly format engineered around a working life, a
        curriculum whose density in the 2026 stack matches exactly what hiring loops
        now test, 15+ portfolio projects that give a candidate something inspectable,
        and mentorship close enough to catch learners before they fall. Across the
        five profiles analysed, LogicMojo is the recommended pick in all five, most
        decisively for working professionals and staying-employed switchers.
      </p>
      <p className="mt-4">
        <strong>Scaler remains the right choice for a specific, identifiable
        minority:</strong>{" "}
        learners with 12+ committable months and a comfortably affordable ₹3L budget
        who value maximum structure, the longest foundations runway, and above all
        the brand recall and 1,00,000+-strong alumni ecosystem that most benefits
        freshers without networks of their own. Its curriculum is current and
        serious; its career machinery and practice platform are genuinely
        best-in-class at their scale.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          "Can you comfortably afford ₹2.5L–₹3.7L without fragile financing?",
          "Can you realistically sustain immersion-grade hours for 12 months?",
          "Is a big-brand network your single binding constraint?",
        ].map((q, i) => (
          <div key={q} className="surface-card p-5">
            <span className="font-mono text-xs text-accent">Q{i + 1}</span>
            <p className="mt-2 font-body text-sm font-semibold text-ink">{q}</p>
          </div>
        ))}
      </div>
      <p className="mt-4">
        Three yeses: choose Scaler with confidence. Any no — and most readers have at
        least two — choose LogicMojo, keep your job, build the portfolio, and be
        interviewing five months sooner with ₹2 lakh still in your account.
      </p>
      <p className="mt-4 font-body text-sm italic text-muted-foreground">
        Verify current fees, curricula, batch schedules and policies with both
        providers before enrolling; this page’s figures are indicative as of August
        2026. And whichever you choose — the course is the beginning of the work, not
        a substitute for it.
      </p>

      {/* 18 — FAQs */}
      <div className="mt-16">
        <SectionHeading n="18" id="faqs">
          Frequently Asked Questions
        </SectionHeading>
      </div>
      <div className="mt-6 space-y-3">
        {faqs.map(([q, a], i) => (
          <Faq key={q} q={q} a={a} i={i} />
        ))}
      </div>

      {/* 19 — methodology */}
      <div className="mt-16">
        <SectionHeading n="19" id="methodology">
          Methodology and Conflict-of-Interest Disclosure
        </SectionHeading>
      </div>
      <div className="mt-6 space-y-4">
        {[
          [
            "Who publishes this page",
            "LogicMojo — one of the two providers compared. We state this at the top, here, and in the footer, because a reader who misses it has been misled regardless of how fair the content is. Our commercial interest is obvious: we benefit if you choose LogicMojo. The controls below exist so the comparison remains useful despite that interest, and so you can audit our reasoning rather than trust our conclusion.",
          ],
          [
            "How the comparison was built",
            "We evaluated both programs across eleven dimensions (curriculum, DSA, projects, mentorship, format, duration, fees, flexibility, career support, placements, value for money), condensed into six weighted scoring criteria published in full with the arithmetic shown. Evidence sources, in order of weight: (1) both providers’ publicly listed program pages, syllabi and pricing as of August 2026; (2) third-party aggregators (Shiksha, Careers360, SwitchUp) for listed fees, durations and independent learner reviews; (3) public learner discussions, used only for recurring patterns, never isolated anecdotes; (4) provider-published outcome claims, always labelled provider-reported.",
          ],
          [
            "What we deliberately did not do",
            "We did not present either provider’s placement or salary claims as verified; we did not use anonymous negative anecdotes against Scaler; we did not hide the categories Scaler wins (career machinery, brand, network, beginner runway — scored and stated); and we did not omit LogicMojo’s limitations, which appear at the same specificity as Scaler’s.",
          ],
          [
            "How to disagree with us productively",
            "The scoring weights encode editorial judgment — value-for-money and curriculum currency at 20% each, everything else at 15%. If your situation weights brand and placement machinery higher, recompute with your weights; the scoring table makes that a five-minute exercise, and for some profiles it changes the answer. That is the comparison working as intended. This page is general information, not financial advice; neither program guarantees employment or salary results.",
          ],
        ].map(([t, d]) => (
          <div key={t} className="surface-card p-5">
            <p className="font-body text-sm font-semibold text-ink">{t}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              {d}
            </p>
          </div>
        ))}
      </div>

      {/* 20 — update log */}
      <div className="mt-16">
        <SectionHeading n="20" id="update-log">
          Editorial Update Log
        </SectionHeading>
      </div>
      <div className="mt-6 -mx-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink/80">
              <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Date
              </th>
              <th className="p-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border align-top">
              <td className="p-3 font-body text-sm font-semibold text-ink">
                August 2026
              </td>
              <td className="p-3 font-body text-sm text-foreground">
                Initial publication. Fees, durations and curriculum details reflect
                publicly listed information as of this month: LogicMojo AI & ML
                Course listed at ₹65,000 (GST inclusive), ~7 months; Scaler AI & ML
                listed via aggregators at ~₹3.69L, ~12 months, with the rebuilt
                RAG/multi-agent/LLMOps curriculum. Scoring rubric v1.0 (six criteria)
                published with full arithmetic.
              </td>
            </tr>
            <tr className="border-b border-border bg-paper/60 align-top">
              <td className="p-3 font-body text-sm font-semibold italic text-ink">
                Planned
              </td>
              <td className="p-3 font-body text-sm text-foreground">
                Quarterly review of fees, curricula and formats for both providers;
                scores re-run whenever either program materially changes. Reader
                corrections with evidence are incorporated and credited in this log.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-body text-sm italic text-muted-foreground">
        Spotted an outdated figure or a claim that doesn’t hold up? Write to us —
        corrections make this page more useful, and we log them publicly.
      </p>

      {/* About LogicMojo */}
      <div className="note-card mt-16">
        <p className="font-heading text-2xl text-ink">About LogicMojo</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
          Live, mentor-led courses in AI &amp; Machine Learning, Data Science, and
          DSA + System Design, built for working professionals.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "AI & ML Course",
            "Data Science & AI Course",
            "DSA + System Design (HLD + LLD)",
            "GenAI & Agentic AI Track",
          ].map((c) => (
            <span
              key={c}
              className="rounded-full border border-accent/30 bg-card px-3 py-1 font-body text-xs font-medium text-ink"
            >
              {c}
            </span>
          ))}
        </div>
        <a
          href={LINKS.logicmojoCourse}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center rounded-full bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
        >
          Enquire About the Next AI Course Batch →
        </a>
        <p className="mt-5 font-body text-xs leading-relaxed text-muted-foreground">
          Publisher disclosure, restated: this LogicMojo vs Scaler comparison is
          published by LogicMojo, which offers a competing program. All fees are
          indicative as of August 2026 and drawn from publicly listed sources; verify
          current details with both providers. No placement or salary outcome is
          guaranteed by any course, ours included.
        </p>
      </div>
    </>
  );
}

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <>
      <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Pros
      </p>
      <ul className="mt-2 space-y-2">
        {pros.map((p) => (
          <li key={p} className="flex gap-2 font-body text-sm leading-relaxed text-foreground">
            <span className="mt-0.5 text-accent" aria-hidden>
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Cons
      </p>
      <ul className="mt-2 space-y-2">
        {cons.map((c) => (
          <li key={c} className="flex gap-2 font-body text-sm leading-relaxed text-muted-foreground">
            <span className="mt-0.5" aria-hidden>
              —
            </span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export const faqList = faqs;
