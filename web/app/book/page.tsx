import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropBook } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Request a session",
};

export default function BookPage() {
  return (
    <div className="relative isolate min-h-[65vh]">
      <PageBackdrop src={backdropBook} objectPosition="center 32%" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel className="mx-auto max-w-xl">
          <h1 className="text-center font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
            Request a session
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--foreground-muted)]">
            Tell me what you want and your town. This is a request, not a confirmed booking, so be
            clear about dates and times and give a few options when you can. I will reach out to
            confirm what works for me.
          </p>
          <div className="mt-10">
            <BookingForm />
          </div>
        </ContentPanel>
      </div>
    </div>
  );
}
