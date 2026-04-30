import { COLORS } from "../constants/colors";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function LegalPage({ eyebrow = "Legal", title, lastUpdated, children }) {
  return (
    <>
      <header
        style={{
          background: COLORS.cream,
          padding: "140px 24px 56px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <Reveal style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: COLORS.navy,
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: COLORS.textMuted,
                marginTop: 12,
              }}
            >
              Last updated: {lastUpdated}
            </p>
          )}
        </Reveal>
      </header>

      <div
        style={{
          background: COLORS.warmWhite,
          padding: "56px 24px 120px",
        }}
      >
        <article
          className="legal-prose"
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          {children}
        </article>
      </div>
    </>
  );
}
