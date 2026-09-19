import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div style={{ paddingBottom: "120px" }}>
      <div
        style={{
          borderBottom: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-soft)",
          padding: "16px 0",
        }}
      >
        <div className="container">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "var(--secondary-text)",
            }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      <section style={{ paddingTop: "64px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="pill-badge" style={{ marginBottom: "16px" }}>
            <FileText size={12} />
            Service Terms
          </span>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              color: "var(--deep-navy)",
              marginBottom: "16px",
            }}
          >
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--secondary-text)", marginBottom: "40px" }}>
            Last updated: March 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px", lineHeight: 1.7, color: "var(--secondary-text)" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                1. Engagement and Project Scope
              </h2>
              <p>
                All digital design, development, and advisory engagements performed by BluePeak Web Co. are governed by a mutually agreed Statement of Work (SOW) or project proposal detailing specific deliverables, milestone schedules, and investment tiers.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                2. Intellectual Property Rights
              </h2>
              <p>
                Upon receipt of full payment for completed milestones, the client is granted complete ownership of all custom design assets, frontend code, and content developed specifically for their project, subject to standard open-source framework licenses (e.g. Next.js, React).
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                3. Warranties and Quality Assurance
              </h2>
              <p>
                We provide a standard 30-day post-launch warranty on all custom-developed websites to rectify any unforeseen bugs or defects that diverge from the approved project specification at no additional charge.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                4. Inquiries and Notices
              </h2>
              <p>
                For all official communications regarding terms and master service agreements, please contact:{" "}
                <a href="mailto:ascreater401@gmail.com" style={{ color: "var(--primary-blue)", fontWeight: 600 }}>
                  ascreater401@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
