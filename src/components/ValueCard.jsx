import { COLORS, RADIUS } from "../constants/colors";

export default function ValueCard({ icon, title, description, chips = [], accent = COLORS.copper }) {
  return (
    <div
      className="lift-card"
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: RADIUS.lg,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className="value-icon-reveal"
        style={{
          width: 56,
          height: 56,
          borderRadius: RADIUS.pill,
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          color: COLORS.white,
          marginBottom: 24,
          boxShadow: "0 8px 24px rgba(3,166,150,0.25)",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.navy,
          margin: "0 0 12px",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          textAlign: "center",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.7,
          color: COLORS.textMuted,
          margin: "0 0 24px",
          textAlign: "center",
        }}
      >
        {description}
      </p>
      {chips.length > 0 && (
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Team Input:
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "center",
            }}
          >
            {chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 10px",
                  borderRadius: RADIUS.pill,
                  background: COLORS.cream,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
