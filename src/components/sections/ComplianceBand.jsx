import { Icons } from "../../constants/icons";
import FadeUp from "../motion/FadeUp";

export default function ComplianceBand() {
  const complianceItems = [
    { label: "EU data handling by design" },
    { label: "Role-based access controls" },
    { label: "Security review for partner data" },
  ];

  return (
    <section style={{ background: "var(--voyfai-ink)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Strip / spacer between sections — not a stacked content section, so it skips the canonical 96px padding. */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <FadeUp>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 48, alignItems: "center" }}>
            {complianceItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ color: "var(--voyfai-teal)" }}>
                  {Icons.check}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
