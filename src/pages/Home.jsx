import { COLORS } from "../constants/colors";
import { Icons } from "../constants/icons";
import Section from "../components/Section";
import SectionLabel from "../components/SectionLabel";
import BenefitCard from "../components/BenefitCard";
import DetailSection from "../components/DetailSection";
import TestimonialCard from "../components/TestimonialCard";
import NorthernEuropeMap from "../components/NorthernEuropeMap";
import Reveal from "../components/Reveal";
import useReducedMotion from "../hooks/useReducedMotion";
import heroImg from "../assets/Voyfai-hero.jpg";
import atlanticLabsLogo from "../assets/1-Atlantic-Labs.webp";
import { motion } from "motion/react";
import CountUp from "../components/motion/CountUp";
import heartcoreLogo from "../assets/2-Heartcore.svg";
import earlybirdLogo from "../assets/3-Earlybird.svg";
import blisceLogo from "../assets/4-blisce.png";

// Tech graphics
import RateCompare from "../components/sections/tech/RateCompare";
import ShipmentIntake from "../components/sections/tech/ShipmentIntake";
import HubTracker from "../components/sections/tech/HubTracker";
import CustomsScan from "../components/sections/tech/CustomsScan";

import BenchmarkChart from "../components/sections/BenchmarkChart";
import CustomsFlow from "../components/sections/CustomsFlow";
import HubPreview from "../components/sections/HubPreview";
import ComplianceBand from "../components/sections/ComplianceBand";

