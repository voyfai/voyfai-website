import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

export default function CustomsScan() {
  const [ref, inView] = useInView({ once: false });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 5000); // 2s scan + 3s rest
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} style={{ display: "flex", width: "100%", height: "100%", padding: 24, gap: 24, alignItems: "center" }}>
      {/* Document Thumbnail */}
      <div style={{ width: 100, height: 130, background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, padding: 12, position: "relative", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: "40%", height: 4, background: "rgba(0,0,0,0.2)", borderRadius: 2 }} />
          <div style={{ width: "80%", height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 2 }} />
          <div style={{ width: "90%", height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 2 }} />
          <div style={{ width: "60%", height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 2 }} />
          
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ width: "100%", height: 3, background: "rgba(0,0,0,0.06)", borderRadius: 2 }} />
            ))}
          </div>
        </div>
        
        {/* Scan line */}
        <motion.div
          key={`scan-${cycle}`}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 2, ease: [0.6, 0.01, 0.05, 1] }}
          style={{ position: "absolute", left: 0, right: 0, height: 2, background: "var(--voyfai-teal)", boxShadow: "0 0 8px var(--voyfai-teal)" }}
        />
      </div>
      
      {/* Confidence Chips */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", marginBottom: 4 }}>HS Classification</div>
        {[
          { code: "8471.30", prob: "94%", color: "var(--voyfai-teal)", bg: "var(--voyfai-teal-50)" },
          { code: "8473.30", prob: "4%", color: "rgba(0,0,0,0.5)", bg: "rgba(0,0,0,0.04)" },
          { code: "8518.90", prob: "2%", color: "rgba(0,0,0,0.5)", bg: "rgba(0,0,0,0.04)" },
        ].map((chip, i) => (
          <motion.div
            key={`chip-${cycle}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 2 + i * 0.1 }} // after 2s scan
            style={{ display: "flex", justifyContent: "space-between", background: chip.bg, padding: "6px 10px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: chip.color, fontWeight: 600 }}
          >
            <span>{chip.code}</span>
            <span>{chip.prob}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
