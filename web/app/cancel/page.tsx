import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropCancel } from "@/lib/portfolio";
import { bookingFallbackEmail } from "@/lib/services";

export const metadata: Metadata = {
  title: "Change or cancel",
};

export default function CancelPage() {
  return (
    <div className="relative">
      <PageBackdrop src={backdropCancel} opacity={0.13} scrim={0.94} />
      <div className="relative mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel>
          <h1 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)] sm:text-3xl">
          Change or cancel a booking
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--foreground-muted)]">
          Need to move your date or cancel? Email{" "}
          <a
            href={`mailto:${bookingFallbackEmail}`}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            {bookingFallbackEmail}
          </a>{" "}
          or message{" "}
          <a
            href="https://instagram.com/jcapturelab"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            @jcapturelab
          </a>{" "}
          with the name and date on your booking. We will sort it out from there.
        </p>
        <p className="mt-8 text-center text-sm text-[var(--foreground-muted)]">
          <Link href="/book" className="font-semibold text-[var(--accent)] hover:underline">
            New booking request
          </Link>
        </p>
        </ContentPanel>
      </div>
    </div>
  );
}
