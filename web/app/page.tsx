import Image from "next/image";
import Link from "next/link";
import { heroImage, portfolio } from "@/lib/portfolio";
import { serviceAreasDisplay } from "@/lib/services";

const featured = portfolio.filter((p) => p.featured).slice(0, 4);

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[85vh] overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[center_24%] sm:object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-4 py-24">
          <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-black/25 px-6 py-9 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-10">
            <Link href="/" className="mx-auto flex w-full justify-center">
              <Image
                src="/logo.png"
                alt="jcapturelab"
                width={420}
                height={140}
                priority
                className="h-16 w-auto max-w-[min(88vw,18rem)] object-contain drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:h-[4.5rem] sm:max-w-[20rem]"
              />
            </Link>
            <h1 className="mt-6 font-[family-name:var(--font-serif)] text-3xl font-normal leading-tight text-white sm:text-4xl">
              Photography with a clean, editorial edge
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Portraits and lifestyle work across {serviceAreasDisplay}. Grad and prom fill a lot of
              the calendar, but other sessions are welcome. Clear packages and a simple way to reach
              out.
            </p>
            <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
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
