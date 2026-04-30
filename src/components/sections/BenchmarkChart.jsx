import HorizontalBars from "../charts/HorizontalBars";
import FadeUp from "../motion/FadeUp";
import SectionLabel from "../SectionLabel";

export default function BenchmarkChart() {
  const chartData = [
    { label: "Manual workflows", value: 41.3, color: "#5c5a61" },
    { label: "Spreadsheet-assisted", value: 52.0, color: "#6e6b72" },
    { label: "Rules-based TMS", value: 68.5, color: "#7a6f78" },
    { label: "Voyfai platform", value: 94.2, color: "var(--voyfai-teal)", isHero: true },
  ];

  return (
    <section style={{ background: "var(--voyfai-ink)", padding: "96px 24px", color: "#fff" }}>
      {/* 900 cap is intentional — keeps horizontal bars within a comfortable read length */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel>Performance</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#fff" }}>
              Less manual work, more forwarding.
            </h2>
          </div>
        </FadeUp>
        
        <HorizontalBars data={chartData} />
        
        <FadeUp delay={800}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 32 }}>
            Efficiency measured by freight forwarder operator time required per shipment.
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
