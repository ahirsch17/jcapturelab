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

function openMailto(params: {
  sessionType: string;
  date: string;
  selectedTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}) {
  const {
    sessionType,
    date,
    selectedTime,
    firstName,
    lastName,
    email,
    phone,
    notes,
  } = params;
  const subject = encodeURIComponent(`jcapturelab: ${sessionType} (${date})`);
  const lines = [
    `Session type: ${sessionType}`,
    `Preferred date: ${date}`,
    `Preferred time: ${selectedTime}`,
    `Name: ${firstName} ${lastName}`,
    `Your email: ${email}`,
  ];
  if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${bookingFallbackEmail}?subject=${subject}&body=${body}`;
}

export function BookingForm() {
  const [sessionType, setSessionType] = useState<string>("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!sessionType || !date || !selectedTime || !firstName || !lastName || !email) {
      setStatus("error");
      setMessage("Please fill in every required field.");
      return;
    }

    const payload = {
      sessionType,
      date,
      selectedTime,
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
        setSessionType("");
        setDate("");
        setSelectedTime("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNotes("");
        setSubmitting(false);
        return;
      }

      if (res.status === 503 && data.code === "NOT_CONFIGURED") {
        openMailto(payload);
        setStatus("success");
        setMessage(
          `If your email app opened, send the message to finish your request. If nothing opened, email ${bookingFallbackEmail} with the same details, or DM @jcapturelab on Instagram.`,
        );
        setSessionType("");
        setDate("");
        setSelectedTime("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNotes("");
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
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          Need a weekend or a custom time? Mention it in notes. We will confirm what works.
        </p>
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
          Notes <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input resize-y"
          placeholder="Location ideas, wardrobe, weekend request"
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
