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
  "Freelance intro pricing. Social or gallery use of your photos only happens with your clear okay, settled before the shoot.";

export const gradPackages: ServicePackage[] = [
  {
    id: "grad-mini",
    title: "Grad mini",
    blurb:
      "Cap and gown or campus portraits in a tighter window. Good when you want the essentials.",
    includes: [
      "Duration: about 60 minutes",
      "Locations: up to 2 nearby",
      "People: solo graduate session",
      "Delivery: edited highlight gallery",
    ],
    price: "From $75",
    rateNote: "Intro rate",
  },
  {
    id: "grad-standard",
    title: "Grad standard",
    blurb:
      "More room for outfits, more stops, and a bigger set of edits than the mini.",
    includes: [
      "Duration: about 90 minutes",
      "Locations: up to 4 nearby when drive time stays reasonable",
      "People: solo graduate; quick shots with a friend fit if time allows",
      "Looks: cap/gown plus casual outfit changes",
      "Delivery: larger edited gallery",
    ],
    price: "From $125",
    rateNote: "Intro rate",
  },
  {
    id: "grad-group",
    title: "Grad group or friends",
    blurb:
      "Roommates, clubs, friends who want shared time on one calendar block.",
    includes: [
      "Duration: quoted after headcount (often around 90–120 minutes for small groups)",
      "Locations: planned so nobody is chasing across town",
      "People: small groups; larger sets priced after we talk headcount",
      "Coverage: group shots plus individual frames",
      "Rate split across the group",
    ],
    price: "From $175",
    rateNote: "Intro rate, split by group",
  },
];

export const promPackages: ServicePackage[] = [
  {
    id: "prom-solo",
    title: "Prom solo",
    blurb:
      "Before the dance: outfit detail, portraits, and a simple location plan.",
    includes: [
      "Duration: about 45–60 minutes",
      "Locations: 1 primary spot (plus a tight second nearby if time allows)",
      "People: you, solo",
      "Delivery: edited highlights",
    ],
    price: "From $85",
    rateNote: "Intro rate",
  },
  {
    id: "prom-couple",
    title: "Prom couple or dates",
    blurb: "You and your date with candids, posing, and detail shots.",
    includes: [
      "Duration: about 60 minutes",
      "Locations: up to 2 nearby",
      "People: 2 (you + date)",
      "Delivery: edited highlights",
    ],
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
      "Duration, locations, and headcount spelled out before you pay",
      "Quote based on what you describe in the booking form",
      "Edited delivery matched to what we agree",
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
