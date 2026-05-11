import { useCallback, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../constants/colors";
import { Icons } from "../../../constants/icons";
import PerkCard from "../../PerkCard";
import Reveal from "../../Reveal";

export default function PerksScroller({ perks }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    const ro = new ResizeObserver(updateBounds);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      ro.disconnect();
    };
  }, [updateBounds]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <div className="perks-scroller" style={styles.root}>
      <div className="perks-scroller-controls" style={styles.controls}>
        <button
          type="button"
          aria-label="Show previous perks"
          disabled={!canPrev}
          onClick={() => scrollBy(-1)}
          className="perks-scroll-btn"
          style={{ ...styles.btn, opacity: canPrev ? 1 : 0.35 }}
        >
          {Icons.arrowLeft}
        </button>
        <button
          type="button"
          aria-label="Show more perks"
          disabled={!canNext}
          onClick={() => scrollBy(1)}
          className="perks-scroll-btn"
          style={{ ...styles.btn, opacity: canNext ? 1 : 0.35 }}
        >
          {Icons.arrowRight}
        </button>
      </div>

      <div
        ref={trackRef}
        className="perks-scroller-track"
        style={styles.track}
        aria-roledescription="carousel"
      >
        {perks.map((p, i) => (
          <div key={p.title} className="perks-scroller-slot" style={styles.slot}>
            <Reveal delay={60 + i * 60} style={styles.reveal}>
              <PerkCard {...p} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  root: {
    position: "relative",
  },
  controls: {
    position: "absolute",
    top: -64,
    right: 0,
    display: "flex",
    gap: 8,
    zIndex: 1,
  },
  btn: {
    appearance: "none",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    color: COLORS.navy,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition:
      "border-color 200ms var(--ease-out), background 200ms var(--ease-out), opacity 200ms var(--ease-out), transform 160ms var(--ease-out)",
  },
  track: {
    display: "flex",
    gap: 24,
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    paddingBottom: 8,
    scrollbarWidth: "none",
    WebkitMaskImage:
      "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
  },
  slot: {
    flex: "0 0 calc((100% - 72px) / 3.4)",
    minWidth: 0,
    scrollSnapAlign: "start",
    display: "grid",
  },
  reveal: {
    display: "grid",
    width: "100%",
  },
};
