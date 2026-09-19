"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Website Development",
    budget: "₹50,000–₹1,00,000",
    timeline: "2–4 Weeks",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Website Development",
    "E-commerce",
    "Web Application",
    "UI/UX Design",
    "Website Redesign",
    "Performance Optimization",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹25,000",
    "₹25,000–₹50,000",
    "₹50,000–₹1,00,000",
    "₹1,00,000–₹2,50,000",
    "₹2,50,000+",
    "Not Sure",
  ];

  const timelines = [
    "ASAP",
    "2–4 Weeks",
    "1–2 Months",
    "2–3 Months",
    "Flexible",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please try again or email us directly.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "Website Development",
      budget: "₹50,000–₹1,00,000",
      timeline: "2–4 Weeks",
      description: "",
    });
    setStatus("idle");
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/* Hero Banner */}
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
            Start Your Project
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
            Let’s build something great.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.6,
            }}
          >
            Tell us what you’re looking to build. We’ll review your goals, explore the technical possibilities, and get back to you with actionable next steps within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section style={{ paddingTop: "64px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px 64px",
            }}
            className="contact-layout-grid"
          >
            {/* Left: Contact Form Container */}
            <div
              className="card-base"
              style={{
                padding: "40px",
                backgroundColor: "var(--bg-card)",
              }}
            >
              {status === "success" ? (
                /* SUCCESS STATE */
                <div
                  style={{
                    padding: "48px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "var(--light-blue)",
                      color: "var(--primary-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "var(--deep-navy)",
                      marginBottom: "12px",
                    }}
                  >
                    Request received.
                  </h3>

                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--secondary-text)",
                      lineHeight: 1.6,
                      maxWidth: "480px",
                      margin: "0 auto 32px",
                    }}
                  >
                    Thanks for reaching out. We&apos;ve received your project details and will get back to you shortly. A confirmation has also been sent to your email.
                  </p>

                  <button
                    onClick={handleReset}
                    className="btn-secondary"
                    style={{ display: "inline-flex", gap: "8px" }}
                  >
                    <RefreshCw size={15} />
                    Send Another Request
                  </button>
                </div>
              ) : (
                /* FORM BODY */
                <form onSubmit={handleSubmit}>
                  {status === "error" && (
                    /* ERROR STATE ALERT */
                    <div
                      style={{
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #F87171",
                        borderRadius: "10px",
                        padding: "16px 20px",
                        marginBottom: "28px",
                        display: "flex",
                        gap: "12px",
                        color: "#991B1B",
                      }}
                    >
                      <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                          Something went wrong.
                        </div>
                        <div style={{ fontSize: "0.85rem", marginTop: "2px" }}>
                          {errorMessage ||
                            "We couldn't send your request right now. Please try again or email us directly at ascreater401@gmail.com."}
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Name <span style={{ color: "var(--primary-blue)" }}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Email <span style={{ color: "var(--primary-blue)" }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="e.g. Morgan Dynamics"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="projectType"
                      style={{
                        display: "block",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        color: "var(--deep-navy)",
                        marginBottom: "8px",
                      }}
                    >
                      Project Type <span style={{ color: "var(--primary-blue)" }}>*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget and Timeline Row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="budget"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label
                        htmlFor="timeline"
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "var(--deep-navy)",
                          marginBottom: "8px",
                        }}
                      >
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {timelines.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div style={{ marginBottom: "28px" }}>
                    <label
                      htmlFor="description"
                      style={{
                        display: "block",
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        color: "var(--deep-navy)",
                        marginBottom: "8px",
                      }}
                    >
                      Project Description <span style={{ color: "var(--primary-blue)" }}>*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      required
                      placeholder="Please share details about your company, your key goals, current website challenges, and specific features you require..."
                      value={formData.description}
                      onChange={handleChange}
                      className="form-input"
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "16px 28px",
                      fontSize: "1rem",
                      opacity: status === "loading" ? 0.7 : 1,
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Project Request
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Information & What to Expect */}
            <div>
              <div
                style={{
                  backgroundColor: "var(--bg-soft)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "36px",
                  marginBottom: "32px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--deep-navy)",
                    marginBottom: "16px",
                  }}
                >
                  Direct Contact
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Mail size={18} style={{ color: "var(--primary-blue)", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--secondary-text)" }}>Email us anytime</div>
                      <a
                        href="mailto:ascreater401@gmail.com"
                        style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--primary-blue)" }}
                      >
                        ascreater401@gmail.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Clock size={18} style={{ color: "var(--primary-blue)", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--secondary-text)" }}>Response Guarantee</div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--deep-navy)" }}>
                        Within 24 business hours
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <ShieldCheck size={18} style={{ color: "var(--primary-blue)", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--secondary-text)" }}>Privacy & NDA</div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--deep-navy)" }}>
                        All project inquiries are strictly confidential
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                  padding: "36px",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "var(--deep-navy)",
                    marginBottom: "16px",
                  }}
                >
                  What happens next?
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "var(--light-blue)",
                        color: "var(--primary-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      1
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--secondary-text)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--deep-navy)" }}>Initial Review:</strong> Our senior team assesses your requirements, scope, and target launch window.
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "var(--light-blue)",
                        color: "var(--primary-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      2
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--secondary-text)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--deep-navy)" }}>Discovery Call:</strong> We schedule a 30-minute consultation to clarify questions and share technical recommendations.
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "var(--light-blue)",
                        color: "var(--primary-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      3
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "var(--secondary-text)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--deep-navy)" }}>Tailored Proposal:</strong> You receive a transparent milestone plan, fixed investment schedule, and deliverable commitments.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
