import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Icons } from "../../constants/icons";
import MaskReveal from "../motion/MaskReveal";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { id: "email", label: "Email intake", icon: Icons.mail, data: { label: "Source", value: "shipper@acme.com" } },
  { id: "hs", label: "HS classification", icon: Icons.cpu, data: { label: "HS Code", value: "8471.30 (94%)" } },
  { id: "doc", label: "Document validation", icon: Icons.document, data: { label: "Commercial Inv", value: "Verified" } },
  { id: "risk", label: "Risk scoring", icon: Icons.shield, data: { label: "Status", value: "Low Risk" } },
  { id: "file", label: "Filing", icon: Icons.send, data: { label: "Customs ID", value: "CHIEF-8422A" } },
];

export default function CustomsFlow() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const activeLineRef = useRef(null);
  const nodeRefs = useRef([]);
  const [lineMetrics, setLineMetrics] = useState({ x1: 0, x2: 0, y: 0, length: 0 });

  useLayoutEffect(() => {
    const measureLine = () => {
      const track = trackRef.current;
      const firstNode = nodeRefs.current[0];
      const lastNode = nodeRefs.current[NODES.length - 1];

      if (!track || !firstNode || !lastNode) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const x1 = firstRect.left + firstRect.width / 2 - trackRect.left;
      const x2 = lastRect.left + lastRect.width / 2 - trackRect.left;
      const y = trackRect.height / 2;
      const length = Math.max(0, x2 - x1);

      setLineMetrics((current) => {
        if (
          Math.abs(current.x1 - x1) < 0.5 &&
          Math.abs(current.x2 - x2) < 0.5 &&
          Math.abs(current.y - y) < 0.5
        ) {
          return current;
        }

        return { x1, x2, y, length };
      });
    };

    measureLine();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureLine) : null;

    if (resizeObserver && trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", measureLine);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureLine);
    };
  }, []);

  useLayoutEffect(() => {
    if (!lineMetrics.length || !activeLineRef.current) {
      return;
    }

    const canPin =
      window.matchMedia("(min-width: 900px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canPin) {
      gsap.set(activeLineRef.current, {
        strokeDasharray: lineMetrics.length,
        strokeDashoffset: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(activeLineRef.current, {
        strokeDasharray: lineMetrics.length,
        strokeDashoffset: lineMetrics.length,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=20%",
          pin: true,
          scrub: 0.5,
        }
      });

      tl.to(activeLineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1
      }, 0);

      NODES.forEach((_, i) => {
        const nodeProgress = i / (NODES.length - 1);
        
        tl.to(`.node-${i}`, {
          borderColor: "var(--voyfai-teal)",
          color: "var(--voyfai-teal)",
          duration: 0.1,
        }, nodeProgress - 0.05);

        tl.to(`.node-data-${i}`, {
          y: 0,
          duration: 0.1,
        }, nodeProgress - 0.05);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lineMetrics.length]);

  return (
    <section ref={containerRef} className="customs-flow-section">
      <div style={{ width: "100%", maxWidth: 1200, padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="customs-flow-heading">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em" }}>
            <MaskReveal>From shipper email to customs filing</MaskReveal>
          </h2>
        </div>
        
        <div ref={trackRef} className="customs-flow-track">
          {lineMetrics.length > 0 && (
            <svg className="customs-flow-line-svg" aria-hidden="true">
              <line
                className="customs-flow-line customs-flow-line--base"
                x1={lineMetrics.x1}
                x2={lineMetrics.x2}
                y1={lineMetrics.y}
                y2={lineMetrics.y}
              />
              <line
                ref={activeLineRef}
                className="customs-flow-line customs-flow-line--active"
                x1={lineMetrics.x1}
                x2={lineMetrics.x2}
                y1={lineMetrics.y}
                y2={lineMetrics.y}
                strokeDasharray={lineMetrics.length}
                strokeDashoffset={lineMetrics.length}
              />
            </svg>
          )}

          {/* Nodes */}
          {NODES.map((node, i) => (
            <div key={node.id} className="customs-flow-node">
              {/* Node Data Popup */}
              <div 
                className={`node-data-${i}`}
                style={{ 
                  position: "absolute", bottom: "100%", marginBottom: 16, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "8px 12px", width: 140, transform: "translateY(0)",
                }}
              >
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 4 }}>{node.data.label}</div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--voyfai-teal)" }}>{node.data.value}</div>
              </div>

              {/* Node Circle */}
              <div 
                className={`node-${i}`}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                style={{ width: 48, height: 48, borderRadius: "50%", background: "#000", border: "2px solid var(--voyfai-teal)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--voyfai-teal)", transition: "border-color 200ms var(--ease-out-quart), color 200ms var(--ease-out-quart)" }}
              >
                {node.icon}
              </div>

              <div className="customs-flow-label">
                {node.label}
              </div>
            </div>
          ))}
        </div>

        <div className="customs-flow-mobile">
          {NODES.map((node) => (
            <div key={node.id} className="customs-flow-mobile-step">
              <div className="customs-flow-mobile-icon">{node.icon}</div>
              <div>
                <div className="customs-flow-mobile-title">{node.label}</div>
                <div className="customs-flow-mobile-meta">
                  <span>{node.data.label}</span>
                  <strong>{node.data.value}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
