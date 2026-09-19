import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Zap, Users, Compass, Eye, Check } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Quality",
      desc: "We do not ship mediocre work. Every layout, transition, and line of code is held to the highest standard of international craft.",
      icon: "Sparkles",
    },
    {
      title: "Transparency",
      desc: "No hidden costs, no vague timelines, and no tech jargon traps. We operate with open communication and direct developer access.",
      icon: "Eye",
    },
    {
      title: "Creativity",
      desc: "We reject cookie-cutter templates in favor of tailored digital identities that capture what makes your business genuinely distinctive.",
      icon: "Compass",
    },
    {
      title: "Performance",
      desc: "Speed is a foundational feature. We engineer every project to load in milliseconds and perform flawlessly across all network conditions.",
      icon: "Zap",
    },
    {
      title: "Reliability",
      desc: "Your digital flagship is critical to your revenue. We write resilient, maintainable code backed by continuous monitoring and proactive support.",
      icon: "ShieldCheck",
    },
    {
      title: "Collaboration",
      desc: "We view our clients as long-term creative partners. Your market insights combined with our digital execution create exceptional outcomes.",
      icon: "Users",
    },
  ];

  return (
    <div style={{ paddingBottom: "120px" }}>
      {/* Hero */}
      <section
        className="bg-grid-pattern bg-radial-glow"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--border-color)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "820px" }}>
          <span className="pill-badge" style={{ marginBottom: "18px" }}>
            About BluePeak Web Co.
          </span>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              fontWeight: 800,
              color: "var(--deep-navy)",
              marginBottom: "16px",
              lineHeight: 1.12,
            }}
          >
            We build websites with purpose.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.65,
            }}
          >
            BluePeak Web Co. was founded to bridge the divide between visually captivating brand design and rigorous, high-performance software engineering.
          </p>
        </div>
      </section>

      {/* Who We Are & Our Mission (Editorial Layout) */}
      <section style={{ paddingTop: "80px" }}>
        <div className="container" style={{ maxWidth: "1020px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "56px",
              marginBottom: "80px",
            }}
            className="about-split-grid"
          >
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary-blue)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Who We Are
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--deep-navy)", marginTop: "8px", marginBottom: "18px" }}>
                Crafting digital flagships that elevate business reputations.
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--secondary-text)", lineHeight: 1.7, marginBottom: "16px" }}>
                We are an independent web design and development studio. We operate without the bureaucratic bloat of legacy agencies, pairing our clients directly with senior designers and engineers who care deeply about the craft.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--secondary-text)", lineHeight: 1.7 }}>
                Whether building a high-volume headless e-commerce store, a bespoke culinary reservation system, or an authoritative corporate advisory presence, we focus on what matters: clarity, speed, brand prestige, and commercial conversions.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--bg-soft)",
                border: "1px solid var(--border-color)",
                borderRadius: "18px",
                padding: "36px 32px",
              }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary-blue)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Our Mission
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--deep-navy)", marginTop: "8px", marginBottom: "16px" }}>
                To make the modern web faster, more thoughtful, and undeniably beautiful.
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", lineHeight: 1.65, marginBottom: "20px" }}>
                The internet is inundated with disposable, slow-loading templates that damage brand credibility. Our mission is to engineer web experiences that command respect, inspire trust, and deliver tangible commercial returns.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, color: "var(--deep-navy)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--primary-blue)" }} />
                  Zero reliance on bloated third-party page builders
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, color: "var(--deep-navy)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--primary-blue)" }} />
                  Modern edge-optimized Next.js architecture
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", fontWeight: 600, color: "var(--deep-navy)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--primary-blue)" }} />
                  Transparent partnership and direct accountability
                </div>
              </div>
            </div>
          </div>

          {/* What We Believe */}
          <div
            style={{
              padding: "48px 40px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "18px",
              marginBottom: "80px",
            }}
          >
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary-blue)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              What We Believe
            </span>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--deep-navy)", marginTop: "8px", marginBottom: "20px" }}>
              Code is the foundation. Design is the voice.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.7, marginBottom: "20px" }}>
              We believe design and engineering should never be siloed. When designers understand technical constraints and engineers appreciate typography, spacing, and micro-interactions, the result is magical — an interface that feels alive, responsive, and effortless.
            </p>
          </div>

          {/* Our Values (6 cards) */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="pill-badge" style={{ marginBottom: "14px" }}>
                Guiding Principles
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--deep-navy)" }}>
                Our Core Values
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="card-base"
                  style={{
                    padding: "32px 28px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "var(--deep-navy)",
                      marginBottom: "10px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* About Page CTA */}
          <div style={{ textAlign: "center", marginTop: "88px" }}>
            <Link href="/contact" className="btn-primary">
              Work With BluePeak <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
