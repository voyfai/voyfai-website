import { COLORS } from "../../../constants/colors";
import Section from "../../Section";
import SectionLabel from "../../SectionLabel";
import Reveal from "../../Reveal";

const PARAGRAPHS = [
  "We're a team of 30+ people from across the world, brought together by a shared belief that the backbone of global trade deserves better tools. We move fast, we take ownership, and we genuinely enjoy working with each other.",
  "Berlin is our home base, but our team is international, multilingual, and built on diverse perspectives. You'll find engineers, operators, and commercial thinkers all working closely together, without the layers and silos that slow things down elsewhere.",
  "We come together every week for an all-hands, share team lunches, and wind down with pizza nights. We have a weekly German breakfast for anyone learning the language, and a culture that's serious about the mission but never takes itself too seriously.",
  "This is a place where your work ships, your ideas get heard, and your growth is real.",
];

export default function GroupNarrative() {
  return (
    <Section id="group" bg={COLORS.warmWhite}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <SectionLabel>Our Group</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: COLORS.navy,
              margin: "0 auto 28px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              maxWidth: 640,
              textWrap: "balance",
            }}
          >
            International, multilingual, and close to the work
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={60 + i * 60}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: COLORS.textMuted,
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
