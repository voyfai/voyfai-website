import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

const STATUSES = ["Booked", "Gate\u2011in", "Loaded", "Sailing", "Arrived"];

export default function HubTracker() {
  const [ref, inView] = useInView({ once: false });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 6000); // 4s animation + 2s rest
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", padding: "18px 22px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <div style={{ width: "100%", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: "16px 18px 28px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 18, fontSize: 10, lineHeight: 1.2, fontFamily: "monospace", color: "rgba(0,0,0,0.5)" }}>
          <span>SHP-8842</span>
          <span>SHA → RTM</span>
        </div>
        
        {/* Timeline */}
        <div style={{ position: "relative", height: 2, background: "rgba(0,0,0,0.06)", borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <motion.div
            key={`progress-${cycle}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", background: "var(--voyfai-teal)", transformOrigin: "left" }}
          />
          
          {STATUSES.map((status, i) => (
            <div key={status} style={{ position: "relative", zIndex: 1, width: 10, height: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.div
                key={`dot-${cycle}-${i}`}
                initial={{ backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.1)" }}
                animate={{ backgroundColor: "var(--voyfai-teal)", borderColor: "var(--voyfai-teal)" }}
                transition={{ delay: i * (4 / (STATUSES.length - 1)), duration: 0.2 }}
                style={{ width: 8, height: 8, borderRadius: "50%", border: "2px solid", background: "#fff", flex: "0 0 auto" }}
              />
              <div data-status-label={status} style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", fontSize: 8.5, lineHeight: 1, color: "rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Toast */}
      <motion.div
        key={`toast-${cycle}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: [0, 1, 1, 0], x: [20, 0, 0, 20] }}
        transition={{ times: [0, 0.1, 0.9, 1], duration: 3, delay: 2.4 }} // Pops in at 60% of 4s
        style={{ alignSelf: "flex-end", maxWidth: "100%", background: "var(--voyfai-ink)", color: "#fff", padding: "6px 10px", borderRadius: 4, fontSize: 9.5, lineHeight: 1.1, fontFamily: "monospace", whiteSpace: "nowrap" }}
      >
        ETA updated — Rotterdam +6h
      </motion.div>
    </div>
  );
}
