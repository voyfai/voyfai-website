import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ClipReveal from "../motion/ClipReveal";
import useInView from "../../hooks/useInView";
import useReducedMotion from "../../hooks/useReducedMotion";

const SHIPMENTS = [
  { id: "SHP-8842", origin: "Shanghai", dest: "Rotterdam", carrier: "MSC", hs: "8471.30", cost: "$4,250", status: "Loaded" },
  { id: "SHP-8843", origin: "Hamburg", dest: "New York", carrier: "Maersk", hs: "8473.30", cost: "$3,800", status: "Sailing" },
  { id: "SHP-8844", origin: "Long Beach", dest: "Felixstowe", carrier: "Hapag-Lloyd", hs: "8518.90", cost: "$5,100", status: "Arrived" },
  { id: "SHP-8845", origin: "Shenzhen", dest: "Los Angeles", carrier: "CMA CGM", hs: "9403.60", cost: "$4,900", status: "Booked" },
  { id: "SHP-8846", origin: "Rotterdam", dest: "Singapore", carrier: "ONE", hs: "8471.30", cost: "$2,750", status: "Gate-in" },
  { id: "SHP-8847", origin: "Bremerhaven", dest: "Boston", carrier: "MSC", hs: "8517.12", cost: "$3,200", status: "Loaded" },
];

const STATUSES = ["Booked", "Gate-in", "Loaded", "Sailing", "Arrived"];

const TOASTS = [
  "ETA updated - Rotterdam +6h",
  "Customs cleared - SHP-8842",
  "Document received - Bill of Lading",
];

function StatusRail({ shipment }) {
  const statusIndex = STATUSES.indexOf(shipment.status);

  return (
    <div className="hub-status-rail">
      <div className="hub-rail-kicker">{shipment.id}</div>
      <h3>{shipment.origin} to {shipment.dest}</h3>
      <div className="hub-status-list">
        {STATUSES.map((status, index) => {
          const isPast = index <= statusIndex;
          const isCurrent = index === statusIndex;

          return (
            <div
              key={status}
              className="hub-status-item"
              data-state={isCurrent ? "current" : isPast ? "past" : "next"}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="hub-status-dot" />
              <span>{status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HubPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastCycles, setToastCycles] = useState(0);
  const [ref, inView] = useInView({ once: false });
  const reducedMotion = useReducedMotion();
  const activeShipment = SHIPMENTS[activeIndex];

  useEffect(() => {
    if (!inView || isHovered || reducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHIPMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [inView, isHovered, reducedMotion]);

  useEffect(() => {
    if (!inView) {
      setToast(null);
      setToastCycles(0);
    }
  }, [inView]);

  useEffect(() => {
    if (!inView || isHovered || toast || toastCycles >= 3) return;

    const delay = toastCycles === 0 ? 900 : 7000;
    const timer = setTimeout(() => {
      setToast(TOASTS[toastCycles % TOASTS.length]);
      setToastCycles((current) => current + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, isHovered, toast, toastCycles]);

  useEffect(() => {
    if (!toast || isHovered) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, isHovered]);

  return (
    <section ref={ref} className="hub-preview-section" data-in-view={inView ? "true" : "false"}>
      <div className="hub-preview-wrap">
        <div className="hub-preview-heading">
          <span>Voyfai Hub</span>
          <h2>Shipment visibility without chasing every update</h2>
          <p>
            Operators see the live shipment table, customers get the status feed,
            and exceptions stay visible before they become service issues.
          </p>
        </div>

        <ClipReveal>
          <div
            className="hub-preview-shell"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="hub-preview-tabs">
              {["Shipments", "Quotes", "Documents", "Analytics"].map((tab, index) => (
                <button key={tab} type="button" className={index === 0 ? "is-active" : ""}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="hub-preview-body">
              <div className="hub-preview-table" role="table" aria-label="Shipment list">
                <div className="hub-table-head" role="row">
                  <div>ID</div>
                  <div>Route</div>
                  <div>Carrier</div>
                  <div>HS Code</div>
                  <div>Cost</div>
                </div>

                <div className="hub-table-rows">
                  {SHIPMENTS.map((shipment, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={shipment.id}
                        type="button"
                        className={`hub-table-row ${isActive ? "is-active" : ""}`}
                        style={{ "--row-index": index }}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                      >
                        <span>{shipment.id}</span>
                        <span>{shipment.origin} to {shipment.dest}</span>
                        <span>{shipment.carrier}</span>
                        <span>{shipment.hs}</span>
                        <span>{shipment.cost}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hub-preview-cards" aria-label="Shipment cards">
                {SHIPMENTS.slice(0, 4).map((shipment, index) => (
                  <button
                    key={shipment.id}
                    type="button"
                    className={`hub-shipment-card ${index === activeIndex ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span>{shipment.id}</span>
                    <strong>{shipment.origin} to {shipment.dest}</strong>
                    <em>{shipment.carrier} - {shipment.status}</em>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShipment.id}
                  className="hub-preview-rail"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0.7, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0.7, filter: "blur(2px)" }}
                  transition={{ duration: reducedMotion ? 0.2 : 0.24, ease: [0.25, 1, 0.5, 1] }}
                >
                  <StatusRail shipment={activeShipment} />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  key={toast}
                  className="hub-toast"
                  role="status"
                  aria-live="polite"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: "translateX(32px)" }}
                  animate={{ opacity: 1, transform: "translateX(0px)" }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: "translateX(32px)" }}
                  transition={{ duration: reducedMotion ? 0.2 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}
