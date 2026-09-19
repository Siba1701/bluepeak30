import React from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services-data";
import {
  ArrowRight,
  CheckCircle,
  Layout,
  ShoppingBag,
  Code2,
  Palette,
  Sparkles,
  Zap,
  ShieldCheck,
  PackageCheck,
  Check,
} from "lucide-react";

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout size={28} />;
      case "ShoppingBag":
        return <ShoppingBag size={28} />;
      case "Code2":
        return <Code2 size={28} />;
      case "Palette":
        return <Palette size={28} />;
      case "Sparkles":
        return <Sparkles size={28} />;
      case "Zap":
        return <Zap size={28} />;
      default:
        return <ShieldCheck size={28} />;
    }
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      {/* Services Hero */}
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
            Capabilities & Solutions
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
            Digital solutions built around your goals.
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.6,
            }}
          >
            We partner with businesses to design, engineer, and deploy high-performing digital flagships. No cookie-cutter shortcuts — only custom, precision-crafted solutions.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section style={{ paddingTop: "80px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="card-base"
                style={{
                  padding: "48px 40px",
                  scrollMarginTop: "100px",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "48px",
                  }}
                  className="service-detail-grid"
                >
                  {/* Left Overview */}
                  <div>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "12px",
                        backgroundColor: "var(--light-blue)",
                        color: "var(--primary-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                      }}
                    >
                      {getIcon(service.icon)}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <span className="pill-badge" style={{ fontSize: "0.72rem", padding: "3px 10px" }}>
                        {service.badge}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "var(--secondary-text)", fontWeight: 700 }}>
                        0{index + 1}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                        fontWeight: 800,
                        color: "var(--deep-navy)",
                        marginBottom: "16px",
                        lineHeight: 1.2,
                      }}
                    >
                      {service.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "1.05rem",
                        color: "var(--secondary-text)",
                        lineHeight: 1.65,
                        marginBottom: "24px",
                      }}
                    >
                      {service.longDesc}
                    </p>

                    <div
                      style={{
                        padding: "16px 20px",
                        backgroundColor: "var(--bg-soft)",
                        borderLeft: "3px solid var(--primary-blue)",
                        borderRadius: "0 8px 8px 0",
                        marginBottom: "32px",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        color: "var(--deep-navy)",
                      }}
                    >
                      {service.highlight}
                    </div>

                    <Link href={`/contact?type=${encodeURIComponent(service.title)}`} className="btn-primary">
                      Inquire About {service.title}
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right Features & Deliverables */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "32px",
                      backgroundColor: "var(--bg-soft)",
                      padding: "36px 32px",
                      borderRadius: "16px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {/* Features Checklist */}
                    <div>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "var(--deep-navy)",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Sparkles size={16} style={{ color: "var(--primary-blue)" }} />
                        Key Capabilities
                      </h3>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {service.features.map((feat) => (
                          <li
                            key={feat}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              fontSize: "0.9rem",
                              color: "var(--secondary-text)",
                              lineHeight: 1.5,
                            }}
                          >
                            <span
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: "var(--light-blue)",
                                color: "var(--primary-blue)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: "3px",
                              }}
                            >
                              <Check size={10} strokeWidth={3} />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables Checklist */}
                    <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border-color)" }}>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "var(--deep-navy)",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <PackageCheck size={16} style={{ color: "var(--primary-blue)" }} />
                        Tangible Deliverables
                      </h3>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {service.deliverables.map((del) => (
                          <li
                            key={del}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              fontSize: "0.9rem",
                              color: "var(--primary-text)",
                              fontWeight: 500,
                              lineHeight: 1.5,
                            }}
                          >
                            <CheckCircle size={15} style={{ color: "#10B981", flexShrink: 0, marginTop: "3px" }} />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Page CTA */}
      <section style={{ marginTop: "100px" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              borderRadius: "20px",
              padding: "56px 40px",
              textAlign: "center",
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: "var(--deep-navy)",
                marginBottom: "16px",
              }}
            >
              Need a tailored project scope?
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--secondary-text)",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "600px",
                margin: "0 auto 32px",
              }}
            >
              Every business has distinct requirements. We are always glad to craft a custom technical blueprint matching your exact specifications.
            </p>
            <Link href="/contact" className="btn-primary">
              Schedule a Technical Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
