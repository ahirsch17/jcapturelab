import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  buildCustomerSessionEmail,
  buildOwnerSessionEmail,
  type SessionRequestDetails,
} from "@/lib/booking-email";
import {
  allowedSessionTypes,
  customerFirstName,
  displayName,
  hasContactMethod,
  heardFromOptions,
  isCustomSession,
  sessionNeedsHeadcount,
} from "@/lib/booking";

const allowedHeardFrom = new Set<string>(heardFromOptions);

type Body = {
  sessionType?: string;
  scheduleNotes?: string;
  townArea?: string;
  shootSpotIdeas?: string;
  customDetails?: string;
  groupSize?: string;
  name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  heardFrom?: string;
  photoSharing?: string;
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
  const scheduleNotes = body.scheduleNotes?.trim() ?? "";
  const townArea = body.townArea?.trim() ?? "";
  const shootSpotIdeas = body.shootSpotIdeas?.trim() ?? "";
  const customDetails = body.customDetails?.trim() ?? "";
  const groupSize = body.groupSize?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const instagram = body.instagram?.trim() ?? "";
  const heardFrom = body.heardFrom?.trim() ?? "";
  const photoSharing = body.photoSharing?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (!allowedSessionTypes.has(sessionType)) {
    return NextResponse.json({ error: "Choose a valid session type." }, { status: 400 });
  }
  if (!isNonEmpty(scheduleNotes) || !isNonEmpty(townArea)) {
    return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  }
  if (!hasContactMethod(name, phone)) {
    return NextResponse.json(
      { error: "Add your name or phone number so I know how to reach you." },
      { status: 400 },
    );
  }
  if (isCustomSession(sessionType) && !isNonEmpty(customDetails)) {
    return NextResponse.json(
      { error: "Describe your custom shoot before sending." },
      { status: 400 },
    );
  }
  if (sessionNeedsHeadcount(sessionType)) {
    const n = Number(groupSize);
    if (!groupSize || !Number.isInteger(n) || n < 2) {
      return NextResponse.json(
        { error: "Enter how many people (at least 2)." },
        { status: 400 },
      );
    }
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (photoSharing !== "yes" && photoSharing !== "no") {
    return NextResponse.json(
      { error: "Choose whether photos may be shared on the website and social media." },
      { status: 400 },
    );
  }
  if (heardFrom && !allowedHeardFrom.has(heardFrom)) {
    return NextResponse.json({ error: "Choose a valid option for how you heard about us." }, { status: 400 });
  }

  const displayFullName = displayName(name);
  const firstName = customerFirstName(name);
  const photoSharingLabel = photoSharing === "yes" ? "Yes" : "No";
  const headcountLabel = sessionNeedsHeadcount(sessionType) ? groupSize : "";

  const details: SessionRequestDetails = {
    sessionType,
    townArea,
    shootSpotIdeas,
    scheduleNotes,
    customDetails,
    headcountLabel,
    fullName: displayFullName,
    firstName,
    email,
    phone,
    instagram,
    heardFrom,
    photoSharingLabel,
    notes,
  };

  const ownerEmail = buildOwnerSessionEmail(details);
  const customerEmail = buildCustomerSessionEmail(details);

  const resend = new Resend(key);

  const [toOwner, toCustomer] = await Promise.all([
    resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Session request: ${sessionType} (${townArea})`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    }),
    resend.emails.send({
      from,
      to: [email],
      subject: "Received your jcapturelab session request",
      html: customerEmail.html,
      text: customerEmail.text,
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
