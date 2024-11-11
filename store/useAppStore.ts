import { create } from "zustand";
import { riskCriteria } from "@/lib/riskCriteria";
import { bleedingCriteria } from "@/lib/bleedingExclusion";

interface SelectedValues {
  risk: {
    [scoreName: string]: {
      [criterionId: string]: string;
    };
  };
  bleeding: {
    [criterionId: string]: string;
  };
}

interface AppState {
  selectedValues: SelectedValues;
  currentContainer: string;
  currentTabs: Record<string, string>;
  isInitialized: boolean;
  setContainer: (container: string) => void;
  setTab: (container: string, tab: string) => void;
  setSelectedValues: (
    category: "risk" | "bleeding",
    scoreName: string | null,
    criterionId: string,
    buttonId: string,
  ) => void;
  generateShareableLink: (container: string) => string;
  initializeStateFromUrl: (searchParams: URLSearchParams) => void;
  computedScores: {
    [scoreName: string]: number;
  };
  hasBleedingExclusions: boolean;
  vteHistoryValue: string | null;
  acValue: string | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedValues: {
    risk: {},
    bleeding: {},
  },
  computedScores: {},
  hasBleedingExclusions: false,
  vteHistoryValue: null,
  acValue: null,
  currentContainer: "risk",
  currentTabs: {
    risk: "score",
    effect: "effect",
    recomm: "recomm",
  },
  isInitialized: false,

  setContainer: (container) => set({ currentContainer: container }),

  setTab: (container, tab) =>
    set((state) => ({
      currentTabs: {
        ...state.currentTabs,
        [container]: tab,
      },
    })),

  setSelectedValues: (category, scoreName, criterionId, buttonId) =>
    set((state) => {
      const newSelectedValues = { ...state.selectedValues };

      if (category === "risk" && scoreName) {
        if (!newSelectedValues.risk[scoreName]) {
          newSelectedValues.risk[scoreName] = {};
        }
        newSelectedValues.risk[scoreName][criterionId] = buttonId;

        // Sync buttons
        const criterion = riskCriteria.find((c) => c.id === criterionId);
        if (criterion) {
          const otherScores = Object.keys(criterion.scores).filter(
            (s) => s !== scoreName,
          );

          otherScores.forEach((otherScore) => {
            const buttonsCurrentScore = criterion.scores[scoreName].buttons;
            const buttonsOtherScore = criterion.scores[otherScore].buttons;

            const areButtonsIdentical =
              JSON.stringify(buttonsCurrentScore) ===
              JSON.stringify(buttonsOtherScore);

            if (areButtonsIdentical) {
              if (!newSelectedValues.risk[otherScore]) {
                newSelectedValues.risk[otherScore] = {};
              }
              newSelectedValues.risk[otherScore][criterionId] = buttonId;
            }
          });
        }

        const totalKhorana = computeForScore(
          newSelectedValues.risk["khorana"],
          "khorana",
        );

        const totalEhrcat = computeForScore(
          newSelectedValues.risk["ehrcat"],
          "ehrcat",
        );

        let vteHistoryValue = state.vteHistoryValue;
        if (criterionId === "vte_history") {
          vteHistoryValue = getButtonParamValue(
            "risk",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        return {
          selectedValues: newSelectedValues,
          computedScores: {
            ...state.computedScores,
            ["khorana"]: totalKhorana,
            ["ehrcat"]: totalEhrcat,
          },
          vteHistoryValue,
        };
      } else if (category === "bleeding") {
        newSelectedValues.bleeding[criterionId] = buttonId;
        let acValue = state.acValue;

        const hasBleedingExclusions = checkForBleedingExclusions(
          newSelectedValues.bleeding,
        );

        if (criterionId === "ac") {
          acValue = getButtonParamValue(
            "bleeding",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        return {
          selectedValues: newSelectedValues,
          hasBleedingExclusions,
          acValue,
        };
      }

      return { selectedValues: newSelectedValues };
    }),

  generateShareableLink: (container: string) => {
    const { currentTabs, selectedValues } = get();
    const params = new URLSearchParams();

    params.set("container", container);

    Object.entries(currentTabs).forEach(([container, tab]) => {
      params.set(`${container}Tab`, tab);
    });

    // Handle Risk Criteria
    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const selectedButtonId = selectedValues.risk[scoreName]?.[criterion.id];
        if (selectedButtonId) {
          const button = score.buttons.find((b) => b.id === selectedButtonId);
          if (button) {
            params.set(score.paramName, button.paramValue);
          }
        }
      });
    });

    // Handle Bleeding Exclusion Criteria
    bleedingCriteria.forEach((criterion) => {
      const selectedButtonId = selectedValues.bleeding[criterion.id];
      if (selectedButtonId) {
        const button = criterion.buttons.find((b) => b.id === selectedButtonId);
        if (button) {
          params.set(criterion.paramName, button.paramValue);
        }
      }
    });

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  },

