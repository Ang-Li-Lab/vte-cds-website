import { useAppStore } from "@/store/useAppStore";
import { useCallback, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RiskScore from "@/components/RiskContainer/RiskScore";
import BleedingExclusion from "@/components/RiskContainer/BleedingExclusion";
import AboutEhrCat from "@/components/RiskContainer/AboutEhrCat";

interface RiskContainerProps {
  onNext: () => void;
}

const RiskContainer: React.FC<RiskContainerProps> = ({ onNext }) => {
  const { currentTabs, setTab, generateShareableLink } = useAppStore();
  const containerName = "risk";
  const currentTab = currentTabs[containerName];

  const handleTabChange = useCallback(
    (value: string) => setTab(containerName, value),
    [setTab, containerName],
  );

  const copyLink = useCallback(() => {
    const shareLink = generateShareableLink("risk");
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  }, [generateShareableLink]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Risk Stratification</h2>
      <Tabs.Root
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="score"
            className={`pb-2 ${currentTab === "score" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Risk Score
          </Tabs.Trigger>
          <Tabs.Trigger
            value="exclusion"
            className={`pb-2 ${currentTab === "exclusion" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Bleeding Exclusion
          </Tabs.Trigger>
          <Tabs.Trigger
            value="about-ehrcat"
            className={`pb-2 ${currentTab === "about-ehrcat" ? "border-b-2 border-blue-600" : ""}`}
          >
            About EHR-CAT
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="score">
          <RiskScore />
        </Tabs.Content>
        <Tabs.Content value="exclusion">
          <BleedingExclusion />
        </Tabs.Content>
        <Tabs.Content value="about-ehrcat" className="mt-4">
          <AboutEhrCat />
        </Tabs.Content>
      </Tabs.Root>
      {/* <div className="mt-4 grid grid-cols-3">
        <div></div>
        <div className="flex justify-center items-center">
          <button onClick={copyLink} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            Share
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Next →
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default RiskContainer;
