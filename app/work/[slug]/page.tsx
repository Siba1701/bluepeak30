import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrowserMockup from "@/components/BrowserMockup";
import { PROJECTS, Project } from "@/lib/projects-data";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
  ExternalLink,
  Target,
  Palette,
  Code,
} from "lucide-react";

interface CaseStudyProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ paddingBottom: "120px" }}>
      {/* Back Navigation Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-soft)",
          padding: "16px 0",
        }}
      >
        <div className="container">
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "var(--secondary-text)",
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={16} />
            Back to Selected Works
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section
        className="bg-grid-pattern bg-radial-glow"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="container" style={{ maxWidth: "940px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span className="pill-badge">{project.categoryLabel}</span>
            <span style={{ fontSize: "0.88rem", color: "var(--secondary-text)" }}>
              {project.year} · Client: {project.client}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontWeight: 800,
              color: "var(--deep-navy)",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.65,
              maxWidth: "780px",
              marginBottom: "36px",
            }}
          >
            {project.shortDesc}
          </p>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              padding: "24px",
              backgroundColor: "var(--bg-card)",
              borderRadius: "14px",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--primary-blue)" }}>
                  {m.value}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--secondary-text)", marginTop: "2px" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Visual Browser Showcase */}
      <section style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <div className="container" style={{ maxWidth: "1080px" }}>
          <BrowserMockup url={project.urlPreview}>
            <div
              style={{
                minHeight: "440px",
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
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "32px",
                  color: "#FFFFFF",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Live Production Deployment
                  </span>
                  <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#FFF" }}>{project.title}</h2>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      </section>

      {/* Detailed Case Study Sections */}
      <section style={{ paddingTop: "60px" }}>
        <div className="container" style={{ maxWidth: "940px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
            {/* Overview */}
            <div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--deep-navy)",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Target size={20} style={{ color: "var(--primary-blue)" }} />
                Project Overview
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.7 }}>
                {project.overview}
              </p>
            </div>

            {/* Challenge & Strategy Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--bg-soft)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "32px",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px", textTransform: "uppercase" }}>
                  The Problem
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "12px" }}>
                  The Challenge
                </h4>
                <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
                  {project.challenge}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--bg-soft)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "32px",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-blue)", marginBottom: "8px", textTransform: "uppercase" }}>
                  The Solution
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "12px" }}>
                  Strategic Approach
                </h4>
                <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
                  {project.strategy}
                </p>
              </div>
            </div>

            {/* Design & Development */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              <div className="card-base" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <Palette size={18} style={{ color: "var(--primary-blue)" }} />
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--deep-navy)" }}>
                    Design & Aesthetics
                  </h4>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
                  {project.design}
                </p>
              </div>

              <div className="card-base" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <Code size={18} style={{ color: "var(--primary-blue)" }} />
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--deep-navy)" }}>
                    Engineering & Dev
                  </h4>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--secondary-text)", lineHeight: 1.6 }}>
                  {project.development}
                </p>
              </div>
            </div>

            {/* Result & Impact */}
            <div
              style={{
                backgroundColor: "var(--bg-soft)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "36px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--deep-navy)",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <TrendingUp size={20} style={{ color: "#10B981" }} />
                Results & Commercial Impact
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", lineHeight: 1.7 }}>
                {project.result}
              </p>
            </div>

            {/* Technology Stack */}
            <div>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--deep-navy)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "16px",
                }}
              >
                Technologies Utilized
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--deep-navy)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Something Similar CTA */}
      <section style={{ marginTop: "80px" }}>
        <div className="container" style={{ maxWidth: "940px" }}>
          <div
            style={{
              backgroundColor: "var(--primary-blue)",
              borderRadius: "20px",
              padding: "54px 40px",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "14px" }}>
              Build something similar for your business.
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
                maxWidth: "600px",
                margin: "0 auto 32px",
                lineHeight: 1.6,
              }}
            >
              Every business deserves a digital flagship that reflects its real prestige and drives measurable commercial results.
            </p>
            <Link
              href={`/contact?type=${encodeURIComponent(project.category)}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#FFFFFF",
                color: "var(--primary-blue)",
                padding: "14px 30px",
                borderRadius: "9999px",
                fontSize: "0.98rem",
                fontWeight: 700,
              }}
            >
              Start a Project Like {project.title}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
