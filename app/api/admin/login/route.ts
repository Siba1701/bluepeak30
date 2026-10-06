import { NextResponse } from "next/server";
import { validateAdminCredentials, createAdminSessionToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { success: false, error: "Please provide both Admin ID and Password." },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(id.trim(), password.trim());

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin ID or Password." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
