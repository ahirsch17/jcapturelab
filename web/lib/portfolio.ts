export type PortfolioItem = {
  src: string;
  alt: string;
  featured?: boolean;
};

function p(filename: string): string {
  return `/portfolio/${encodeURIComponent(filename)}`;
}

export const heroImage = p("053.jpg");

/** Pixel size of `heroImage` file (update if you change the hero photo). */
export const heroImageSize = { width: 2656, height: 3984 } as const;

export const backdropAbout = p("IMG_5494.jpg");
export const backdropServices = p("IMG_5477.jpg");
export const backdropCancel = p("IMG_5480.jpg");
export const backdropPortfolio = p("IMG_5491 2.jpg");
export const backdropBook = p("IMG_5492.jpg");

export const portfolio: PortfolioItem[] = [
  { src: p("IMG_5496.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_5494.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5492.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5491 2.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5480.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5479.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_5477.jpg"), alt: "Photography by jcapturelab" },
  { src: p("053.jpg"), alt: "Photography by jcapturelab" },
  { src: p("039.JPG"), alt: "Photography by jcapturelab" },
  { src: p("051.JPG"), alt: "Photography by jcapturelab" },
];
