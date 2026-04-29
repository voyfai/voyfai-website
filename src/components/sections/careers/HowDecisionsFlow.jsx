import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";
import MaskReveal from "../../motion/MaskReveal";

const NODES = [
  "Operator feedback",
  "Domain review",
  "Build",
  "Validate",
  "Ship"
];

export default function HowDecisionsFlow() {
  const [ref, inView] = useInView({ once: false, threshold: 0.2 });
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--voyfai-ink)",
        width: "100%",
        minHeight: "72vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px 24px",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 80px",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          <MaskReveal inViewOverride={inView}>How decisions get made here</MaskReveal>
        </h2>

        <div style={{ position: "relative", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1000, margin: "0 auto" }}>
          {/* Connector line background */}
          <div style={{ position: "absolute", top: "50%", left: 40, right: 40, height: 1, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 1 }} />
          
          {/* Animated connector line */}
          <motion.div
            initial={isReduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={inView || isReduced ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.6, ease: "linear", delay: isReduced ? 0 : 0.2 }}
            style={{
              position: "absolute",
              top: "50%",
              left: 40,
              right: 40,
              height: 2,
              background: "var(--voyfai-teal)",
              transform: "translateY(-50%)",
              transformOrigin: "left",
              zIndex: 2,
              boxShadow: "0 0 8px rgba(3,166,150,0.5)"
            }}
          />

          {NODES.map((node, i) => {
            // Each node lights up exactly when the line hits it. Line takes 1.6s to cross.
            // Nodes are spaced evenly across 4 gaps.
            const delay = isReduced ? 0 : 0.2 + (i / (NODES.length - 1)) * 1.6;

            return (
              <div key={node} style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <motion.div
                  initial={isReduced ? { borderColor: "var(--voyfai-teal)", backgroundColor: "#000" } : { borderColor: "rgba(255,255,255,0.2)", backgroundColor: "transparent" }}
                  animate={inView || isReduced ? { borderColor: "var(--voyfai-teal)", backgroundColor: "#000" } : { borderColor: "rgba(255,255,255,0.2)", backgroundColor: "transparent" }}
                  transition={{ duration: 0.2, delay }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "2px solid",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    initial={isReduced ? { scale: 1 } : { scale: 0 }}
                    animate={inView || isReduced ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.2, delay }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--voyfai-teal)",
                      boxShadow: "0 0 8px var(--voyfai-teal)"
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={inView || isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#ffffff",
                    position: "absolute",
                    top: "100%",
                    marginTop: 16,
                    whiteSpace: "nowrap"
                  }}
                >
                  {node}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
