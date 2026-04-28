import { useMemo, useState } from "react";
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

const VALUES = [
  {
    icon: Icons.users,
    title: "Voyaging Together",
    description:
      "Freight forwarding is a team sport. We work closely with operators, partner companies, and product teams so decisions reflect the reality of daily shipments.",
    chips: ["Trust", "Clear communication", "Partner context", "Shared ownership"],
  },
  {
    icon: Icons.heart,
    title: "Entrepreneurs At Heart",
    description:
      "Our partners are independent operators. We build with respect for that autonomy and keep the bias toward practical improvements that make their teams faster.",
    chips: ["Ownership", "Pragmatism", "Speed", "Operator empathy"],
  },
  {
    icon: Icons.zap,
    title: "Humble with Bold Moves",
    description:
      "We are ambitious about AI in logistics, but we validate ideas against real documents, real lanes, and real forwarding workflows before calling them progress.",
    chips: ["Evidence", "Focus", "Craft", "Measured risk"],
  },
];

const LIFE = [
  {
    icon: Icons.users,
    title: "Close to Operations",
    description:
      "Product decisions are shaped by freight operators, customs documents, carrier updates, and the workflows our partner teams use every day.",
  },
  {
    icon: Icons.book,
    title: "Learning the Domain",
    description:
      "We expect curiosity about forwarding, trade lanes, documents, and exception handling, not just software patterns.",
  },
  {
    icon: Icons.camera,
    title: "Shipping Useful Work",
    description:
      "The bar is whether a change helps operators quote faster, enter less data, avoid misses, or serve customers with more confidence.",
  },
];

const STATS = [
  { value: "Freight", label: "Domain focus" },
  { value: "AI", label: "Document automation" },
  { value: "Group", label: "Partner enablement" },
  { value: "Hybrid", label: "Berlin team rhythm" },
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
    title: "Competitive Compensation",
    description:
      "Compensation is role-specific and discussed directly during the process, with clarity on expectations and scope.",
  },
  {
    icon: Icons.clock,
    title: "Sustainable Pace",
    description:
      "We care about doing focused work well and keeping enough room for life outside the office.",
  },
  {
    icon: Icons.mapPin,
    title: "Hybrid Work",
    description:
      "A Berlin-centered hybrid rhythm with in-person collaboration where it makes the work better.",
  },
  {
    icon: Icons.laptop,
    title: "Useful Setup",
    description:
      "The tools and equipment needed to build, test, and support freight workflows properly.",
  },
  {
    icon: Icons.book,
    title: "Domain Learning",
    description:
      "Time with product, operations, and partner teams so you understand the logistics context behind the work.",
  },
  {
    icon: Icons.users,
    title: "Small-Team Ownership",
    description:
      "Clear ownership, direct communication, and room to take responsibility for meaningful pieces of the product.",
  },
  {
    icon: Icons.calendar,
    title: "Team Rituals",
    description:
      "Regular moments to review work, share domain learnings, and align around partner priorities.",
  },
  {
    icon: Icons.coffee,
    title: "Office Basics",
    description:
      "A practical workspace for deep work, design reviews, technical discussions, and partner planning.",
  },
];

export default function Careers() {
  const { jobs, loading, error } = useAshbyJobs();
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (selectedDept === "All") return jobs;
    return jobs.filter((j) => j.department === selectedDept);
  }, [jobs, selectedDept]);

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          overflow: "hidden",
          padding: "140px 24px 100px",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%),
              radial-gradient(ellipse 900px 600px at 50% 40%, rgba(3,166,150,0.18) 0%, transparent 65%),
              radial-gradient(ellipse 600px 400px at 20% 90%, rgba(4,201,180,0.12) 0%, transparent 60%),
              #050505
            `,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 200px rgba(0,0,0,0.4)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: 820,
            animation: "fadeInUp 900ms var(--ease-out) both",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(32px, 4.8vw, 52px)",
              fontWeight: 600,
              color: COLORS.copperLight,
              marginBottom: 24,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            #jointhevoyage
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.8vw, 44px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.2,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Shape the future of freight forwarding
          </h1>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 580,
              margin: "0 auto 40px",
            }}
          >
            Join the team building AI tools and shared infrastructure for
            independent freight forwarders. We work on the operational details that
            help local forwarding teams compete with more speed and clarity.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#open-positions" className="cta-btn cta-primary">
              View Open Positions
              <span>{Icons.arrowRight}</span>
            </a>
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
            title: "Operator Capacity",
            description:
              "Reducing repetitive manual work so partner teams can keep serving customers as volumes and complexity grow.",
          },
          {
            title: "Independent Forwarder Strength",
            description:
              "Giving established SME forwarders access to shared technology, procurement support, and group knowledge without losing local autonomy.",
          },
          {
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
                maxWidth: 600,
              }}
            >
              The principles that guide us
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 560,
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
            gap: 20,
          }}
        >
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={60 + i * 60}>
              <ValueCard {...v} />
            </Reveal>
          ))}
        </div>
      </Section>

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
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              We are a small team working close to freight operations. The culture is
              practical, direct, and focused on building tools that forwarders can trust.
            </p>
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
            {STATS.map((s) => (
              <StatBlock key={s.label} {...s} />
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
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              The work sits between partner companies, operations, product, and AI.
              These are the lenses that shape how we make decisions.
            </p>
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
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 560,
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

      {/* ─── JOIN OUR TEAM BANNER ───────────────────────────────── */}
      <Section bg={COLORS.warmWhite} style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Reveal>
          <TealCTABanner
            title="Join Our Team!"
            subtitle="Build the tools, workflows, and shared systems that help independent freight forwarders move faster without losing what makes them local."
            primaryLabel="View Open Positions"
            primaryHref="#open-positions"
            secondaryLabel="View All Jobs on Ashby"
            secondaryHref="https://jobs.ashbyhq.com/voyfai"
            secondaryExternal
          />
        </Reveal>
      </Section>

      {/* ─── OPEN POSITIONS ─────────────────────────────────────── */}
      <Section id="open-positions" bg={COLORS.cream}>
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
                fontSize: 16,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 560,
                margin: "0 auto 24px",
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
              View All Jobs on Ashby
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
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: COLORS.white,
              margin: "0 0 16px",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Ready to Shape the Future?
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.5)",
              margin: "0 auto 36px",
              maxWidth: 480,
            }}
          >
            Join us in building the operating layer for independent freight forwarders.
          </p>
          <a href="#open-positions" className="cta-btn cta-primary">
            Apply Now
            <span>{Icons.arrowRight}</span>
          </a>
        </Reveal>
      </section>
    </>
  );
}
