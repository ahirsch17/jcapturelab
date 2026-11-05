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
  { src: p("bjj-portrait.jpg"), alt: "Portrait in a blue gi in front of the Blue Gorilla logo", featured: true },
  { src: p("bjj-belt.jpg"), alt: "Portrait holding a brown belt in front of the Blue Gorilla logo", featured: true },
  { src: p("bjj-celebration.jpg"), alt: "Two students in blue gis after a match" },
  { src: p("bjj-promotion.jpg"), alt: "An instructor tying a belt during a promotion" },
  { src: p("bjj-lineup.jpg"), alt: "Students in blue gis at the end of class" },
  { src: p("IMG_6158.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_6157.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_6156.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_6155.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_6091.JPG"), alt: "Photography by jcapturelab" },
  { src: p("IMG_6086.JPG"), alt: "Photography by jcapturelab" },
  { src: p("IMG_5496.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_5494.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5492.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5480.jpg"), alt: "Photography by jcapturelab", featured: true },
  { src: p("IMG_5479.jpg"), alt: "Photography by jcapturelab" },
  { src: p("IMG_5477.jpg"), alt: "Photography by jcapturelab" },
  { src: p("053.jpg"), alt: "Photography by jcapturelab" },
  { src: p("039.JPG"), alt: "Photography by jcapturelab" },
  { src: p("051.JPG"), alt: "Photography by jcapturelab" },
  { src: p("042 2.jpg"), alt: "Photography by jcapturelab" },
  { src: p("046.jpg"), alt: "Photography by jcapturelab" },
  { src: p("edited-photo (7) 3.PNG"), alt: "Photography by jcapturelab" },
];
