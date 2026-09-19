"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, ArrowRight, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/work" },
    { name: "Process", href: "/process" },
    { name: "Team", href: "/team" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        backgroundColor: "var(--bg-glass)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "82px",
        }}
      >
        {/* Left: BluePeak Official Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          aria-label="BluePeak Web Co. Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={theme === "dark" ? "/brand/bluepeak-logo-dark.png" : "/brand/bluepeak-logo-transparent.png"}
            alt="BluePeak Web Co."
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
              transition: "all 0.2s ease",
            }}
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "32px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  position: "relative",
                  fontSize: "0.93rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--primary-blue)" : "var(--primary-text)",
                  padding: "8px 0",
                  transition: "color 0.2s ease",
                }}
              >
                {link.name}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "var(--primary-blue)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Login, CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-text)",
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s ease",
            }}
          >
            {theme === "light" ? (
              <Moon size={18} strokeWidth={2} />
            ) : (
              <Sun size={18} strokeWidth={2} style={{ color: "#F59E0B" }} />
            )}
          </button>

          {/* Login icon button */}
          <Link
            href="/login"
            aria-label="Client Login"
            title="Client Portal Login"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: isActive("/login") ? "var(--primary-blue)" : "var(--primary-text)",
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s ease",
            }}
          >
            <User size={18} strokeWidth={2} />
          </Link>

          {/* Desktop "Start a Project →" button */}
          <div className="desktop-cta" style={{ display: "none" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                padding: "11px 22px",
                fontSize: "0.9rem",
              }}
            >
              Start a Project
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-toggle"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary-text)",
              backgroundColor: "var(--bg-soft)",
              border: "1px solid var(--border-color)",
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--bg-card)",
            borderBottom: "1px solid var(--border-color)",
            padding: "20px 24px 28px",
            boxShadow: "var(--shadow-lg)",
          }}
          className="mobile-drawer"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--primary-blue)" : "var(--primary-text)",
                    padding: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {link.name}
                  {active && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--primary-blue)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Link
              href="/contact"
              className="btn-primary"
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: "100%", textAlign: "center" }}
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="btn-secondary"
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: "100%", textAlign: "center" }}
            >
              Client Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
