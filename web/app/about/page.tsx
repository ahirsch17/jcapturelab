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
            jcapturelab is built around{" "}
            <strong className="font-semibold text-[var(--foreground)]">grad</strong> and{" "}
            <strong className="font-semibold text-[var(--foreground)]">prom</strong>: cap and gown,
            campus spots, portraits before the dance, and small groups. Sessions stay relaxed and
            directed so you never feel stuck in stiff poses unless that is the vibe you want.
          </p>
          <p>
            He has been behind the camera for years of portraits and events, with a calm pace on set
            and an eye for clean light and real expressions. If you are camera shy, say so: there is
            time to warm up and still walk away with plenty of keepers.
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
