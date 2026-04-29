import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

const EASE_VOYFAI = [0.6, 0.01, 0.05, 1];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const FONT = "Inter, system-ui, -apple-system, sans-serif";

const PARTNERS = [
  { code: "DE", city: "Bremen",    role: "Ocean freight",       kpi: 12400 },
  { code: "NL", city: "Amsterdam", role: "Customs + Air",       kpi: 8920 },
  { code: "NL", city: "Rotterdam", role: "Customs + ocean",     kpi: 15310 },
  { code: "PL", city: "Gdansk",    role: "Rail + Ocean",        kpi: 6440 },
];

const ROW_ENTRY_STAGGER = 0.06;
const ROW_ENTRY_DUR = 0.55;
const RAIL_DRAW_DUR = 0.9;
const SETTLE_STAGGER = 0.05;
const SETTLE_DUR = 0.22;

const RAIL_DELAY = 0.5;
const RAIL_DONE_MS = (RAIL_DELAY + RAIL_DRAW_DUR) * 1000;

function CountUpInt({ to, duration = 1300, delay = 0, active, isReduced }) {
  const [value, setValue] = useState(active && isReduced ? to : 0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (isReduced) {
      setValue(to);
      return;
    }
    let raf;
    let start = null;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const step = (ts) => {
      if (start === null) start = ts + delay;
      const elapsed = ts - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutQuart(p) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, delay, isReduced]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {value.toLocaleString("en-US")}
    </span>
  );
}

export default function PartnerNetwork() {
  const [ref, inView] = useInView({ once: false });
  const [isReduced, setIsReduced] = useState(false);
  const [phase, setPhase] = useState("hidden"); // hidden | entered | settled

  useEffect(() => {
    setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const active = inView || isReduced;

  useEffect(() => {
    if (!active) {
      setPhase("hidden");
      return;
    }
    if (isReduced) {
      setPhase("settled");
      return;
    }
    const tEntered = setTimeout(() => setPhase("entered"), 0);
    const tSettled = setTimeout(() => setPhase("settled"), RAIL_DONE_MS);
    return () => {
      clearTimeout(tEntered);
      clearTimeout(tSettled);
    };
  }, [active, isReduced]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        padding: "20px 28px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {PARTNERS.map((p, i) => {
          const entryDelay = i * ROW_ENTRY_STAGGER;
          const settleDelay = i * SETTLE_STAGGER;

          let target;
          if (phase === "hidden") target = { opacity: 0, y: 6 };
          else if (phase === "entered") target = { opacity: 1, y: -4 };
          else target = { opacity: 1, y: 0 };

          const transition =
            phase === "hidden"
              ? { duration: 0 }
              : phase === "entered"
              ? { duration: ROW_ENTRY_DUR, delay: entryDelay, ease: EASE_VOYFAI }
              : { duration: SETTLE_DUR, delay: settleDelay, ease: EASE_OUT_EXPO };

          return (
            <motion.div
              key={p.code}
              initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              animate={target}
              transition={transition}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                height: 26,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 16,
                  border: "1px solid var(--voyfai-border-strong)",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "var(--voyfai-ink)",
                  flexShrink: 0,
                }}
              >
                {p.code}
              </span>
              <span
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "var(--voyfai-ink)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {p.city}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--voyfai-ink-faint)",
                  }}
                >
                  ·
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--voyfai-ink-faint)",
                  }}
                >
                  {p.role}
                </span>
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--voyfai-ink-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <CountUpInt
                  to={p.kpi}
                  duration={1200}
                  delay={isReduced ? 0 : 100 + i * 60}
                  active={active}
                  isReduced={isReduced}
                />
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--voyfai-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </span>
            </motion.div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 6,
          height: 1,
          width: "100%",
          background: "var(--voyfai-border)",
          position: "relative",
        }}
      >
        <motion.div
          initial={isReduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={
            phase === "hidden"
              ? { scaleX: 0 }
              : { scaleX: 1 }
          }
          transition={
            phase === "hidden" || isReduced
              ? { duration: 0 }
              : {
                  duration: RAIL_DRAW_DUR,
                  delay: RAIL_DELAY,
                  ease: EASE_VOYFAI,
                }
          }
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--voyfai-teal)",
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}
