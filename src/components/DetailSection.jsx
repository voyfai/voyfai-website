import { COLORS } from "../constants/colors";
import Section from "./Section";
import SectionLabel from "./SectionLabel";

export default function DetailSection({ id, label, title, items, bg }) {
  const hasGraphics = items.some((item) => item.graphic);

  return (
    <Section bg={bg} id={id}>
      <div
        className={`detail-section-heading${
          hasGraphics ? " detail-section-heading--graphic" : ""
        }`}
      >
        <SectionLabel>{label}</SectionLabel>
        <h2
          className="detail-section-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 700,
            color: COLORS.navy,
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            maxWidth: hasGraphics ? 760 : 600,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        className={`${items.length === 4 ? "detail-grid-4" : "detail-grid-3"}${
          hasGraphics ? " detail-grid--graphic" : ""
        }`}
        style={{
          display: "grid",
          gridTemplateColumns:
            items.length === 4
              ? "repeat(4, 1fr)"
              : items.length === 3
                ? "repeat(3, 1fr)"
                : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="detail-item"
            style={{
              background: COLORS.cream,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {item.graphic && (
              <div style={{ background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, height: 200, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {item.graphic}
              </div>
            )}
            <div style={{ padding: "32px 24px", flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.copper,
                  marginBottom: 12,
                  letterSpacing: "0.02em",
                }}
              >
                0{i + 1}
              </div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: COLORS.navy,
                  margin: "0 0 12px",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: COLORS.textMuted,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
