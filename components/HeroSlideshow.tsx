"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BrowserMockup from "./BrowserMockup";
import { ChevronLeft, ChevronRight, ArrowRight, Star, ShoppingBag, TrendingUp, Sparkles, Utensils } from "lucide-react";

interface ShowcaseSlide {
  id: string;
  category: string;
  name: string;
  tagline: string;
  url: string;
  caseStudySlug: string;
  badge: string;
  primaryImage: string;
  contentUI: React.ReactNode;
}

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: ShowcaseSlide[] = [
    {
      id: "restaurant",
      category: "Restaurant Experience",
      name: "Aurora Dining",
      tagline: "Modern Coastal Gastronomy",
      url: "auroradining.com",
      caseStudySlug: "aurora-dining",
      badge: "Michelin Guide 2025",
      primaryImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      contentUI: (
        <div style={{ backgroundColor: "#0C111C", color: "#FFFFFF", padding: "20px 24px", minHeight: "280px" }}>
          {/* Restaurant Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Utensils size={16} style={{ color: "#EAB308" }} />
              <span style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>AURORA</span>
            </div>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", opacity: 0.8 }} className="mockup-subnav">
              <span>Menu</span>
              <span>Wine Cellar</span>
              <span>Private Dining</span>
              <span>Contact</span>
            </div>
            <button style={{ backgroundColor: "#1769FF", color: "#FFF", fontSize: "0.72rem", padding: "6px 14px", borderRadius: "9999px", fontWeight: 600 }}>
              Book a Table
            </button>
          </div>

          {/* Restaurant Hero Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#60A5FA", fontWeight: 600 }}>
                Seasonal Provenance
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15, marginTop: "6px", marginBottom: "10px", color: "#FFFFFF" }}>
                Sensory Coastal Gastronomy.
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.45, marginBottom: "14px" }}>
                11-course tasting menu inspired by Pacific tides and foraged botanicals.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  ★ Two Michelin Stars
                </span>
                <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Reserve for Tonight
                </span>
              </div>
            </div>
            <div style={{ position: "relative", height: "130px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                alt="Aurora Culinary Dish"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "6px", right: "6px", backgroundColor: "rgba(0,0,0,0.7)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", color: "#FFF" }}>
                Signature Course IV
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "business",
      category: "Corporate Advisory",
      name: "Northloop Partners",
      tagline: "Strategic M&A & Tech Capital",
      url: "northloopadvisory.com",
      caseStudySlug: "northloop",
      badge: "Institutional Authority",
      primaryImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      contentUI: (
        <div style={{ backgroundColor: "#09101E", color: "#FFFFFF", padding: "20px 24px", minHeight: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "12px", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.06em" }}>NORTHLOOP</span>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", opacity: 0.8 }} className="mockup-subnav">
              <span>Transactions</span>
              <span>Insights</span>
              <span>Advisory</span>
            </div>
            <button style={{ backgroundColor: "#2979FF", color: "#FFF", fontSize: "0.72rem", padding: "6px 14px", borderRadius: "9999px", fontWeight: 600 }}>
              Client Portal
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#38BDF8", fontWeight: 600 }}>
                Enterprise Advisory
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15, marginTop: "6px", marginBottom: "10px", color: "#FFFFFF" }}>
                Bespoke M&A Intelligence.
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.45, marginBottom: "14px" }}>
                Guiding institutional leaders through complex cross-border technology acquisitions.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ borderLeft: "2px solid #2979FF", paddingLeft: "8px" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FFFFFF" }}>$4.2B+</div>
                  <div style={{ fontSize: "0.65rem", color: "#94A3B8" }}>Closed Volume</div>
                </div>
                <div style={{ borderLeft: "2px solid #2979FF", paddingLeft: "8px" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FFFFFF" }}>24</div>
                  <div style={{ fontSize: "0.65rem", color: "#94A3B8" }}>Global Markets</div>
                </div>
              </div>
            </div>
            <div style={{ position: "relative", height: "130px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                alt="Corporate Architecture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ecommerce",
      category: "Artisanal Retail",
      name: "Atelier Market",
      tagline: "Handcrafted Lifestyle & Homeware",
      url: "ateliermarket.store",
      caseStudySlug: "atelier-market",
      badge: "Headless Commerce",
      primaryImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      contentUI: (
        <div style={{ backgroundColor: "#FDFBF7", color: "#1E293B", padding: "20px 24px", minHeight: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "12px", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.08em", color: "#0F172A" }}>ATELIER</span>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", color: "#64748B" }} className="mockup-subnav">
              <span>Ceramics</span>
              <span>Lighting</span>
              <span>Textiles</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#0F172A", color: "#FFF", fontSize: "0.72rem", padding: "5px 12px", borderRadius: "9999px" }}>
              <ShoppingBag size={12} />
              <span>Cart (2)</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1769FF", fontWeight: 700 }}>
                Spring Drop 04
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15, marginTop: "6px", marginBottom: "10px", color: "#0F172A" }}>
                Sculptural Vessels & Glass.
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45, marginBottom: "14px" }}>
                Limited release handcrafted in Copenhagen with organic volcanic clay.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>₹14,800</span>
                <span style={{ fontSize: "0.72rem", color: "#10B981", backgroundColor: "#ECFDF5", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>
                  In Stock · Fast Dispatch
                </span>
              </div>
            </div>
            <div style={{ position: "relative", height: "130px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                alt="Ceramic Craft"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "saas",
      category: "Analytics Platform",
      name: "Pulseboard Analytics",
      tagline: "Live Customer Telemetry",
      url: "pulseboard.io",
      caseStudySlug: "pulseboard",
      badge: "Real-time Streaming",
      primaryImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      contentUI: (
        <div style={{ backgroundColor: "#060913", color: "#FFFFFF", padding: "20px 24px", minHeight: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.04em" }}>PULSEBOARD</span>
            </div>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", color: "#94A3B8" }} className="mockup-subnav">
              <span>Telemetry</span>
              <span>Funnels</span>
              <span>Cohorts</span>
            </div>
            <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(41,121,255,0.2)", color: "#60A5FA", padding: "4px 10px", borderRadius: "9999px", border: "1px solid rgba(41,121,255,0.3)" }}>
              Live 4,821 active
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginBottom: "4px" }}>Monthly Recurring Inflow</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>₹24,85,000</div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", color: "#10B981", marginTop: "4px" }}>
                <TrendingUp size={12} />
                <span>+28.4% this month</span>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginBottom: "4px" }}>Conversion Retention</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#60A5FA" }}>94.6%</div>
              <div style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: "4px" }}>Top 5% SaaS cohort</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "portfolio",
      category: "Architecture & Studio",
      name: "Studio Frame",
      tagline: "Sustainable Spatial Design",
      url: "studioframe.design",
      caseStudySlug: "studio-frame",
      badge: "Design Award 2025",
      primaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      contentUI: (
        <div style={{ backgroundColor: "#F8FAFC", color: "#0F172A", padding: "20px 24px", minHeight: "280px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "12px", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.1em" }}>STUDIO FRAME</span>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", color: "#64748B" }} className="mockup-subnav">
              <span>Works</span>
              <span>Monographs</span>
              <span>Practice</span>
            </div>
            <span style={{ fontSize: "0.7rem", border: "1px solid #CBD5E1", padding: "4px 10px", borderRadius: "4px", color: "#475569" }}>
              Copenhagen · Tokyo
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1769FF", fontWeight: 700 }}>
                Civic Architecture
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15, marginTop: "6px", marginBottom: "10px", color: "#0F172A" }}>
                Timber Pavilion 09.
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45, marginBottom: "14px" }}>
                A carbon-neutral cultural sanctuary celebrating natural illumination and acoustic harmony.
              </p>
            </div>
            <div style={{ position: "relative", height: "130px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                alt="Studio Frame Architecture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Auto-play slideshow every 4.5s
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HANDWRITTEN ANNOTATION 1: Top Right */}
      <div
        className="annotation"
        style={{
          position: "absolute",
          top: "-36px",
          right: "40px",
          transform: "rotate(4deg)",
          zIndex: 20,
        }}
      >
        <span>Modern Design</span>
        <span style={{ fontSize: "1.6rem", display: "inline-block", transform: "translateY(2px)" }}>↓</span>
      </div>

      {/* HANDWRITTEN ANNOTATION 2: Bottom Left */}
      <div
        className="annotation"
        style={{
          position: "absolute",
          bottom: "-32px",
          left: "20px",
          transform: "rotate(-3deg)",
          zIndex: 20,
        }}
      >
        <span>Business Websites</span>
        <span style={{ fontSize: "1.6rem", display: "inline-block", transform: "translateY(-4px)" }}>↑</span>
      </div>

      {/* HANDWRITTEN ANNOTATION 3: Far Right Floating */}
      <div
        className="annotation"
        style={{
          position: "absolute",
          top: "45%",
          right: "-32px",
          transform: "rotate(-6deg)",
          zIndex: 20,
          display: "none",
        }}
        id="hero-anno-right"
      >
        <span>E-commerce Solutions</span>
        <span style={{ fontSize: "1.5rem" }}>↓</span>
      </div>

      {/* Layered Composition Container */}
      <div style={{ position: "relative", padding: "20px 0 30px" }}>
        {/* BACKGROUND SOFT AMBIENT GLOW */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "70%",
            height: "80%",
            background: "radial-gradient(circle, rgba(23, 105, 255, 0.16) 0%, rgba(41, 121, 255, 0.04) 60%, transparent 80%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* SECONDARY OVERLAPPING MOCKUP: Back Left (Business website) */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "-24px",
            width: "75%",
            zIndex: 2,
            opacity: 0.85,
            transform: "rotate(-2.5deg) scale(0.92)",
            transformOrigin: "bottom left",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          }}
          className="secondary-mockup-left"
        >
          <BrowserMockup url="northloopadvisory.com" variant="dark">
            <div style={{ height: "160px", backgroundColor: "#09101E", padding: "14px", color: "#FFF" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800 }}>NORTHLOOP ADVISORY</span>
                <span style={{ fontSize: "0.6rem", color: "#38BDF8" }}>Enterprise M&A</span>
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "6px" }}>
                Global Transaction Metrics
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "4px", flex: 1 }}>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>Volume</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>$4.2B</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "4px", flex: 1 }}>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>Speed</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10B981" }}>0.6s</div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </div>

        {/* TERTIARY OVERLAPPING MOCKUP: Back Right (E-commerce / Boutique) */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-20px",
            width: "70%",
            zIndex: 3,
            opacity: 0.9,
            transform: "rotate(2.8deg) scale(0.94)",
            transformOrigin: "bottom right",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          }}
          className="tertiary-mockup-right"
        >
          <BrowserMockup url="ateliermarket.store" variant="light">
            <div style={{ height: "155px", backgroundColor: "#FAF9F5", padding: "14px", color: "#0F172A" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800 }}>ATELIER MARKET</span>
                <span style={{ fontSize: "0.6rem", color: "#1769FF", fontWeight: 600 }}>Checkout 2-Step</span>
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>Handcrafted Minimal Homeware</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>₹14,800</span>
                <span style={{ fontSize: "0.65rem", backgroundColor: "#EFF6FF", color: "#1769FF", padding: "2px 6px", borderRadius: "4px" }}>
                  Fast Delivery
                </span>
              </div>
            </div>
          </BrowserMockup>
        </div>

        {/* PRIMARY HERO BROWSER MOCKUP (Foreground) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            transform: "translateY(0px)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="animate-float-slow"
        >
          <BrowserMockup url={currentSlide.url} variant={currentSlide.id === "ecommerce" || currentSlide.id === "portfolio" ? "light" : "dark"}>
            {currentSlide.contentUI}
          </BrowserMockup>
        </div>
      </div>

      {/* SLIDESHOW CONTROLS & CAPTION */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginTop: "16px",
          padding: "10px 16px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "9999px",
          boxShadow: "var(--shadow-sm)",
          position: "relative",
          zIndex: 15,
        }}
      >
        {/* Active Demo Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-blue)",
              boxShadow: "0 0 8px var(--primary-blue)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--deep-navy)" }}>
              {currentSlide.name}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--secondary-text)" }}>
              — {currentSlide.category}
            </span>
          </div>
        </div>

        {/* Navigation Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View ${s.name}`}
              style={{
                width: activeIndex === idx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: activeIndex === idx ? "var(--primary-blue)" : "var(--border-color)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>

        {/* Next / Prev Chevrons & View Project link */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href={`/work/${currentSlide.caseStudySlug}`}
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--primary-blue)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginRight: "6px",
            }}
          >
            Case Study <ArrowRight size={13} />
          </Link>
          <button
            onClick={handlePrev}
            aria-label="Previous showcase"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              color: "var(--primary-text)",
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next showcase"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              color: "var(--primary-text)",
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
