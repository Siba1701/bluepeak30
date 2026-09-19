"use client";

import React from "react";
import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import BrowserMockup from "@/components/BrowserMockup";
import { PROJECTS } from "@/lib/projects-data";
import { SERVICES } from "@/lib/services-data";
import {
  ArrowRight,
  Play,
  Sparkles,
  Smartphone,
  Zap,
  Shield,
  Search,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Compass,
  FileCode,
  Send,
  Eye,
  Check,
} from "lucide-react";

export default function HomePage() {
  const primaryServices = SERVICES.slice(0, 6);

  const demoClients = [
    { name: "GrowTech", symbol: "GT" },
    { name: "PixelFlow", symbol: "PF" },
    { name: "Nexa", symbol: "NX" },
    { name: "CloudSync", symbol: "CS" },
    { name: "MarketPro", symbol: "MP" },
    { name: "VoltMedia", symbol: "VM" },
  ];

  const processStages = [
    { num: "01", title: "Discover", desc: "We study your business goals, target buyers, and competitors." },
    { num: "02", title: "Plan", desc: "User journeys, information architecture, and technical blueprints." },
    { num: "03", title: "Design", desc: "High-fidelity bespoke layouts, typography, and motion prototypes." },
    { num: "04", title: "Develop", desc: "Clean Next.js & TypeScript code engineered for speed and scale." },
    { num: "05", title: "Test", desc: "Strict quality assurance, cross-browser, responsive, and speed audits." },
    { num: "06", title: "Launch", desc: "Zero-downtime deployment, SEO indexing, and analytics verification." },
  ];

  const whyHighlights = [
    { title: "Custom Design", desc: "Every layout is tailored from scratch. Never rigid off-the-shelf templates." },
    { title: "Responsive", desc: "Obsessively tested across phones, tablets, laptops, and ultra-wide displays." },
    { title: "Performance", desc: "Sub-second load times engineered to score 95+ on Google Core Web Vitals." },
    { title: "SEO Ready", desc: "Clean semantic markup and structured metadata to boost organic search rank." },
    { title: "Scalable", desc: "Modular component architecture ready to grow alongside your expanding business." },
    { title: "Secure", desc: "Hardened security headers, HTTPS encryption, and modern auth protocols." },
    { title: "Business Focused", desc: "Every pixel and interaction is aligned directly with conversion and revenue." },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section
        className="bg-grid-pattern bg-radial-glow"
        style={{
          position: "relative",
          paddingTop: "48px",
          paddingBottom: "88px",
          borderBottom: "1px solid var(--border-color)",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* LEFT COLUMN: Main Typography & CTAs */}
            <div style={{ maxWidth: "620px" }}>
              {/* Pill Label */}
              <div style={{ marginBottom: "20px" }}>
                <span className="pill-badge">
                  <Sparkles size={13} />
                  WEB DESIGN & DEVELOPMENT STUDIO
                </span>
              </div>

              {/* Oversized Headline */}
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  color: "var(--deep-navy)",
                  letterSpacing: "-0.03em",
                  marginBottom: "24px",
                }}
              >
                Websites <br />
                built around <br />
                <span className="text-blue">your business.</span>
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.25vw, 1.2rem)",
                  lineHeight: 1.65,
                  color: "var(--secondary-text)",
                  marginBottom: "36px",
                  fontWeight: 400,
                }}
              >
                We design and develop modern, high-performance websites tailored to your goals, your audience, and your brand. From idea to launch, we make your online presence work harder for you.
              </p>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "44px",
                }}
              >
                <Link href="/contact" className="btn-primary">
                  Start Your Project
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>

                <Link href="/work" className="btn-secondary">
                  <Play size={14} fill="currentColor" />
                  Explore Our Work
                </Link>
              </div>

              {/* Hero Benefits (3 compact badges) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "16px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--border-color)",
                }}
              >
                {/* Benefit 1 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--light-blue)",
                      color: "var(--primary-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--deep-navy)" }}>
                      Custom Design
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "var(--secondary-text)" }}>
                      Unique & modern
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--light-blue)",
                      color: "var(--primary-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Smartphone size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--deep-navy)" }}>
                      Responsive
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "var(--secondary-text)" }}>
                      Looks perfect everywhere
                    </div>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--light-blue)",
                      color: "var(--primary-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Zap size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--deep-navy)" }}>
                      Performance
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "var(--secondary-text)" }}>
                      Fast. Secure. Scalable.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Layered Hero Browser Mockups & Annotations */}
            <div style={{ width: "100%" }}>
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED BY BUSINESSES SECTION */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "48px 0",
          backgroundColor: "var(--bg-card)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--secondary-text)",
              }}
            >
              TRUSTED BY BUSINESSES LIKE YOURS
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "36px 54px",
            }}
          >
            {demoClients.map((client) => (
              <div
                key={client.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--secondary-text)",
                  opacity: 0.7,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  filter: "grayscale(100%)",
                  transition: "opacity 0.2s ease, filter 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.filter = "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.7";
                  (e.currentTarget as HTMLElement).style.filter = "grayscale(100%)";
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "6px",
                    backgroundColor: "var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                  }}
                >
                  {client.symbol}
                </div>
                <span>{client.name}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "18px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--secondary-text)", opacity: 0.6 }}>
              (Fictional demo client profiles shown for portfolio presentation)
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOME — INTRODUCTION (Editorial Layout) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-main)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px 64px",
              alignItems: "center",
            }}
            className="editorial-grid"
          >
            {/* Left Big Heading */}
            <div>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--primary-blue)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Our Core Philosophy
              </span>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "var(--deep-navy)",
                }}
              >
                We don’t just build websites. <br />
                <span className="text-blue">We build digital experiences.</span>
              </h2>
            </div>

            {/* Right Supporting Content */}
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: "var(--secondary-text)",
                  marginBottom: "28px",
                }}
              >
                A truly exceptional website isn’t just visually striking — it is a strategic business instrument that builds authority, drives organic engagement, and converts visitors into enduring partnerships.
              </p>

              {/* 5 Pillar Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "14px",
                  marginBottom: "32px",
                }}
              >
                {[
                  { title: "Strategy", desc: "Goal-aligned thinking" },
                  { title: "Design", desc: "Editorial visual craft" },
                  { title: "Development", desc: "Production-grade code" },
                  { title: "Performance", desc: "Sub-second speed" },
                  { title: "Business Thinking", desc: "Measurable ROI" },
                ].map((pillar) => (
                  <div
                    key={pillar.title}
                    style={{
                      padding: "12px 14px",
                      backgroundColor: "var(--bg-soft)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--deep-navy)" }}>
                      {pillar.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--secondary-text)", marginTop: "2px" }}>
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "var(--primary-blue)",
                }}
              >
                Learn how we think about web design <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-soft)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "680px", marginBottom: "56px" }}>
            <span className="pill-badge" style={{ marginBottom: "16px" }}>
              Capabilities
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--deep-navy)",
                marginBottom: "16px",
              }}
            >
              Everything Your Business Needs Online.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
              Comprehensive digital design and engineering services. We bring senior-level craft and strategic execution to every engagement.
            </p>
          </div>

          {/* 6 Clean Service Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {primaryServices.map((service, idx) => (
              <div
                key={service.id}
                className="card-base"
                style={{
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "var(--primary-blue)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        backgroundColor: "var(--light-blue)",
                        color: "var(--primary-blue)",
                        fontWeight: 600,
                      }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      marginBottom: "12px",
                      color: "var(--deep-navy)",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--secondary-text)",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {service.shortDesc}
                  </p>
                </div>

                <Link
                  href={`/services#${service.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--primary-blue)",
                    marginTop: "16px",
                  }}
                >
                  Explore service details <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/services" className="btn-secondary">
              View All Services & Deliverables <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR WORK SECTION (Selected Work) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-main)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "56px",
            }}
          >
            <div>
              <span className="pill-badge" style={{ marginBottom: "16px" }}>
                Case Studies
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "var(--deep-navy)",
                }}
              >
                Selected work.
              </h2>
            </div>

            <Link href="/work" className="btn-secondary">
              View All Projects ({PROJECTS.length}) <ArrowRight size={15} />
            </Link>
          </div>

          {/* Large Portfolio Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {PROJECTS.map((project, index) => (
              <div
                key={project.slug}
                className="card-base portfolio-row-card"
                style={{
                  padding: "0",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  borderRadius: "18px",
                }}
              >
                {/* Left Preview Window */}
                <div
                  style={{
                    backgroundColor: "var(--bg-soft)",
                    padding: "36px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid var(--border-color)",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: "560px" }}>
                    <BrowserMockup url={project.urlPreview}>
                      <div
                        style={{
                          height: "240px",
                          position: "relative",
                          backgroundImage: `url(${project.heroImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "16px",
                            color: "#FFFFFF",
                          }}
                        >
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {project.categoryLabel}
                          </span>
                          <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                            {project.title}
                          </span>
                        </div>
                      </div>
                    </BrowserMockup>
                  </div>
                </div>

                {/* Right Details */}
                <div
                  style={{
                    padding: "40px 36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <span className="pill-badge" style={{ fontSize: "0.7rem", padding: "3px 10px" }}>
                        {project.category}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "var(--secondary-text)" }}>
                        {project.year}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 800,
                        color: "var(--deep-navy)",
                        marginBottom: "12px",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.96rem",
                        color: "var(--secondary-text)",
                        lineHeight: 1.65,
                        marginBottom: "24px",
                      }}
                    >
                      {project.shortDesc}
                    </p>

                    {/* Metrics row */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px",
                        marginBottom: "28px",
                      }}
                    >
                      {project.metrics.slice(0, 2).map((m) => (
                        <div
                          key={m.label}
                          style={{
                            padding: "10px 14px",
                            backgroundColor: "var(--bg-soft)",
                            borderRadius: "8px",
                            border: "1px solid var(--border-color)",
                          }}
                        >
                          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-blue)" }}>
                            {m.value}
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "var(--secondary-text)" }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="btn-primary"
                    style={{ alignSelf: "flex-start" }}
                  >
                    View Project Case Study
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WEBSITE SHOWCASE (Multi-Mockup Showcase) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-soft)",
          borderBottom: "1px solid var(--border-color)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft Blue Ambient Lighting */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(23, 105, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 60px" }}>
            <span className="pill-badge" style={{ marginBottom: "16px" }}>
              Tailored Architecture
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                color: "var(--deep-navy)",
                marginBottom: "16px",
              }}
            >
              Engineered for Every Digital Vertical.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
              From culinary institutions and high-conversion e-commerce boutiques to corporate advisory portals and real-time SaaS intelligence.
            </p>
          </div>

          {/* Composition of 4 Website Screens */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {/* 1. Restaurant */}
            <div className="card-base" style={{ padding: "20px" }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px" }}>
                RESTAURANT & HOSPITALITY
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>Aurora Dining</h4>
              <BrowserMockup url="auroradining.com">
                <div style={{ height: "160px", background: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80) center/cover" }} />
              </BrowserMockup>
            </div>

            {/* 2. Business */}
            <div className="card-base" style={{ padding: "20px" }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px" }}>
                CORPORATE & ADVISORY
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>Northloop Advisory</h4>
              <BrowserMockup url="northloopadvisory.com" variant="dark">
                <div style={{ height: "160px", background: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80) center/cover" }} />
              </BrowserMockup>
            </div>

            {/* 3. E-commerce */}
            <div className="card-base" style={{ padding: "20px" }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px" }}>
                ARTISANAL E-COMMERCE
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>Atelier Market</h4>
              <BrowserMockup url="ateliermarket.store">
                <div style={{ height: "160px", background: "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80) center/cover" }} />
              </BrowserMockup>
            </div>

            {/* 4. SaaS */}
            <div className="card-base" style={{ padding: "20px" }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px" }}>
                DATA & SAAS DASHBOARD
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>Pulseboard Analytics</h4>
              <BrowserMockup url="pulseboard.io" variant="dark">
                <div style={{ height: "160px", background: "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80) center/cover" }} />
              </BrowserMockup>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROCESS SECTION (From idea to launch) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-main)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "650px", marginBottom: "56px" }}>
            <span className="pill-badge" style={{ marginBottom: "16px" }}>
              Our Methodology
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                color: "var(--deep-navy)",
                marginBottom: "16px",
              }}
            >
              From idea to launch.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
              A disciplined, transparent process designed to eliminate guesswork, deliver on time, and create exceptional digital outcomes.
            </p>
          </div>

          {/* 6 Stage Timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "20px",
            }}
          >
            {processStages.map((stage) => (
              <div
                key={stage.num}
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "14px",
                  padding: "26px 20px",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--primary-blue)",
                    marginBottom: "12px",
                    fontFamily: "monospace",
                  }}
                >
                  {stage.num}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--deep-navy)",
                    marginBottom: "8px",
                  }}
                >
                  {stage.title}
                </h3>
                <p style={{ fontSize: "0.84rem", color: "var(--secondary-text)", lineHeight: 1.5 }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link href="/process" className="btn-secondary">
              See Detailed 7-Stage Process & Timeline <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHY BLUEPEAK (Editorial Section) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-soft)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "54px",
              alignItems: "center",
            }}
            className="why-grid"
          >
            <div>
              <span className="pill-badge" style={{ marginBottom: "16px" }}>
                The BluePeak Standard
              </span>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
                  fontWeight: 800,
                  color: "var(--deep-navy)",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                }}
              >
                Built around your business.
              </h2>
              <p
                style={{
                  fontSize: "1.08rem",
                  color: "var(--secondary-text)",
                  lineHeight: 1.65,
                  marginBottom: "32px",
                }}
              >
                We do not use generic WordPress page builders or cookie-cutter templates. Every project is individually conceptualized, designed, and coded to provide your business with an unfair competitive advantage.
              </p>

              {/* Demo Statistics row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  padding: "24px 0",
                  borderTop: "1px solid var(--border-color)",
                  borderBottom: "1px solid var(--border-color)",
                  marginBottom: "32px",
                }}
              >
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--deep-navy)" }}>99.4%</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--secondary-text)" }}>Client Satisfaction*</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary-blue)" }}>0.6s</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--secondary-text)" }}>Avg. Page Speed</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--deep-navy)" }}>100%</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--secondary-text)" }}>Custom Code</div>
                </div>
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--secondary-text)", opacity: 0.6 }}>
                *Sample demo statistics representing agency performance benchmarks.
              </div>
            </div>

            {/* Checklist of core tenets */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              {whyHighlights.map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--primary-blue)", flexShrink: 0 }} />
                    <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--deep-navy)" }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--secondary-text)", lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ABOUT PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "100px 0",
          backgroundColor: "var(--bg-main)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "840px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span className="pill-badge" style={{ marginBottom: "16px" }}>
              Our Story
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                color: "var(--deep-navy)",
                marginBottom: "20px",
              }}
            >
              We’re here to make the web better.
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--secondary-text)",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              BluePeak Web Co. was founded on a simple principle: modern companies deserve modern digital flagships. We unite thoughtful design aesthetics with production-grade engineering so your business can stand out and thrive online.
            </p>
            <Link href="/about" className="btn-secondary">
              About BluePeak <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CTA SECTION */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: "110px 0",
          backgroundColor: "var(--primary-blue)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              Have an idea? <br />
              Let’s build it.
            </h2>

            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.65,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "40px",
              }}
            >
              Tell us what you’re building and we’ll help turn your idea into a professional digital experience that converts.
            </p>

            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#FFFFFF",
                color: "var(--primary-blue)",
                padding: "16px 36px",
                borderRadius: "9999px",
                fontSize: "1.05rem",
                fontWeight: 700,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                transition: "all 0.25s ease",
              }}
            >
              Start Your Project
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
