import { useState, useRef, useEffect } from "react";
import { COLORS, RADIUS } from "../../../constants/colors";
import { Icons } from "../../../constants/icons";
import Section from "../../Section";
import SectionLabel from "../../SectionLabel";
import Reveal from "../../Reveal";
import Avatar from "../../Avatar";

const MEMBERS = [
  {
    id: "rajat",
    name: "Rajat",
    role: "AI Engineer",
    initials: "R",
    photo: "/images/careers/team/rajat.jpg",
    quote:
      "Everyone shares the same vision and pulls in the same direction. There are no silos, only a common vision.",
    qa: [
      {
        question:
          "You've been at Voyfai since the early days. What made you say yes, and what's kept you here?",
        answer:
          "During my initial chats with the co-founders, it was evident that the scope of what Voyfai could become was huge. Compared to traditional SaaS companies which provide value to a niche within an industry, Voyfai had the vision to revamp the whole freight industry. This impact was exactly what I was looking for.\n\nSince I joined in May 2024, the company and people have grown tremendously (not just in numbers). Together, we've dealt with many challenges, learnt new skills and have improved continuously. There are many reasons which have kept me at Voyfai. But the most important reason is how everyone shares the same vision and pulls in the same direction. There are no silos, only a common vision.",
      },
      {
        question: "What does your day to day actually look like as an AI Engineer here?",
        answer:
          "Taming LLMs, that's how I spend most of my time.\n\nWe work heavily with foundational LLMs and use them to improve the efficiency of freight forwarding operators. This means we have to stay in control of what the LLM generates and ensure accuracy and speed.\n\nApart from coding, engineers at Voyfai maintain direct contact with the users, something not seen at traditional SaaS companies. We build products, see how the users are using them, get feedback and improve. This high level of ownership is extremely exciting for me.",
      },
      {
        question: "What have you built at Voyfai that you're most proud of?",
        answer:
          "The relationships.\n\nPersonally, I've loved the relationships I've built with people of such caliber. Across departments, people are at the top of their game but stay grounded and are always ready to help. These relationships helped me grow tremendously.\n\nEven beyond work, people are extremely helpful. For instance, I moved to Berlin for this job. Even without any acquaintances in Berlin, the team made the big move very smooth, and they've kept showing up for me ever since.\n\nFrom a product point of view, I'm proud of the email processing engine we launched. Emails sit at the core of this industry, and this engine gives our users back significant time in their day. It was also great to brainstorm and build it alongside the other engineers.",
      },
      {
        question:
          "What surprised you most about working here compared to what you expected?",
        answer:
          "Ownership.\n\nEveryone at Voyfai has a high ownership mindset. We own everything from understanding the user's problem to making sure it is resolved.\n\nFor engineers, this means we do not just sit behind a laptop and code. We travel to companies using our product. We sit with the users, see how they are using it, get feedback, and then translate all of this into an even better product.\n\nUnlike traditional SaaS companies, there is no gatekeeping at Voyfai. Pure ownership.",
      },
      {
        question: "What does collaboration mean to you in your day to day work?",
        answer:
          "We collaborate heavily within the engineering and product team. We bounce ideas off each other, get constructive feedback and share our findings (memes included). We also collaborate heavily with our users.\n\nFurther, I'm not restricted to contributing only to engineering. If there is a possibility for me to add efficiency to the business or sales team, I'm encouraged to do it.",
      },
    ],
  },
  {
    id: "dana",
    name: "Dana",
    role: "Product Manager",
    initials: "D",
    photo: "/images/careers/team/dana.jpg",
    quote:
      "You will feel the impact right away. Your top-down and 'so-what' thinking will be very helpful, but the rest is up to your eagerness to go broad and in depth.",
    qa: [
      {
        question:
          "You came from McKinsey into a product role at a Series A startup. What drove that decision?",
        answer:
          "After 3 years as digital consultant I wanted to go back to where I started which is a startup, where I can make a bigger and a more sustained impact with a team of similarly driven people. When Cam from Voyfai reached out for a talk, I thought that they matched my profile quite well from the industry and AI perspective. As I continued to talk with more people down the line, I realized that we match on the cultural level, too.",
      },
      {
        question: "What does the problem Voyfai is solving mean to you personally?",
        answer:
          "Freight forwarding is a different beast, way more complex than the logistical problems I solved before. Its complexities, tackled with AI and automation with a small team had a big appeal for me. Not to mention the impact one can create for our users who spend unnecessary hours on the same repetitive task.",
      },
      {
        question: "What does a typical week look like for you, and what keeps you energized?",
        answer:
          "There's no such thing as a typical week. Yes, we do have regular ceremonies to enable iterative development. But we don't constrain ourselves to processes. Instead, we define monthly and weekly goals to drive OKRs and divide and conquer. The nice thing about such a young team is that evolve quickly with sufficient transparency.",
      },
      {
        question:
          "What would you tell someone from a consultancy background who's thinking about making the jump?",
        answer:
          "You will feel the impact right away. Your top-down and \"so-what\" thinking will be very helpful, but the rest is up to your eagerness to go broad and in depth. In a startup like Voyfai, you might feel uncomfortable as things go fast yet focused, but there's immense team support, proper guidance and unlimited budget of the most recent AI tools!",
      },
      {
        question:
          "What does collaboration between product, engineering, and commercial look like here in practice?",
        answer:
          "Our modus operandi is to empower the team to drive our own projects, starting with proposals. We want that engineers are user-focused and that product folks are technical enough. That and a sufficient amount of ceremonies help us get things moving fast. Product and commercial teams engage in recurring meetings to align on implementation and adoption strategies together.",
      },
    ],
  },
  {
    id: "marco",
    name: "Marco",
    role: "Engineering Lead",
    initials: "M",
    photo: "/images/careers/team/marco.jpg",
    quote:
      "Voyfai is a rare combination of market opportunity and a team that can actually execute on it.",
    qa: [
      {
        question:
          "You've led engineering at some of the most respected companies in Europe. What made you want to join a Series A startup?",
        answer:
          "Honestly? I missed building. At a certain scale, a lot of what a Director or Senior Manager does stops being about the product and starts being about navigating the organization. You spend your energy on internal alignment rather than on customers or outcomes. That's a valid job, but it's not the one I want at this stage.\n\nThe happiest period of my career was in early-stage startups, where the distance between a decision and its impact on users is measured in days, not quarters. Six or seven months into Voyfai, I can say the move was absolutely the right call. I'm more energized, more focused, and genuinely enjoying the work again.",
      },
      {
        question: "What did you see in Voyfai that others might have missed from the outside?",
        answer:
          "Three things. First, an industry that is genuinely ripe for disruption; logistics is enormous, the pain points are real, and most of the incumbent tooling is decades behind. Second, a team I actually wanted to work with: smart, direct, low-ego people. You only recognize how rare that is when you've had it before, and I have. Third, the freedom to focus on the work itself rather than on protecting my scope or managing perception.\n\nFrom the outside, it's easy to see Voyfai as another logistics SaaS. From the inside, it's a rare combination of market opportunity and a team that can actually execute on it.",
      },
      {
        question: "What kind of engineer thrives here, and why?",
        answer:
          "Curious, proactive people who want to own features and products end-to-end, not just tickets.\n\nAI is rapidly changing what engineering work looks like. Writing code is becoming more automated every month. What increasingly matters is the part that's harder to automate: identifying opportunities, framing problems clearly, designing sound solutions, and making smart tradeoffs. That's where the leverage is.\n\nSo we're looking for builders, not executors. People who see a gap and close it, who push back when something doesn't make sense, and who get genuinely excited about shipping things that real users depend on.",
      },
      {
        question: "How is building at Voyfai different from what you've done before?",
        answer:
          "What makes Voyfai stand out is the combination of ambition and speed. I've worked at plenty of companies that had one or the other. Very few have both. We actively adopt the edge of what's possible (new tools, new patterns, new AI capabilities) and we're not afraid to try something, learn, and adjust.\n\nWe're bold on purpose. You can't meaningfully improve an industry this large without taking real technical and product risks. That appetite for calculated risk, combined with a team that can absorb failure and iterate, is what makes building here feel different.",
      },
      {
        question: "What does leadership mean to you in a company at this stage?",
        answer:
          "At Series A, there's enormous room to shape how the company works: structure, processes, culture, the engineering bar. Leadership isn't just knowing what \"good\" looks like. You can find that in any book. It's knowing when to introduce it.\n\nMove too early and you create bureaucracy that slows a team that should still be moving fast. Move too late and you lock in bad habits that are painful to undo. The real job is reading the moment.\n\nJust as important is how you lead people. My role isn't to tell engineers how to do their work. It's to hire people I trust, give them real ownership, and create the conditions where they can do the best work of their careers. A good leader at this stage absorbs ambiguity so the team can focus on building, and knows when to step in and when to step back.\n\nThat's the environment I'm building here, and it's why I'm excited about who joins next.",
      },
    ],
  },
];

