"use client";

import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useAppStore } from "@/store/useAppStore";
import RecommContent from "@/components/RecommContainer/RecommContent";
import RecommReference from "@/components/RecommContainer/RecommReference";

interface RecommContainerProps {
  onPrevious: () => void;
}

const RecommContainer: React.FC<RecommContainerProps> = ({ onPrevious }) => {
  const {
    currentTabs,
    setTab,
    generateShareableLink,
    computedScores,
    hasBleedingExclusions,
    vteHistoryValue,
    acValue,
  } = useAppStore();
  const containerName = "recomm";
  const currentTab = currentTabs[containerName];

  const handleTabChange = useCallback(
    (value: string) => setTab(containerName, value),
    [setTab, containerName],
  );

  const handlePrevious = () => {
    onPrevious();
  };

  const copyLink = useCallback(() => {
    const shareLink = generateShareableLink("recomm");
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  }, [generateShareableLink]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recommendation</h2>
      <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="recomm"
            className={`pb-2 ${currentTab === "recomm" ? "border-b-2 border-blue-600" : ""}`}
          >
            Recommendation
          </Tabs.Trigger>
          {/* <Tabs.Trigger
            value="reference"
            className={`pb-2 ${currentTab === "reference" ? "border-b-2 border-blue-600" : ""}`}
          >
            Reference
          </Tabs.Trigger> */}
        </Tabs.List>
        <Tabs.Content value="recomm" className="mt-4">
          <RecommContent
            computedScore={computedScores["ehrcat"]}
            hasBleedingExclusions={hasBleedingExclusions}
            vteHistoryValue={vteHistoryValue}
            acValue={acValue}
          />
        </Tabs.Content>
        {/* <Tabs.Content value="reference" className="mt-4">
          <RecommReference />
        </Tabs.Content> */}
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

export default RecommContainer;
