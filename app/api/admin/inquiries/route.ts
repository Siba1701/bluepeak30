import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sql } from "@/lib/db";

export async function GET(request: Request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const status = searchParams.get("status") || "all";
    const payment = searchParams.get("payment") || "all";

    // Query all records from Neon PostgreSQL
    const rows = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        company,
        project_type,
        budget,
        timeline,
        description,
        created_at,
        COALESCE(status, 'New') AS status,
        COALESCE(payment_status, 'Unpaid') AS payment_status,
        COALESCE(total_amount, 0) AS total_amount,
        COALESCE(paid_amount, 0) AS paid_amount,
        TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date,
        TO_CHAR(deadline_date, 'YYYY-MM-DD') AS deadline_date,
        COALESCE(progress_percentage, 0) AS progress_percentage,
        COALESCE(admin_notes, '') AS admin_notes
      FROM inquiries
      ORDER BY created_at DESC;
    `;

    // Filter in-memory for fast and dynamic search
    let filtered = rows;

    if (status !== "all") {
      filtered = filtered.filter(
        (r) => String(r.status).toLowerCase() === status.toLowerCase()
      );
    }

    if (payment !== "all") {
      filtered = filtered.filter(
        (r) => String(r.payment_status).toLowerCase() === payment.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((r) => {
        const text = `${r.name || ""} ${r.email || ""} ${r.company || ""} ${
          r.project_type || ""
        } ${r.description || ""}`.toLowerCase();
        return text.includes(search);
      });
    }

    return NextResponse.json({
      success: true,
      inquiries: filtered,
      totalCount: rows.length,
    });
  } catch (error: any) {
    console.error("Error fetching inquiries from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      project_type,
      budget,
      timeline,
      description,
      status,
      payment_status,
      total_amount,
      paid_amount,
      start_date,
      deadline_date,
      progress_percentage,
      admin_notes,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Client name and email are required." },
        { status: 400 }
      );
    }

    const inserted = await sql`
      INSERT INTO inquiries (
        name,
        email,
        phone,
        company,
        project_type,
        budget,
        timeline,
        description,
        status,
        payment_status,
        total_amount,
        paid_amount,
        start_date,
        deadline_date,
        progress_percentage,
        admin_notes
      ) VALUES (
        ${name},
        ${email},
        ${phone || null},
        ${company || null},
        ${project_type || "Custom Project"},
        ${budget || null},
        ${timeline || null},
        ${description || ""},
        ${status || "In Progress"},
        ${payment_status || "Unpaid"},
        ${parseFloat(total_amount) || 0},
        ${parseFloat(paid_amount) || 0},
        ${start_date || null},
        ${deadline_date || null},
        ${parseInt(progress_percentage) || 0},
        ${admin_notes || null}
      )
      RETURNING id, created_at;
    `;

    return NextResponse.json({
      success: true,
      id: inserted[0]?.id,
      message: "Project successfully added to Neon database.",
    });
  } catch (error: any) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add project." },
      { status: 500 }
    );
  }
}
