import { COLORS, RADIUS } from "../constants/colors";

export default function PerkCard({ icon, title, description, accent = COLORS.copper }) {
  return (
    <div
      className="lift-card"
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: RADIUS.lg,
        padding: "28px 24px",
        height: "100%",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: RADIUS.md,
          background: COLORS.copperMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          marginBottom: 18,
        }}
      >
        {icon}
      </div>
      <h4
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.navy,
          margin: "0 0 8px",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.65,
          color: COLORS.textMuted,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
