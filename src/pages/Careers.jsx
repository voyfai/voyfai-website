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
      "We navigate the journey together, through calm seas and rough waters. Believing in the power of diverse opinions, we achieve exceptional results as a team.",
    chips: ["Trust and Supportiveness", "Diversity and Inclusiveness", "Fun", "Communication"],
  },
  {
    icon: Icons.heart,
    title: "Entrepreneurs At Heart",
    description:
      "We embody the entrepreneurial spirit with grit and a bias for action. Maximizing impact with minimal resources and taking ownership to drive results.",
    chips: ["Entrepreneurship", "Ownership", "Speed and Execution", "Frugality"],
  },
  {
    icon: Icons.zap,
    title: "Humble with Bold Moves",
    description:
      "We push boundaries, taking calculated risks that redefine the rules — yet we stay grounded and humble, never letting success cloud our focus.",
    chips: ["Humbleness", "Frugality", "Speed and Execution"],
  },
];

const LIFE = [
  {
    icon: Icons.users,
    title: "Team Collaboration",
    description:
      "Daily standups, weekly innovation sessions, and quarterly hack days keep us connected and creative.",
  },
  {
    icon: Icons.book,
    title: "Learning Culture",
    description:
      "Regular tech talks, book clubs, and conference attendance. We're always growing together.",
  },
  {
    icon: Icons.camera,
    title: "Celebrating Wins",
    description:
      "From product launches to personal milestones, we make sure every achievement is recognized.",
  },
];

const STATS = [
  { value: "4.9/5", label: "Employee Satisfaction" },
  { value: "50+", label: "Team Members" },
  { value: "12", label: "Countries Represented" },
  { value: "95%", label: "Retention Rate" },
];

const TEAM = [
  {
    name: "Sarah Chen",
    role: "Senior Product Manager",
    note: "Former Google PM with 8 years in B2B SaaS",
    quote:
      "At Voyfai, I get to work on products that directly impact entrepreneurs' success. The pace is fast, the challenges are exciting, and the team is incredibly supportive.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead AI Engineer",
    note: "PhD in Machine Learning from Stanford",
    quote:
      "Voyfai gives me the freedom to push AI into problems that actually matter — real logistics, real efficiency gains, real customers using what we ship every day.",
  },
  {
    name: "Emma Thompson",
    role: "Head of Design",
    note: "Previously design lead at Stripe and Airbnb",
    quote:
      "We treat design as craft. Every detail is reviewed, every interaction tuned. It's rare to find a team that cares about the work at this level.",
  },
];

const PERKS = [
  {
    icon: Icons.dollar,
    title: "Competitive Compensation",
    description:
      "Top-tier salaries, equity packages, and performance bonuses. We reward great work.",
  },
  {
    icon: Icons.clock,
    title: "30 Days PTO",
    description:
      "Generous paid time off policy to help you recharge and maintain work-life balance.",
  },
  {
    icon: Icons.mapPin,
    title: "Hybrid Work",
    description:
      "Flexible hybrid work arrangement combining office collaboration with remote flexibility.",
  },
  {
    icon: Icons.laptop,
    title: "Tech Setup",
    description:
      "Complete tech setup including laptop, monitor, and home office equipment to keep you productive.",
  },
  {
    icon: Icons.car,
    title: "Navit Mobility Bonus",
    description:
      "€50 monthly mobility bonus through Navit to support your commuting and transportation needs.",
  },
  {
    icon: Icons.pizza,
    title: "Pizza Thursday",
    description:
      "Bi-weekly pizza Thursday to bring the team together and enjoy great food while collaborating.",
  },
  {
    icon: Icons.calendar,
    title: "Company Parties",
    description:
      "Twice yearly company parties to celebrate our achievements and strengthen team bonds.",
  },
  {
    icon: Icons.coffee,
    title: "Office Perks",
    description:
      "Premium coffee, snacks, and refreshments to keep you energized throughout the day.",
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(28px, 3.8vw, 44px)",
              fontWeight: 600,
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
            Join Voyfai's mission to revolutionize business planning with AI. We're
            looking for passionate innovators who want to shape the future of
            entrepreneurship.
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
            <a href="#life-at-voyfai" className="cta-btn cta-outline">
              <span>{Icons.play}</span>
              Watch Our Story
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
            title: "Labor Shortage Solutions",
            description:
              "Solving labor shortage to ensure continuity and growth of the businesses we partner with.",
          },
          {
            title: "SME Profitability",
            description:
              "Elevating profitability of SME forwarders to ensure they can thrive for generations to come.",
          },
          {
            title: "Greener Supply Chains",
            description:
              "Driving greener supply chains to enable a better future for everyone.",
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Built on collaboration, innovation, and fun
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
              Our culture is built on collaboration, innovation, and fun. Here's what
              makes working at Voyfai special.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <button
            type="button"
            aria-label="Play culture video"
            className="lift-card"
            style={{
              display: "block",
              width: "100%",
              position: "relative",
              aspectRatio: "21/9",
              background: `
                linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%),
                radial-gradient(ellipse 60% 80% at 50% 50%, rgba(3,166,150,0.2) 0%, transparent 60%)
              `,
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS.lg,
              marginBottom: 36,
              overflow: "hidden",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(3,166,150,0.25) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                color: COLORS.white,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: RADIUS.pill,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.copperLight,
                }}
              >
                {Icons.play}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Watch Our Culture Video
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                See what it's really like to work at Voyfai
              </div>
            </div>
          </button>
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
            <SectionLabel>Hear from Our Team</SectionLabel>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              The people behind Voyfai
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
              Our people are what make Voyfai special. Here's what they have to say
              about working here.
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
                color: COLORS.navy,
                margin: "0 auto 14px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                maxWidth: 500,
              }}
            >
              Taking care of our team
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
              We believe in taking care of our team. Here's how we support your
              success and happiness.
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
            subtitle="Ready to be part of revolutionizing the freight forwarding industry? Your journey with us starts here."
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 600,
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
              Join our growing team and help build the future of freight forwarding.
              All positions offer hybrid work arrangements with competitive
              compensation.
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 600,
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
            Join us in revolutionizing the freight forwarding industry.
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
