import { cookies } from "next/headers";

const ADMIN_ID = process.env.ADMIN_ID || "admin123";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "abc123";
const COOKIE_NAME = "bluepeak_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "bluepeak_super_secret_session_key_2026";

/**
 * Validates the admin credentials (ID and Password)
 */
export function validateAdminCredentials(id: string, pass: string): boolean {
  return id === ADMIN_ID && pass === ADMIN_PASSWORD;
}

/**
 * Simple, robust HMAC-like token generator using Web Crypto API
 */
async function generateToken(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SESSION_SECRET);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(payload)
  );
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${Buffer.from(payload).toString("base64url")}.${hashHex}`;
}

/**
 * Verifies a token and extracts payload
 */
async function verifyToken(token: string): Promise<boolean> {
  try {
    const [payloadB64, hashHex] = token.split(".");
    if (!payloadB64 || !hashHex) return false;
    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const data = JSON.parse(payload);

    // Check expiration (7 days)
    if (!data.exp || Date.now() > data.exp) {
      return false;
    }

    const expectedToken = await generateToken(payload);
    return expectedToken === token;
  } catch {
    return false;
  }
}

/**
 * Create a new admin session token valid for 7 days
 */
export async function createAdminSessionToken(): Promise<string> {
  const payload = JSON.stringify({
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    iat: Date.now(),
  });
  return await generateToken(payload);
}

/**
 * Check if the current incoming request has a valid admin session cookie
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return await verifyToken(token);
}

export { COOKIE_NAME };
