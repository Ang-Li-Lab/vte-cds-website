export interface Criterion {
  id: string;
  name: string;
}

export interface Section {
  id: string;
  title: string;
  criteria: Criterion[];
}

export const sectionedCriteria: Section[] = [
  {
    id: "population",
    title: "Inappropriate population",
    criteria: [
      { id: "ac", name: "Existing anticoagulant" },
      {
        id: "ap",
        name: "Existing dual antiplatelet therapy or aspirin ≥325 mg daily",
      },
      { id: "skin_cancer", name: "Non-melanomatous skin cancer" },
      {
        id: "leukemia",
        name: "Acute leukemia or hematopoietic cell transplantation",
      },
      { id: "endocrine", name: "Adjuvant endocrine monotherapy" },
    ],
  },
  {
    id: "statin_indication",
    title: "Indication for statin",
    criteria: [
      { id: "statin", name: "Existing statin" },
      { id: "ldl", name: "LDL >190 mg/dL" },
      { id: "acc", name: "ACC/AHA risk >20%" },
      { id: "atherosclerotic", name: "Known atherosclerotic disease" },
    ],
  },
  {
    id: "statin_contradiction",
    title: "Contraindication for statin",
    criteria: [
      { id: "drug_drug", name: "Drug drug interaction" },
      { id: "pregnancy", name: "Positive pregnancy test" },
      { id: "alt", name: "ALT >3x ULN" },
      { id: "egfr", name: "eGFR &lt;30 mL/min/1.73 m<sup>2</sup>" },
    ],
  },
  {
    id: "descretion",
    title: "Investigator discretion",
    criteria: [
      { id: "life", name: "Life expectancy &lt;6 months" },
      { id: "ecog", name: "ECOG PS ≥3" },
      { id: "unlikely", name: "Unlikely to adhere to study" },
    ],
  },
];
