import React from "react";
import { Lock, RotateCw, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "light" | "dark" | "auto";
}

export default function BrowserMockup({
  url = "bluepeak.co",
  children,
  className = "",
  style = {},
  variant = "auto",
}: BrowserMockupProps) {
  const isDarkVariant = variant === "dark";

  return (
    <div
      className={`browser-mockup-frame ${className}`}
      style={{
        backgroundColor: isDarkVariant ? "#0B1220" : "var(--bg-card)",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${isDarkVariant ? "#1E293B" : "var(--border-color)"}`,
        boxShadow: "var(--shadow-mockup)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          height: "38px",
          backgroundColor: isDarkVariant ? "#0F172A" : "var(--bg-soft)",
          borderBottom: `1px solid ${isDarkVariant ? "#1E293B" : "var(--border-color)"}`,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: "14px",
          userSelect: "none",
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Back / Forward Controls */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "6px",
            color: isDarkVariant ? "#64748B" : "#94A3B8",
          }}
          className="browser-nav-buttons"
        >
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
        </div>

        {/* URL Pill Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: "380px",
            margin: "0 auto",
            height: "24px",
            backgroundColor: isDarkVariant ? "rgba(255,255,255,0.06)" : "var(--bg-main)",
            border: `1px solid ${isDarkVariant ? "rgba(255,255,255,0.08)" : "var(--border-color)"}`,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "0 10px",
            fontSize: "0.72rem",
            color: isDarkVariant ? "#94A3B8" : "var(--secondary-text)",
            fontFamily: "monospace",
          }}
        >
          <Lock size={10} style={{ color: "#10B981" }} />
          <span>https://{url}</span>
        </div>

        {/* Refresh button */}
        <div style={{ color: isDarkVariant ? "#64748B" : "#94A3B8", display: "flex", alignItems: "center" }}>
          <RotateCw size={12} />
        </div>
      </div>

      {/* Browser Viewport */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
