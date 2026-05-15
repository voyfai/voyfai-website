import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { COLORS, RADIUS } from "../constants/colors";
import { Icons } from "../constants/icons";
import Section from "../components/Section";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";
import ValueCard from "../components/ValueCard";
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
import PerksScroller from "../components/sections/careers/PerksScroller";
import DarkCTA from "../components/sections/DarkCTA";

const VALUES = [
  {
    icon: Icons.users,
    title: "Voyaging together",
    description:
      "Every voyage needs a crew that rows together. We surface what we know, ask for help before we're stuck, give direct and constructive feedback, and call out the rocks we see ahead - even when they're in someone else's lane. No passengers, no silos.",
    chips: [],
  },
  {
    icon: Icons.heart,
    title: "Entrepreneurs at heart",
    description:
      "Every entrepreneur owns the outcome, not just the task. We make the call with the information we have, run the small experiment instead of debating for a week, and when something's broken, we fix it.",
    chips: [],
  },
  {
    icon: Icons.zap,
    title: "Humble with bold moves",
    description:
      "Every bold move needs a humble mind behind it. We back ourselves enough to place the bet and stay open enough to question it, moving fast when we can and pausing when it counts. Mistakes aren't buried; they're how we grow.",
    chips: [],
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "Team members" },
  { value: 14, suffix: "+", label: "Nationalities" },
  {
    value: 4.2,
    decimals: 1,
    stars: 4,
    total: 5,
    label: "On Glassdoor",
    href: "https://www.glassdoor.de/Bewertungen/Voyfai-Bewertungen-E10579397.htm",
  },
];

const PERKS = [
  {
    icon: Icons.laptop,
    title: "Hybrid Working",
    description:
      "Three days a week in our Berlin office, two days wherever you do your best thinking. Flexibility that actually works.",
  },
  {
    icon: Icons.calendar,
    title: "Generous Holiday Allowance",
    description:
      "More days off than you'd expect from a startup. Because we know the best work comes from people who actually get to switch off.",
  },
  {
    icon: Icons.car,
    title: "Navit Mobility Budget",
    description:
      "€50 monthly through Navit to cover however you get around.",
  },
  {
    icon: Icons.coffee,
    title: "Office Perks",
    description:
      "Great coffee, soft drinks, nuts and snacks to keep you going through the day.",
  },
  {
    icon: Icons.compass,
    title: "Company Party",
    description:
      "Twice a year the whole team gets together to celebrate what we've built and share a few proper meals.",
  },
  {
    icon: Icons.pizza,
    title: "Pizza Thursdays",
    description:
      "Bi-weekly post-All Hands pizza nights. Good food, good people, no agenda.",
  },
];

export default function Careers() {
  const { jobs, loading, error } = useAshbyJobs();
  const [selectedDept, setSelectedDept] = useState("All");
  const reducedMotion = useReducedMotion();
  const [heroLoaded, setHeroLoaded] = useState(reducedMotion);

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
          <source srcSet="/images/careers/hero-spree.avif" type="image/avif" />
          <img
            src="/images/careers/hero-spree.jpg"
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
              filter: "brightness(0.45) saturate(0.85)",
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
            maxWidth: 1080,
            animation: "fadeInUp 1s ease",
          }}
        >
          <motion.h1
            initial={
              reducedMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
            }
            transition={{
              duration: reducedMotion ? 0.2 : 0.9,
              delay: 0.2,
              ease: [0.6, 0.01, 0.05, 1],
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.8vw, 84px)",
              fontWeight: 700,
              color: COLORS.copperLight,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
            }}
          >
            #jointhevoyage
          </motion.h1>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              margin: "0 auto 36px",
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            This is where ownership is real, impact is fast, and your work actually matters.
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 720,
              margin: "0 auto 48px",
              textWrap: "pretty",
            }}
          >
            We build AI tools for the SME freight forwarders who run on
            relationships, grit, and decades of know-how. Berlin-based, Series A,
            and small enough that what you build lands in operators' hands within
            weeks.
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
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 10,
                        height: 48,
                      }}
                    >
                      {stat.stars ? (
                        <span
                          role="img"
                          aria-label={`${stat.value} out of ${stat.total} stars on Glassdoor`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 12,
                            color: "var(--voyfai-teal)",
                          }}
                        >
                          <CountUp
                            to={stat.value}
                            decimals={stat.decimals || 0}
                            duration={1400}
                            delay={i * 100}
                          />
                          <span
                            aria-hidden="true"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            {Array.from({ length: stat.total }).map((_, si) => {
                              const filled = si < stat.stars;
                              return (
                                <svg
                                  key={si}
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill={filled ? "currentColor" : "none"}
                                  stroke={filled ? "none" : "rgba(0,0,0,0.18)"}
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                  style={{ flexShrink: 0 }}
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              );
                            })}
                          </span>
                        </span>
                      ) : (
                        <CountUp
                          to={stat.value}
                          duration={1400}
                          suffix={stat.suffix || ""}
                          delay={i * 100}
                        />
                      )}
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
              The things that help great work happen
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Built for people who care deeply about what they do, and want the
              flexibility and support to do it well.
            </p>
          </div>
        </Reveal>
        <PerksScroller perks={PERKS} />
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
                maxWidth: 760,
              }}
            >
              Join a team built for people who like building
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: COLORS.textMuted,
                maxWidth: 720,
                margin: "0 auto 40px",
              }}
            >
              We're hiring people who want ownership, move fast without ego, and
              care about solving real operational problems. Whether your
              background is in startups, logistics, product, engineering, or
              operations, what matters most here is curiosity, execution, and
              the willingness to figure things out together.
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
