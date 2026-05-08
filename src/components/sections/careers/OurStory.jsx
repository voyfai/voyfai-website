import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { COLORS, RADIUS } from "../../../constants/colors";
import Section from "../../Section";
import SectionLabel from "../../SectionLabel";
import Reveal from "../../Reveal";
import useReducedMotion from "../../../hooks/useReducedMotion";

const PARAGRAPHS = [
  "We founded Voyfai in August 2023, after years in executive roles at Forto working closely alongside the CFO and CEO. That experience gave us a deep understanding of what the freight forwarding industry gets right, and where it falls short.",
  "Look closely at the freight forwarding market and something interesting emerges: the vast majority of it, around 75%, is run by small and medium-sized forwarders. These businesses are genuinely brilliant at what they do. Exceptional customer service, deep domain expertise, and relationships built over decades. But the odds are stacked against them, buried in manual processes, priced out of procurement power that the big players enjoy and largely left behind by the technology wave that was supposed to transform logistics.",
  "Voyfai exists to change that. We're building the operating system that powers small and mid-sized freight forwarders, combining AI-driven workflow automation, best-in-class procurement through aggregated volumes, and a suite of value-added services. Our model is built around partnering with great forwarders and working closely with their teams to develop technology that actually fits how this industry operates. The goal is simple: give every small freight forwarder the tools and scale of the industry's biggest players, without losing what makes them great.",
  "Since those early days, the momentum has been incredible. We've been lucky enough to attract some truly outstanding people who share our vision, partnered with forwarders we're proud to work alongside, and grown our presence across six countries, with more on the way. We're just getting started.",
];

const PHOTOS = [
  {
    id: "founding",
    eyebrow: "August 2023",
    caption: "Berlin, Germany",
    aspect: "4 / 3",
    pattern: `
      linear-gradient(135deg, ${COLORS.copperMuted} 0%, transparent 60%),
      radial-gradient(ellipse at 30% 20%, rgba(3,166,150,0.10) 0%, transparent 55%),
      repeating-linear-gradient(115deg, transparent 0px, transparent 22px, rgba(3,166,150,0.045) 22px, rgba(3,166,150,0.045) 23px)
    `,
    parallaxRange: ["-8%", "8%"],
  },
  {
    id: "today",
    eyebrow: "Today",
    caption: "Six countries, growing",
    aspect: "4 / 3",
    pattern: `
      linear-gradient(225deg, ${COLORS.copperMuted} 0%, transparent 60%),
      radial-gradient(ellipse at 70% 80%, rgba(3,166,150,0.12) 0%, transparent 55%),
      repeating-linear-gradient(65deg, transparent 0px, transparent 22px, rgba(3,166,150,0.045) 22px, rgba(3,166,150,0.045) 23px)
    `,
    parallaxRange: ["8%", "-8%"],
  },
];

function StoryPhoto({ photo, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], photo.parallaxRange);

  return (
    <div
      ref={ref}
      data-asset={`our-story-photo-${photo.id}`}
      style={{
        ...styles.photoFrame,
        aspectRatio: photo.aspect,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: photo.pattern,
          y: reducedMotion ? 0 : y,
        }}
      />
      <div style={styles.photoOverlay}>
        <div style={styles.photoEyebrow}>{photo.eyebrow}</div>
        <div style={styles.photoCaption}>{photo.caption}</div>
      </div>
    </div>
  );
}

export default function OurStory() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="our-story" bg={COLORS.cream}>
      <div className="story-grid" style={styles.grid}>
        <div style={styles.col}>
          <Reveal>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={styles.heading}>
              From operators inside the industry to operators building for it
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <p style={styles.paragraph}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={60 + PARAGRAPHS.length * 60}>
              <p style={styles.attribution}>
                Adrian Detlefs &amp; James Maund, Co-Founders and Managing Directors
              </p>
            </Reveal>
          </div>
        </div>

        <div className="story-photo-stack" style={styles.col}>
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.id} delay={60 + i * 60}>
              <StoryPhoto photo={photo} reducedMotion={reducedMotion} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
    gap: 64,
    alignItems: "start",
  },
  col: { minWidth: 0 },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 3.5vw, 42px)",
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 0 28px",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    textWrap: "balance",
  },
  paragraph: {
    fontFamily: "var(--font-body)",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.75,
    color: COLORS.textMuted,
    margin: 0,
    textWrap: "pretty",
  },
  attribution: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLORS.text,
    fontStyle: "italic",
    margin: "8px 0 0",
  },
  photoFrame: {
    position: "relative",
    width: "100%",
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    background: COLORS.warmWhite,
    border: `1px solid ${COLORS.border}`,
  },
  photoOverlay: {
    position: "absolute",
    left: 24,
    bottom: 24,
    color: COLORS.navy,
    pointerEvents: "none",
  },
  photoEyebrow: {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: COLORS.copper,
    marginBottom: 6,
  },
  photoCaption: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.navy,
    letterSpacing: "-0.01em",
  },
};
