import { useEffect, useRef, useState } from "react";
import { COLORS, RADIUS } from "../../../constants/colors";
import { Icons } from "../../../constants/icons";
import Section from "../../Section";
import SectionLabel from "../../SectionLabel";
import Reveal from "../../Reveal";

const PARAGRAPHS = [
  "We founded Voyfai in August 2023, after years in executive roles at Forto working closely alongside the CFO and CEO. That experience gave us a deep understanding of what the freight forwarding industry gets right, and where it falls short.",
  "Look closely at the freight forwarding market and something interesting emerges: the vast majority of it, around 75%, is run by small and medium-sized forwarders. These businesses are genuinely brilliant at what they do. Exceptional customer service, deep domain expertise, and relationships built over decades. But the odds are stacked against them, buried in manual processes, priced out of procurement power that the big players enjoy and largely left behind by the technology wave that was supposed to transform logistics.",
  "Voyfai exists to change that. We're building the operating system that powers small and mid-sized freight forwarders, combining AI-driven workflow automation, best-in-class procurement through aggregated volumes, and a suite of value-added services. Our model is built around partnering with great forwarders and working closely with their teams to develop technology that actually fits how this industry operates. The goal is simple: give every small freight forwarder the tools and scale of the industry's biggest players, without losing what makes them great.",
  "Since those early days, the momentum has been incredible. We've been lucky enough to attract some truly outstanding people who share our vision, partnered with forwarders we're proud to work alongside, and grown our presence across six countries, with more on the way. We're just getting started.",
];

const PHOTOS = [
  {
    id: "strategy",
    src: "/images/careers/our-story/strategy-session.jpg",
    srcAvif: "/images/careers/our-story/strategy-session.avif",
    caption: "Strategy session, Berlin office",
    width: 1600,
    height: 900,
    eager: true,
  },
  {
    id: "team-day",
    src: "/images/careers/our-story/team-day.jpg",
    srcAvif: "/images/careers/our-story/team-day.avif",
    caption: "Team day at WhatAGame",
    width: 1600,
    height: 900,
  },
];

export default function OurStory() {
  const [expanded, setExpanded] = useState(false);
  const collapsibleRef = useRef(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);

  useEffect(() => {
    if (!collapsibleRef.current) return;
    if (expanded) {
      setCollapsibleHeight(collapsibleRef.current.scrollHeight);
    } else {
      setCollapsibleHeight(0);
    }
  }, [expanded]);

  const visibleParagraphs = PARAGRAPHS.slice(0, 2);
  const hiddenParagraphs = PARAGRAPHS.slice(2);

  return (
    <Section id="our-story" bg={COLORS.cream}>
      <div className="story-grid" style={styles.grid}>
        <div style={styles.col}>
          <Reveal>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={styles.heading}>
              We came from inside freight tech. We're building for the operators it left behind.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {visibleParagraphs.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <p style={styles.paragraph}>{p}</p>
              </Reveal>
            ))}

            <div
              className="story-collapsible"
              data-expanded={expanded}
              style={{
                ...styles.collapsible,
                maxHeight: collapsibleHeight,
                opacity: expanded ? 1 : 0,
              }}
              aria-hidden={!expanded}
            >
              <div
                ref={collapsibleRef}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {hiddenParagraphs.map((p, i) => (
                  <p key={i} style={styles.paragraph}>
                    {p}
                  </p>
                ))}
                <p style={styles.attribution}>
                  Adrian Detlefs &amp; James Maund, Co-Founders and Managing Directors
                </p>
              </div>
            </div>

            <Reveal delay={60 + visibleParagraphs.length * 60}>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="story-readmore"
                style={styles.readMore}
              >
                {expanded ? "Show less" : "Read more"}
                <span
                  aria-hidden="true"
                  className="story-readmore-chevron"
                  data-expanded={expanded}
                  style={styles.readMoreChevron}
                >
                  {Icons.chevronDown}
                </span>
              </button>
            </Reveal>
          </div>
        </div>

        <div className="story-photo-stack" style={styles.photoStack}>
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.id} delay={60 + i * 80}>
              <figure className="story-photo" style={styles.photoFigure}>
                <picture>
                  <source srcSet={photo.srcAvif} type="image/avif" />
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    width={photo.width}
                    height={photo.height}
                    loading={photo.eager ? "eager" : "lazy"}
                    decoding="async"
                    style={styles.photoImg}
                  />
                </picture>
                <div style={styles.photoGradient} aria-hidden="true" />
                <figcaption style={styles.photoCaption}>{photo.caption}</figcaption>
              </figure>
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
  collapsible: {
    overflow: "hidden",
    maxHeight: 0,
    opacity: 0,
    transition:
      "max-height 360ms var(--ease-out-expo), opacity 300ms var(--ease-out)",
  },
  readMore: {
    appearance: "none",
    background: "transparent",
    border: "none",
    padding: 0,
    margin: "8px 0 0",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.copper,
    letterSpacing: "0.01em",
    width: "fit-content",
  },
  readMoreChevron: {
    display: "inline-flex",
    alignItems: "center",
    transition: "transform 240ms var(--ease-out-quart)",
  },
  photoStack: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  photoFigure: {
    position: "relative",
    margin: 0,
    aspectRatio: "16 / 9",
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    background: COLORS.warmWhite,
    border: `1px solid ${COLORS.border}`,
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  photoGradient: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0) 55%)",
  },
  photoCaption: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 20,
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.01em",
    margin: 0,
    pointerEvents: "none",
    textShadow: "0 1px 2px rgba(0,0,0,0.35)",
  },
};
