"use client";

import { useEffect, useRef, useState } from "react";
import {
  hasContactMethod,
  heardFromOptions,
  isCustomSession,
  isEventSession,
  sessionNeedsHeadcount,
} from "@/lib/booking";
import {
  bookingFallbackEmail,
  sessionTypeGroupsForBooking,
} from "@/lib/services";

type PhotoSharing = "yes" | "no" | "";

type FormPayload = {
  sessionType: string;
  townArea: string;
  shootSpotIdeas: string;
  scheduleNotes: string;
  customDetails: string;
  groupSize: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  heardFrom: string;
  photoSharing: PhotoSharing;
  notes: string;
};

function openMailto(params: FormPayload) {
  const lines = [
    `Session type: ${params.sessionType}`,
    `Town or area: ${params.townArea}`,
    `When / availability: ${params.scheduleNotes}`,
  ];
  if (params.customDetails.trim()) lines.push(`Custom shoot details: ${params.customDetails.trim()}`);
  if (params.groupSize.trim()) lines.push(`People: ${params.groupSize.trim()}`);
  if (params.shootSpotIdeas.trim()) lines.push(`Shoot location ideas: ${params.shootSpotIdeas.trim()}`);
  if (params.name.trim()) lines.push(`Name: ${params.name.trim()}`);
  lines.push(`Email: ${params.email}`);
  if (params.phone.trim()) lines.push(`Phone: ${params.phone.trim()}`);
  if (params.instagram.trim()) lines.push(`Instagram: ${params.instagram.trim()}`);
  if (params.heardFrom) lines.push(`Heard about jcapturelab: ${params.heardFrom}`);
  lines.push(`Photo sharing (website & social): ${params.photoSharing === "yes" ? "Yes" : "No"}`);
  if (params.notes.trim()) lines.push(`Other notes: ${params.notes.trim()}`);
  const subject = encodeURIComponent(`jcapturelab: ${params.sessionType} (${params.townArea})`);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${bookingFallbackEmail}?subject=${subject}&body=${body}`;
}

export function BookingForm() {
  const [sessionType, setSessionType] = useState("");
  const [townArea, setTownArea] = useState("");
  const [shootSpotIdeas, setShootSpotIdeas] = useState("");
  const [scheduleNotes, setScheduleNotes] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [photoSharing, setPhotoSharing] = useState<PhotoSharing>("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status !== "idle") {
      statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [status, message]);

  const needsHeadcount = sessionNeedsHeadcount(sessionType);
  const needsCustomDetails = isCustomSession(sessionType);
  const isEvent = isEventSession(sessionType);
  const notesPlaceholder = isEvent
    ? "What kind of event? Birthday, team, club, etc."
    : "Outfit ideas, accessibility, questions";

  function onSessionChange(value: string) {
    setSessionType(value);
    if (!sessionNeedsHeadcount(value)) setGroupSize("");
    if (!isCustomSession(value)) setCustomDetails("");
  }

  function resetForm() {
    setSessionType("");
    setTownArea("");
    setShootSpotIdeas("");
    setScheduleNotes("");
    setCustomDetails("");
    setGroupSize("");
    setName("");
    setEmail("");
    setPhone("");
    setInstagram("");
    setHeardFrom("");
    setPhotoSharing("");
    setNotes("");
  }

  function validate(): string | null {
    if (!sessionType || !townArea.trim() || !scheduleNotes.trim() || !email || !photoSharing) {
      return "Please fill in every required field.";
    }
    if (!hasContactMethod(name, phone)) {
      return "Add your name or phone number so I know how to reach you.";
    }
    if (needsCustomDetails && !customDetails.trim()) {
      return "Describe your custom shoot before sending.";
    }
    if (needsHeadcount) {
      const n = Number(groupSize);
      if (!groupSize.trim() || !Number.isInteger(n) || n < 2) {
        return "Enter how many people (at least 2).";
      }
    }
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }

    const payload: FormPayload = {
      sessionType,
      townArea: townArea.trim(),
      shootSpotIdeas,
      scheduleNotes: scheduleNotes.trim(),
      customDetails: customDetails.trim(),
      groupSize: needsHeadcount ? groupSize.trim() : "",
      name: name.trim(),
      email,
      phone: phone.trim(),
      instagram: instagram.trim(),
      heardFrom,
      photoSharing,
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
          phone.trim()
            ? "Request sent. Check your email for a confirmation copy. Nothing is booked yet. I will text you to work out timing and details."
            : "Request sent. Check your email for a confirmation copy. Nothing is booked yet. I will follow up using the contact info you gave.",
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
          "Something went wrong. Try again, or email me directly or message @jcapturelab on Instagram.",
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
          onChange={(e) => onSessionChange(e.target.value)}
          className="input"
        >
          <option value="" disabled>
            Select a session type
          </option>
          {sessionTypeGroupsForBooking.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {needsCustomDetails && (
        <div>
          <label htmlFor="customDetails" className="label">
            Describe your shoot
          </label>
          <textarea
            id="customDetails"
            required
            rows={3}
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
            className="input resize-y"
            placeholder="What you want shot, vibe, locations, and anything I need to quote it"
          />
        </div>
      )}

      {needsHeadcount && (
        <div>
          <label htmlFor="groupSize" className="label">
            How many people?
          </label>
          <input
            id="groupSize"
            type="number"
            min={2}
            max={99}
            required
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className="input"
            inputMode="numeric"
            placeholder="2"
          />
        </div>
      )}

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
        <label htmlFor="scheduleNotes" className="label">
          When works for you
        </label>
        <textarea
          id="scheduleNotes"
          required
          rows={4}
          value={scheduleNotes}
          onChange={(e) => setScheduleNotes(e.target.value)}
          className="input resize-y"
          placeholder="Example: best is Sat May 24 around 4pm. Also open to any Saturday after 2pm in May."
        />
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          Your ideal time plus any backup windows. The more you share, the faster we can line
          something up.
        </p>
      </div>

      <fieldset>
        <legend className="label">
          May I share edited photos on my website and social media?
        </legend>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="photoSharing"
              value="yes"
              required
              checked={photoSharing === "yes"}
              onChange={() => setPhotoSharing("yes")}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            Yes
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="photoSharing"
              value="no"
              checked={photoSharing === "no"}
              onChange={() => setPhotoSharing("no")}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            No
          </label>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          Your answer does not affect whether I take your session. It only covers portfolio and
          social use after delivery.
        </p>
      </fieldset>

      <div className="space-y-4 rounded-lg border border-black/[0.06] bg-[var(--background)]/50 p-4">
        <p className="text-xs font-medium text-[var(--foreground)]">How to reach you</p>
        <p className="text-xs text-[var(--foreground-muted)]">
          Add your name, phone, or both. Phone is fastest for planning.
        </p>

        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            autoComplete="name"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            autoComplete="tel"
            placeholder="Best for planning. I usually text."
          />
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
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            For your confirmation copy only.
          </p>
        </div>

        <div>
          <label htmlFor="instagram" className="label">
            Instagram{" "}
            <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
          </label>
          <input
            id="instagram"
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="input"
            placeholder="@username"
            autoComplete="off"
          />
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            Private account? Skip this. DMs often sit in Requests if we are not mutuals. Use phone
            above, or follow{" "}
            <a
              href="https://instagram.com/jcapturelab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              @jcapturelab
            </a>{" "}
            first so I can see your message.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="heardFrom" className="label">
          How did you hear about jcapturelab?{" "}
          <span className="font-normal text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <select
          id="heardFrom"
          value={heardFrom}
          onChange={(e) => setHeardFrom(e.target.value)}
          className="input"
        >
          <option value="">Prefer not to say</option>
          {heardFromOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
          placeholder={notesPlaceholder}
        />
      </div>

      <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={submitting}>
        {submitting ? "Sending..." : "Send session request"}
      </button>

      {status !== "idle" && (
        <p
          ref={statusRef}
          className={`rounded-lg px-3 py-3 text-center text-sm font-medium ${
            status === "success"
              ? "bg-emerald-50 text-emerald-900"
              : "bg-red-50 text-red-900"
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      <p className="text-center text-xs text-[var(--foreground-muted)]">
        This is a request, not a confirmed booking. Be clear on dates and times and share a few
        options when you can. I will reach out to confirm what works.
      </p>
    </form>
  );
}
