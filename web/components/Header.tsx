import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Sessions" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book a session" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6 sm:py-4">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium sm:justify-start">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="order-first flex shrink-0 justify-center sm:order-none sm:absolute sm:left-1/2 sm:-translate-x-1/2"
        >
          <Image
            src="/logo.png"
            alt="jcapturelab"
            width={360}
            height={90}
            className="h-14 w-auto max-w-[min(92vw,22rem)] object-contain object-center sm:h-16 sm:max-w-[26rem] md:h-[4.25rem] md:max-w-[28rem]"
            priority
            sizes="(max-width: 640px) 92vw, 28rem"
          />
        </Link>

        <div className="flex w-full justify-center sm:w-auto sm:justify-end">
          <a
            href="https://instagram.com/jcapturelab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
