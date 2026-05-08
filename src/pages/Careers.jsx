import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { COLORS, RADIUS } from "../constants/colors";
import { Icons } from "../constants/icons";
import Section from "../components/Section";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";
import ValueCard from "../components/ValueCard";
import PerkCard from "../components/PerkCard";
import JobCard from "../components/JobCard";
import DepartmentFilter from "../components/DepartmentFilter";
import useAshbyJobs from "../hooks/useAshbyJobs";
import useReducedMotion from "../hooks/useReducedMotion";
import CountUp from "../components/motion/CountUp";
import GroupNarrative from "../components/sections/careers/GroupNarrative";
import OurStory from "../components/sections/careers/OurStory";
import TeamVoices from "../components/sections/careers/TeamVoices";
import InterviewProcess from "../components/sections/careers/InterviewProcess";
import FoundersAndInvestors from "../components/sections/careers/FoundersAndInvestors";
import DarkCTA from "../components/sections/DarkCTA";

const VALUES = [
  {
    icon: Icons.users,
    title: "Voyaging together",
    description:
      "We solve problems side by side and ask for help early. Teams share context openly, give direct and constructive feedback, and focus on what moves the company forward, not individual silos.",
    chips: [],
  },
  {
    icon: Icons.heart,
    title: "Entrepreneurs at heart",
    description:
      "We think in solutions, take ownership, and make progress with the information and resources we have. Small experiments beat long discussions. If we see something broken, we fix it or propose how to fix it.",
    chips: [],
  },
  {
    icon: Icons.zap,
    title: "Humble with bold moves",
    description:
      "We balance ambition with curiosity. We challenge assumptions, including our own. We move fast when needed and slow down when it matters. Mistakes are part of learning, not something to hide.",
    chips: [],
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "Team members" },
  { value: 14, suffix: "+", label: "Nationalities" },
  {
    value: 4,
    suffix: "★",
    label: "On Glassdoor",
    href: "https://www.glassdoor.de/Bewertungen/Voyfai-Bewertungen-E10579397.htm",
  },
];

const PERKS = [
  {
    icon: Icons.calendar,
    title: "Generous Holiday Allowance",
    description:
      "More days off than you'd expect from a startup. Because we know the best work comes from people who actually get to switch off.",
  },
  {
    icon: Icons.laptop,
    title: "Hybrid Working",
    description:
      "Three days a week in our Berlin office, two days wherever you do your best thinking. Flexibility that actually works.",
  },
  {
    icon: Icons.car,
    title: "Navit Mobility Budget",
    description:
      "€50 monthly through Navit to cover however you get around.",
  },
  {
    icon: Icons.pizza,
    title: "Pizza Thursdays",
    description:
      "Bi-weekly post-All Hands pizza nights. Good food, good people, no agenda.",
  },
  {
    icon: Icons.compass,
    title: "Company Offsites",
    description:
      "Twice a year we step back, celebrate what we've built, and spend real time together outside the office.",
  },
  {
    icon: Icons.coffee,
    title: "Office Perks",
    description:
      "Great coffee, soft drinks, nuts and snacks to keep you going through the day.",
  },
];

