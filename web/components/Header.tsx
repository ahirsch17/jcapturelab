import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Sessions" },
  { href: "/book", label: "Book" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6 sm:py-4">
        <nav className="flex flex-wrap justify-start gap-x-6 gap-y-2 text-sm font-medium">
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
    </header>
  );
}
