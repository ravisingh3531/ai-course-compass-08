import { LINKS } from "@/lib/links";

/* ------------------------------------------------------------------ */
/*  Real, published alumni reviews                                     */
/*  Every quote below is reproduced verbatim from the provider's own   */
/*  public web page. Nothing here is written, edited or invented.      */
/* ------------------------------------------------------------------ */

type Story = {
  name: string;
  role: string;
  before?: string;
  quote: string;
  hike?: string;
};

/** Source: https://logicmojo.com/success-story (published testimonial grid). */
const logicmojoStories: Story[] = [
  {
    name: "Praveen Kumar",
    role: "Data Scientist | Generative AI (GenAI) Developer at RevealIT Solutions",
    before: "Soothsayer Analytics",
    hike: "160%",
    quote:
      "I highly appreciated Logicmojo's data science course for its outstanding lectures and the expert team's readiness to address technical queries, which played a crucial role in helping me secure job in Data Scientist roles especially GenAI Development.",
  },
  {
    name: "Aman Lateef",
    role: "GenAI Developer at Infosys",
    before: "B.Tech (fresher)",
    hike: "220%",
    quote:
      "I liked Logicmojo's data science course for its amazing lectures and the always-helpful from expert team anytime, which really helped me land a job as a Data Scientist in Invent Health Inc. It's a best data science course currently available online with best quality.",
  },
  {
    name: "Ashish Anand",
    role: "Data Scientist",
    before: "Wipro",
    hike: "150%",
    quote:
      "I am happy to share my experience with the Logicmojo Data Science program. it was a rewarding 7-month journey. The instructor covered Advanced Python, Machine Learning, Deep Learning, and Computer Vision in the classes. I built a strong profile as a Data Scientist and completed 5 projects during the classes. Thank you, team..",
  },
  {
    name: "Anjani Kumar",
    role: "Software Development Engineer",
    before: "Infosys",
    hike: "295%",
    quote:
      "Very Well-arranged Course and its Amazing Lecture Delivery by Trainers. Expert Team is always Available to solve Any Technical Queries. Logicmojo Live Preparation Training Helps me to Crack Zynga and Now Amazon Interview.",
  },
  {
    name: "Vatsal Garg",
    role: "SDE 2",
    before: "Nagarro",
    hike: "80%",
    quote:
      "I was always preparing from Leetcode Materials. But i was not manage to crack product companies interviews. The issue was always be the direction. Logicmojo Live Classes clearly cover all topics with clear direction. After every Topic You need to go through the tests. After test then mentorship program. Overall very good Experience.",
  },
  {
    name: "Rishav Jha",
    role: "Senior Software Engineer",
    before: "Dell",
    hike: "210%",
    quote:
      "I have completed my course in Logicmojo which was very great and i have gained full knowledge and it is very good place to learn and explore our technical knowledge. I'm very happy with the training excellent teaching and it's full worth it to what I have thought for. It's very good platform for freshers and experienced as well.",
  },
];

/** Source: https://www.scaler.com/academy/ ("Stories" section, alumni quotes). */
const scalerStories: Story[] = [
  {
    name: "Shivam Prakash",
    role: "Computer Scientist, Adobe",
    before: "Backend Engineer, Ericsson",
    hike: "3 offers (page-stated)",
    quote:
      "This journey has been an incredible blend of theoretical knowledge and hands-on experience, equipping me with the skills to tackle real-world challenges in the dynamic field of AI and ML. I'm excited to leverage this knowledge to contribute meaningfully to the ever-evolving landscape of technology and innovation.",
  },
  {
    name: "Divyanshu Tanter",
    role: "AI Researcher and Developer, Dassault Systèmes",
    before: "Data Scientist, Wipro Limited",
    hike: "4 offers (page-stated)",
    quote:
      "In just 2.5 months of joining Scaler, I not only learned the fundamentals but also advanced-level concepts in Data Science and Machine Learning. The structured approach, comprehensive curriculum, and unwavering guidance of mentors like Srikanth Varma Chekuri, Naman Bhalla, Mudit Goel, and a fantastic cohort of peers made this journey incredibly rewarding.",
  },
  {
    name: "Sayyam Bhandari",
    role: "Data Engineer, Amazon",
    before: "Sr BI Analyst, USEReady INC.",
    hike: "2 offers (page-stated)",
    quote:
      "Scaler Academy's program is truly exceptional, providing me with the skills and confidence necessary to thrive in the field of Full-Stack Data Engineer. The practical projects and real-world scenarios prepared me well for the challenges ahead.",
  },
];

function StoryCard({
  story,
  tone,
}: {
  story: Story;
  tone: "lm" | "sc";
}) {
  const accentClass = tone === "lm" ? "text-accent" : "text-primary";
  const borderClass = tone === "lm" ? "border-accent/40" : "border-primary/30";
  const badgeClass =
    tone === "lm"
      ? "border-accent/50 bg-accent/15 text-primary"
      : "border-primary/30 bg-primary/10 text-primary";

  return (
    <figure
      className={`surface-card ${borderClass} flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <figcaption className="font-heading text-lg leading-tight text-ink">
            {story.name}
          </figcaption>
          <p className={`mt-1 font-body text-xs font-semibold ${accentClass}`}>
            {story.role}
          </p>
        </div>
        {story.hike && (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 font-body text-[11px] font-semibold ${badgeClass}`}
          >
            {story.hike}
          </span>
        )}
      </div>

      <blockquote className="mt-4 flex-1 border-l-2 border-border pl-4 font-body text-sm leading-relaxed text-foreground">
        “{story.quote}”
      </blockquote>

      {story.before && (
        <p className="mt-4 border-t border-border pt-3 font-body text-xs text-muted-foreground">
          <span className="uppercase tracking-wide">Before</span> · {story.before}
        </p>
      )}
    </figure>
  );
}

