import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

const EASE_VOYFAI = [0.6, 0.01, 0.05, 1];
const EASE_IN_OUT = [0.76, 0, 0.24, 1];

const TASKS = [
  { label: "Extract shipment details", state: "done" },
  { label: "Parse commercial invoice", state: "done" },
  { label: "Classify HS codes", state: "done" },
  { label: "Draft customs declaration", state: "active" },
];

const FONT = "Inter, system-ui, -apple-system, sans-serif";
const ROW_STAGGER = 0.07;
const ENTRY_DUR = 0.5;
const LAST_ROW_SETTLE = (TASKS.length - 1) * ROW_STAGGER + ENTRY_DUR;
const RAIL_FILL = TASKS.filter((t) => t.state === "done").length / TASKS.length;

export default function OperatorCapacity() {
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
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <div
          style={{
            position: "relative",
            height: 2,
            background: "var(--voyfai-border)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={isReduced ? { scaleX: RAIL_FILL } : { scaleX: 0 }}
            animate={active ? { scaleX: RAIL_FILL } : { scaleX: 0 }}
            transition={{ duration: 1.1, delay: isReduced ? 0 : 0.2, ease: EASE_VOYFAI }}
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--voyfai-teal)",
              transformOrigin: "left",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "var(--voyfai-ink-muted)",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Automated</span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--voyfai-ink)" }}>
            3 of 4
          </span>
        </div>
      </div>

      {TASKS.map((task, i) => {
        const done = task.state === "done";
        return (
          <motion.div
            key={task.label}
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{
              duration: ENTRY_DUR,
              delay: isReduced ? 0 : i * ROW_STAGGER,
              ease: EASE_VOYFAI,
            }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 2,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: done ? "var(--voyfai-teal)" : "transparent",
                border: done ? "none" : "1.5px solid var(--voyfai-teal)",
                color: "#ffffff",
                transition: "background-color 200ms ease, border-color 200ms ease",
              }}
            >
              {done ? (
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--voyfai-teal)",
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: done ? 400 : 500,
                color: done ? "var(--voyfai-ink)" : "var(--voyfai-ink)",
                letterSpacing: "-0.005em",
              }}
            >
              {task.label}
            </span>

            {!done && (
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={
                  isReduced
                    ? { scaleX: 0 }
                    : active
                    ? { scaleX: [0, 0.65, 0] }
                    : { scaleX: 0 }
                }
                transition={{
                  duration: 1.6,
                  delay: LAST_ROW_SETTLE + 0.2,
                  ease: EASE_IN_OUT,
                  repeat: isReduced ? 0 : Infinity,
                  repeatType: "loop",
                }}
                style={{
                  position: "absolute",
                  left: 24,
                  right: 0,
                  bottom: 0,
                  height: 1,
                  background: "var(--voyfai-teal)",
                  transformOrigin: "left",
                  opacity: 0.6,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
