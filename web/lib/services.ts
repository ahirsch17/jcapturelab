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
      "Cap and gown or campus portraits when you want a shorter session. Intro rate, straight to the point.",
    includes: [
      "About an hour",
      "Often one or two nearby spots if that fits the day",
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
      "Roughly 90 minutes to an hour and a half, depending on the day",
      "Usually a few nearby spots when they are close together (about 3 to 4 is realistic)",
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

/** Catch-all on the rates page (not a fixed price list). */
export const flexiblePackages: ServicePackage[] = [
  {
    id: "custom-session",
    title: "Custom session",
    blurb:
      "Headshots, couples, small events, branding-style portraits, creative ideas, or anything that is not a fit for the examples above. Same booking form: describe what you want and I reply with timing and a quote.",
    includes: [
      "Scope and rate agreed before you book",
      "Locations and schedule worked out together",
      "Edited delivery matched to the plan",
    ],
    price: "Quoted",
    rateNote: "Starts from your booking notes",
  },
];

export const sessionTypesForBooking = [
  "Custom or other (describe in notes)",
  "Grad mini",
  "Grad standard",
  "Grad group or friends",
  "Prom solo",
  "Prom couple or dates",
] as const;

/** Shown if automated email is unavailable (mailto fallback). */
export const bookingFallbackEmail = "jcapturelab@gmail.com";
