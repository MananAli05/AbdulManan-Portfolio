import type { CaseStudy } from './types';
import { etihadGarden } from './etihad-garden';
import { truckBhai } from './truck-bhai';
import { premiumStore } from './premium-store';
import { mediCare } from './medicare';

export type { CaseStudy, CaseStudyFeature, Crop, FeatureVisual } from './types';

const ALL = [etihadGarden, truckBhai, premiumStore, mediCare];

export const CASE_STUDIES: Record<string, CaseStudy> = Object.fromEntries(
  ALL.map((study) => [study.slug, study])
);
