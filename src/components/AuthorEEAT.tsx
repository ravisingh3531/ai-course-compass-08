import {
  AUTHOR,
  EXPERIENCE_POINTS,
  EXPERTISE_POINTS,
  TRUST_RULES,
} from "@/lib/author";
import { LINKS } from "@/lib/links";

/* ------------------------------------------------------------------ */
/*  Byline — sits under the H1                                         */
/* ------------------------------------------------------------------ */

export function AuthorByline() {
  return (
    <div className="mx-auto mt-8 flex max-w-xl items-start gap-4 rounded-2xl border border-border bg-card/80 p-4 text-left backdrop-blur">
      <span
        aria-hidden
        className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-heading text-lg text-primary-foreground"
      >
        LM
      </span>
      <div className="min-w-0">
        <p className="font-body text-sm font-semibold text-ink">
          Written and reviewed by the {AUTHOR.name}
        </p>
        <p className="mt-0.5 font-body text-sm leading-relaxed text-muted-foreground">
          {AUTHOR.role} — mentors who run live AI &amp; ML cohorts, mock
          interviews and portfolio reviews. Updated {AUTHOR.lastUpdated} · next
          review {AUTHOR.nextReview} · {AUTHOR.readTime}
        </p>
        <a
          href="#author-eeat"
          className="mt-1 inline-flex font-body text-sm font-semibold text-accent underline underline-offset-4 hover:text-primary"
        >
          Who wrote this, and why you should (and shouldn&rsquo;t) trust it ↓
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable in-article experience callout                             */
/* ------------------------------------------------------------------ */

export function ExperienceNote({
  label = "From the classroom",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="note-card my-7 p-5">
      <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
        {label}
      </p>
      <div className="mt-2 font-body text-[0.95rem] leading-relaxed text-foreground [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Evidence label chip                                                */
/* ------------------------------------------------------------------ */

export function EvidenceTag({
  kind,
}: {
  kind: "verified" | "provider" | "opinion";
}) {
  const map = {
    verified: ["Verified — check the link", "border-accent/50 bg-accent/10 text-accent"],
    provider: ["Provider-reported", "border-primary/40 bg-primary/10 text-primary"],
    opinion: ["Our judgement", "border-border bg-secondary text-muted-foreground"],
  } as const;
  const [text, cls] = map[kind];
  return (
    <span
      className={`mr-2 inline-flex items-center rounded-full border px-2.5 py-0.5 align-middle font-body text-[0.65rem] font-semibold uppercase tracking-wide ${cls}`}
    >
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Full E-E-A-T section                                               */
/* ------------------------------------------------------------------ */

function Block({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <div className="surface-card p-6">
      <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-heading text-2xl leading-snug text-ink">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((i) => (
          <li key={i.title}>
            <p className="font-body text-sm font-semibold text-ink">{i.title}</p>
            <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
              {i.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AuthorEEAT() {
  return (
    <section
      id="author-eeat"
      className="scroll-mt-28 border-y border-border/70 bg-paper"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div data-reveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Experience · Expertise · Authoritativeness · Trust
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl leading-tight text-ink sm:text-4xl">
            Who wrote this page, what we actually did, and how to check us
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            A comparison is only as good as the people behind it and the rules
            they follow. So before the analysis: here is the first-hand
            experience this page draws on, the expertise behind each judgement,
            the sources you can verify independently, and the disclosure that
            explains where our bias sits.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Block
              eyebrow="Experience"
              title="What we do every week, first-hand"
              items={EXPERIENCE_POINTS}
            />
            <Block
              eyebrow="Expertise"
              title="Why we are qualified to grade these syllabi"
              items={EXPERTISE_POINTS}
            />
            <Block
              eyebrow="Trustworthiness"
              title="The rules this page holds itself to"
              items={TRUST_RULES}
            />
          </div>

          {/* Authoritativeness — sources */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="surface-card p-6">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Authoritativeness
              </p>
              <h3 className="mt-2 font-heading text-2xl leading-snug text-ink">
                Primary sources, linked so you can audit every claim
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                Nothing on this page asks you to take our word for it. Each
                factual claim traces back to a page you can open right now. If a
                link contradicts what we wrote, the link wins — tell us and we
                will correct it.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  ["LogicMojo AI & ML course page", LINKS.logicmojoCourse],
                  ["LogicMojo GenAI syllabus", LINKS.logicmojoGenAI],
                  ["LogicMojo fees & EMI", LINKS.logicmojoFees],
                  ["LogicMojo published success stories", LINKS.logicmojoSuccess],
                  ["Scaler Data Science & AI/ML program", LINKS.scalerCourse],
                  ["Scaler Academy", LINKS.scalerAcademy],
                ].map(([label, href]) => (
                  <li key={label as string}>
                    <a
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-border bg-card px-3 py-1.5 font-body text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="note-card p-6">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                How to read our labels
              </p>
              <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-foreground">
                <li>
                  <EvidenceTag kind="verified" /> you can confirm it yourself on
                  a public page we link.
                </li>
                <li>
                  <EvidenceTag kind="provider" /> the company states it; no
                  independent audit exists — true of both providers.
                </li>
                <li>
                  <EvidenceTag kind="opinion" /> a judgement formed from teaching
                  and interviewing, offered as opinion, not fact.
                </li>
              </ul>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                Found an error? Write to{" "}
                <a
                  href={`mailto:${AUTHOR.contactEmail}`}
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  {AUTHOR.contactEmail}
                </a>
                . Corrections are logged in the editorial update log, not made
                silently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthorEEAT;
