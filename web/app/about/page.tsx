import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropAbout } from "@/lib/portfolio";
import { serviceAreasDisplay } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jesus Jimenez: student and freelance photographer behind jcapturelab, Southwest Virginia. Building a portfolio while shooting sessions.",
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
          <p className="mt-3 font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)] sm:text-2xl">
            Jesus Jimenez
          </p>
          <div className="mt-8 max-w-none space-y-4 text-[15px] leading-relaxed text-[var(--foreground-muted)]">
            <p>
              I am a student first. Photography started as a hobby; I freelance under jcapturelab and
              I am building my portfolio as I go.
            </p>
            <p>
              Couples, grad, headshots, small events, or something you want to try. Say what you need when
              you reach out and I will tell you if I can make it work.
            </p>
            <p>
              Based in Southwest Virginia, usually around{" "}
              <strong className="font-semibold text-[var(--foreground)]">{serviceAreasDisplay}</strong>
              . Mention your school or neighborhood when you book so scheduling stays realistic.
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
