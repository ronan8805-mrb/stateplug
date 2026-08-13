export type ProductLine = "flower" | "parody";

export type Product = {
  slug: string;
  name: string;
  line: ProductLine;
  lineLabel: string;
  tagline: string;
  flavour: string;
  notes: string[];
  voltage: number;
  weight: string;
  image: string;
  featured?: boolean;
  lookbook?: boolean;
};

export const products: Product[] = [
  {
    slug: "one-lb",
    name: "The 1LB",
    line: "flower",
    lineLabel: "Premium Flower",
    tagline: "Plug in. Power up. Stay charged.",
    flavour: "Exotic profiles · Pure California energy",
    notes: [
      "The flagship bag. Neon lightning, 448 grams of top-shelf indoor.",
      "Unforgettable flavours and the charge that made the name.",
      "From the streets of LA to the world — this is the only plug you need.",
    ],
    voltage: 99,
    weight: "1LB / 448g",
    image: "/products/one-lb.jpg",
    featured: true,
    lookbook: true,
  },
  {
    slug: "sunnyz",
    name: "SunnyZ",
    line: "parody",
    lineLabel: "Summer Edition",
    tagline: "Citrus hit. Beach current.",
    flavour: "Orange · Tang · Soft gas",
    notes: [
      "Summer Edition drop. The box, the 1LB, and the 3.5g pouches.",
      "Built for daylight. Tastes like the coast with the voltage left on.",
    ],
    voltage: 86,
    weight: "1LB · 3.5g packs",
    image: "/products/sunnyz.jpg",
    featured: true,
    lookbook: true,
  },
  {
    slug: "gelonade",
    name: "Gelonade",
    line: "parody",
    lineLabel: "Parody Pack",
    tagline: "State's Gelonade. Game on.",
    flavour: "Lemon-lime · Sweet gas · Cold peel",
    notes: [
      "The cooler. Orange shell, lightning bolt, sideline energy.",
      "A collectible sports jug for a cultivar that plays loud.",
    ],
    voltage: 91,
    weight: "Cooler drop",
    image: "/products/gelonade.jpg",
    featured: true,
    lookbook: true,
  },
  {
    slug: "kelp-juicez",
    name: "Kelp Juicez",
    line: "parody",
    lineLabel: "Parody Pack",
    tagline: "Deep current. High tide.",
    flavour: "Sea salt · Lime leaf · Cool herbal",
    notes: [
      "The carton. STATE PLUG under the kelp mark.",
      "A juice-box silhouette for a green, oceanic profile.",
    ],
    voltage: 80,
    weight: "Carton",
    image: "/products/kelp-juicez.jpg",
    featured: true,
    lookbook: true,
  },
  {
    slug: "secret-stuff",
    name: "States Secret Stuff",
    line: "parody",
    lineLabel: "Parody Pack",
    tagline: "If you know, you know.",
    flavour: "Candy gas · Cream · Private reserve",
    notes: [
      "Hand-lettered yellow sticker. Purple wrap. Black lid.",
      "Seven grams of the stash that does not need a billboard.",
    ],
    voltage: 96,
    weight: "7g jar",
    image: "/products/secret-stuff.jpg",
    featured: true,
    lookbook: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function lookbookProducts() {
  return products.filter((p) => p.lookbook);
}
