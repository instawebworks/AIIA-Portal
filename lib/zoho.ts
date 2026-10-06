import type { PortalUser } from "./session";

/**
 * Calls the standalone Deluge function `portal_login` exposed as a REST API.
 *
 * ZOHO_PORTAL_LOGIN_URL looks like:
 *   https://www.zohoapis.com/crm/v7/functions/portal_login/actions/execute?auth_type=apikey&zapikey=XXXX
 * (use the data-centre domain of the org: zohoapis.com, zohoapis.com.au, zohoapis.in, zohoapis.eu ...)
 *
 * The Deluge function returns a map which Zoho serialises as a JSON string in
 * `details.output`. Shape:
 *   { status: "success", contact: {...} }
 *   { status: "error",   message: "..." }
 */

type DelugeResult =
  | { status: "success"; contact: PortalUser }
  | { status: "error"; message: string };

export type LoginResult =
  | { ok: true; user: PortalUser }
  | { ok: false; message: string };

type ZohoEnvelope = {
  code?: string;
  message?: string;
  details?: { output?: unknown };
};

function parseOutput(raw: unknown): DelugeResult | null {
  if (!raw) return null;
  if (typeof raw === "object") return raw as DelugeResult;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as DelugeResult;
    } catch {
      return null;
    }
  }
  return null;
}

// Zoho only reads standalone-function arguments from the query string (verified
// against the live function: a form body arrives as empty arguments).
function invoke(url: string, email: string, password: string) {
  const u = new URL(url);
  u.searchParams.set("email", email);
  u.searchParams.set("password", password);
  return fetch(u, { method: "POST", cache: "no-store" });
}

export async function zohoPortalLogin(email: string, password: string): Promise<LoginResult> {
  const url = process.env.ZOHO_PORTAL_LOGIN_URL;
  if (!url) return { ok: false, message: "Portal is not configured (ZOHO_PORTAL_LOGIN_URL missing)." };

  let res: Response;
  try {
    res = await invoke(url, email, password);
  } catch (e) {
    console.error("Zoho function call failed", e);
    return { ok: false, message: "Could not reach the CRM. Please try again." };
  }

  let json: ZohoEnvelope;
  try {
    json = (await res.json()) as ZohoEnvelope;
  } catch {
    return { ok: false, message: `CRM returned an unreadable response (HTTP ${res.status}).` };
  }

  // Zoho answers code "success" whenever the function ran; our own status is inside details.output.
  if (json.code !== "success") {
    console.error("Zoho function error", json);
    return { ok: false, message: json.message || "CRM function failed." };
  }

  const result = parseOutput(json.details?.output);
  if (!result) return { ok: false, message: "CRM returned an unexpected payload." };
  if (result.status === "error") return { ok: false, message: result.message };
  return { ok: true, user: result.contact };
}
