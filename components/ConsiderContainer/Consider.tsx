"use client";

import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useAppStore } from "@/store/useAppStore";
import ConsiderContent from "@/components/ConsiderContainer/ConsiderContent";
import ConsiderGuidelines from "@/components/ConsiderContainer/ConsiderGuidelines";
import ConsiderReferences from "@/components/ConsiderContainer/ConsiderReferences";

interface ConsiderContainerProps {
  onPrevious: () => void;
}

const ConsiderContainer: React.FC<ConsiderContainerProps> = ({ onPrevious }) => {
  const {
    currentTabs,
    setTab,
    generateShareableLink,
    computedScores,
    hasBleedingExclusions,
    vteHistoryValue,
    acValue,
  } = useAppStore();
  const containerName = "consider";
  const currentTab = currentTabs[containerName];

  const handleTabChange = useCallback(
    (value: string) => setTab(containerName, value),
    [setTab, containerName],
  );

  const handlePrevious = () => {
    onPrevious();
  };

  const copyLink = useCallback(() => {
    const shareLink = generateShareableLink("consider");
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  }, [generateShareableLink]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Consideration</h2>
      <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="consider"
            className={`pb-2 ${currentTab === "consider" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Consideration
          </Tabs.Trigger>
          <Tabs.Trigger
            value="guidelines"
            className={`pb-2 ${currentTab === "guidelines" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Guidelines
          </Tabs.Trigger>
          <Tabs.Trigger
            value="references"
            className={`pb-2 ${currentTab === "references" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            References
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="consider" className="mt-4">
          <ConsiderContent
            computedScore={computedScores["ehrcat"]}
            hasBleedingExclusions={hasBleedingExclusions}
            vteHistoryValue={vteHistoryValue}
            acValue={acValue}
          />
        </Tabs.Content>
        <Tabs.Content value="guidelines" className="mt-4">
          <ConsiderGuidelines />
        </Tabs.Content>
        <Tabs.Content value="references" className="mt-4">
          <ConsiderReferences />
        </Tabs.Content>
      </Tabs.Root>
      <div className="mt-4 grid grid-cols-3">
        <div className="flex justify-center items-center">
          {/* <button
            onClick={handlePrevious}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ml-2"
          >
            ← Previous
          </button> */}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={copyLink}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Share
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ConsiderContainer;