const GLASSDOOR_URL =
  "https://www.glassdoor.de/Bewertungen/Voyfai-Bewertungen-E10579397.htm";

function InterviewCard({ member, isOpen, onToggle }) {
  const panelId = `interview-panel-${member.id}`;
  const triggerId = `interview-trigger-${member.id}`;
  const panelRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState(0);

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      setPanelHeight(panelRef.current.scrollHeight);
    } else {
      setPanelHeight(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const ro = new ResizeObserver(() => {
      if (panelRef.current) setPanelHeight(panelRef.current.scrollHeight);
    });
    ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div
      className="interview-card"
      data-open={isOpen}
      style={styles.card}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="interview-trigger"
        style={styles.trigger}
      >
        <div style={styles.triggerInner}>
          <Avatar
            initials={member.initials}
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            size={72}
          />
          <div style={styles.identity}>
            <div style={styles.name}>{member.name}</div>
            <div style={styles.role}>{member.role}</div>
          </div>
          <p style={styles.pullQuote}>&ldquo;{member.quote}&rdquo;</p>
          <span
            aria-hidden="true"
            className="interview-chevron"
            data-open={isOpen}
            style={styles.chevron}
          >
            {Icons.chevronDown}
          </span>
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="interview-panel"
        style={{
          ...styles.panel,
          maxHeight: panelHeight,
        }}
      >
        <div ref={panelRef} className="interview-panel-inner" style={styles.panelInner}>
          <div className="interview-qa" style={styles.qaBody}>
            {member.qa.map((row, i) => (
              <div key={i} className="interview-qa-row" style={styles.qaRow}>
                <h4 style={styles.qaQuestion}>{row.question}</h4>
                {row.answer.split("\n\n").map((para, pi) => (
                  <p key={pi} style={styles.qaAnswer}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamVoices() {
  const [openId, setOpenId] = useState(null);

  return (
    <Section id="team-voices" bg={COLORS.cream}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Hear from our team</SectionLabel>
          <h2 style={styles.heading}>Don't take our word for it.</h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="interview-stack" style={styles.stack}>
          {MEMBERS.map((m) => (
            <InterviewCard
              key={m.id}
              member={m}
              isOpen={openId === m.id}
              onToggle={() => setOpenId(openId === m.id ? null : m.id)}
            />
          ))}
        </div>
      </Reveal>

      <Reveal delay={300}>
        <p style={styles.glassdoorLine}>
          Want to hear more?{" "}
          <a
            href={GLASSDOOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.glassdoorLink}
          >
            Read what our team says about working at Voyfai on Glassdoor
            <span style={{ marginLeft: 6, display: "inline-flex" }}>{Icons.external}</span>
          </a>
        </p>
      </Reveal>
    </Section>
  );
}

const styles = {
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 3.5vw, 42px)",
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 auto",
    maxWidth: 1100,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    textWrap: "balance",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 1100,
    margin: "0 auto",
  },
  card: {
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    transition: "border-color 240ms var(--ease-out)",
  },
  trigger: {
    appearance: "none",
    background: "transparent",
    border: "none",
    width: "100%",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "var(--font-body)",
    color: "inherit",
  },
  triggerInner: {
    display: "grid",
    gridTemplateColumns: "auto minmax(140px, 220px) minmax(0, 1fr) auto",
    alignItems: "center",
    gap: 28,
    padding: "24px 32px",
  },
  identity: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  name: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.navy,
    letterSpacing: "-0.01em",
    lineHeight: 1.15,
  },
  role: {
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.copper,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
  pullQuote: {
    fontFamily: "var(--font-body)",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLORS.navy,
    margin: 0,
    fontStyle: "italic",
    textWrap: "pretty",
    minWidth: 0,
  },
  chevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: COLORS.cream,
    color: COLORS.navy,
    transition: "transform 240ms var(--ease-out-quart), background 200ms var(--ease-out)",
    flexShrink: 0,
  },
  panel: {
    overflow: "hidden",
    maxHeight: 0,
    transition: "max-height 320ms var(--ease-out-expo)",
  },
  panelInner: {
    padding: "8px 32px 36px",
    borderTop: `1px solid ${COLORS.border}`,
    marginTop: 0,
  },
  qaBody: {
    columnCount: 2,
    columnGap: 56,
    paddingTop: 28,
  },
  qaRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    breakInside: "avoid",
    marginBottom: 28,
  },
  qaQuestion: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.navy,
    margin: 0,
    lineHeight: 1.4,
    letterSpacing: "-0.005em",
  },
  qaAnswer: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.7,
    color: COLORS.textMuted,
    margin: 0,
    textWrap: "pretty",
  },
  glassdoorLine: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 40,
  },
  glassdoorLink: {
    color: COLORS.copper,
    textDecoration: "none",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
};
