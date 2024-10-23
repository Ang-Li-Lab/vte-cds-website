"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { bleedingCriteria } from "@/lib/bleedingExclusion";
import ButtonGroup from "./ButtonGroup";

const BleedingExclusion: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const initialSelectedValues: { [key: string]: string } = {};

    bleedingCriteria.forEach((criterion) => {
      const paramValue = searchParams.get(criterion.paramName);
      const matchedButton = criterion.buttons.find(
        (b) => b.paramValue === paramValue,
      );
      const defaultButtonId = criterion.buttons[0]?.id || "unknown";
      initialSelectedValues[criterion.id] = matchedButton
        ? matchedButton.id
        : defaultButtonId;
    });

    setSelectedValues(initialSelectedValues);
  }, [searchParams]);

  const handleButtonClick = (criterionId: string, buttonId: string) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[criterionId] = buttonId;

      const params = new URLSearchParams(searchParams.toString());

      const selectedButton = bleedingCriteria
        .find((c) => c.id === criterionId)
        ?.buttons.find((b) => b.id === buttonId);

      if (selectedButton && selectedButton.paramValue) {
        const paramName = bleedingCriteria.find(
          (c) => c.id === criterionId,
        )?.paramName;
        if (paramName) {
          params.set(paramName, selectedButton.paramValue);
        }
      }

      router.replace(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });

      return newValues;
    });
  };

  return (
    <div>
      <table className="min-w-full table-fixed text-center">
        <thead>
          <tr>
            <th className="w-1/2"></th>
            <th className="w-1/2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bleedingCriteria.map((criterion) => (
            <tr key={criterion.id}>
              <td
                className="py-2 text-left align-middle"
                dangerouslySetInnerHTML={{ __html: criterion.name }}
              ></td>
              <td className="px-4 py-2 align-top">
                <ButtonGroup
                  criterionId={criterion.id}
                  buttons={criterion.buttons}
                  selectedButtonId={selectedValues[criterion.id]}
                  onButtonClick={handleButtonClick}
                  showValues={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BleedingExclusion;
