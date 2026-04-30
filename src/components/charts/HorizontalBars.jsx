import { motion } from "motion/react";
import useInView from "../../hooks/useInView";

export default function HorizontalBars({ data }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const maxVal = Math.max(...data.map((item) => item.value), 100);

  return (
    <div
      ref={ref}
      className="benchmark-bars"
      data-in-view={inView ? "true" : "false"}
      aria-label="Benchmark comparison chart"
    >
      {data.map((item, index) => {
        const width = Math.max(8, (item.value / maxVal) * 100);

        return (
          <div key={item.label} className={`benchmark-row ${item.isHero ? "is-hero" : ""}`}>
            <div className="benchmark-label">{item.label}</div>
            <div className="benchmark-track">
              <motion.div
                className="benchmark-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                style={{ background: item.color, width: `${width}%`, transformOrigin: "left" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
