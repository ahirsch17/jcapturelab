import { Resend } from "resend";
import { NextResponse } from "next/server";
import { sessionTypesForBooking } from "@/lib/services";

const allowedSessionTypes = new Set<string>(sessionTypesForBooking);

type Body = {
  sessionType?: string;
  date?: string;
  selectedTime?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  const to = process.env.BOOKING_TO_EMAIL;

  if (!key || !from || !to) {
    return NextResponse.json(
      { error: "Email is not configured on the server.", code: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sessionType = body.sessionType?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const selectedTime = body.selectedTime?.trim() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (!allowedSessionTypes.has(sessionType)) {
    return NextResponse.json({ error: "Choose a valid session type." }, { status: 400 });
  }
  if (!isNonEmpty(date) || !isNonEmpty(selectedTime) || !isNonEmpty(firstName) || !isNonEmpty(lastName)) {
    return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const ownerText = [
    "New booking request from jcapturelab.com",
    "",
    `Session type: ${sessionType}`,
    `Preferred date: ${date}`,
    `Preferred time: ${selectedTime}`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const customerText = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to jcapturelab. We received your booking request and will reply soon to confirm details.",
    "",
    "Here is what you sent:",
    "",
    `Session type: ${sessionType}`,
    `Preferred date: ${date}`,
    `Preferred time: ${selectedTime}`,
    phone ? `Phone: ${phone}` : null,
    notes ? `Notes: ${notes}` : null,
    "",
    "If anything looks wrong, reply to this email or message @jcapturelab on Instagram.",
    "",
    "jcapturelab",
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(key);

  const [toOwner, toCustomer] = await Promise.all([
    resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Booking request: ${sessionType} (${date})`,
      text: ownerText,
    }),
    resend.emails.send({
      from,
      to: [email],
      subject: "We received your jcapturelab booking request",
      text: customerText,
    }),
  ]);

  if (toOwner.error || toCustomer.error) {
    const err = toOwner.error ?? toCustomer.error;
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Could not send email right now. Please try again or use Instagram." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
