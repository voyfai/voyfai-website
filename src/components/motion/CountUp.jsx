import { useEffect, useState, useRef } from "react";
import useInView from "../../hooks/useInView";

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export default function CountUp({ to, duration = 1400, delay = 0, suffix = "", prefix = "", decimals = 0, className = "" }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(to);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    setCount(to);
    hasAnimated.current = false;
  }, [to]);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    if (prefersReducedMotion) {
      setCount(to);
      hasAnimated.current = true;
      return;
    }

    let animationFrameId;
    let start = null;
    hasAnimated.current = true;
    setCount(0);

    const step = (timestamp) => {
      if (!start) start = timestamp + delay;
      
      const elapsed = timestamp - start;
      if (elapsed < 0) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setCount(easedProgress * to);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, to, duration, delay, prefersReducedMotion]);

  const displayValue = count.toFixed(decimals);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
