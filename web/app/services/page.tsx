import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropServices } from "@/lib/portfolio";
import type { ServicePackage } from "@/lib/services";
import {
  duoPackages,
  eventPackages,
  flexiblePackages,
  groupPackages,
  individualPackages,
  portfolioPricingIntro,
  serviceAreasDisplay,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Sessions & rates",
};

function PackageList({ items }: { items: readonly ServicePackage[] }) {
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
            <div className="flex shrink-0 flex-col items-end gap-1.5 text-right">
              <p className="inline-block w-fit whitespace-nowrap rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
                {pkg.price}
              </p>
              <p className="max-w-[11rem] text-xs leading-snug text-[var(--foreground-muted)]">
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
          <p className="font-semibold text-[var(--accent)]">Current rates</p>
          <p className="mt-2 text-[var(--foreground-muted)]">{portfolioPricingIntro}</p>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
          Prices follow how many people and how long, not the occasion. Grad, prom, headshots, and
          couples all use the same list. Extra stops stay near the main spot, and that spot is
          settled before the shoot.
        </p>

        <section className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Individual
          </h2>
          <PackageList items={individualPackages} />
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Duo
          </h2>
          <PackageList items={duoPackages} />
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Group
          </h2>
          <PackageList items={groupPackages} />
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Event
          </h2>
          <PackageList items={eventPackages} />
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Drive from Radford
          </h2>
          <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--surface)] p-6 text-sm leading-relaxed text-[var(--foreground-muted)] shadow-sm sm:p-8">
            <p>
              Sessions start from Radford. A shoot in town, or in Blacksburg or Christiansburg, is
              included. The add-on is only the trip out, and it stays small on purpose.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1">
              <li>Within about 20 miles of Radford: included</li>
              <li>About 20 to 40 miles, such as Roanoke: +$25</li>
              <li>About 40 to 60 miles: +$40</li>
              <li>Farther than that, including Martinsville: quoted before the date is held</li>
            </ul>
            <p className="mt-4">
              Miles are from Radford to the main spot, not between the stops in a session. If a drive
              looks longer than the band, the quote says so before you commit.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Something else
          </h2>
          <PackageList items={flexiblePackages} />
        </section>

        <div className="mt-12 rounded-2xl border border-black/[0.08] bg-[var(--accent)]/[0.06] px-5 py-6 text-center text-sm text-[var(--foreground-muted)]">
          Ready to get on the calendar?{" "}
          <Link href="/book" className="font-semibold text-[var(--accent)] hover:underline">
            Send a session request
          </Link>
          .
        </div>
        </ContentPanel>
      </div>
    </div>
  );
}
