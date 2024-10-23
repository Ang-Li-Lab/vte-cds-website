"use client";

import React, { useState, useEffect } from "react";
import { sectionedCriteria } from "@/lib/trialExclusion";
import ButtonGroup from "./ButtonGroup";

interface SelectedValues {
  [criterionId: string]: string;
}

export default function TrialExclusion() {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});

  useEffect(() => {
    const initialSelectedValues: SelectedValues = {};
    sectionedCriteria.forEach((section) => {
      section.criteria.forEach((criterion) => {
        initialSelectedValues[criterion.id] = "unknown";
      });
    });
    setSelectedValues(initialSelectedValues);
  }, []);

  const handleButtonClick = (criterionId: string, buttonId: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [criterionId]: buttonId,
    }));
  };

  const standardButtons = [
    { id: "unknown", name: "Unknown", color: "gray-500" },
    { id: "no", name: "No", color: "blue-500" },
    { id: "yes", name: "Yes", color: "red-500" },
  ];

  return (
    <div>
      {sectionedCriteria.map((section, sectionIndex) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{section.title}:</h2>

          <table className="min-w-full ml-8 table-fixed text-center">
            <thead>
              <tr>
                <th className="w-1/2"></th>
                <th className="w-1/2"></th>
              </tr>
            </thead>
            <tbody>
              {section.criteria.map((criterion) => (
                <tr key={criterion.id}>
                  <td
                    className="py-2 text-left align-middle"
                    dangerouslySetInnerHTML={{ __html: criterion.name }}
                  ></td>
                  <td className="px-4 py-2 align-top">
                    <ButtonGroup
                      criterionId={criterion.id}
                      buttons={standardButtons}
                      selectedButtonId={selectedValues[criterion.id]}
                      onButtonClick={handleButtonClick}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sectionIndex < sectionedCriteria.length - 1 && (
            <hr className="mt-6 border-t-2 border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