export default function AlumniReviews() {
  return (
    <section className="mt-16" data-reveal>
      <h2
        id="alumni-reviews"
        className="scroll-mt-28 font-heading text-3xl leading-tight text-ink sm:text-4xl"
      >
        <span className="mr-3 font-body text-sm font-semibold tracking-[0.2em] text-accent">
          28
        </span>
        Real Alumni Reviews — Straight From Each Provider’s Own Pages
      </h2>

      <p className="mt-6 font-body leading-relaxed text-foreground">
        Rather than paraphrase, this section reproduces alumni statements exactly as each
        company publishes them on its own website. Read them as marketing-curated
        testimonials — useful signal about what learners consistently praise, not
        independent proof of outcomes.
      </p>

      {/* Disclaimer */}
      <div className="note-card mt-6 border-l-4 border-accent p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
          Disclaimer — read this before the quotes
        </p>
        <ul className="mt-3 space-y-2 font-body text-sm leading-relaxed text-foreground">
          <li>
            Every quote below is <strong>reproduced verbatim</strong> from the provider’s
            own published page (linked under each column). Nothing has been written,
            embellished, reworded or invented for this article.
          </li>
          <li>
            These are <strong>provider-selected testimonials</strong>. Companies publish
            their best outcomes; they are not a random or audited sample, and they do not
            represent the average learner’s result.
          </li>
          <li>
            Hike percentages, offer counts and job titles are{" "}
            <strong>as stated on the source page</strong> and have not been independently
            verified by this article. Treat them as claims, not audited data.
          </li>
          <li>
            No salary figures, screenshots, personal experiences or additional
            testimonials have been added. Outcomes are individual and{" "}
            <strong>not a placement or salary guarantee</strong> from either provider.
          </li>
          <li>
            Verify any story yourself: search the learner’s name on LinkedIn, or open the
            source page and check current listings. Snapshot captured August 2026 —
            provider pages change.
          </li>
        </ul>
      </div>

      {/* LogicMojo */}
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-heading text-2xl text-ink">
          LogicMojo — published student stories
        </h3>
        <a
          href={LINKS.logicmojoSuccess}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs font-semibold text-primary underline underline-offset-4"
        >
          Source: logicmojo.com/success-story ↗
        </a>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {logicmojoStories.map((s) => (
          <StoryCard key={s.name} story={s} tone="lm" />
        ))}
      </div>
      <p className="mt-4 font-body text-xs leading-relaxed text-muted-foreground">
        The first three cards are data-science / GenAI-track learners, which is the
        relevant cohort for this comparison; the rest come from LogicMojo’s
        DSA and system-design tracks and speak to teaching quality rather than AI
        outcomes. More reviews:{" "}
        <a
          href={LINKS.logicmojoReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary underline underline-offset-4"
        >
          logicmojo.com/reviews
        </a>
        .
      </p>

      {/* Scaler */}
      <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-heading text-2xl text-ink">
          Scaler — published alumni quotes
        </h3>
        <a
          href={LINKS.scalerAcademy}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-body text-xs font-semibold text-primary underline underline-offset-4"
        >
          Source: scaler.com/academy ↗
        </a>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {scalerStories.map((s) => (
          <StoryCard key={s.name} story={s} tone="sc" />
        ))}
      </div>
      <p className="mt-4 font-body text-xs leading-relaxed text-muted-foreground">
        Scaler publishes these in the “Stories” module of its Academy page alongside a
        career-transition wall. Offer counts shown are the page’s own labels. Program
        details:{" "}
        <a
          href={LINKS.scalerCourse}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Scaler Data Science & ML course page
        </a>
        .
      </p>

      {/* How to read them */}
      <div className="surface-card mt-10 border-primary/30 p-6">
        <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
          How to read testimonials without being fooled
        </p>
        <ul className="mt-3 space-y-2 font-body text-sm leading-relaxed text-foreground">
          <li>
            <strong>Look for specifics, not adjectives.</strong> “Advanced Python, ML, Deep
            Learning, Computer Vision, 5 projects in 7 months” is checkable; “life-changing”
            is not.
          </li>
          <li>
            <strong>Check the track.</strong> A glowing DSA review says little about GenAI
            teaching quality, on either platform.
          </li>
          <li>
            <strong>Verify the person exists and the role matches.</strong> Named learners
            with named employers are verifiable on LinkedIn; anonymous initials are not.
          </li>
          <li>
            <strong>Ignore percentages without a base.</strong> A “295% hike” from a low
            base is a different story from the same figure at a senior salary.
          </li>
        </ul>
      </div>
    </section>
  );
}
