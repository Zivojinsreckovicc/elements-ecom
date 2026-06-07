import { NextResponse } from "next/server";

const MAX_PHONE_LENGTH = 24;

// Accepts UAE mobile numbers in common formats and returns E.164 (+9715XXXXXXXX).
// Valid subscriber part: a leading 5 followed by 8 digits (e.g. 50, 52, 54, 55, 56, 58 prefixes).
function normalizeUaePhone(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > MAX_PHONE_LENGTH) return null;
  if (!/^\+?[0-9()\-.\s]+$/.test(trimmed)) return null;

  let digits = trimmed.replace(/\D/g, "");

  if (digits.startsWith("00971")) digits = digits.slice(5);
  else if (digits.startsWith("971")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);

  if (!/^5[0-9]{8}$/.test(digits)) return null;
  return `+971${digits}`;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Signup is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const phone = normalizeUaePhone((body as { phone?: unknown })?.phone);
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid UAE mobile number." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        source: "home-popup",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