export default function Careers() {
  const { jobs, loading, error } = useAshbyJobs();
  const [selectedDept, setSelectedDept] = useState("All");
  const reducedMotion = useReducedMotion();
  const [heroLoaded, setHeroLoaded] = useState(reducedMotion);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

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
              filter: "brightness(0.4) saturate(0.8)",
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
              linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%),
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
          {/* Top banner eyebrow from Notion */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 24,
            }}
          >
            Ownership is real · Impact is fast · Your work matters
          </div>

          <motion.h1
            initial={
              reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
            }
            transition={{
              duration: reducedMotion ? 0.2 : 0.7,
              delay: 0.2,
              ease: [0.6, 0.01, 0.05, 1],
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5.8vw, 68px)",
              fontWeight: 700,
              color: COLORS.copperLight,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 28px",
            }}
          >
            #jointhevoyage
          </motion.h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 2vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 680,
              margin: "0 auto 40px",
              textWrap: "pretty",
            }}
          >
            Freight forwarding runs on relationships, grit, and an intimate
            knowledge of global trade. We're an AI company that believes those
            things still matter. We build tools that give SME freight forwarders
            the intelligence to do what they do best, only faster, smarter, and
            at scale.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 640,
              margin: "0 auto 48px",
              textWrap: "pretty",
            }}
          >
            Headquartered in Berlin and active across European markets, Voyfai is
            a Series A startup where your work ships fast and your fingerprints
            stay on it. If that sounds like your kind of voyage, we'd love to
            meet you.
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
              fontFamily: "var(--font-body)",
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

      {/* ─── VALUES ─────────────────────────────────────────────── */}
      <Section id="values" bg={COLORS.cream}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <SectionLabel>Values We Live By</SectionLabel>
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
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              We believe the best work happens when people trust each other and
              share the same goal. We move fast, but we move together.
            </p>
          </div>
        </Reveal>
        <div
          className="values-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={60 + i * 60}>
              <ValueCard {...v} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── GROUP NARRATIVE ────────────────────────────────────── */}
      <GroupNarrative />

      {/* ─── OUR STORY ──────────────────────────────────────────── */}
      <OurStory />

      {/* ─── STATS ──────────────────────────────────────────────── */}
      <Section id="stats" bg={COLORS.warmWhite}>
        <Reveal>
          <div
            className="stats-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              padding: "32px 24px",
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS.lg,
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {STATS.map((stat, i) => {
              const inner = (
                <>
                  <div style={{ position: "relative", paddingBottom: 16 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 48,
                        fontWeight: 600,
                        color: COLORS.navy,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <CountUp
                        to={stat.value}
                        duration={1400}
                        suffix={stat.suffix || ""}
                        delay={i * 100}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "rgba(0,0,0,0.06)",
                      }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "var(--voyfai-teal)",
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: COLORS.textMuted,
                      fontWeight: 500,
                      marginTop: 12,
                    }}
                  >
                    {stat.label}
                  </div>
                </>
              );

              return (
                <div key={i} style={{ position: "relative" }}>
                  {stat.href ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                      }}
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Section>

      {/* ─── HEAR FROM OUR TEAM ─────────────────────────────────── */}
      <TeamVoices />

      {/* ─── PERKS & BENEFITS ───────────────────────────────────── */}
      <Section id="perks" bg={COLORS.warmWhite}>
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
                maxWidth: 540,
              }}
            >
              The everyday things that make work work
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto",
              }}
            >
              Practical support for focused work, in the office and beyond.
            </p>
          </div>
        </Reveal>
        <div
          className="perks-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={60 + i * 60}>
              <PerkCard {...p} />
            </Reveal>
          ))}
        </div>
      </Section>

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
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 540,
                margin: "0 auto 40px",
              }}
            >
              Open roles are loaded directly from Ashby. Each listing has the
              current team, location, employment type, and application link.
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
              gap: 24,
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
                fontFamily: "var(--font-body)",
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
              fontFamily: "var(--font-body)",
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
              gap: 24,
            }}
          >
            {filteredJobs.map((job, i) => (
              <Reveal key={job.id} delay={60 + i * 60}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* ─── INTERVIEW PROCESS ──────────────────────────────────── */}
      <InterviewProcess />

      {/* ─── FOUNDERS + INVESTORS ───────────────────────────────── */}
      <FoundersAndInvestors />

      {/* ─── READY TO SHAPE THE FUTURE? ─────────────────────────── */}
      <DarkCTA
        icon={Icons.compass}
        headline="Ready to join the voyage?"
        body="Join us in building the operating layer for independent freight forwarders."
        primary={
          <a
            href="https://jobs.ashbyhq.com/voyfai"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-primary"
            style={viewOpenRolesCtaStyle}
          >
            Apply now
            <span>{Icons.external}</span>
          </a>
        }
      />
    </>
  );
}
