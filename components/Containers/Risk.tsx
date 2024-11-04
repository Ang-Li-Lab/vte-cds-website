"use client";

import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RiskScore from "../RiskScore";
import BleedingExclusion from "../BleedingExclusion";

interface CriteriaProps {
  queryString: string;
}

const Criteria: React.FC<CriteriaProps> = ({ queryString }) => {
  const [currentTab, setCurrentTab] = useState("score");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const tab = pathSegments[2] || "score";
      setCurrentTab(tab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    const newUrl = `/risk/${value}${queryString}`;
    window.history.replaceState(null, "", newUrl);
    setCurrentTab(value);
  };

  const onNext = () => {
    const newUrl = `/effect${queryString}`;
    window.history.pushState(null, "", newUrl);
  };

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
            className={`pb-2 ${
              currentTab === "score"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Risk Score
          </Tabs.Trigger>
          <Tabs.Trigger
            value="exclusion"
            className={`pb-2 ${
              currentTab === "exclusion"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bleeding Exclusion
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="score" className="mt-4">
          <RiskScore />
        </Tabs.Content>
        <Tabs.Content value="exclusion" className="mt-4">
          <BleedingExclusion />
        </Tabs.Content>
      </Tabs.Root>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Criteria;
