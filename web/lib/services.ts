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
  "Rates here are set below typical full package pricing. Any use of your images on social or in the gallery happens only with your clear okay, agreed before the shoot.";

export const gradPackages: ServicePackage[] = [
  {
    id: "grad-mini",
    title: "Grad mini",
    blurb:
      "Cap and gown or campus portraits when you only need a tight set of shots. This rate applies when you can give at least two possible locations up front and about an hour for the session.",
    includes: [
      "About 1 hour",
      "At least 2 location options from you when you book (we confirm one that works)",
      "Gallery of edited highlights",
    ],
    price: "From $75",
    rateNote: "Intro rate",
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
    rateNote: "Intro rate",
  },
  {
    id: "grad-group",
    title: "Grad group or friends",
    blurb:
      "Small groups (roommates, clubs, teams) who want coordinated photos the same day.",
    includes: ["Shared session block", "Mix of group and individual frames", "Coordinated schedule"],
    price: "From $175",
    rateNote: "Intro rate, split by group",
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
    rateNote: "Intro rate",
  },
  {
    id: "prom-couple",
    title: "Prom couple or dates",
    blurb: "You and your date: coordinated poses, candids, and a few detail shots.",
    includes: ["Couple forward posing", "Optional quick solo add ons", "Edited highlights"],
    price: "From $130",
    rateNote: "Intro rate",
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
