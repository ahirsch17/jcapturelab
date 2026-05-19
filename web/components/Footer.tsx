import Link from "next/link";
import { serviceAreasDisplay } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-[family-name:var(--font-serif)] text-lg text-[var(--foreground)]">
            jcapturelab
          </p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Serving {serviceAreasDisplay}.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link
            href="/services"
            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            Sessions
          </Link>
          <Link href="/book" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            Request
          </Link>
          <Link href="/cancel" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            Change session
          </Link>
          <a
            href="https://instagram.com/jcapturelab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            @jcapturelab
          </a>
        </div>
      </div>
    </footer>
  );
}
