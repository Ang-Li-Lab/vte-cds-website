export interface Button {
  id: string;
  name: string;
  color: string;
  paramValue: string;
}

export interface Criterion {
  id: string;
  name: string;
  buttonsOrientation: "horizontal" | "vertical";
  buttons: Button[];
  paramName: string;
}

export const bleedingCriteria: Criterion[] = [
  {
    id: "leukemia",
    name: "Acute leukemia",
    buttonsOrientation: "horizontal",
    paramName: "q",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "metas_brain_tumor",
    name: "Metastatic brain tumor",
    buttonsOrientation: "horizontal",
    paramName: "s",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "primary_brain_tumor",
    name: "Primary brain tumor",
    buttonsOrientation: "horizontal",
    paramName: "r",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "plt",
    name: "Plt &lt;50 x 10<sup>9</sup>/L",
    buttonsOrientation: "horizontal",
    paramName: "v",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "alt",
    name: "ALT >5x or Bili >2x ULN",
    buttonsOrientation: "horizontal",
    paramName: "u",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "egfr",
    name: "eGFR &lt;30 mL/min/1.73 m<sup>2</sup>",
    buttonsOrientation: "horizontal",
    paramName: "x",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "weight",
    name: "Weight &lt;40 kg",
    buttonsOrientation: "horizontal",
    paramName: "w",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ac",
    name: "Anticoagulant",
    buttonsOrientation: "horizontal",
    paramName: "z",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ap",
    name: "Non-ASA antiplatelet agent",
    buttonsOrientation: "horizontal",
    paramName: "aa",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "cyp",
    name: "CYP3A4/P-gp inhibitor",
    buttonsOrientation: "horizontal",
    paramName: "y",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "recent",
    name: "Recent bleeding",
    buttonsOrientation: "horizontal",
    paramName: "t",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
];
