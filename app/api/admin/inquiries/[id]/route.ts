import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sql } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const inquiryId = parseInt(id);
    if (isNaN(inquiryId)) {
      return NextResponse.json({ error: "Invalid inquiry ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      status,
      payment_status,
      total_amount,
      paid_amount,
      start_date,
      deadline_date,
      progress_percentage,
      admin_notes,
    } = body;

    await sql`
      UPDATE inquiries
      SET
        status = COALESCE(${status}, status),
        payment_status = COALESCE(${payment_status}, payment_status),
        total_amount = ${total_amount !== undefined ? parseFloat(total_amount) : sql`total_amount`},
        paid_amount = ${paid_amount !== undefined ? parseFloat(paid_amount) : sql`paid_amount`},
        start_date = ${start_date ? start_date : null},
        deadline_date = ${deadline_date ? deadline_date : null},
        progress_percentage = ${progress_percentage !== undefined ? parseInt(progress_percentage) : sql`progress_percentage`},
        admin_notes = ${admin_notes !== undefined ? admin_notes : sql`admin_notes`}
      WHERE id = ${inquiryId};
    `;

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating project in Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const inquiryId = parseInt(id);
    if (isNaN(inquiryId)) {
      return NextResponse.json({ error: "Invalid inquiry ID" }, { status: 400 });
    }

    await sql`
      DELETE FROM inquiries WHERE id = ${inquiryId};
    `;

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting inquiry from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
