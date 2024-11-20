"use client";

import { useAppStore } from "@/store/useAppStore";
import { riskCriteria } from "@/lib/riskCriteria";
import ButtonGroup from "@/components/ButtonGroup";

const RiskScore: React.FC = () => {
  const {
    selectedValues,
    setSelectedValues,
    computedScores,
    vteHistoryValue,
    acValue,
  } = useAppStore();

  const handleButtonClick = (
    scoreName: string,
    criterionId: string,
    buttonId: string,
  ) => {
    setSelectedValues("risk", scoreName, criterionId, buttonId);
  };

  const khoranaTotal =
    vteHistoryValue === "1" && acValue === "1"
      ? "N/A"
      : computedScores["khorana"];
  const ehrCatTotal =
    vteHistoryValue === "1" && acValue === "1"
      ? "N/A"
      : computedScores["ehrcat"];

  return (
    <div>
      <table className="min-w-full table-fixed text-center">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="w-1/3"></th>
            <th className="w-1/3 px-4 py-2">
              Khorana Score:{" "}
              <span className="text-red-500">{khoranaTotal}</span>
              <span className="font-normal text-sm"> (restricted to 0-3)</span>
            </th>
            <th className="w-1/3 px-4 py-2">
              EHR-CAT Score: <span className="text-red-500">{ehrCatTotal}</span>
              <span className="font-normal text-sm"> (restricted to 0-5)</span>
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
                    selectedButtonId={
                      selectedValues.risk["khorana"]?.[criterion.id]
                    }
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
                    selectedButtonId={
                      selectedValues.risk["ehrcat"]?.[criterion.id]
                    }
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
