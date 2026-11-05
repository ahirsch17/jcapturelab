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

export const individualPackages: ServicePackage[] = [
  {
    id: "individual-mini",
    title: "Individual mini",
    blurb:
      "One person, one stop. Grad, prom, a headshot, or a portrait when you want the essentials.",
    includes: [
      "Time: about 45 minutes",
      "Locations: 1, the spot you and I agree on beforehand",
      "People: 1",
      "Delivery: edited highlights",
    ],
    price: "From $75",
    rateNote: "Intro rate",
  },
  {
    id: "individual-standard",
    title: "Individual standard",
    blurb:
      "More time for a second outfit or a second stop. Same idea: one person, planned before the day.",
    includes: [
      "Time: about 90 minutes",
      "Locations: up to 2, within about 10 miles of the main spot we agree on beforehand",
      "People: 1",
      "Delivery: edited highlights",
    ],
    price: "From $125",
    rateNote: "Intro rate",
  },
];

export const duoPackages: ServicePackage[] = [
  {
    id: "duo",
    title: "Duo",
    blurb: "Two people. A couple, prom dates, or two friends who want the same block of time.",
    includes: [
      "Time: about 60 minutes",
      "Locations: up to 2, within about 10 miles of the main spot we agree on beforehand",
      "People: 2",
      "Delivery: edited highlights",
    ],
    price: "From $140",
    rateNote: "Intro rate",
  },
];

export const groupPackages: ServicePackage[] = [
  {
    id: "group",
    title: "Group",
    blurb:
      "Roommates, a friend group, or a small team. One place, so the time goes to people instead of driving between stops.",
    includes: [
      "Time: about 90 minutes",
      "Locations: 1, the spot we agree on beforehand",
      "People: 3 to 8. A bigger crowd is an event",
      "Coverage: group frames, plus a short turn for individuals if time allows",
      "Delivery: edited highlights",
    ],
    price: "From $175",
    rateNote: "Intro rate",
  },
];

export const eventPackages: ServicePackage[] = [
  {
    id: "event",
    title: "Event",
    blurb:
      "One venue, priced by how long you need coverage. Headcount is how we pick the length, not a charge per person.",
    includes: [
      "About 1 hour: from $150",
      "About 2 hours: from $275",
      "Longer than 2 hours: quoted after you describe the event",
      "Locations: 1 venue, agreed beforehand",
      "Tell me the headcount and what you want covered before the date is held",
    ],
    price: "From $150",
    rateNote: "By the hour",
  },
];

/** Catch-all on the rates page (not a fixed price list). */
export const flexiblePackages: ServicePackage[] = [
  {
    id: "custom-session",
    title: "Custom session",
    blurb:
      "A setup that does not fit the list above. Same request form: describe what you want and I reply with timing and a quote.",
    includes: [
      "Duration, locations, and headcount spelled out before you pay",
      "Quote based on what you describe in the request form",
      "Edited delivery matched to what we agree",
    ],
    price: "Quoted",
    rateNote: "From the request",
  },
];

export const sessionTypeGroupsForBooking = [
  {
    label: "Sessions",
    options: [
      "Individual mini",
      "Individual standard",
      "Duo",
      "Group",
      "Event",
      "Custom session",
    ],
  },
] as const;

export const sessionTypesForBooking = sessionTypeGroupsForBooking.flatMap(
  (g) => g.options,
);

/** Shown if automated email is unavailable (mailto fallback). */
export const bookingFallbackEmail = "jcapturelab@gmail.com";
