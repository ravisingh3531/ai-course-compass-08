/**
 * Author / E-E-A-T profile for this article.
 *
 * NOTE: Replace the placeholder identity fields (name, role, profileUrl,
 * contactEmail) with the real reviewer's details before publishing. Do not add
 * credentials, employers or outcomes that cannot be verified — unverifiable
 * author claims damage trust rather than build it.
 */
export const AUTHOR = {
  name: "LogicMojo Editorial Review Desk",
  role: "Curriculum reviewers & mentors, LogicMojo",
  // Replace with the named lead reviewer's public profile before publishing.
  profileUrl: "https://logicmojo.com/",
  contactEmail: "support@logicmojo.com",
  lastUpdated: "August 2026",
  nextReview: "February 2027",
  readTime: "~40 min read",
} as const;

/** Experience: what the people writing this page actually do day to day. */
export const EXPERIENCE_POINTS: { title: string; body: string }[] = [
  {
    title: "We teach these cohorts, we don't just read brochures",
    body: "The reviewers on this desk run live AI & ML cohorts every month — Python and statistics foundations through to LLM fine-tuning, RAG pipelines and agentic systems. Everything written about pacing, weekly workload and where beginners get stuck comes from teaching those sessions, not from a comparison spreadsheet.",
  },
  {
    title: "We sit in on mock interviews and portfolio reviews",
    body: "Resume reviews, mock interviews and portfolio critiques are part of the same job. That is where we see which projects recruiters actually ask questions about in 2026 — RAG systems with an evaluation story, deployed agents, and honest write-ups of failure modes — and which ones get skipped in thirty seconds.",
  },
  {
    title: "We evaluated the competing program the way a buyer would",
    body: "For Scaler we did what any prospective learner can repeat: read the official program pages, the published syllabus and fee disclosures, the alumni stories on Scaler's own site, plus public discussion on LinkedIn, Reddit and YouTube. We did not enrol, and we say so rather than implying insider access we do not have.",
  },
  {
    title: "We have seen the failure cases, and they shape the advice",
    body: "The most common regret we hear is not 'I picked the wrong platform' — it is 'I committed twelve months and ₹3 lakh, then life changed in month four.' That pattern is why duration, EMI exposure and weekly hours are weighted as heavily here as syllabus depth.",
  },
];

/** Expertise: the subject-matter basis for the judgements on this page. */
export const EXPERTISE_POINTS: { title: string; body: string }[] = [
  {
    title: "Applied GenAI engineering, not AI commentary",
    body: "The syllabus judgements are made against what a 2026 AI engineer is asked to ship: prompt design and evaluation, retrieval-augmented generation with a real vector store, LangChain/LangGraph-style orchestration, tool-using agents, parameter-efficient fine-tuning (LoRA/QLoRA), and deployment with monitoring and cost control.",
  },
  {
    title: "Classical ML and DSA fundamentals",
    body: "Interview loops still test statistics, model evaluation, feature handling and data-structures fluency. Our reviewers come from a DSA and system-design teaching heritage, which is why sections 6 and 7 grade problem-solving separately from GenAI coverage instead of collapsing them.",
  },
  {
    title: "Hiring-side exposure",
    body: "Mentors on the desk have screened and interviewed candidates for engineering and data roles. Where this page claims something about how a portfolio 'reads' to a recruiter, that is the source — and it is opinion informed by practice, labelled as such, never presented as data.",
  },
];

/** Trustworthiness: the rules this page holds itself to. */
export const TRUST_RULES: { title: string; body: string }[] = [
  {
    title: "Conflict of interest, stated up front",
    body: "LogicMojo publishes this page and sells one of the two programs compared. That is a real bias. Our mitigation is a published rubric with visible weights, Scaler's advantages stated in the same words we would use for our own, and a section that tells you when to pick Scaler instead.",
  },
  {
    title: "Every claim is labelled by evidence class",
    body: "Provider-reported means the company said it and no one audited it — this applies equally to LogicMojo's and Scaler's numbers. Verified means you can check it yourself from a public page we link. Opinion means it is our judgement from teaching and hiring experience.",
  },
  {
    title: "No invented outcomes",
    body: "We do not publish placement percentages, salary figures, testimonials or student stories that we cannot point to on a public page. Alumni quotes in section 28 are reproduced verbatim from each provider's own published stories, with links, and flagged as provider-selected.",
  },
  {
    title: "Prices decay — verify before you pay",
    body: "Fees, EMI terms, scholarships and cohort lengths change without notice. Every figure here is marked indicative as of the update date, with a link to the official page so you can confirm the current number before committing money.",
  },
  {
    title: "Corrections policy",
    body: "If a figure on this page is wrong or out of date — including a Scaler figure — write to the contact address and we will correct it and record the change in the editorial update log rather than silently editing.",
  },
];
