import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { COLORS } from "../../../constants/colors";
import Section from "../../Section";
import SectionLabel from "../../SectionLabel";
import Reveal from "../../Reveal";
import useReducedMotion from "../../../hooks/useReducedMotion";

const STEPS = [
  {
    title: "Screening Call",
    body:
      "A 30 to 45 minute conversation with our Talent Acquisition team. We'll cover your background, motivations, and make sure the role is the right fit on both sides.",
  },
  {
    title: "Hiring Manager Interview",
    body:
      "A deeper conversation with the person you'd work most closely with. Expect questions around how you work, how you think, and what you've built or led.",
  },
  {
    title: "Skills Assessment",
    body:
      "Depending on the role, this is either a technical interview, a case study, or a functional deep dive. It's practical and grounded in the kind of work you'd actually do here.",
  },
  {
    title: "Onsite Panel",
    body:
      "You'll come into our Berlin office to meet the broader team. This is where we assess collaboration, team fit, and give you a real feel for how we work day to day.",
  },
];

export default function InterviewProcess() {
  const reducedMotion = useReducedMotion();
  const stepperRef = useRef(null);
  const lineInView = useInView(stepperRef, { once: true, margin: "-15%" });

  return (
    <Section id="interview-process" bg={COLORS.warmWhite}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Interview Process</SectionLabel>
          <h2 style={styles.heading}>Four conversations, no surprises</h2>
          <p style={styles.intro}>
            We keep the process clear and short. Each stage has a specific purpose,
            and you'll know who you're meeting and why.
          </p>
        </div>
      </Reveal>

      <div ref={stepperRef} className="interview-stepper" style={styles.stepper}>
        <div className="interview-stepper-track" style={styles.track}>
          <motion.div
            className="interview-stepper-line"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            animate={{ scaleX: lineInView || reducedMotion ? 1 : 0 }}
            transition={{
              duration: reducedMotion ? 0 : 1.4,
              ease: [0.6, 0.01, 0.05, 1],
            }}
            style={styles.line}
          />
        </div>

        <div className="interview-stepper-grid" style={styles.grid}>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={60 + i * 60}>
              <div className="interview-step" style={styles.step}>
                <span className="interview-step-num" style={styles.num}>
                  0{i + 1}
                </span>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepBody}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const NUM_FONT_SIZE = 56;
const NUM_LINE_OFFSET = NUM_FONT_SIZE / 2;

const styles = {
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 3.5vw, 42px)",
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 auto 14px",
    maxWidth: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    textWrap: "balance",
  },
  intro: {
    fontFamily: "var(--font-body)",
    fontSize: 17,
    lineHeight: 1.7,
    color: COLORS.textMuted,
    maxWidth: 540,
    margin: "0 auto",
  },
  stepper: {
    position: "relative",
  },
  track: {
    position: "absolute",
    top: NUM_LINE_OFFSET,
    left: "12.5%",
    right: "12.5%",
    height: 1,
    pointerEvents: "none",
    overflow: "hidden",
  },
  line: {
    width: "100%",
    height: "100%",
    background: COLORS.copper,
    transformOrigin: "left center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    position: "relative",
  },
  step: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  num: {
    fontFamily: "var(--font-display)",
    fontSize: NUM_FONT_SIZE,
    fontWeight: 700,
    color: COLORS.copper,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    background: COLORS.warmWhite,
    padding: "0 14px",
    marginBottom: 24,
    display: "inline-block",
    position: "relative",
    zIndex: 1,
  },
  stepTitle: {
    fontFamily: "var(--font-body)",
    fontSize: 17,
    fontWeight: 600,
    color: COLORS.navy,
    margin: "0 0 10px",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  stepBody: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.65,
    color: COLORS.textMuted,
    margin: 0,
    maxWidth: 260,
  },
};