export default function Home() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        {/* Hero background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.3) saturate(0.7)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%),
              radial-gradient(ellipse 800px 600px at 20% 80%, rgba(3,166,150,0.06) 0%, transparent 60%)
            `,
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 200px rgba(0,0,0,0.3)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: 800,
            animation: "fadeInUp 1s ease",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.8vw, 68px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.1,
              margin: "0 0 8px",
              letterSpacing: "-0.035em",
            }}
          >
            Independent Freight
            <br />
            Forwarders.
          </h1>
          <motion.h1
            initial={reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            animate={reducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: reducedMotion ? 0.2 : 0.7, delay: 0.2, ease: [0.6, 0.01, 0.05, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.8vw, 68px)",
              fontWeight: 700,
              color: COLORS.copperLight,
              lineHeight: 1.1,
              margin: "0 0 36px",
              letterSpacing: "-0.035em",
            }}
          >
            Stronger Together.
          </motion.h1>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(16px, 2vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 560,
              margin: "0 auto 48px",
            }}
          >
            A group of independent freight forwarders operating autonomously at local
            level while benefiting from the collective scale.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#contact" className="cta-btn cta-primary">
              Explore Partnership
              <span>{Icons.arrowRight}</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeIn 2s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background: "rgba(255,255,255,0.1)",
              position: "relative",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <div
              style={{
                width: 1,
                height: 12,
                background: "rgba(255,255,255,0.4)",
                borderRadius: 1,
                animation: "scrollLine 2s ease infinite",
              }}
            />
          </div>
        </div>
      </header>

      {/* ─── BENEFITS ───────────────────────────────────────────── */}
      <Section id="benefits" bg={COLORS.cream}>
        <Reveal>
          <SectionLabel>Partner Benefits</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: COLORS.navy,
              margin: "0 0 16px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              maxWidth: 600,
            }}
          >
            Everything forwarders need to compete at global scale
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.7,
              color: COLORS.textMuted,
              maxWidth: 540,
              margin: "0 0 40px",
            }}
          >
            Voyfai group forwarders access the resources that unlock the next stage of
            growth.
          </p>
        </Reveal>
        <div
          className="benefits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 0,
          }}
        >
          <Reveal delay={60}>
            <BenefitCard
              icon={Icons.anchor}
              title="Central Trade Management"
              subtitle="Direct, lasting carrier partnerships at scale."
              description="We leverage the group's collective procurement power to secure stronger terms and lasting relationships with major carriers worldwide."
              items={[
                "Group negotiated rates across all trade lanes",
                "Direct carrier relationships with secured allocations",
                "Flexible rate structures from spot to annual",
              ]}
            />
          </Reveal>
          <Reveal delay={120}>
            <BenefitCard
              icon={Icons.cpu}
              title="Proprietary Tech"
              subtitle="Less manual work for operators."
              description="Our AI tools enhance the way operators work, reducing manual tasks so teams focus on service quality, relationships, and growth."
              items={[
                "Modern-age customer visibility across every shipment",
                "Automated manual workflows such as customs and accounts payable",
                "Eliminated data entry via automated shipment creation",
              ]}
            />
          </Reveal>
          <Reveal delay={180}>
            <BenefitCard
              icon={Icons.trending}
              title="Growth"
              subtitle="Operational backbone for expansion."
              description="Comprehensive administrative, financial, and strategic support to grow the business together."
              items={[
                "Growth financing",
                "Centralized talent acquisition",
                "Product and service expansion",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* ─── OUR PARTNERS / MAP ─────────────────────────────────── */}
      <Section id="partners" bg={COLORS.warmWhite}>
        <Reveal>
        <div
          className="partners-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <SectionLabel>Our Group</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 0 16px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              A growing group of independent freight forwarders
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                margin: "0 0 40px",
                maxWidth: 540,
              }}
            >
              Established freight forwarders, each a leader in their market, united
              under the Voyfai group. Every partner maintains their identity while
              gaining the strength of the collective.
            </p>

            {/* Key stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
            >
              {[
                { number: 5, label: "Partner Companies" },
                { number: 200, prefix: "+", label: "Years Combined Experience" },
                { number: 25, label: "Office Locations" },
                { number: 6, label: "Countries" },
              ].map((stat, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{ position: "relative", paddingBottom: 16 }}>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 48,
                        fontWeight: 600,
                        color: COLORS.navy,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <CountUp to={stat.number} duration={1400} prefix={stat.prefix || ""} delay={i * 100} />
                    </div>
                    {/* Animated divider */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.06)" }}>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        style={{ width: "100%", height: "100%", background: "var(--voyfai-teal)", transformOrigin: "left" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 14,
                      color: COLORS.textMuted,
                      fontWeight: 500,
                      marginTop: 12,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 16 }}>
            <NorthernEuropeMap />
          </div>
        </div>
        </Reveal>
      </Section>

      <BenchmarkChart />

      {/* ─── TECHNOLOGY ─────────────────────────────────────────── */}
      <DetailSection
        id="technology"
        bg={COLORS.cream}
        label="AI Technology"
        title="Tools built by forwarders, for forwarders"
        items={[
          {
            graphic: <RateCompare />,
            title: "Instant Rate Comparison",
            description:
              "Compare carrier options in seconds and deliver accurate quotes within minutes. Operators spend time on relationships, not spreadsheets.",
          },
          {
            graphic: <ShipmentIntake />,
            title: "Automated Shipment Creation",
            description:
              "Our AI agent converts booking emails directly into structured shipments in the TMS, reducing manual data entry and eliminating errors.",
          },
          {
            graphic: <HubTracker />,
            title: "Voyfai Hub: Live Visibility",
            description:
              "A client portal that keeps clients continuously informed with smart alerts, automated updates, and full shipment transparency from origin to destination.",
          },
          {
            graphic: <CustomsScan />,
            title: "Intelligent Customs Automation",
            description:
              "Streamline customs declarations with AI that classifies HS codes and processes documents, improving both speed and accuracy.",
          },
        ]}
      />

      <CustomsFlow />
      <HubPreview />
      <ComplianceBand />

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      <Section bg={COLORS.warmWhite}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>What Voyfai Group Forwarders Say</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Built on trust, proven by results
            </h2>
          </div>
        </Reveal>
        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 16,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          <Reveal delay={60}>
            <TestimonialCard
              quote="Our experience with Voyfai during the acquisition process was exceptionally smooth, transparent, and well-communicated. From the outset, James and Adrian made it clear that their approach is built on trust and autonomy, and they have followed through on that commitment. Since the deal, we've continued to run Corten independently, with Voyfai offering meaningful support where needed, from tech development to procurement efficiencies. Their input has been practical and value-adding, without ever being overbearing."
              name="Sam"
              company="Corten"
              role="Managing Director"
            />
          </Reveal>
        </div>
      </Section>

      {/* ─── CTA / CONTACT ──────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          background: "linear-gradient(165deg, #000000 0%, #141414 100%)",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `
              radial-gradient(circle at 25% 50%, rgba(3,166,150,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 50%, rgba(20,20,20,0.4) 0%, transparent 50%)
            `,
          }}
        />

        <Reveal
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(3,166,150,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.copperLight,
              margin: "0 auto 28px",
            }}
          >
            {Icons.mail}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: COLORS.white,
              margin: "0 0 16px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to write the next chapter?
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              margin: "0 auto 40px",
              maxWidth: 540,
            }}
          >
            Every Voyfai partnership starts with a conversation rooted in shared values
            &mdash; independence, ambition, and a belief in what the group can build
            together. No pressure, no pitch.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:partner@voyfai.com"
              className="cta-btn cta-primary"
              style={{ fontSize: 16, padding: "16px 32px" }}
            >
              Explore Partnership
              <span>{Icons.arrowRight}</span>
            </a>
          </div>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              marginTop: 24,
            }}
          >
            Or reach us directly at partner@voyfai.com
          </p>
        </Reveal>
      </section>

      {/* ─── INVESTORS ─────────────────────────────────────────── */}
      <section
        style={{
          background: COLORS.cream,
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 50% 0%, rgba(3,166,150,0.04) 0%, transparent 70%)
            `,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <SectionLabel>Investors</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: COLORS.navy,
              margin: "0 auto 16px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              maxWidth: 600,
            }}
          >
            Backed by the Greatest Investors
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.7,
              color: COLORS.textMuted,
              maxWidth: 540,
              margin: "0 auto 64px",
            }}
          >
            All our investors have long proven track records of picking the
            winners across different industries.
          </p>

          {/* Thin separator line */}
          <div
            style={{
              width: 48,
              height: 1,
              background: COLORS.sand,
              margin: "0 auto 64px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 80,
              flexWrap: "wrap",
            }}
          >
            {[
              { src: atlanticLabsLogo, alt: "Atlantic Labs", height: 48 },
              { src: heartcoreLogo, alt: "Heartcore", height: 48 },
              { src: earlybirdLogo, alt: "Earlybird", height: 52 },
              { src: blisceLogo, alt: "blisce", height: 55 },
            ].map((logo, i) => (
              <Reveal key={logo.alt} delay={i * 60}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="investor-logo"
                  style={{
                    height: logo.height,
                    objectFit: "contain",
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
