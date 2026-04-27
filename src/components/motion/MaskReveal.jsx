import { motion } from "motion/react";
import useInView from "../../hooks/useInView";

export default function MaskReveal({ children, delay = 0, className = "" }) {
  const [ref, inView, observed] = useInView();
  const shouldEnhance = observed && inView;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        initial={{ y: 0 }}
        animate={shouldEnhance ? { y: ["10%", "0%"] } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 1], delay: delay / 1000 }}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
