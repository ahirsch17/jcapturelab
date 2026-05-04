import Image from "next/image";
import Link from "next/link";
import logoMark from "../public/cropped.png";

const links = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Sessions" },
  { href: "/book", label: "Book" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6 sm:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Image
            src={logoMark}
            alt=""
            width={419}
            height={384}
            className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
            sizes="44px"
          />
          <span className="font-[family-name:var(--font-serif)] text-[1.35rem] leading-none tracking-tight text-[var(--foreground)] sm:text-[1.6rem]">
            jcapturelab
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-6 gap-y-2">
          <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm font-medium">
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
          <a
            href="https://instagram.com/jcapturelab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline shrink-0 text-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
