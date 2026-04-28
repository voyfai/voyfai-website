// AGENT.md §10 deviation: the central hub icon uses an inner
// radial wash + 1px white highlight (forbidden by §3.2's
// "no gradients, no glassmorphism"). Approved as a single
// signature moment per user direction 2026-04-27.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Database,
  FileSpreadsheet,
  FileText,
  Landmark,
  Mail,
  MessagesSquare,
  RadioTower,
  Sparkles,
} from "lucide-react";
import ClipReveal from "../motion/ClipReveal";
import MaskReveal from "../motion/MaskReveal";
import SectionLabel from "../SectionLabel";
import useInView from "../../hooks/useInView";
import useReducedMotion from "../../hooks/useReducedMotion";

const EXCEPTIONS = [
  {
    reference: "SHP-8842",
    type: "Customs hold",
    age: "2h 14m",
    owner: "Maria K.",
    status: "Awaiting CN23",
    severity: "danger",
    headline: "Customs hold, Hamburg",
    action: "Request CN23 from shipper",
  },
  {
    reference: "SHP-8843",
    type: "Missed ETA",
    age: "45m",
    owner: "Paul B.",
    status: "Re-routed to RTM",
    severity: "warning",
    headline: "Missed ETA, Rotterdam",
    action: "Notify consignee with new slot",
  },
  {
    reference: "SHP-8844",
    type: "Document gap",
    age: "1h 03m",
    owner: "Auto",
    status: "BL requested",
    severity: "warning",
    headline: "Document gap, Antwerp",
    action: "Pull bill of lading from carrier",
  },
  {
    reference: "SHP-8845",
    type: "Resolved",
    age: "-",
    owner: "Auto",
    status: "Cleared 09:42",
    severity: "success",
    headline: "Resolved, Felixstowe",
    action: "No operator action needed",
  },
  {
    reference: "SHP-8846",
    type: "Resolved",
    age: "-",
    owner: "Maria K.",
    status: "Cleared 09:18",
    severity: "success",
    headline: "Resolved, Bremerhaven",
    action: "Customer timeline synced",
  },
  {
    reference: "SHP-8847",
    type: "Pending check",
    age: "12m",
    owner: "Auto",
    status: "-",
    severity: "neutral",
    headline: "Pending check, Gdansk",
    action: "Watch for customs portal update",
  },
];

const INPUTS = [
  { label: "Email", detail: "Ops inbox", Icon: Mail },
  { label: "Sheet", detail: "Rate file", Icon: FileSpreadsheet },
  { label: "PDF", detail: "BL packet", Icon: FileText },
  { label: "TMS", detail: "Bookings", Icon: Database },
  { label: "Portal", detail: "Customs", Icon: Landmark },
  { label: "Chat", detail: "Forwarder", Icon: MessagesSquare },
];

const TOASTS = [
  "Customs cleared - SHP-8842",
  "ETA updated - RTM +6h",
  "BL received - SHP-8844",
];

const HEADLINE_WORDS = ["Every", "signal,", "one", "view"];

const CONNECTOR_PATHS = [
  "M 92 180 C 170 180 214 258 326 286",
  "M 218 180 C 258 180 258 238 326 286",
  "M 92 286 C 168 286 218 286 326 286",
  "M 218 286 C 250 286 272 286 326 286",
  "M 92 392 C 168 392 216 340 326 286",
  "M 218 392 C 262 392 266 342 326 286",
];

