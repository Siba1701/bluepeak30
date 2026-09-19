import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, Target } from "lucide-react";

export default function ProcessPage() {
  const processStages = [
    {
      num: "01",
      title: "Discovery",
      duration: "Week 1",
      tagline: "Uncovering your distinct market position and goals.",
      details:
        "We begin with in-depth discovery workshops. We analyze your commercial objectives, evaluate competitive landscapes, review current metrics, and clarify target buyer personas.",
      deliverables: ["Stakeholder interview synthesis", "Competitive landscape matrix", "Project brief & success criteria"],
    },
    {
      num: "02",
      title: "Strategy",
      duration: "Week 1–2",
      tagline: "Defining the technical architecture and user pathways.",
      details:
        "Before writing a line of code or drawing a pixel, we map the entire information architecture, wireframe high-friction pages, and establish technical stack requirements.",
      deliverables: ["Information architecture & sitemap", "Low-fidelity wireframe flows", "Technical stack specification"],
    },
    {
      num: "03",
      title: "UX/UI Design",
      duration: "Week 2–4",
      tagline: "Crafting bespoke editorial aesthetics and design systems.",
      details:
        "We develop custom, high-fidelity visual directions in Figma. Every typography scale, color token, micro-interaction, and responsive layout is meticulously designed and reviewed with you.",
      deliverables: ["Complete responsive Figma design", "Design system token library", "Interactive clickable prototype"],
    },
    {
      num: "04",
      title: "Development",
      duration: "Week 4–6",
      tagline: "Engineering production-quality code built for speed and scale.",
      details:
        "Our frontend and full-stack engineers transform approved designs into clean, modular Next.js & TypeScript code. We integrate databases, APIs, content management, and payment rails.",
      deliverables: ["Production-ready Next.js codebase", "API and third-party integrations", "Responsive test environments"],
    },
    {
      num: "05",
      title: "Testing",
      duration: "Week 6–7",
      tagline: "Rigorous quality assurance across devices, networks, and browsers.",
      details:
        "We conduct comprehensive multi-device audits, Core Web Vitals performance benchmarks, accessibility reviews, and security hardening to ensure zero-defect reliability.",
      deliverables: ["Cross-browser QA sign-off", "90+ PageSpeed score audit", "Security and accessibility validation"],
    },
    {
      num: "06",
      title: "Launch",
      duration: "Week 7",
      tagline: "Flawless zero-downtime deployment and search indexing.",
      details:
        "We orchestrate your domain DNS transition, configure SSL encryption, verify 301 redirects to protect SEO authority, and verify Google Analytics & Search Console integration.",
      deliverables: ["Zero-downtime production deployment", "301 redirect map verification", "Analytics & Search Console setup"],
    },
    {
      num: "07",
      title: "Support",
      duration: "Ongoing",
      tagline: "Continuous monitoring, proactive security, and iteration.",
      details:
        "Launch is just the beginning. We provide 24/7 uptime monitoring, scheduled security updates, automated backups, and iterative feature enhancements to ensure lasting performance.",
      deliverables: ["24/7 automated uptime alerts", "Monthly security & dependency updates", "Dedicated technical support channel"],
    },
  ];

  return (
    <div style={{ paddingBottom: "120px" }}>
      {/* Hero Header */}
      <section
        className="bg-grid-pattern bg-radial-glow"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--border-color)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "780px" }}>
          <span className="pill-badge" style={{ marginBottom: "18px" }}>
            The 7-Stage Methodology
          </span>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 800,
              color: "var(--deep-navy)",
              marginBottom: "16px",
              lineHeight: 1.12,
            }}
          >
            How we create your website.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.6,
            }}
          >
            Our step-by-step engineering and design workflow eliminates uncertainty, maintains total transparency, and guarantees a world-class outcome.
          </p>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section style={{ paddingTop: "80px" }}>
        <div className="container" style={{ maxWidth: "980px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {processStages.map((stage, idx) => (
              <div
                key={stage.num}
                className="card-base process-stage-card"
                style={{
                  padding: "40px",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "32px",
                  borderRadius: "18px",
                  position: "relative",
                }}
              >
                {/* Left Number & Duration */}
                <div style={{ borderRight: "1px solid var(--border-color)", paddingRight: "28px" }}>
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: 800,
                      color: "var(--primary-blue)",
                      lineHeight: 1,
                      fontFamily: "monospace",
                      marginBottom: "8px",
                    }}
                  >
                    {stage.num}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--secondary-text)", fontSize: "0.84rem" }}>
                    <Clock size={14} />
                    <span>{stage.duration}</span>
                  </div>
                </div>

                {/* Center Content */}
                <div>
                  <h2
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "var(--deep-navy)",
                      marginBottom: "6px",
                    }}
                  >
                    {stage.title}
                  </h2>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--primary-blue)",
                      marginBottom: "14px",
                    }}
                  >
                    {stage.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--secondary-text)",
                      lineHeight: 1.65,
                      marginBottom: "20px",
                    }}
                  >
                    {stage.details}
                  </p>

                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--deep-navy)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Key Deliverables:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {stage.deliverables.map((item) => (
                        <span
                          key={item}
                          style={{
                            fontSize: "0.82rem",
                            backgroundColor: "var(--bg-soft)",
                            border: "1px solid var(--border-color)",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            color: "var(--primary-text)",
                          }}
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <Link href="/contact" className="btn-primary">
              Ready to begin? Start with Stage 01 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
