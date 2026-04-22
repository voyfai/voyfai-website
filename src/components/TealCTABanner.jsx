import { COLORS, RADIUS } from "../constants/colors";
import { Icons } from "../constants/icons";

export default function TealCTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
}) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.copper} 0%, ${COLORS.copperLight} 100%)`,
        borderRadius: RADIUS.lg,
        padding: "48px 40px",
        color: COLORS.white,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-copper)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.25) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 100%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "clamp(22px, 2.8vw, 30px)",
          fontWeight: 600,
          margin: "0 0 10px",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          position: "relative",
        }}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.9)",
            maxWidth: 520,
            margin: "0 auto 28px",
            position: "relative",
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {primaryHref && (
          <a
            href={primaryHref}
            className="cta-btn"
            style={{
              background: COLORS.white,
              color: COLORS.copper,
              fontWeight: 600,
            }}
          >
            {primaryLabel}
            <span>{Icons.arrowRight}</span>
          </a>
        )}
        {secondaryHref && (
          <a
            href={secondaryHref}
            target={secondaryExternal ? "_blank" : undefined}
            rel={secondaryExternal ? "noopener noreferrer" : undefined}
            className="cta-btn"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: COLORS.white,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {secondaryLabel}
            {secondaryExternal && <span>{Icons.external}</span>}
          </a>
        )}
      </div>
    </div>
  );
}
