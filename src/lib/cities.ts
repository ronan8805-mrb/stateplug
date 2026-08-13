export type City = {
  id: string;
  name: string;
  region: string;
  status: "flagship" | "active" | "incoming";
  blurb: string;
  x: number;
  y: number;
};

export const cities: City[] = [
  {
    id: "la",
    name: "Los Angeles",
    region: "California · HQ",
    status: "flagship",
    blurb: "Where the current starts. Flagship drops, first looks, and the original plug.",
    x: 18,
    y: 46,
  },
  {
    id: "nyc",
    name: "New York",
    region: "United States",
    status: "active",
    blurb: "Select licensed partners. East-coast voltage, same California flower.",
    x: 32,
    y: 38,
  },
  {
    id: "miami",
    name: "Miami",
    region: "United States",
    status: "active",
    blurb: "Night-shift energy. Heat, chrome, and limited parody drops.",
    x: 30,
    y: 52,
  },
  {
    id: "toronto",
    name: "Toronto",
    region: "Canada",
    status: "active",
    blurb: "North-side connect. Licensed shelves only.",
    x: 30,
    y: 32,
  },
  {
    id: "london",
    name: "London",
    region: "United Kingdom",
    status: "active",
    blurb: "A quiet, high-end presence. Ask, don’t hunt.",
    x: 48,
    y: 32,
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    region: "Netherlands",
    status: "active",
    blurb: "Canal-side current. Partner coffeeshops and concept counters.",
    x: 51,
    y: 30,
  },
  {
    id: "berlin",
    name: "Berlin",
    region: "Germany",
    status: "incoming",
    blurb: "The next strike. Request a connect to get on the list.",
    x: 54,
    y: 34,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Japan",
    status: "incoming",
    blurb: "After-hours interest only. No public retail yet.",
    x: 86,
    y: 42,
  },
  {
    id: "cdmx",
    name: "Mexico City",
    region: "Mexico",
    status: "incoming",
    blurb: "A southern spark. Coming online.",
    x: 22,
    y: 56,
  },
  {
    id: "dubai",
    name: "Dubai",
    region: "UAE",
    status: "incoming",
    blurb: "Private rooms only. Not a public connect.",
    x: 64,
    y: 48,
  },
];

export const statusLabel: Record<City["status"], string> = {
  flagship: "Flagship",
  active: "Live connect",
  incoming: "Incoming",
};
