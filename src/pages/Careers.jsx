import { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { COLORS, RADIUS } from "../constants/colors";
import { Icons } from "../constants/icons";
import Section from "../components/Section";
import SectionLabel from "../components/SectionLabel";
import DetailSection from "../components/DetailSection";
import Reveal from "../components/Reveal";
import ValueCard from "../components/ValueCard";
import PerkCard from "../components/PerkCard";
import LifeCard from "../components/LifeCard";
import StatBlock from "../components/StatBlock";
import TeamSpotlight from "../components/TeamSpotlight";
import JobCard from "../components/JobCard";
import DepartmentFilter from "../components/DepartmentFilter";
import TealCTABanner from "../components/TealCTABanner";
import useAshbyJobs from "../hooks/useAshbyJobs";
import useReducedMotion from "../hooks/useReducedMotion";
import CountUp from "../components/motion/CountUp";
import MaskReveal from "../components/motion/MaskReveal";
import OperatorCapacity from "../components/sections/careers/OperatorCapacity";
import PartnerNetwork from "../components/sections/careers/PartnerNetwork";
import SignalToInsight from "../components/sections/careers/SignalToInsight";
import HowDecisionsFlow from "../components/sections/careers/HowDecisionsFlow";

const VALUES = [
  {
    icon: Icons.users,
    title: "Voyaging together",
    description:
      "Freight forwarding is a team sport. We work closely with operators, partner companies, and product teams so decisions reflect the reality of daily shipments.",
    chips: ["Trust", "Clear communication", "Partner context", "Shared ownership"],
  },
  {
    icon: Icons.heart,
    title: "Entrepreneurs at heart",
    description:
      "Our partners are independent operators. We build with respect for that autonomy and keep the bias toward practical improvements that make their teams faster.",
    chips: ["Ownership", "Pragmatism", "Speed", "Operator empathy"],
  },
  {
    icon: Icons.zap,
    title: "Humble with bold moves",
    description:
      "We are ambitious about AI in logistics, but we validate ideas against real documents, real lanes, and real forwarding workflows before calling them progress.",
    chips: ["Evidence", "Focus", "Craft", "Measured risk"],
  },
];

const LIFE = [
  {
    icon: Icons.users,
    title: "Close to operations",
    description:
      "Product decisions are shaped by freight operators, customs documents, carrier updates, and the workflows our partner teams use every day.",
  },
  {
    icon: Icons.book,
    title: "Learning the domain",
    description:
      "We expect curiosity about forwarding, trade lanes, documents, and exception handling, not just software patterns.",
  },
  {
    icon: Icons.camera,
    title: "Shipping useful work",
    description:
      "The bar is whether a change helps operators quote faster, enter less data, avoid misses, or serve customers with more confidence.",
  },
];

const STATS = [
  { value: 8, label: "Partner companies" },
  { value: 6, label: "Countries" },
  { value: 25, label: "Office locations" },
  { value: 2023, label: "Founded" },
];

const TEAM = [
  {
    name: "Operations",
    role: "Forwarding context",
    note: "Freight workflows, partner support, and day-to-day operator feedback",
    quote:
      "We keep the work grounded in what forwarders actually need: faster quote prep, clearer shipment status, fewer manual checks, and fewer surprises for customers.",
  },
  {
    name: "Product & AI",
    role: "Workflow automation",
    note: "Document parsing, shipment creation, visibility tools, and internal systems",
    quote:
      "The best product work here is specific. A good AI feature has to survive messy emails, incomplete documents, different customer habits, and the pace of operations.",
  },
  {
    name: "Partner Growth",
    role: "Group building",
    note: "Commercial support, integration planning, and shared procurement initiatives",
    quote:
      "We support independent forwarders without flattening what makes them strong locally. The work is about useful scale, not central control for its own sake.",
  },
];

const PERKS = [
  {
    icon: Icons.dollar,
    title: "Competitive compensation",
    description:
      "Compensation is role-specific and discussed directly during the process, with clarity on expectations and scope.",
  },
  {
    icon: Icons.clock,
    title: "Sustainable pace",
    description:
      "We care about doing focused work well and keeping enough room for life outside the office.",
  },
  {
    icon: Icons.mapPin,
    title: "Hybrid work",
    description:
      "A Berlin-centered hybrid rhythm with in-person collaboration where it makes the work better.",
  },
  {
    icon: Icons.laptop,
    title: "Useful setup",
    description:
      "The tools and equipment needed to build, test, and support freight workflows properly.",
  },
  {
    icon: Icons.book,
    title: "Domain learning",
    description:
      "Time with product, operations, and partner teams so you understand the logistics context behind the work.",
  },
  {
    icon: Icons.users,
    title: "Small-team ownership",
    description:
      "Clear ownership, direct communication, and room to take responsibility for meaningful pieces of the product.",
  },
  {
    icon: Icons.calendar,
    title: "Team rituals",
    description:
      "Regular moments to review work, share domain learnings, and align around partner priorities.",
  },
  {
    icon: Icons.coffee,
    title: "Office basics",
    description:
      "A practical workspace for deep work, design reviews, technical discussions, and partner planning.",
  },
];

export default function Careers() {
  const { jobs, loading, error } = useAshbyJobs();
  const [selectedDept, setSelectedDept] = useState("All");
  const reducedMotion = useReducedMotion();
  const [heroLoaded, setHeroLoaded] = useState(reducedMotion);

  const lifeImgRef = useRef(null);
  const { scrollYProgress: lifeImgScroll } = useScroll({
    target: lifeImgRef,
    offset: ["start end", "end start"]
  });
  const lifeImgY = useTransform(lifeImgScroll, [0, 1], ["-5%", "5%"]);

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (selectedDept === "All") return jobs;
    return jobs.filter((j) => j.department === selectedDept);
  }, [jobs, selectedDept]);

  const viewOpenRolesCtaStyle = { fontSize: 16, padding: "16px 32px" };

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
        <picture>
          <img
            src="/images/voyfai_careers_hero_1777475797821.png"
            alt=""
            aria-hidden="true"
            onLoad={() => setHeroLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.3) saturate(0.7)",
              clipPath: heroLoaded ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: reducedMotion
                ? "none"
                : "clip-path 1000ms cubic-bezier(0.6, 0.01, 0.05, 1)",
            }}
          />
        </picture>
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
        <div
          aria-hidden="true"
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
            maxWidth: 820,
            animation: "fadeInUp 1s ease",
          }}
        >
          {/* Hero intentionally pairs two Adrianna display lines (#jointhevoyage + headline) per AGENT.md §10 user override of §3.1. */}
          <motion.h1
            initial={reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            animate={reducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.6, 0.01, 0.05, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.8vw, 68px)",
              fontWeight: 700,
              color: COLORS.copperLight,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              margin: "0 0 8px",
            }}
          >
            #jointhevoyage
          </motion.h1>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.8vw, 68px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.1,
              margin: "0 0 20px",
              letterSpacing: "-0.035em",
            }}
          >
            Shape the future of freight forwarding.
          </h1>
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
            Join the team building AI tools and shared infrastructure for
            independent freight forwarders. We work on the operational details that
            help local forwarding teams compete with more speed and clarity.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/careers#find-your-role"
              className="cta-btn cta-primary"
              style={viewOpenRolesCtaStyle}
            >
              View open positions
              <span>{Icons.arrowRight}</span>
            </Link>
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

      {/* ─── OUR MISSION ────────────────────────────────────────── */}
      <DetailSection
        id="mission"
        bg={COLORS.cream}
        label="Our Mission"
        title="Empowering freight forwarders around the globe to redefine what's possible"
        items={[
          {
            graphic: <OperatorCapacity />,
            title: "Operator Capacity",
            description:
              "Reducing repetitive manual work so partner teams can keep serving customers as volumes and complexity grow.",
          },
          {
            graphic: <PartnerNetwork />,
            title: "Independent Forwarder Strength",
            description:
              "Giving established SME forwarders access to shared technology, procurement support, and group knowledge without losing local autonomy.",
          },
          {
            graphic: <SignalToInsight />,
            title: "Better Logistics Decisions",
            description:
              "Turning shipment, document, and status data into clearer decisions for operators, customers, and partner companies.",
          },
        ]}
      />

      {/* ─── OUR VALUES ─────────────────────────────────────────── */}
      <Section id="values" bg={COLORS.warmWhite}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>Our Values</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 760,
                textWrap: "balance",
              }}
            >
              The principles that guide us
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              These principles guide everything we do, from how we build products to
              how we treat each other.
            </p>
          </div>
        </Reveal>
        <div
          className="values-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={60 + i * 60}>
              <ValueCard {...v} />
            </Reveal>
          ))}
        </div>
      </Section>

      <HowDecisionsFlow />


      {/* ─── LIFE AT VOYFAI ─────────────────────────────────────── */}
      <Section id="life-at-voyfai" bg={COLORS.cream}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Life at Voyfai</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Built around real logistics work
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              We are a small team working close to freight operations. The culture is
              practical, direct, and focused on building tools that forwarders can trust.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 56, borderRadius: RADIUS.lg, overflow: "hidden", height: "min(60vh, 500px)", position: "relative" }}>
            <motion.img 
              ref={lifeImgRef}
              src="/images/voyfai_careers_life_1777475811545.png" 
              alt="Life at Voyfai" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", scale: 1.1, y: reducedMotion ? 0 : lifeImgY }} 
            />
          </div>
        </Reveal>

        <div
          className="life-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {LIFE.map((l, i) => (
            <Reveal key={l.title} delay={i * 50}>
              <LifeCard {...l} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="stats-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              padding: "32px 24px",
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS.lg,
            }}
          >
            {STATS.map((stat, i) => (
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
                    <CountUp to={stat.value} duration={1400} prefix={stat.prefix || ""} delay={i * 100} />
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
        </Reveal>
      </Section>

      {/* ─── HEAR FROM OUR TEAM ─────────────────────────────────── */}
      <Section id="team" bg={COLORS.warmWhite}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>How We Work</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Cross-functional work, grounded in forwarding
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              The work sits between partner companies, operations, product, and AI.
              These are the lenses that shape how we make decisions.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ marginBottom: 56, borderRadius: RADIUS.lg, overflow: "hidden", height: "min(60vh, 500px)" }}>
            <img 
              src="/images/voyfai_careers_team_1777475827094.png" 
              alt="Our Team" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
            />
          </div>
        </Reveal>
        
        <Reveal delay={60}>
          <TeamSpotlight members={TEAM} />
        </Reveal>
      </Section>

      {/* ─── PERKS & BENEFITS ───────────────────────────────────── */}
      <Section id="perks" bg={COLORS.cream}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>Perks &amp; Benefits</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Practical support for focused work
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              Benefits are designed to help people do strong, focused work while
              staying close to the domain and the team.
            </p>
          </div>
        </Reveal>
        <div
          className="perks-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 40}>
              <PerkCard {...p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── JOIN OUR TEAM CTA ───────────────────────────────── */}
      <section
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
            {Icons.send}
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
            Join our team
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
            Build the tools, workflows, and shared systems that help independent freight forwarders move faster without losing what makes them local.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/careers#find-your-role"
              className="cta-btn cta-primary"
              style={viewOpenRolesCtaStyle}
            >
              View open positions
              <span>{Icons.arrowRight}</span>
            </Link>
            <a
              href="https://jobs.ashbyhq.com/voyfai"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-secondary"
              style={{
                fontSize: 16,
                padding: "16px 32px",
                background: "rgba(255,255,255,0.05)",
                color: COLORS.white,
                borderColor: "rgba(255,255,255,0.1)"
              }}
            >
              View all jobs on Ashby
              <span>{Icons.external}</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── OPEN POSITIONS ─────────────────────────────────────── */}
      <Section id="find-your-role" bg={COLORS.cream}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <SectionLabel>Open Positions</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 600,
              }}
            >
              Find your role
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto 40px",
              }}
            >
              Open roles are loaded directly from Ashby. Each listing has the current
              team, location, employment type, and application link.
            </p>
          </div>
        </Reveal>

        {!loading && !error && jobs.length > 0 && (
          <Reveal delay={60}>
            <DepartmentFilter
              departments={departments}
              selected={selectedDept}
              onSelect={setSelectedDept}
            />
          </Reveal>
        )}

        {loading && (
          <div
            className="jobs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: RADIUS.lg,
                  padding: "28px",
                  minHeight: 180,
                  animation: "skeletonPulse 1.4s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS.lg,
            }}
          >
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: COLORS.textMuted,
                marginBottom: 16,
              }}
            >
              Unable to load open positions right now.
            </p>
            <a
              href="https://jobs.ashbyhq.com/voyfai"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-primary"
            >
              View all jobs on Ashby
              <span>{Icons.external}</span>
            </a>
          </div>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: COLORS.textMuted,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            No open positions in this department right now.
          </div>
        )}

        {!loading && !error && filteredJobs.length > 0 && (
          <div
            className="jobs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {filteredJobs.map((job, i) => (
              <Reveal key={job.id} delay={i * 40}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* ─── READY TO SHAPE THE FUTURE? ─────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(165deg, #000000 0%, #141414 100%)",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(3,166,150,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(20,20,20,0.4) 0%, transparent 50%)",
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
            {Icons.compass}
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
            Ready to shape the future?
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
            Join us in building the operating layer for independent freight forwarders.
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
              href="https://jobs.ashbyhq.com/voyfai"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-primary"
            >
              Apply now
              <span>{Icons.external}</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
