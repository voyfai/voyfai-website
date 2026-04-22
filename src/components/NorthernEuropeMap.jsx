import { COLORS } from "../constants/colors";
import voyfaiMap from "../assets/Voyfai-map.svg";

// Placeholder pin positions (percent of container).
// Final coordinates pending confirmed city list for the 25 offices across 6 countries.
const offices = [
  { x: 18, y: 55 },
  { x: 38, y: 60 },
  { x: 41, y: 64 },
  { x: 47, y: 60 },
  { x: 50, y: 64 },
];

export default function NorthernEuropeMap() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <img
        src={voyfaiMap}
        alt="Voyfai office locations"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
      {offices.map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${o.x}%`,
            top: `${o.y}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: COLORS.copper,
              opacity: 0.15,
              animation: "gentlePulse 3s ease infinite",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.copper,
              border: `2px solid ${COLORS.warmWhite}`,
              boxShadow: "0 0 8px rgba(3,166,150,0.35)",
              position: "relative",
            }}
          />
        </div>
      ))}
    </div>
  );
}
