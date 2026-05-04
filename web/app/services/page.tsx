import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropServices } from "@/lib/portfolio";
import { gradPackages, portfolioPricingIntro, promPackages, serviceAreasDisplay } from "@/lib/services";

export const metadata: Metadata = {
  title: "Sessions & rates",
};

function PackageList({ items }: { items: typeof gradPackages }) {
  return (
    <ul className="mt-8 space-y-8">
      {items.map((pkg) => (
        <li
          key={pkg.id}
          className="rounded-2xl border border-black/10 bg-[var(--surface)] p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-xl text-[var(--foreground)] sm:text-2xl">
                {pkg.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">{pkg.blurb}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
                {pkg.price}
              </p>
              <p className="mt-1.5 max-w-[11rem] text-xs leading-snug text-[var(--foreground-muted)]">
                {pkg.rateNote}
              </p>
            </div>
          </div>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-[var(--foreground-muted)]">
            {pkg.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  return (
    <div className="relative isolate min-h-[65vh]">
      <PageBackdrop src={backdropServices} objectPosition="center 30%" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
          Sessions &amp; rates
        </h1>
        <p className="mt-4 text-sm text-[var(--foreground-muted)]">
          Typical coverage: {serviceAreasDisplay}.
        </p>
        <div className="mt-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-5 py-4 text-sm leading-relaxed text-[var(--foreground)] sm:px-6">
          <p className="font-semibold text-[var(--accent)]">Portfolio building pricing</p>
          <p className="mt-2 text-[var(--foreground-muted)]">{portfolioPricingIntro}</p>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
          Packages below focus on{" "}
          <strong className="font-semibold text-[var(--foreground)]">grad</strong> and{" "}
          <strong className="font-semibold text-[var(--foreground)]">prom</strong> right now. Rates
          move toward full pricing as the calendar fills. What you see here is the current intro
          list.
        </p>

        <section className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Grad</h2>
          <PackageList items={gradPackages} />
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Prom</h2>
          <PackageList items={promPackages} />
        </section>

        <div className="mt-12 rounded-2xl border border-black/[0.08] bg-[var(--accent)]/[0.06] px-5 py-6 text-center text-sm text-[var(--foreground-muted)]">
          Ready to hold a date?{" "}
          <Link href="/book" className="font-semibold text-[var(--accent)] hover:underline">
            Send a booking request
          </Link>
          .
        </div>
        </ContentPanel>
      </div>
    </div>
  );
}
