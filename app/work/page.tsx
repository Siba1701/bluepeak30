"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";
import { PROJECTS, Project } from "@/lib/projects-data";
import { ArrowRight, Sparkles, Filter, ExternalLink } from "lucide-react";

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Business", "E-commerce", "Restaurant", "SaaS", "Web App"];

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/* Portfolio Hero */}
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
            Portfolio & Selected Works
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
            Work designed to make an impression.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.6,
            }}
          >
            Explore our curated selection of bespoke digital products, flagships, and web applications engineered for discerning clients.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Gallery */}
      <section style={{ paddingTop: "60px" }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "56px",
            }}
          >
            {filterOptions.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "9999px",
                    fontSize: "0.88rem",
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? "var(--primary-blue)" : "var(--bg-soft)",
                    color: active ? "#FFFFFF" : "var(--primary-text)",
                    border: `1px solid ${active ? "var(--primary-blue)" : "var(--border-color)"}`,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Project Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "36px",
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                className="card-base"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: "18px",
                }}
              >
                {/* Browser Mockup Preview */}
                <div style={{ padding: "20px 20px 0", backgroundColor: "var(--bg-soft)" }}>
                  <BrowserMockup url={project.urlPreview}>
                    <div
                      style={{
                        height: "220px",
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
                          backgroundColor: "rgba(0, 0, 0, 0.25)",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                    </div>
                  </BrowserMockup>
                </div>

                {/* Content Box */}
                <div
                  style={{
                    padding: "28px 26px 32px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <span className="pill-badge" style={{ fontSize: "0.7rem", padding: "3px 10px" }}>
                        {project.category}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--secondary-text)" }}>
                        {project.year}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.45rem",
                        fontWeight: 800,
                        color: "var(--deep-navy)",
                        marginBottom: "10px",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--secondary-text)",
                        lineHeight: 1.6,
                        marginBottom: "20px",
                      }}
                    >
                      {project.shortDesc}
                    </p>

                    {/* Tech Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: "0.72rem",
                            backgroundColor: "var(--bg-soft)",
                            border: "1px solid var(--border-color)",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            color: "var(--secondary-text)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="btn-primary"
                    style={{ alignSelf: "flex-start", fontSize: "0.88rem", padding: "10px 20px" }}
                  >
                    View Case Study
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ marginTop: "100px", textAlign: "center" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              borderRadius: "20px",
              padding: "54px 32px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "14px" }}>
              Have a project in mind?
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--secondary-text)", marginBottom: "28px" }}>
              Let&apos;s build a digital experience that reflects the caliber of your company.
            </p>
            <Link href="/contact" className="btn-primary">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
