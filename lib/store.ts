import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const freeTextAtom = atom("");
export const projectIdAtom = atom("");
export const searchTabAtom = atom("VIEW FULL LIST OF SOLUTIONS");
export const detailTabAtom = atom("SUMMARY");
export const pageAtom = atom(1);
export const customizationPageAtom = atom(1);

export const mapAtom = atom<any | null>([]);
export const regionAtom = atom<any | null>("");
export const filterAtom = atom<any | null>({
  issues:[],
  category: [],
  geographic: [],
  sdgs: [],
  sdgTargets: [],
  characteristics: [],
  expertise:[],
  budget: [],
  waterFocused:[]
});

export const customizationAtom = atomWithStorage<any | null>("customization", {
  issues: [],
  geographic: [],
  budget: [],
  special: [],
});

export const storedFreeTextAtom = atom<any|null>([])
export const searchResultsAtom = atom<any | null>(null);
export const onboardingAtom = atom<any | null>(null);