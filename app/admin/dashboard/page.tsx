"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  Building,
  Edit3,
  Trash2,
  X,
  Save,
  Filter,
  CheckCircle2,
  FolderKanban,
  FileText,
  User,
  ArrowUpDown,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  project_type: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
  created_at: string;
  status: string;
  payment_status: string;
  total_amount: number;
  paid_amount: number;
  start_date?: string | null;
  deadline_date?: string | null;
  progress_percentage: number;
  admin_notes?: string | null;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Modals & Active Edit
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [savingAdd, setSavingAdd] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project_type: "Custom Web Application",
    budget: "",
    timeline: "",
    description: "",
    status: "In Progress",
    payment_status: "Unpaid",
    total_amount: 0,
    paid_amount: 0,
    start_date: new Date().toISOString().split("T")[0],
    deadline_date: "",
    progress_percentage: 10,
    admin_notes: "",
  });

  // Verify Auth and Load Data
  useEffect(() => {
    async function init() {
      try {
        const sessionRes = await fetch("/api/admin/session");
        const sessionData = await sessionRes.json();
        if (!sessionData.authenticated) {
          router.replace("/admin");
          return;
        }
        await fetchInquiries();
      } catch {
        router.replace("/admin");
      }
    }
    init();
  }, [router]);

  const fetchInquiries = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch {
      router.push("/admin");
    }
  };

  // Helper: Calculate Days Left
  const getDeadlineInfo = (deadlineStr?: string | null, status?: string) => {
    if (status === "Completed") {
      return { text: "Completed", color: "#10B981", bg: "rgba(16, 185, 129, 0.12)", urgent: false };
    }
    if (!deadlineStr) {
      return { text: "Not scheduled", color: "#94A3B8", bg: "rgba(148, 163, 184, 0.12)", urgent: false };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Overdue by ${Math.abs(diffDays)}d`,
        color: "#EF4444",
        bg: "rgba(239, 68, 68, 0.14)",
        urgent: true,
      };
    } else if (diffDays === 0) {
      return { text: "Due Today", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.14)", urgent: true };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days left`, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.12)", urgent: true };
    } else {
      return { text: `${diffDays} days left`, color: "#3B82F6", bg: "rgba(59, 130, 246, 0.12)", urgent: false };
    }
  };

  // Filtered List
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Status
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      // Payment
      if (paymentFilter !== "all" && item.payment_status.toLowerCase() !== paymentFilter.toLowerCase()) {
        return false;
      }
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const combined = `${item.name} ${item.email} ${item.company || ""} ${item.project_type} ${
          item.description
        }`.toLowerCase();
        if (!combined.includes(query)) return false;
      }
      return true;
    });
  }, [inquiries, statusFilter, paymentFilter, search]);

  // Financial & Metric Calculations
  const metrics = useMemo(() => {
    let totalQuoted = 0;
    let totalPaid = 0;
    let inProgressCount = 0;
    let urgentCount = 0;

    inquiries.forEach((item) => {
      totalQuoted += Number(item.total_amount) || 0;
      totalPaid += Number(item.paid_amount) || 0;
      if (item.status === "In Progress" || item.status === "Discovery") {
        inProgressCount++;
      }
      const deadline = getDeadlineInfo(item.deadline_date, item.status);
      if (deadline.urgent) {
        urgentCount++;
      }
    });

    return {
      totalInquiries: inquiries.length,
      inProgressCount,
      totalQuoted,
      totalPaid,
      pendingBalance: Math.max(0, totalQuoted - totalPaid),
      urgentCount,
    };
  }, [inquiries]);

  // Open Edit Modal
  const openEditModal = (item: Inquiry) => {
    setSelectedInquiry({ ...item });
    setIsEditModalOpen(true);
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!selectedInquiry) return;
    setSavingEdit(true);
    setActionMessage(null);

    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedInquiry.status,
          payment_status: selectedInquiry.payment_status,
          total_amount: selectedInquiry.total_amount,
          paid_amount: selectedInquiry.paid_amount,
          start_date: selectedInquiry.start_date || null,
          deadline_date: selectedInquiry.deadline_date || null,
          progress_percentage: selectedInquiry.progress_percentage,
          admin_notes: selectedInquiry.admin_notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActionMessage({ type: "success", text: "Project updated in Neon successfully." });
        await fetchInquiries();
        setTimeout(() => {
          setIsEditModalOpen(false);
          setActionMessage(null);
        }, 800);
      } else {
        setActionMessage({ type: "error", text: data.error || "Update failed." });
      }
    } catch {
      setActionMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this project record from Neon?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setIsEditModalOpen(false);
        await fetchInquiries();
      } else {
        alert(data.error || "Failed to delete.");
      }
    } catch {
      alert("Network error occurred.");
    }
  };

  // Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAdd(true);
    setActionMessage(null);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setNewProject({
          name: "",
          email: "",
          phone: "",
          company: "",
          project_type: "Custom Web Application",
          budget: "",
          timeline: "",
          description: "",
          status: "In Progress",
          payment_status: "Unpaid",
          total_amount: 0,
          paid_amount: 0,
          start_date: new Date().toISOString().split("T")[0],
          deadline_date: "",
          progress_percentage: 10,
          admin_notes: "",
        });
        await fetchInquiries();
      } else {
        setActionMessage({ type: "error", text: data.error || "Failed to create project." });
      }
    } catch {
      setActionMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setSavingAdd(false);
    }
  };

  if (loading) {
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
              width: "48px",
              height: "48px",
              border: "3px solid #1E293B",
              borderTopColor: "#2979FF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 18px",
            }}
          />
          <p style={{ fontSize: "15px", letterSpacing: "0.04em" }}>Loading BluePeak Admin Dashboard...</p>
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
        backgroundColor: "#05070A",
        color: "#F8FAFC",
        fontFamily: "var(--font-sans)",
        paddingBottom: "80px",
      }}
    >
      {/* Top Admin Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "rgba(10, 15, 26, 0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "16px 28px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Logo & Status Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1769FF 0%, #0044BB 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(23, 105, 255, 0.4)",
              }}
            >
              <Shield style={{ width: "22px", height: "22px" }} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.01em" }}>
                  BluePeak Command
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ADE80",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    padding: "2px 8px",
                    borderRadius: "100px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#4ADE80",
                    }}
                  />
                  Neon Live
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                Lead Inquiries, Deadlines & Payment Engine
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 16px",
                borderRadius: "10px",
                backgroundColor: "#1769FF",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(23, 105, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <Plus style={{ width: "16px", height: "16px" }} />
              <span>Add Project</span>
            </button>

            <button
              onClick={fetchInquiries}
              disabled={refreshing}
              title="Refresh live data from Neon"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#94A3B8",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <RefreshCw
                style={{
                  width: "16px",
                  height: "16px",
                  animation: refreshing ? "spin 1s linear infinite" : "none",
                }}
              />
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#F87171",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <LogOut style={{ width: "15px", height: "15px" }} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1440px", margin: "0 auto", padding: "32px 24px" }}>
        {/* KPI Metrics Cards Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {/* Card 1: Total Inquiries */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "22px 24px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>
                Total Leads / Projects
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(41, 121, 255, 0.15)",
                  color: "#60A5FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FolderKanban style={{ width: "18px", height: "18px" }} />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#FFFFFF" }}>{metrics.totalInquiries}</div>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>
              Stored permanently in Neon PostgreSQL
            </p>
          </div>

          {/* Card 2: Active In-Progress */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "22px 24px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>
                Active In-Progress
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(168, 85, 247, 0.15)",
                  color: "#C084FC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUp style={{ width: "18px", height: "18px" }} />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#FFFFFF" }}>{metrics.inProgressCount}</div>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>
              Actively in development or review
            </p>
          </div>

          {/* Card 3: Payments Collected & Pending */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "22px 24px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>
                Payments Collected
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#4ADE80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DollarSign style={{ width: "18px", height: "18px" }} />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#4ADE80" }}>
              ${metrics.totalPaid.toLocaleString()}
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94A3B8" }}>
              Pending:{" "}
              <strong style={{ color: "#FBBF24" }}>${metrics.pendingBalance.toLocaleString()}</strong> (Total: $
              {metrics.totalQuoted.toLocaleString()})
            </p>
          </div>

          {/* Card 4: Urgent Deadlines */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "22px 24px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>
                Urgent Deadlines
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor:
                    metrics.urgentCount > 0 ? "rgba(239, 68, 68, 0.18)" : "rgba(148, 163, 184, 0.15)",
                  color: metrics.urgentCount > 0 ? "#F87171" : "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Clock style={{ width: "18px", height: "18px" }} />
              </div>
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: metrics.urgentCount > 0 ? "#F87171" : "#FFFFFF",
              }}
            >
              {metrics.urgentCount}
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>
              Projects due within 7 days or overdue
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "16px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", minWidth: "280px", flex: "1 1 300px" }}>
            <Search
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#64748B",
              }}
            />
            <input
              type="text"
              placeholder="Search by client, email, company, project type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                backgroundColor: "rgba(30, 41, 59, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                color: "#FFFFFF",
                fontSize: "13px",
                outline: "none",
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {/* Status Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "9px 12px",
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Statuses</option>
                <option value="new">New Leads</option>
                <option value="in progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="completed">Completed</option>
                <option value="on hold">On Hold</option>
              </select>
            </div>

            {/* Payment Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                style={{
                  padding: "9px 12px",
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Payments</option>
                <option value="unpaid">Unpaid</option>
                <option value="deposit paid">Deposit Paid</option>
                <option value="paid in full">Paid In Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects / Inquiries Table Section */}
        <section
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                Client Pipeline & Active Projects
              </h2>
              <p style={{ margin: "3px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                Showing {filteredInquiries.length} of {inquiries.length} records
              </p>
            </div>
          </div>

          {filteredInquiries.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748B" }}>
              <FolderKanban style={{ width: "40px", height: "40px", margin: "0 auto 12px", opacity: 0.5 }} />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#94A3B8", margin: "0 0 4px" }}>
                No projects found
              </p>
              <p style={{ fontSize: "13px", margin: 0 }}>
                {inquiries.length === 0
                  ? "When users submit the contact form on your website, their submissions will instantly appear here."
                  : "No records matched your search and filter criteria."}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <th style={{ padding: "14px 20px" }}>Client / Company</th>
                    <th style={{ padding: "14px 16px" }}>Project Type</th>
                    <th style={{ padding: "14px 16px" }}>Status</th>
                    <th style={{ padding: "14px 16px" }}>Progress</th>
                    <th style={{ padding: "14px 16px" }}>Days Left / Deadline</th>
                    <th style={{ padding: "14px 16px" }}>Payment</th>
                    <th style={{ padding: "14px 16px" }}>Submitted</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((item) => {
                    const deadline = getDeadlineInfo(item.deadline_date, item.status);
                    const isNew = item.status === "New";

                    return (
                      <tr
                        key={item.id}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          backgroundColor: isNew ? "rgba(41, 121, 255, 0.03)" : "transparent",
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        {/* Client Info */}
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "14px" }}>{item.name}</div>
                          <div style={{ fontSize: "12px", color: "#64748B", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>{item.email}</span>
                            {item.phone && <span>• {item.phone}</span>}
                          </div>
                          {item.company && (
                            <div style={{ fontSize: "11px", color: "#3B82F6", marginTop: "2px" }}>
                              🏢 {item.company}
                            </div>
                          )}
                        </td>

                        {/* Project Type */}
                        <td style={{ padding: "16px 16px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              backgroundColor: "rgba(30, 41, 59, 0.8)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              fontSize: "12px",
                              color: "#CBD5E1",
                              fontWeight: 600,
                            }}
                          >
                            {item.project_type}
                          </span>
                          {item.budget && (
                            <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>
                              Budget: {item.budget}
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td style={{ padding: "16px 16px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              padding: "4px 10px",
                              borderRadius: "100px",
                              fontSize: "11px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              backgroundColor:
                                item.status === "New"
                                  ? "rgba(41, 121, 255, 0.15)"
                                  : item.status === "In Progress"
                                  ? "rgba(245, 158, 11, 0.15)"
                                  : item.status === "Review"
                                  ? "rgba(168, 85, 247, 0.15)"
                                  : item.status === "Completed"
                                  ? "rgba(16, 185, 129, 0.15)"
                                  : "rgba(148, 163, 184, 0.15)",
                              color:
                                item.status === "New"
                                  ? "#60A5FA"
                                  : item.status === "In Progress"
                                  ? "#FBBF24"
                                  : item.status === "Review"
                                  ? "#C084FC"
                                  : item.status === "Completed"
                                  ? "#34D399"
                                  : "#94A3B8",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "currentColor",
                              }}
                            />
                            {item.status}
                          </span>
                        </td>

                        {/* Progress */}
                        <td style={{ padding: "16px 16px", minWidth: "130px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#CBD5E1" }}>
                              {item.progress_percentage || 0}%
                            </span>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "6px",
                              backgroundColor: "rgba(30, 41, 59, 0.8)",
                              borderRadius: "100px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${Math.min(100, Math.max(0, item.progress_percentage || 0))}%`,
                                height: "100%",
                                background:
                                  item.progress_percentage >= 100
                                    ? "#10B981"
                                    : "linear-gradient(90deg, #1769FF 0%, #38BDF8 100%)",
                                borderRadius: "100px",
                              }}
                            />
                          </div>
                        </td>

                        {/* Days Left / Deadline */}
                        <td style={{ padding: "16px 16px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 9px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              backgroundColor: deadline.bg,
                              color: deadline.color,
                            }}
                          >
                            {deadline.text}
                          </span>
                          {item.deadline_date && (
                            <div style={{ fontSize: "11px", color: "#64748B", marginTop: "3px" }}>
                              Due: {item.deadline_date}
                            </div>
                          )}
                        </td>

                        {/* Payment */}
                        <td style={{ padding: "16px 16px" }}>
                          <div style={{ fontWeight: 700, color: "#FFFFFF" }}>
                            ${Number(item.paid_amount || 0).toLocaleString()} / ${Number(item.total_amount || 0).toLocaleString()}
                          </div>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color:
                                item.payment_status === "Paid in Full"
                                  ? "#34D399"
                                  : item.payment_status === "Deposit Paid"
                                  ? "#60A5FA"
                                  : "#F87171",
                            }}
                          >
                            {item.payment_status}
                          </span>
                        </td>

                        {/* Submitted Date */}
                        <td style={{ padding: "16px 16px", color: "#64748B", fontSize: "12px" }}>
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <button
                            onClick={() => openEditModal(item)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              backgroundColor: "rgba(41, 121, 255, 0.12)",
                              border: "1px solid rgba(41, 121, 255, 0.3)",
                              color: "#60A5FA",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <Edit3 style={{ width: "13px", height: "13px" }} />
                            <span>Manage</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* MODAL 1: Manage / Edit Project Modal */}
      {isEditModalOpen && selectedInquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#0B1324",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "18px",
                marginBottom: "24px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#60A5FA",
                  }}
                >
                  Manage Project #{selectedInquiry.id}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "4px 0 0", color: "#FFFFFF" }}>
                  {selectedInquiry.name} {selectedInquiry.company ? `(${selectedInquiry.company})` : ""}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "6px", fontSize: "12px", color: "#94A3B8" }}>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    style={{ color: "#60A5FA", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <Mail style={{ width: "13px", height: "13px" }} />
                    {selectedInquiry.email}
                  </a>
                  {selectedInquiry.phone && (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      style={{ color: "#94A3B8", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <Phone style={{ width: "13px", height: "13px" }} />
                      {selectedInquiry.phone}
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            {/* Notification message */}
            {actionMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  fontSize: "13px",
                  backgroundColor:
                    actionMessage.type === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: actionMessage.type === "success" ? "#86EFAC" : "#FCA5A5",
                  border: `1px solid ${
                    actionMessage.type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"
                  }`,
                }}
              >
                {actionMessage.text}
              </div>
            )}

            {/* Client's Original Requirements Box */}
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: "6px" }}>
                Client Submitted Requirement
              </div>
              <div style={{ fontSize: "13px", color: "#E2E8F0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {selectedInquiry.description}
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "10px", fontSize: "12px", color: "#64748B" }}>
                <span>Type: <strong style={{ color: "#CBD5E1" }}>{selectedInquiry.project_type}</strong></span>
                {selectedInquiry.budget && <span>Budget: <strong style={{ color: "#CBD5E1" }}>{selectedInquiry.budget}</strong></span>}
                {selectedInquiry.timeline && <span>Timeline: <strong style={{ color: "#CBD5E1" }}>{selectedInquiry.timeline}</strong></span>}
              </div>
            </div>

            {/* Editable Controls Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              {/* Status */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                  Project Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => setSelectedInquiry({ ...selectedInquiry, status: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                >
                  <option value="New">New Lead</option>
                  <option value="Discovery">Discovery / Scoping</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Client Review</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              {/* Progress Percentage */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#94A3B8" }}>
                    Completion Progress:
                  </label>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#60A5FA" }}>
                    {selectedInquiry.progress_percentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={selectedInquiry.progress_percentage}
                  onChange={(e) =>
                    setSelectedInquiry({
                      ...selectedInquiry,
                      progress_percentage: parseInt(e.target.value) || 0,
                    })
                  }
                  style={{ width: "100%", accentColor: "#1769FF", cursor: "pointer" }}
                />
              </div>

              {/* Total Amount */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                  Total Project Quote ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={selectedInquiry.total_amount}
                  onChange={(e) =>
                    setSelectedInquiry({
                      ...selectedInquiry,
                      total_amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              {/* Amount Paid */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                  Amount Paid ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={selectedInquiry.paid_amount}
                  onChange={(e) =>
                    setSelectedInquiry({
                      ...selectedInquiry,
                      paid_amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              {/* Payment Status */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                  Payment Status
                </label>
                <select
                  value={selectedInquiry.payment_status}
                  onChange={(e) => setSelectedInquiry({ ...selectedInquiry, payment_status: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Deposit Paid">Deposit Paid</option>
                  <option value="Paid in Full">Paid in Full</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>

              {/* Deadline Date */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                  Target Deadline Date
                </label>
                <input
                  type="date"
                  value={selectedInquiry.deadline_date || ""}
                  onChange={(e) =>
                    setSelectedInquiry({
                      ...selectedInquiry,
                      deadline_date: e.target.value || null,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>

            {/* Admin Notes */}
            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>
                Internal Admin Notes / Requirements Tracker
              </label>
              <textarea
                rows={3}
                placeholder="Log client conversations, milestone deliverables, credentials, or custom notes..."
                value={selectedInquiry.admin_notes || ""}
                onChange={(e) => setSelectedInquiry({ ...selectedInquiry, admin_notes: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Modal Footer Actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#F87171",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Trash2 style={{ width: "15px", height: "15px" }} />
                <span>Delete</span>
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#94A3B8",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={savingEdit}
                  onClick={handleSaveEdit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 22px",
                    borderRadius: "10px",
                    backgroundColor: "#1769FF",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: savingEdit ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(23, 105, 255, 0.4)",
                  }}
                >
                  <Save style={{ width: "15px", height: "15px" }} />
                  <span>{savingEdit ? "Saving..." : "Save to Neon"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Manual Project Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#0B1324",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                  Add Client / Project Manually
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                  Directly register a new client contract or offline project into Neon.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            <form onSubmit={handleAddProject}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newProject.email}
                    onChange={(e) => setNewProject({ ...newProject, email: e.target.value })}
                    placeholder="client@company.com"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newProject.phone}
                    onChange={(e) => setNewProject({ ...newProject, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={newProject.company}
                    onChange={(e) => setNewProject({ ...newProject, company: e.target.value })}
                    placeholder="Acme Corp"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Project Type
                  </label>
                  <select
                    value={newProject.project_type}
                    onChange={(e) => setNewProject({ ...newProject, project_type: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  >
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="Corporate Website">Corporate Website</option>
                    <option value="E-Commerce Store">E-Commerce Store</option>
                    <option value="UI/UX & Branding">UI/UX & Branding</option>
                    <option value="SEO & Performance">SEO & Performance</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Target Deadline
                  </label>
                  <input
                    type="date"
                    value={newProject.deadline_date}
                    onChange={(e) => setNewProject({ ...newProject, deadline_date: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Total Quote Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newProject.total_amount}
                    onChange={(e) => setNewProject({ ...newProject, total_amount: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                    Initial Deposit / Paid ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newProject.paid_amount}
                    onChange={(e) => setNewProject({ ...newProject, paid_amount: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#94A3B8", marginBottom: "4px" }}>
                  Project Description / Scope of Work
                </label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Outline project deliverables, requirements, and specifications..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#FFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#94A3B8",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAdd}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "8px",
                    backgroundColor: "#1769FF",
                    border: "none",
                    color: "#FFF",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: savingAdd ? "not-allowed" : "pointer",
                  }}
                >
                  {savingAdd ? "Adding..." : "Add to Neon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
