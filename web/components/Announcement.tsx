import Link from "next/link";

export function Announcement() {
  return (
    <div className="bg-[var(--accent)] text-center text-sm font-semibold tracking-wide text-white">
      <Link
        href="/book"
        className="inline-block w-full px-4 py-2.5 transition-opacity hover:opacity-90"
      >
        Open for sessions. Book a shoot.
      </Link>
    </div>
  );
}
