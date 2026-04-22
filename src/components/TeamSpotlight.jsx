import { useState, useEffect, useRef } from "react";
import { COLORS, RADIUS } from "../constants/colors";
import { Icons } from "../constants/icons";

export default function TeamSpotlight({ members }) {
  const [selected, setSelected] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [displayed, setDisplayed] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (selected === displayed) return;
    setTransitioning(true);
    timeoutRef.current = setTimeout(() => {
      setDisplayed(selected);
      setTransitioning(false);
    }, 180);
    return () => clearTimeout(timeoutRef.current);
  }, [selected, displayed]);

  const active = members[displayed];

  return (
    <div
      className="team-spotlight"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(280px, 360px) 1fr",
        gap: 24,
        alignItems: "stretch",
      }}
    >
      {/* Sidebar list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {members.map((m, i) => {
          const isActive = i === selected;
          return (
            <button
              key={m.name}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(i)}
              className="team-member-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                background: isActive ? COLORS.white : "transparent",
                border: `1px solid ${isActive ? COLORS.copper : "transparent"}`,
                borderRadius: RADIUS.md,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition:
                  "background 200ms ease, border-color 200ms ease, transform 160ms var(--ease-out)",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
                width: "100%",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: RADIUS.pill,
                  background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.copperLight})`,
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.navy,
                    marginBottom: 2,
                  }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: isActive ? COLORS.copper : COLORS.textMuted,
                    fontWeight: 500,
                  }}
                >
                  {m.role}
                </div>
                {m.note && (
                  <div
                    style={{
                      fontSize: 11,
                      color: COLORS.textMuted,
                      marginTop: 4,
                      fontWeight: 400,
                    }}
                  >
                    {m.note}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured quote card */}
      <div
        style={{
          background: COLORS.navy,
          borderRadius: RADIUS.lg,
          padding: "40px 36px",
          color: COLORS.white,
          display: "flex",
          flexDirection: "column",
          minHeight: 260,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 0% 0%, rgba(3,166,150,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            color: COLORS.copperLight,
            opacity: 0.5,
            marginBottom: 20,
            position: "relative",
          }}
        >
          {Icons.quote}
        </div>
        <div
          style={{
            opacity: transitioning ? 0 : 1,
            filter: transitioning ? "blur(4px)" : "blur(0px)",
            transition: "opacity 180ms ease, filter 180ms ease",
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(16px, 1.6vw, 19px)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.92)",
              margin: "0 0 28px",
              fontStyle: "italic",
            }}
          >
            &ldquo;{active.quote}&rdquo;
          </p>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                borderRadius: RADIUS.pill,
                background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.copperLight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              {active.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.white,
                }}
              >
                {active.name}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: COLORS.copperLight,
                  marginTop: 2,
                }}
              >
                {active.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
