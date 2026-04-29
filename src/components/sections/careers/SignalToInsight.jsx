import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

const EASE_VOYFAI = [0.6, 0.01, 0.05, 1];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const FONT = "Inter, system-ui, -apple-system, sans-serif";

const SIGNALS = [
  { source: "Email",    detail: "ETA Mar 2" },
  { source: "Tracking", detail: "ETA Mar 3" },
  { source: "AWB",      detail: "unchanged" },
];

const ROW_STAGGER = 0.08;
const ROW_DUR = 0.5;
const LAST_ROW_DONE = (SIGNALS.length - 1) * ROW_STAGGER + ROW_DUR;
const CHEVRON_DELAY = LAST_ROW_DONE + 0.05;
const CARD_DELAY = CHEVRON_DELAY + 0.2;

export default function SignalToInsight() {
  const [ref, inView] = useInView({ once: false });
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const active = inView || isReduced;

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: FONT,
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--voyfai-ink-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          Signals
        </div>
        {SIGNALS.map((s, i) => (
          <motion.div
            key={s.source}
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{
              duration: ROW_DUR,
              delay: isReduced ? 0 : i * ROW_STAGGER,
              ease: EASE_VOYFAI,
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "62px 1fr",
              alignItems: "baseline",
              columnGap: 12,
              fontSize: 11.5,
              lineHeight: 1.45,
            }}
          >
            <span
              style={{
                fontWeight: 500,
                color: "var(--voyfai-ink-muted)",
              }}
            >
              {s.source}
            </span>
            <span
              style={{
                color: "var(--voyfai-ink)",
                letterSpacing: "-0.005em",
              }}
            >
              {s.detail}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: isReduced ? 0 : CHEVRON_DELAY,
          ease: EASE_OUT_EXPO,
        }}
        style={{
          flexShrink: 0,
          width: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--voyfai-border-strong)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>

      <DecisionCard active={active} isReduced={isReduced} />
    </div>
  );
}

function DecisionCard({ active, isReduced }) {
  const [blurOff, setBlurOff] = useState(false);

  useEffect(() => {
    if (!active) {
      setBlurOff(false);
      return;
    }
    if (isReduced) {
      setBlurOff(true);
      return;
    }
    const t = setTimeout(() => setBlurOff(true), (CARD_DELAY + 0.4) * 1000);
    return () => clearTimeout(t);
  }, [active, isReduced]);

  return (
    <motion.div
      initial={isReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.6,
        delay: isReduced ? 0 : CARD_DELAY,
        ease: EASE_OUT_EXPO,
      }}
      style={{
        flex: 1,
        padding: "10px 12px",
        background: "var(--voyfai-surface)",
        border: "1px solid var(--voyfai-border)",
        borderRadius: 8,
        transformOrigin: "left",
        filter: blurOff ? "blur(0px)" : "blur(2px)",
        transition: "filter 220ms ease",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: "var(--voyfai-ink-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 6,
        }}
      >
        Decision
      </div>
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--voyfai-ink)",
          letterSpacing: "-0.01em",
          marginBottom: 3,
        }}
      >
        Confirm Mar 2
      </div>
      <div
        style={{
          fontSize: 11,
          fontVariantNumeric: "tabular-nums",
          color: "var(--voyfai-teal)",
          fontWeight: 500,
        }}
      >
        push to TMS · 1 click
      </div>
    </motion.div>
  );
}
