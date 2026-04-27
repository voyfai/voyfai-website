import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useInView from "../../../hooks/useInView";

const CARRIERS = [
  { name: "MSC", width: "40%" },
  { name: "Maersk", width: "70%" },
  { name: "Hapag-Lloyd", width: "55%" },
  { name: "CMA CGM", width: "85%" },
  { name: "ONE", width: "45%" },
];

export default function RateCompare() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({ once: false });

  useEffect(() => {
    if (!inView || isHovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(1); // just pick one to win statically
      return;
    }
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARRIERS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [inView, isHovered]);

  return (
    <div 
      ref={ref} 
      style={{ width: "100%", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {CARRIERS.map((carrier, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={carrier.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 72, fontSize: 11, fontFamily: "monospace", color: isActive ? "var(--voyfai-teal-700)" : "rgba(0,0,0,0.5)" }}>
              {carrier.name}
            </div>
            <div style={{ flex: 1, height: 16, background: "rgba(0,0,0,0.04)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
              <motion.div
                initial={false}
                animate={{ 
                  width: carrier.width,
                  backgroundColor: isActive ? "var(--voyfai-teal)" : "rgba(0,0,0,0.08)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 2 }}
              />
            </div>
            <div style={{ width: 40, fontSize: 10, fontFamily: "monospace", color: isActive ? "var(--voyfai-teal)" : "transparent", textAlign: "right", fontWeight: 600 }}>
              Best
            </div>
          </div>
        );
      })}
    </div>
  );
}
