export type LabKind = "idea" | "concept" | "prototype";

export type LabEntry = {
  slug: string;
  title: string;
  tagline: string;
  kind: LabKind;
  category: "software" | "hardware" | "service" | "consumer";
  problem: string;
  solution: string;
  status: string;
};

export const LAB: LabEntry[] = [
  {
    slug: "placeholder-idea",
    title: "First Lab Entry",
    tagline: "Original IP — coming soon.",
    kind: "idea",
    category: "software",
    problem: "Placeholder — real ideas being written up.",
    solution: "Each entry will describe the mechanism, sketches, and stage.",
    status: "drafting",
  },
];

export const findLab = (slug: string) =>
  LAB.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
