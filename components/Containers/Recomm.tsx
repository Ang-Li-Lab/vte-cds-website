"use client";

import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";

interface SummaryProps {
  queryString: string;
}

const Summary: React.FC<SummaryProps> = ({ queryString }) => {
  const [currentTab, setCurrentTab] = useState("recomm");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const tab = pathSegments[2] || "recomm";
      setCurrentTab(tab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    const newUrl = `/recomm/${value}${queryString}`;
    window.history.replaceState(null, "", newUrl);
    setCurrentTab(value);
  };

  const onPrevious = () => {
    const newUrl = `/effect${queryString}`;
    window.history.replaceState(null, "", newUrl);
    document.getElementById("effect")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recommendation</h2>
      <Tabs.Root
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="recomm"
            className={`pb-2 ${
              currentTab === "recomm"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Recommendation
          </Tabs.Trigger>
          <Tabs.Trigger
            value="reference"
            className={`pb-2 ${
              currentTab === "reference"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Reference
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="recomm" className="mt-4">
            tab one
        </Tabs.Content>
        <Tabs.Content value="reference" className="mt-4">
            tab two
        </Tabs.Content>
      </Tabs.Root>
      <div className="mt-4 flex justify-start">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Previous
        </button>
      </div>
    </div>
  );
};

export default Summary;
