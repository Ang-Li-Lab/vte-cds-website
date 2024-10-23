"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { riskCriteria } from "@/lib/riskCriteria";
import ButtonGroup from "./ButtonGroup";

interface SelectedValues {
  [scoreName: string]: {
    [criterionId: string]: string;
  };
}

const RiskScore: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialSelectedValues: SelectedValues = {};

    riskCriteria.forEach((criterion) => {
      Object.keys(criterion.scores).forEach((scoreName) => {
        if (!initialSelectedValues[scoreName]) {
          initialSelectedValues[scoreName] = {};
        }
        const score = criterion.scores[scoreName];
        const paramValue = searchParams.get(score.paramName);
        const matchedButton = score.buttons.find(
          (b) => b.paramValue === paramValue,
        );
        const defaultButtonId = score.buttons[0]?.id || "";
        initialSelectedValues[scoreName][criterion.id] = matchedButton
          ? matchedButton.id
          : defaultButtonId;
      });
    });
    setSelectedValues(initialSelectedValues);
  }, [searchParams]);

  const handleButtonClick = (
    scoreName: string,
    criterionId: string,
    buttonId: string,
  ) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[scoreName] = {
        ...newValues[scoreName],
        [criterionId]: buttonId,
      };

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
            newValues[otherScore] = {
              ...newValues[otherScore],
              [criterionId]: buttonId,
            };
          }
        });
      }

      const params = new URLSearchParams(searchParams.toString());

      Object.keys(newValues).forEach((score) => {
        Object.keys(newValues[score]).forEach((criterion) => {
          const selectedButtonId = newValues[score][criterion];
          const button = riskCriteria
            .find((c) => c.id === criterion)
            ?.scores[score].buttons.find((b) => b.id === selectedButtonId);
          if (button && button.paramValue) {
            params.set(
              riskCriteria.find((c) => c.id === criterion)?.scores[score]
                .paramName || "",
              button.paramValue,
            );
          }
        });
      });

      router.replace(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });

      return newValues;
    });
  };

  const computeTotal = (scoreName: string) => {
    const scoreValues = selectedValues[scoreName] || {};
    return riskCriteria.reduce((total, criterion) => {
      const criterionScore = criterion.scores[scoreName];
      if (criterionScore) {
        const selectedButtonId = scoreValues[criterion.id];
        const selectedButton = criterionScore.buttons.find(
          (b) => b.id === selectedButtonId,
        );
        return total + (selectedButton?.value || 0);
      }
      return total;
    }, 0);
  };

  const khoranaTotal = computeTotal("khorana");
  const ehrCatTotal = computeTotal("ehrcat");

  return (
    <div>
      <table className="min-w-full table-fixed text-center">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="w-1/3"></th>
            <th className="w-1/3 px-4 py-2">
              Khorana Score:{" "}
              <span className="text-red-500">{khoranaTotal}</span>
            </th>
            <th className="w-1/3 px-4 py-2">
              EHR-CAT Score: <span className="text-red-500">{ehrCatTotal}</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {riskCriteria.map((criterion) => (
            <tr key={criterion.id}>
              <td
                className="py-2 text-left align-middle"
                dangerouslySetInnerHTML={{ __html: criterion.name }}
              ></td>
              <td className="px-4 py-2 align-top">
                {criterion.scores["khorana"] && (
                  <ButtonGroup
                    criterionId={criterion.id}
                    buttons={criterion.scores["khorana"].buttons}
                    buttonsOrientation={
                      criterion.scores["khorana"].buttonsOrientation
                    }
                    selectedButtonId={selectedValues["khorana"]?.[criterion.id]}
                    onButtonClick={(criterionId, buttonId) =>
                      handleButtonClick("khorana", criterionId, buttonId)
                    }
                    showValues={true}
                  />
                )}
              </td>
              <td className="px-4 py-2 align-top">
                {criterion.scores["ehrcat"] && (
                  <ButtonGroup
                    criterionId={criterion.id}
                    buttons={criterion.scores["ehrcat"].buttons}
                    buttonsOrientation={
                      criterion.scores["ehrcat"].buttonsOrientation
                    }
                    selectedButtonId={selectedValues["ehrcat"]?.[criterion.id]}
                    onButtonClick={(criterionId, buttonId) =>
                      handleButtonClick("ehrcat", criterionId, buttonId)
                    }
                    showValues={true}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskScore;
