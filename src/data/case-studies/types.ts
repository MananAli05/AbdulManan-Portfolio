export interface Crop {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type FeatureVisual =
  | { kind: 'image'; src: string; width: number; height: number; label: string; shape: 'wide' | 'tall' }
  | { kind: 'phones'; screens: { src: string; label: string; width?: number; height?: number }[] }
  | {
      kind: 'crop';
      crop: Crop;
      label: string;
      source?: { src: string; width: number; height: number };
    };

export interface CaseStudyFeature {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  visual: FeatureVisual;
}

export interface CaseStudy {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  meta: { label: string; value: string }[];
  image: { src: string; width: number; height: number; alt: string };
  heroImage?: { src: string; width: number; height: number; alt: string };
  heroCrop?: Crop;
  liveUrl?: string;
  githubUrl?: string;

  challenge: {
    statement: string;
    paragraphs: string[];
    steps: string[];
  };

  features: CaseStudyFeature[];

  flow: {
    title: string;
    intro: string;
    inputs: { name: string; via: string }[];
    hub: { name: string; detail: string };
    outputs: { name: string; detail: string }[];
  };

  highlights: { title: string; body: string }[];

  stack: {
    title: string;
    rows: { layer: string; tech: string }[];
  };
}
