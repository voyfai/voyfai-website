import { motion } from "motion/react";
import useInView from "../../hooks/useInView";

export default function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const [ref, inView, observed] = useInView();
  const shouldEnhance = observed && inView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={shouldEnhance ? { opacity: [1, 1], y: [8, 0] } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
