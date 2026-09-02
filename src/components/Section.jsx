import { COLORS } from "../constants/colors";

export default function Section({
  children,
  bg = COLORS.warmWhite,
  id,
  style = {},
  bgImage,
  bgImagePosition = "center",
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: "64px 24px",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: bgImage ? "hidden" : undefined,
        ...style,
      }}
    >
      {bgImage && (
        <>
          {/* Background photo — real-world freight photography, veiled to a faint texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: "cover",
              backgroundPosition: bgImagePosition,
              filter: "grayscale(0.4) saturate(0.7)",
            }}
          />
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, background: bg, opacity: 0.88 }}
          />
        </>
      )}
      <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {children}
      </div>
    </section>
  );
}
