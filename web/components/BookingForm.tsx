"use client";

import { useState } from "react";
import {
  bookingFallbackEmail,
  sessionTypesForBooking,
} from "@/lib/services";

const DEFAULT_TIME_SLOTS = [
  "9:00 AM",
  "11:00 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM",
] as const;

function tomorrowISODate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function maxISODate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

type FormPayload = {
  sessionType: string;
  townArea: string;
  shootSpotIdeas: string;
  date: string;
  selectedTime: string;
  alternateDate: string;
  alternateAvailability: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

function openMailto(params: FormPayload) {
  const {
    sessionType,
    townArea,
    shootSpotIdeas,
    date,
    selectedTime,
    alternateDate,
    alternateAvailability,
    firstName,
    lastName,
    email,
    phone,
    notes,
  } = params;
  const subject = encodeURIComponent(`jcapturelab: ${sessionType} (${townArea}, ${date})`);
  const lines = [
    `Session type: ${sessionType}`,
    `Town or area: ${townArea}`,
    `Preferred date: ${date}`,
    `Preferred time: ${selectedTime}`,
  ];
  if (shootSpotIdeas.trim()) lines.push(`Shoot location ideas: ${shootSpotIdeas.trim()}`);
  if (alternateDate.trim()) lines.push(`Backup date: ${alternateDate.trim()}`);
  if (alternateAvailability.trim()) {
    lines.push(`Backup times / availability: ${alternateAvailability.trim()}`);
  }
  lines.push(`Name: ${firstName} ${lastName}`, `Your email: ${email}`);
  if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (notes.trim()) lines.push(`Other notes: ${notes.trim()}`);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${bookingFallbackEmail}?subject=${subject}&body=${body}`;
}

export function BookingForm() {
  const [sessionType, setSessionType] = useState("");
  const [townArea, setTownArea] = useState("");
  const [shootSpotIdeas, setShootSpotIdeas] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [alternateDate, setAlternateDate] = useState("");
  const [alternateAvailability, setAlternateAvailability] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setSessionType("");
    setTownArea("");
    setShootSpotIdeas("");
    setDate("");
    setSelectedTime("");
    setAlternateDate("");
    setAlternateAvailability("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNotes("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (
      !sessionType ||
      !townArea.trim() ||
      !date ||
      !selectedTime ||
      !firstName ||
      !lastName ||
      !email
    ) {
      setStatus("error");
      setMessage("Please fill in every required field.");
      return;
    }

    const payload: FormPayload = {
      sessionType,
      townArea: townArea.trim(),
      shootSpotIdeas,
      date,
      selectedTime,
      alternateDate,
      alternateAvailability,
      firstName,
      lastName,
      email,
      phone,
      notes,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
      };

      if (res.ok) {
        setStatus("success");
        setMessage(
          "Request sent. Check your inbox for a short confirmation. We will follow up soon to finalize your session.",
        );
        resetForm();
        setSubmitting(false);
        return;
      }

      if (res.status === 503 && data.code === "NOT_CONFIGURED") {
        openMailto(payload);
        setStatus("success");
        setMessage(
          `If your email app opened, send the message to finish your request. If nothing opened, email ${bookingFallbackEmail} with the same details, or DM @jcapturelab on Instagram.`,
        );
        resetForm();
        setSubmitting(false);
        return;
      }

      setStatus("error");
      setMessage(
        data.error ??
          "Something went wrong. Try again, or email us directly or message @jcapturelab on Instagram.",
      );
    } catch {
      setStatus("error");
      setMessage(
        `Could not reach the server. Email ${bookingFallbackEmail} or DM @jcapturelab on Instagram.`,
      );
    }
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-lg space-y-5 rounded-xl border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="session" className="label">
          Session type
        </label>
        <select
          id="session"
          required
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className="input"
        >
          <option value="" disabled>
            Select a session type
          </option>
          {sessionTypesForBooking.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="townArea" className="label">
          Your town or area
        </label>
        <input
          id="townArea"
          type="text"
          required
          value={townArea}
          onChange={(e) => setTownArea(e.target.value)}
          className="input"
          placeholder="Example: Blacksburg, Martinsville, Roanoke"
          autoComplete="address-level2"
        />
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          So we can plan travel and timing. Use the city or town you will be coming from.
        </p>
      </div>

      <div>
        <label htmlFor="shootSpotIdeas" className="label">
          Where you want to shoot{" "}
          <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <textarea
          id="shootSpotIdeas"
          rows={2}
          value={shootSpotIdeas}
          onChange={(e) => setShootSpotIdeas(e.target.value)}
          className="input resize-y"
          placeholder="Park, campus gate, monument, trail"
        />
      </div>

      <div>
        <label htmlFor="date" className="label">
          Preferred date
        </label>
        <input
          id="date"
          type="date"
          required
          min={tomorrowISODate()}
          max={maxISODate()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <span className="label">Preferred time</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {DEFAULT_TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTime(t)}
              className={`min-w-[44%] flex-1 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors sm:min-w-[30%] ${
                selectedTime === t
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-black/15 bg-white text-[var(--foreground)] hover:border-black/25"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="alternateDate" className="label">
          Backup date{" "}
          <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <input
          id="alternateDate"
          type="date"
          min={tomorrowISODate()}
          max={maxISODate()}
          value={alternateDate}
          onChange={(e) => setAlternateDate(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label htmlFor="alternateAvailability" className="label">
          Backup times or general availability{" "}
          <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <textarea
          id="alternateAvailability"
          rows={3}
          value={alternateAvailability}
          onChange={(e) => setAlternateAvailability(e.target.value)}
          className="input resize-y"
          placeholder="Example: any Saturday in June, weekday evenings after 5, only Sundays this summer"
        />
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          Availability varies week to week. The more backup times or ranges you list, the easier it is
          to line something up when we reply.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">
            First name
          </label>
          <input
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="label">
            Last name
          </label>
          <input
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="phone" className="label">
          Phone <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="notes" className="label">
          Anything else{" "}
          <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input resize-y"
          placeholder="Wardrobe, group size, accessibility, questions"
        />
      </div>

      <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={submitting}>
        {submitting ? "Sending..." : "Send booking request"}
      </button>

      {status !== "idle" && (
        <p
          className={`rounded-lg px-3 py-3 text-center text-sm font-medium ${
            status === "success"
              ? "bg-emerald-50 text-emerald-900"
              : "bg-red-50 text-red-900"
          }`}
          role="status"
        >
          {message}
        </p>
      )}

      <p className="text-center text-xs text-[var(--foreground-muted)]">
        We follow up by email or Instagram to confirm your date and details.
      </p>
    </form>
  );
}
