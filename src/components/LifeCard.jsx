import { COLORS, RADIUS } from "../constants/colors";

export default function LifeCard({ icon, title, description }) {
  return (
    <div
      className="lift-card"
      style={{
        background: COLORS.cream,
        border: `1px solid ${COLORS.border}`,
        borderRadius: RADIUS.lg,
        padding: "28px 24px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: COLORS.copper,
          marginBottom: 14,
        }}
      >
        {icon}
        <h4
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.navy,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h4>
      </div>
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
