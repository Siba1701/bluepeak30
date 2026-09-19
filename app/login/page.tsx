"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function LoginPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="bg-grid-pattern bg-radial-glow"
      style={{
        minHeight: "calc(100vh - 76px - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <div
        className="card-base"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "44px 36px",
          backgroundColor: "var(--bg-card)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: "20px",
        }}
      >
        {/* BluePeak Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link href="/" style={{ display: "inline-block", marginBottom: "18px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={theme === "dark" ? "/brand/bluepeak-logo-dark.png" : "/brand/bluepeak-logo-transparent.png"}
              alt="BluePeak Web Co."
              style={{
                height: "54px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
          <h1
            style={{
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "var(--deep-navy)",
              marginBottom: "6px",
            }}
          >
            Client Portal Login
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--secondary-text)" }}>
            Access your project milestones, staging links, and invoices.
          </p>
        </div>

        {/* Notice: Invite-Only Authentication Note */}
        <div
          style={{
            backgroundColor: "var(--bg-soft)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "12px 14px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "0.82rem",
            color: "var(--secondary-text)",
          }}
        >
          <Info size={16} style={{ color: "var(--primary-blue)", flexShrink: 0, marginTop: "2px" }} />
          <span>
            The client portal is currently private and invite-only. Active clients receive secure SSO magic links directly from our engineering team.
          </span>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "24px 16px",
              backgroundColor: "var(--bg-soft)",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}
          >
            <ShieldCheck size={32} style={{ color: "var(--primary-blue)", margin: "0 auto 12px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--deep-navy)", marginBottom: "6px" }}>
              Authentication Check
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--secondary-text)", lineHeight: 1.5, marginBottom: "16px" }}>
              No active session found for <strong>{email}</strong>. If you are an active client and require portal access, please contact your project manager or email us directly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              Try Another Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="login-email"
                style={{
                  display: "block",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "var(--deep-navy)",
                  marginBottom: "8px",
                }}
              >
                Client Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="client@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-soft)",
                    color: "var(--primary-text)",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--secondary-text)",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label
                  htmlFor="login-password"
                  style={{
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    color: "var(--deep-navy)",
                  }}
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("To reset your project portal credentials, please contact your BluePeak project lead or email ascreater401@gmail.com.");
                  }}
                  style={{ fontSize: "0.8rem", color: "var(--primary-blue)", fontWeight: 600 }}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 38px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-soft)",
                    color: "var(--primary-text)",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--secondary-text)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--secondary-text)",
                    cursor: "pointer",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: "pointer", accentColor: "var(--primary-blue)" }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: "0.85rem", color: "var(--secondary-text)", cursor: "pointer" }}>
                Remember this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: "0.98rem",
                marginBottom: "20px",
              }}
            >
              Log In to Portal
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Create Account Link */}
        <div style={{ textAlign: "center", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--secondary-text)" }}>
            Need a client portal account?{" "}
          </span>
          <Link
            href="/contact"
            style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-blue)" }}
          >
            Start a project with us →
          </Link>
        </div>
      </div>
    </div>
  );
}
