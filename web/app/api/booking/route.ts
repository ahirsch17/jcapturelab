import { Resend } from "resend";
import { NextResponse } from "next/server";
import { sessionTypesForBooking } from "@/lib/services";

const allowedSessionTypes = new Set<string>(sessionTypesForBooking);

type Body = {
  sessionType?: string;
  date?: string;
  selectedTime?: string;
  townArea?: string;
  shootSpotIdeas?: string;
  alternateDate?: string;
  alternateAvailability?: string;
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
  const townArea = body.townArea?.trim() ?? "";
  const shootSpotIdeas = body.shootSpotIdeas?.trim() ?? "";
  const alternateDate = body.alternateDate?.trim() ?? "";
  const alternateAvailability = body.alternateAvailability?.trim() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (!allowedSessionTypes.has(sessionType)) {
    return NextResponse.json({ error: "Choose a valid session type." }, { status: 400 });
  }
  if (
    !isNonEmpty(date) ||
    !isNonEmpty(selectedTime) ||
    !isNonEmpty(firstName) ||
    !isNonEmpty(lastName) ||
    !isNonEmpty(townArea)
  ) {
    return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`.trim();

  const detailLines = [
    `Session type: ${sessionType}`,
    `Town or area: ${townArea}`,
    shootSpotIdeas ? `Shoot location ideas: ${shootSpotIdeas}` : null,
    `Preferred date: ${date}`,
    `Preferred time: ${selectedTime}`,
    alternateDate ? `Backup date: ${alternateDate}` : null,
    alternateAvailability ? `Backup times / availability: ${alternateAvailability}` : null,
    `Name: ${fullName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    notes ? `Other notes: ${notes}` : null,
  ].filter(Boolean);

  const ownerText = ["New booking request from jcapturelab.com", "", ...detailLines].join("\n");

  const customerLines = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to jcapturelab. We received your booking request and will reply soon to confirm details.",
    "",
    "Here is what you sent:",
    "",
    ...detailLines,
    "",
    "If anything looks wrong, reply to this email or message @jcapturelab on Instagram.",
    "",
    "jcapturelab",
  ];
  const customerText = customerLines.join("\n");

  const resend = new Resend(key);

  const [toOwner, toCustomer] = await Promise.all([
    resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Booking request: ${sessionType} (${townArea}, ${date})`,
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
