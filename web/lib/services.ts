export type ServicePackage = {
  id: string;
  title: string;
  blurb: string;
  includes: string[];
  price: string;
  rateNote: string;
};

/** Cities and towns typically served (Southwest Virginia). */
export const serviceAreasDisplay =
  "Radford, Roanoke, Blacksburg, Christiansburg, Martinsville, and nearby towns";

export const portfolioPricingIntro =
  "Intro pricing while the portfolio grows: you save compared with what full rate packages will be later. A few favorite images may appear on social or in the gallery only with your clear okay. That is discussed and agreed before the shoot.";

export const gradPackages: ServicePackage[] = [
  {
    id: "grad-mini",
    title: "Grad mini",
    blurb:
      "Quick cap and gown or campus portraits when you mostly need a few strong shots.",
    includes: ["About 30 minutes", "1 location on or near campus", "Gallery of edited highlights"],
    price: "From $75",
    rateNote: "Portfolio building rate",
  },
  {
    id: "grad-standard",
    title: "Grad standard",
    blurb: "More time and variety: outfits, friends shots, and a fuller gallery.",
    includes: [
      "About 60 minutes",
      "1 or 2 nearby locations",
      "Larger edited gallery",
      "A few cap and gown plus casual looks",
    ],
    price: "From $125",
    rateNote: "Portfolio building rate",
  },
  {
    id: "grad-group",
    title: "Grad group or friends",
    blurb:
      "Small groups (roommates, clubs, teams) who want coordinated photos the same day.",
    includes: ["Shared session block", "Mix of group and individual frames", "Coordinated schedule"],
    price: "From $175",
    rateNote: "Portfolio building rate, split by group",
  },
];

export const promPackages: ServicePackage[] = [
  {
    id: "prom-solo",
    title: "Prom solo",
    blurb:
      "Individual portraits before the dance: outfit detail, portraits, quick location set.",
    includes: ["Focused solo coverage", "Location agreed in advance", "Edited highlights"],
    price: "From $85",
    rateNote: "Portfolio building rate",
  },
  {
    id: "prom-couple",
    title: "Prom couple or dates",
    blurb: "You and your date: coordinated poses, candids, and a few detail shots.",
    includes: ["Couple forward posing", "Optional quick solo add ons", "Edited highlights"],
    price: "From $130",
    rateNote: "Portfolio building rate",
  },
];

export const sessionTypesForBooking = [
  "Grad mini",
  "Grad standard",
  "Grad group or friends",
  "Prom solo",
  "Prom couple or dates",
  "Different session (describe in notes)",
] as const;

/** Shown if automated email is unavailable (mailto fallback). */
export const bookingFallbackEmail = "jcapturelab@gmail.com";