function VoyfaiMark() {
  return (
    <svg aria-hidden="true" className="hub-node-mark" viewBox="0 0 432 432" focusable="false">
      <path
        d="M306.223 89.0488L216 264.602L126.265 89.0488L46 89.0122L175.271 327.472C180.554 337.052 190.621 343 201.539 343H230.863C241.964 343 252.152 336.869 257.362 327.057L386 89L306.223 89.0366V89.0488Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ConnectorField() {
  return (
    <svg
      aria-hidden="true"
      className="hub-connectors"
      viewBox="0 0 1200 572"
      preserveAspectRatio="none"
      focusable="false"
    >
      {CONNECTOR_PATHS.map((path, index) => (
        <g key={path} style={{ "--connector-index": index }}>
          <path className="hub-connector-path" d={path} />
          <path className="hub-connector-beat" d={path} pathLength="1" />
        </g>
      ))}
    </svg>
  );
}

function InputTile({ input, index }) {
  const Icon = input.Icon;

  return (
    <button
      type="button"
      className="hub-input-tile"
      style={{ "--tile-index": index }}
      aria-label={`${input.label}: ${input.detail}`}
    >
      <span className="hub-input-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.6} />
      </span>
      <span className="hub-input-copy">
        <span>{input.label}</span>
        <em>{input.detail}</em>
      </span>
    </button>
  );
}

function ExceptionRail({ exception }) {
  return (
    <div className="hub-exception-rail">
      <div className="hub-rail-kicker">{exception.reference}</div>
      <h3>{exception.headline}</h3>

      <dl className="hub-rail-meta">
        <div>
          <dt>Owner</dt>
          <dd>{exception.owner}</dd>
        </div>
        <div>
          <dt>Open</dt>
          <dd>{exception.age}</dd>
        </div>
        <div>
          <dt>Suggested action</dt>
          <dd>{exception.action}</dd>
        </div>
      </dl>

      <button type="button" className="hub-rail-action">
        Mark resolved
      </button>
    </div>
  );
}

export default function HubPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastCycles, setToastCycles] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [ref, inView] = useInView({ once: false, threshold: 0.2, rootMargin: "-10% 0% -10% 0%" });
  const reducedMotion = useReducedMotion();
  const activeException = EXCEPTIONS[activeIndex];
  const isPaused = pointerInside || focusInside;

  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  useEffect(() => {
    if (!inView || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXCEPTIONS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [inView, isPaused]);

  useEffect(() => {
    if (!inView) setToast(null);
  }, [inView]);

  useEffect(() => {
    if (!hasEntered || !inView || isPaused || toast || toastCycles >= 3) return;

    const delay = toastCycles === 0 ? 2300 : 7000;
    const timer = setTimeout(() => {
      setToast(TOASTS[toastCycles % TOASTS.length]);
      setToastCycles((current) => current + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasEntered, inView, isPaused, toast, toastCycles]);

  useEffect(() => {
    if (!toast || isPaused) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, isPaused]);

  return (
    <section
      ref={ref}
      className="hub-preview-section"
      data-in-view={inView ? "true" : "false"}
      data-has-entered={hasEntered ? "true" : "false"}
    >
      <div className="hub-preview-wrap">
        <div className="hub-preview-heading">
          <SectionLabel>Voyfai Hub</SectionLabel>
          <h2 aria-label="Every signal, one view">
            {HEADLINE_WORDS.map((word, index) => (
              <MaskReveal key={word} delay={80 + index * 70}>
                <span aria-hidden="true">{word}&nbsp;</span>
              </MaskReveal>
            ))}
          </h2>
          <p>
            Emails, rate files, customs portals, and TMS data collapse into one
            exceptions queue, so operators see what needs attention first.
          </p>
        </div>

        <div
          className="hub-preview-stage"
          onMouseEnter={() => setPointerInside(true)}
          onMouseLeave={() => setPointerInside(false)}
          onFocus={() => setFocusInside(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
          }}
        >
          <div className="hub-inputs" aria-label="Signals feeding Voyfai Hub">
            {INPUTS.map((input, index) => (
              <InputTile key={input.label} input={input} index={index} />
            ))}
          </div>

          <ConnectorField />

          <motion.div
            className="hub-node"
            aria-hidden="true"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.92)" }}
            animate={
              hasEntered
                ? { opacity: 1, transform: "scale(1)" }
                : reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: "scale(0.92)" }
            }
            transition={{ duration: reducedMotion ? 0.2 : 0.4, delay: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <VoyfaiMark />
          </motion.div>

          <div className="hub-callout hub-callout--route">
            <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" />
            <span>auto</span>
          </div>

          <div className="hub-callout hub-callout--live">
            <RadioTower size={14} strokeWidth={1.8} aria-hidden="true" />
            <span>live</span>
          </div>

          <ClipReveal className="hub-preview-product" delay={320}>
            <div className="hub-preview-shell">
              <div className="hub-shell-topbar">
                <div>
                  <strong>Voyfai Hub</strong>
                  <span>Exceptions queue</span>
                </div>
                <span className="hub-shell-live">
                  <i aria-hidden="true" />
                  Live operations
                </span>
              </div>

              <div className="hub-preview-body">
                <div className="hub-exception-table" role="table" aria-label="Exceptions queue">
                  <div className="hub-table-head" role="row">
                    <div role="columnheader">Severity</div>
                    <div role="columnheader">Reference</div>
                    <div role="columnheader">Type</div>
                    <div role="columnheader">Open</div>
                    <div role="columnheader">Owner</div>
                    <div role="columnheader">Status</div>
                  </div>

                  <div className="hub-table-rows" role="rowgroup">
                    {EXCEPTIONS.map((exception, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={exception.reference}
                          type="button"
                          className={`hub-table-row ${isActive ? "is-active" : ""}`}
                          style={{ "--row-index": index }}
                          role="row"
                          aria-current={isActive ? "true" : undefined}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                        >
                          <span role="cell" className="hub-severity-cell">
                            <i className="hub-severity-dot" data-severity={exception.severity} aria-hidden="true" />
                            <span className="sr-only">{exception.severity}</span>
                          </span>
                          <span role="cell" className="hub-reference-cell">
                            {exception.reference}
                          </span>
                          <span role="cell">{exception.type}</span>
                          <span role="cell">{exception.age}</span>
                          <span role="cell">{exception.owner}</span>
                          <span role="cell">{exception.status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeException.reference}
                    className="hub-preview-rail"
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0.72, filter: "blur(2px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0.72, filter: "blur(2px)" }}
                    transition={{ duration: reducedMotion ? 0.2 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ExceptionRail exception={activeException} />
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
      </div>
    </section>
  );
}
