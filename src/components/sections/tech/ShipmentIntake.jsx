import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

export default function ShipmentIntake() {
  const [ref, inView] = useInView({ once: false });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} style={{ display: "flex", width: "100%", height: "100%", padding: 14, gap: 14 }}>
      {/* Left Email */}
      <div style={{ flex: 1, minWidth: 0, background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 6, padding: "12px 14px", fontSize: 9, lineHeight: 1.35, fontFamily: "monospace", color: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
        <div style={{ whiteSpace: "normal", overflowWrap: "anywhere" }}>From: ops@shipper.com</div>
        <div>Subject: Booking SHA-RTM</div>
        <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "2px 0" }} />
        <div>
          Please book 2x40HC FCA from Shanghai to Rotterdam.<br/>
          HS: 8471.30
        </div>
      </div>
      
      {/* Right TMS */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
        {[
          { label: "Origin", val: "SHA" },
          { label: "Dest", val: "RTM" },
          { label: "HS Code", val: "8471.30" },
          { label: "Incoterm", val: "FCA" },
        ].map((field, i) => (
          <div key={`${field.label}-${cycle}`} style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ fontSize: 9, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", marginBottom: 2 }}>{field.label}</span>
            <div style={{ position: "relative", height: 16, overflow: "hidden" }}>
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.12, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, color: "var(--voyfai-ink)" }}
              >
                {field.val}
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "var(--voyfai-teal)", transformOrigin: "left" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
