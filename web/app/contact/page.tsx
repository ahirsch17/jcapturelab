import type { Metadata } from "next";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropContact } from "@/lib/portfolio";
import { bookingFallbackEmail, serviceAreasDisplay } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <PageBackdrop src={backdropContact} opacity={0.13} scrim={0.94} />
      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
            Contact
          </h1>
          <p className="mt-4 text-sm text-[var(--foreground-muted)] sm:text-base">
          Fastest replies are usually on Instagram. For email, reach out anytime. We check both
          regularly.
        </p>
        <p className="mt-3 text-sm text-[var(--foreground-muted)] sm:text-base">
          Serving {serviceAreasDisplay}.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          <li>
            <span className="font-semibold text-[var(--foreground)]">Instagram:</span>{" "}
            <a
              href="https://instagram.com/jcapturelab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              @jcapturelab
            </a>
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Email:</span>{" "}
            <a
              href={`mailto:${bookingFallbackEmail}`}
              className="text-[var(--accent)] hover:underline"
            >
              {bookingFallbackEmail}
            </a>
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">Book:</span>{" "}
            <a href="/book" className="text-[var(--accent)] hover:underline">
              Send a booking request
            </a>
          </li>
        </ul>
        </ContentPanel>
      </div>
    </div>
  );
}
