import { motion } from "motion/react";
import useInView from "../../hooks/useInView";

export default function ClipReveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, inView, observed] = useInView();
  const shouldEnhance = observed && inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        initial={{ x: "100%" }}
        animate={shouldEnhance ? { x: ["0%", "100%"] } : { x: "100%" }}
        transition={{ duration: 1.0, ease: [0.6, 0.01, 0.05, 1], delay: delay / 1000 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(253,251,247,0), rgba(253,251,247,0.92), rgba(253,251,247,0))",
          transform: "translateX(100%)",
        }}
      />
    </motion.div>
  );
}