  initializeStateFromUrl: (searchParams: URLSearchParams) => {
    if (get().isInitialized) return;

    const selectedValues: SelectedValues = {
      risk: {},
      bleeding: {},
    };

    const containerParam = searchParams.get("container");
    const currentContainer = containerParam || "risk";
    const currentTabs: Record<string, string> = {
      risk: searchParams.get("riskTab") || "score",
      effect: searchParams.get("effectTab") || "effect",
      recomm: searchParams.get("recommTab") || "recomm",
    };

    let vteHistoryValue = null;
    let acValue = null;

    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const paramValue = searchParams.get(score.paramName);
        let matchedButton = score.buttons.find(
          (b) => b.paramValue === paramValue,
        );

        if (!matchedButton) {
          matchedButton = score.buttons.find((b) => b.paramValue === "9");
        }

        if (matchedButton) {
          if (!selectedValues.risk[scoreName]) {
            selectedValues.risk[scoreName] = {};
          }
          selectedValues.risk[scoreName][criterion.id] = matchedButton.id;

          if (criterion.id === "vte_history") {
            vteHistoryValue = matchedButton.paramValue;
          }
        }
      });
    });

    bleedingCriteria.forEach((criterion) => {
      const paramValue = searchParams.get(criterion.paramName);
      let matchedButton = criterion.buttons.find(
        (b) => b.paramValue === paramValue,
      );

      if (!matchedButton) {
        matchedButton = criterion.buttons.find((b) => b.paramValue === "9");
      }

      if (matchedButton) {
        selectedValues.bleeding[criterion.id] = matchedButton.id;

        if (criterion.id === "ac") {
          acValue = matchedButton.paramValue;
        }
      }
    });

    const computedScores: { [scoreName: string]: number } = {};
    Object.keys(selectedValues.risk).forEach((scoreName) => {
      computedScores[scoreName] = computeForScore(
        selectedValues.risk[scoreName],
        scoreName,
      );
    });

    const hasBleedingExclusions = checkForBleedingExclusions(
      selectedValues.bleeding,
    );

    set({
      selectedValues,
      computedScores,
      hasBleedingExclusions,
      vteHistoryValue,
      acValue,
      currentContainer,
      currentTabs,
      isInitialized: true,
    });

    set({
      selectedValues,
      currentContainer,
      currentTabs,
      isInitialized: true,
    });
  },
}));

const computeForScore = (
  selectedCriteria: { [criterionId: string]: string },
  scoreName: string,
): number => {
  return riskCriteria.reduce((total, criterion) => {
    const criterionScore = criterion.scores[scoreName];
    if (criterionScore) {
      const selectedButtonId = selectedCriteria[criterion.id];
      const selectedButton = criterionScore.buttons.find(
        (b) => b.id === selectedButtonId,
      );
      return total + (selectedButton?.value || 0);
    }
    return total;
  }, 0);
};

const checkForBleedingExclusions = (bleedingSelections: {
  [criterionId: string]: string;
}): boolean => {
  for (const criterionId in bleedingSelections) {
    const selectedButtonId = bleedingSelections[criterionId];
    const criterion = bleedingCriteria.find((c) => c.id === criterionId);
    const selectedButton = criterion?.buttons.find(
      (b) => b.id === selectedButtonId,
    );
    if (selectedButton?.paramValue === "1") {
      return true;
    }
  }
  return false;
};

const getButtonParamValue = (
  category: "risk" | "bleeding",
  scoreName: string | null,
  criterionId: string,
  buttonId: string,
): string | null => {
  if (category === "risk" && scoreName) {
    const criterion = riskCriteria.find((c) => c.id === criterionId);
    const score = criterion?.scores[scoreName];
    const button = score?.buttons.find((b) => b.id === buttonId);
    return button?.paramValue || null;
  } else if (category === "bleeding") {
    const criterion = bleedingCriteria.find((c) => c.id === criterionId);
    const button = criterion?.buttons.find((b) => b.id === buttonId);
    return button?.paramValue || null;
  }

  return null;
};
