import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
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
            <Shield size={12} />
            Legal Notice
          </span>
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 800,
              color: "var(--deep-navy)",
              marginBottom: "16px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--secondary-text)", marginBottom: "40px" }}>
            Last updated: March 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px", lineHeight: 1.7, color: "var(--secondary-text)" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                1. Information We Collect
              </h2>
              <p>
                At BluePeak Web Co., we collect information that you voluntarily submit through our contact forms, project brief inquiries, or direct email communications. This may include your name, email address, telephone number, company name, and project specifications.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                2. How We Use Your Information
              </h2>
              <p>
                The information you provide is utilized solely to review your inquiry, formulate project estimates, coordinate technical discovery discussions, and provide ongoing web development and maintenance services. We do not sell, rent, or trade your contact information to third parties under any circumstances.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                3. Confidentiality and Non-Disclosure
              </h2>
              <p>
                We treat all proprietary product concepts, business metrics, and strategic plans submitted to us as strictly confidential. If required prior to detailed project discussions, we are pleased to execute a bilateral Non-Disclosure Agreement (NDA).
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                4. Data Security
              </h2>
              <p>
                We implement industry-standard encryption protocols (HTTPS/TLS) across all communications and maintain secure cloud architectures to prevent unauthorized access or disclosure of personal data.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "10px" }}>
                5. Contacting Us
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request the deletion of your inquiry data, please contact us at:{" "}
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
