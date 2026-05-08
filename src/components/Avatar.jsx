import { useState } from "react";
import { COLORS } from "../constants/colors";

export default function Avatar({ initials, src, alt = "", size = 96 }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setErrored(true)}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
          border: `1px solid ${COLORS.copperSoft}`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || `${initials} avatar placeholder`}
      data-asset="headshot-placeholder"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: COLORS.copperMuted,
        border: `1px solid ${COLORS.copperSoft}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontSize: Math.round(size * 0.36),
        fontWeight: 700,
        color: COLORS.copper,
        letterSpacing: "-0.02em",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
