"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight, Heart, Shield, Code, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-soft)",
        borderTop: "1px solid var(--border-color)",
        paddingTop: "72px",
        paddingBottom: "40px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px 36px",
            marginBottom: "64px",
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: "340px" }}>
            <Link
              href="/"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginBottom: "18px",
              }}
              aria-label="BluePeak Web Co. Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={theme === "dark" ? "/brand/bluepeak-logo-dark.png" : "/brand/bluepeak-logo-transparent.png"}
                alt="BluePeak Web Co."
                style={{
                  height: "46px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--secondary-text)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Professional web design and development. We engineer bespoke, high-performance websites and digital experiences tailored to your business goals.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "var(--secondary-text)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                padding: "6px 12px",
                borderRadius: "9999px",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              Available for new projects Q2 2026
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--deep-navy)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Our Work", href: "/work" },
                { name: "Process", href: "/process" },
                { name: "Team", href: "/team" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--secondary-text)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary-blue)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--secondary-text)")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--deep-navy)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Website Development", href: "/services#website-development" },
                { name: "E-commerce", href: "/services#ecommerce" },
                { name: "Web Applications", href: "/services#web-applications" },
                { name: "UI/UX Design", href: "/services#ui-ux-design" },
                { name: "Website Redesign", href: "/services#website-redesign" },
                { name: "Performance Optimization", href: "/services#performance-optimization" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--secondary-text)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary-blue)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--secondary-text)")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--deep-navy)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Get In Touch
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--secondary-text)",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Ready to start your next web project? Send us your brief or email us directly.
            </p>
            <a
              href="mailto:ascreater401@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--primary-blue)",
                wordBreak: "break-all",
                marginBottom: "16px",
              }}
            >
              <Mail size={16} />
              ascreater401@gmail.com
            </a>
            <div>
              <Link
                href="/contact"
                className="btn-primary"
                style={{
                  padding: "9px 18px",
                  fontSize: "0.85rem",
                  marginTop: "6px",
                }}
              >
                Send Project Brief
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.85rem",
            color: "var(--secondary-text)",
          }}
        >
          <div>
            © 2026 <strong style={{ color: "var(--deep-navy)", fontWeight: 600 }}>BluePeak Web Co.</strong> All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/privacy"
              style={{
                color: "var(--secondary-text)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary-blue)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--secondary-text)")}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: "var(--secondary-text)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary-blue)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--secondary-text)")}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
