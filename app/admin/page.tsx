"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, ArrowRight, Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Check if session already exists
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/session");
        const data = await res.json();
        if (data.authenticated) {
          router.replace("/admin/dashboard");
        } else {
          setCheckingSession(false);
        }
      } catch {
        setCheckingSession(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adminId, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Invalid Admin ID or Password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 600);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05070A",
          color: "#94A3B8",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #1E293B",
              borderTopColor: "#2979FF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ fontSize: "14px", letterSpacing: "0.05em" }}>Verifying secure session...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#05070A",
        backgroundImage: `
          radial-gradient(circle at 50% 10%, rgba(41, 121, 255, 0.15) 0%, transparent 60%),
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        padding: "24px",
        fontFamily: "var(--font-sans)",
        color: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "44px 36px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(41, 121, 255, 0.1)",
        }}
      >
        {/* Header & Brand Icon */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #1769FF 0%, #0044BB 100%)",
              boxShadow: "0 8px 24px rgba(23, 105, 255, 0.35)",
              marginBottom: "18px",
            }}
          >
            <Shield style={{ width: "28px", height: "28px", color: "#FFFFFF" }} />
          </div>

          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "100px",
              backgroundColor: "rgba(41, 121, 255, 0.12)",
              border: "1px solid rgba(41, 121, 255, 0.3)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#60A5FA",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Restricted Admin Portal
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 6px 0",
              color: "#FFFFFF",
            }}
          >
            BluePeak Executive Control
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#94A3B8",
              margin: 0,
            }}
          >
            Authorized owner access only. Enter your credentials.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#FCA5A5",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            <AlertCircle style={{ width: "18px", height: "18px", flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification */}
        {success && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#86EFAC",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            <CheckCircle2 style={{ width: "18px", height: "18px", flexShrink: 0 }} />
            <span>Identity confirmed. Opening dashboard...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Admin ID */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="admin-id"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#CBD5E1",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "8px",
              }}
            >
              Admin ID
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyRound style={{ width: "18px", height: "18px" }} />
              </div>
              <input
                id="admin-id"
                type="text"
                required
                autoComplete="username"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                style={{
                  width: "100%",
                  padding: "13px 14px 13px 44px",
                  backgroundColor: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2979FF";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(41, 121, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "26px" }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "#CBD5E1",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Lock style={{ width: "18px", height: "18px" }} />
              </div>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 44px",
                  backgroundColor: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2979FF";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(41, 121, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff style={{ width: "18px", height: "18px" }} />
                ) : (
                  <Eye style={{ width: "18px", height: "18px" }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: loading || success
                ? "#1E293B"
                : "linear-gradient(135deg, #1769FF 0%, #0052CC 100%)",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              cursor: loading || success ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: loading || success ? "none" : "0 8px 24px rgba(23, 105, 255, 0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : success ? (
              <span>Access Granted</span>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            textAlign: "center",
            fontSize: "11px",
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Lock style={{ width: "12px", height: "12px" }} />
          <span>Secured by End-to-End Signed Session Token</span>
        </div>
      </div>
    </div>
  );
}
