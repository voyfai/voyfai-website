import { COLORS } from "../constants/colors";

export default function StatBlock({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "clamp(32px, 4.5vw, 48px)",
          fontWeight: 600,
          color: COLORS.copper,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.textMuted,
          marginTop: 8,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
