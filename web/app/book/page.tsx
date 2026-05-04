import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropBook } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Book a session",
};

export default function BookPage() {
  return (
    <div className="relative">
      <PageBackdrop src={backdropBook} opacity={0.12} scrim={0.93} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel className="mx-auto max-w-xl">
          <h1 className="text-center font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
            Book a session
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--foreground-muted)]">
            Choose your session, date, and time, then send your request. We follow up by email or
            Instagram to confirm your date and location.
          </p>
          <div className="mt-10">
            <BookingForm />
          </div>
        </ContentPanel>
      </div>
    </div>
  );
}
