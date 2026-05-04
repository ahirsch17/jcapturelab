import type { Metadata } from "next";
import Image from "next/image";
import { ContentPanel } from "@/components/ContentPanel";
import { PageBackdrop } from "@/components/PageBackdrop";
import { backdropPortfolio, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work",
};

export default function PortfolioPage() {
  return (
    <div className="relative isolate min-h-[65vh]">
      <PageBackdrop src={backdropPortfolio} objectPosition="center 25%" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ContentPanel className="mb-10 max-w-2xl">
          <h1 className="font-[family-name:var(--font-serif)] text-3xl text-[var(--foreground)] sm:text-4xl">
            Work
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[var(--foreground-muted)] sm:text-base">
            Portraits, grad and prom, and more. The gallery grows as new sessions come in.
          </p>
        </ContentPanel>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {portfolio.map((item) => (
            <figure
              key={item.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm"
            >
              <div className="relative w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
