import Image from "next/image";
import Link from "next/link";
import { heroImage, portfolio } from "@/lib/portfolio";

const featured = portfolio.filter((p) => p.featured).slice(0, 4);

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[85vh] overflow-hidden bg-neutral-900">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-contain object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-4 py-24">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-black/25 px-6 py-8 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-9">
            <h1 className="font-[family-name:var(--font-serif)] text-2xl font-normal leading-snug text-white sm:text-3xl">
              Editorial portraits across Southwest Virginia
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/88 sm:text-base">
              Grad, prom, couples, headshots, more. Book when you are ready.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Link href="/book" className="btn-primary mx-auto min-w-[200px] sm:mx-0">
                Book a session
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--foreground)]"
              >
                Sessions &amp; rates
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                View work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20">
        <div className="rounded-2xl border border-black/[0.06] bg-white/[0.72] px-5 py-14 shadow-[0_12px_48px_rgb(0,0,0,0.05)] backdrop-blur-sm sm:px-10 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--foreground)] sm:text-3xl">
              Selected frames
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--foreground-muted)]">
              A look at recent work. See the full gallery for more.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            See full gallery
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.src}
              href="/portfolio"
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </Link>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
