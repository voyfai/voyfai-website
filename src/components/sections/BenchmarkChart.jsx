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
    <section style={{ background: "var(--voyfai-ink)", padding: "120px 24px", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionLabel color="rgba(255,255,255,0.6)">Performance</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 42px)", margin: "0 0 16px", color: "#fff" }}>
              Forwarding teams are more efficient with the Voyfai platform
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, maxWidth: 540, margin: "0 auto" }}>
              A product benchmark across quote preparation, booking intake, document handling, shipment visibility, and exception follow-up.
            </p>
          </div>
        </FadeUp>
        
        <HorizontalBars data={chartData} />
        
        <FadeUp delay={800}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 32 }}>
            Internal workflow model for common freight forwarding operating tasks.
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
