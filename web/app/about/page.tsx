import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropAbout } from "@/lib/portfolio";
import { serviceAreasDisplay } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="relative isolate min-h-[65vh]">
      <PageBackdrop src={backdropAbout} objectPosition="center 28%" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
            About
          </h1>
          <div className="mt-8 max-w-none space-y-4 text-[15px] leading-relaxed text-[var(--foreground-muted)]">
            <p>
              jcapturelab leans into grad and prom while the season is busy, but other shoots are
              welcome too: couples, headshots, small events, or an idea you want to try. Say what
              you want when you reach out. Sessions stay relaxed and directed so you do not feel
              stuck in stiff poses unless that is the vibe you want.
            </p>
            <p>
              The brand is still new and the portfolio is growing, which keeps intro rates friendly
              while the work catches up. Pace on set stays calm, with attention to light and real
              expressions over a long resume. If you are camera shy, say so: there is time to warm
              up and still leave with keepers.
            </p>
            <p>
              Based in Southwest Virginia, regularly serving{" "}
              <strong className="font-semibold text-[var(--foreground)]">{serviceAreasDisplay}</strong>
              . Mention your school or neighborhood when you reach out so scheduling stays realistic.
            </p>
            <p className="font-medium text-[var(--foreground)]">
              <Link href="/services" className="text-[var(--accent)] hover:underline">
                Sessions &amp; rates
              </Link>
              {", "}
              <Link href="/book" className="text-[var(--accent)] hover:underline">
                Book a session
              </Link>
              {", "}
              <a
                href="https://instagram.com/jcapturelab"
                className="text-[var(--accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
          </div>
        </ContentPanel>
      </div>
    </div>
  );
}
