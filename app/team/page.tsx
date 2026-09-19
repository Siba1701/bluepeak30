"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Github, Linkedin, Twitter, Crown } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "SUNNY SHARMA",
      role: "Founder & Lead Architect",
      isFounder: true,
      bio: "Visionary founder steering BluePeak Web Co. Dedicated to engineering bespoke high-performance web applications, strategic digital flagships, and cutting-edge web experiences for ambitious businesses worldwide.",
      image: "/team/sunny-sharma.jpg",
      skills: ["Technical Architecture", "Next.js", "Full-Stack Engineering", "Digital Strategy"],
    },
    {
      name: "SIBA SUNDAR DAS",
      role: "Co-Founder & Head of Product Design",
      isFounder: false,
      bio: "Spearheads product design, user experience architecture, and conversion funnels, translating complex client workflows into intuitive, engaging, and beautiful web products.",
      image: "/team/siba-sundar-das.jpg",
      skills: ["UI/UX Architecture", "Product Design", "Design Systems", "Conversion Strategy"],
    },
    {
      name: "GIRIRAJ DHAR",
      role: "Co-Founder & Creative Director",
      isFounder: false,
      bio: "Directs visual brand storytelling, editorial design craft, and interactive motion. Ensures every project reflects international aesthetic excellence and unforgettable brand prestige.",
      image: "/team/giriraj-dhar.jpg",
      skills: ["Creative Direction", "Editorial Craft", "Motion & Interactions", "Brand Identity"],
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
        <div className="container" style={{ maxWidth: "780px" }}>
          <span className="pill-badge" style={{ marginBottom: "18px" }}>
            <Sparkles size={13} />
            Leadership & Core Team
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
            The people behind BluePeak.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.6,
            }}
          >
            A focused leadership team of technical architects, product designers, and creative directors committed to the highest tier of web craftsmanship.
          </p>
        </div>
      </section>

      {/* Team Cards Grid (3 People) */}
      <section style={{ paddingTop: "80px" }}>
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="card-base"
                style={{
                  overflow: "hidden",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  border: member.isFounder ? "2px solid var(--primary-blue)" : "1px solid var(--border-color)",
                  position: "relative",
                  boxShadow: member.isFounder ? "0 8px 30px rgba(23, 105, 255, 0.18)" : "var(--shadow-md)",
                }}
              >
                {/* Founder Badge if applicable */}
                {member.isFounder && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      zIndex: 10,
                      backgroundColor: "var(--primary-blue)",
                      color: "#FFFFFF",
                      padding: "5px 12px",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      boxShadow: "0 4px 12px rgba(23, 105, 255, 0.4)",
                    }}
                  >
                    <Crown size={13} />
                    Founder
                  </div>
                )}

                {/* Photo with subtle overlay */}
                <div style={{ height: "360px", position: "relative", overflow: "hidden", backgroundColor: "var(--bg-soft)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      filter: "contrast(1.03)",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(11,27,51,0.85) 0%, rgba(11,27,51,0.2) 40%, transparent 70%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: "18px", left: "20px", right: "20px", color: "#FFF" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "0.02em" }}>{member.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#93C5FD", fontWeight: 600, marginTop: "2px" }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div
                  style={{
                    padding: "26px 24px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "0.92rem", color: "var(--secondary-text)", lineHeight: 1.65, marginBottom: "24px" }}>
                    {member.bio}
                  </p>

                  <div>
                    {/* Skills pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "0.72rem",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            backgroundColor: "var(--bg-soft)",
                            border: "1px solid var(--border-color)",
                            color: "var(--secondary-text)",
                            fontWeight: 500,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social links */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        paddingTop: "16px",
                        borderTop: "1px solid var(--border-color)",
                        color: "var(--secondary-text)",
                      }}
                    >
                      <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} title={`${member.name} on LinkedIn`}>
                        <Linkedin size={16} />
                      </span>
                      <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} title={`${member.name} on Twitter / X`}>
                        <Twitter size={16} />
                      </span>
                      <span style={{ cursor: "pointer", transition: "color 0.2s ease" }} title={`${member.name} on GitHub`}>
                        <Github size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "14px" }}>
              Work directly with our founders.
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--secondary-text)", marginBottom: "28px", maxWidth: "560px", margin: "0 auto 28px" }}>
              No middle managers or outsourced development. You collaborate directly with Sunny, Siba, and Giriraj.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
