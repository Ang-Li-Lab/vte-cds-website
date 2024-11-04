"use client";

import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";

interface StatisticsProps {
  queryString: string;
}

const Statistics: React.FC<StatisticsProps> = ({ queryString }) => {
  const [currentTab, setCurrentTab] = useState("effect");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const tab = pathSegments[2] || "effect";
      setCurrentTab(tab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    const newUrl = `/effect/${value}${queryString}`;
    window.history.replaceState(null, "", newUrl);
    setCurrentTab(value);
  };

  const onNext = () => {
    const newUrl = `/recomm${queryString}`;
    window.history.pushState(null, "", newUrl);
  };

  const onPrevious = () => {
    const newUrl = `/risk${queryString}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Effect of Intervention</h2>
      <Tabs.Root
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="effect"
            className={`pb-2 ${
              currentTab === "effect"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Effect
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
        <Tabs.Content value="effect" className="mt-4">
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="mb-2">Estimated VTE Risk at 6 Months</h2>
                <div className="flex items-center">
                  <Image src="/leg.png" width={100} height={100} alt=""/>
                  <span className="ml-2">Image X</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="mb-2">Estimated CRB Risk at 6 Months</h2>
                <div className="flex items-center">
                  <Image src="/finger.png" width={100} height={100} alt=""/>
                  <span className="ml-2">Image X</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center h-full">sdfsdf</div>
              <div className="flex items-center justify-center h-full">werwer</div>
              <div className="flex items-center justify-center h-full">sdfsf</div>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="mb-2">If given low-dose apixaban or rivaroxaban</h2>
                <div className="flex items-center">
                  <Image src="/leg.png" width={100} height={100} alt=""/>
                  <span className="ml-2">Image X</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="mb-2">If given low-dose apixaban or rivaroxaban</h2>
                <div className="flex items-center">
                  <Image src="/finger.png" width={100} height={100} alt=""/>
                  <span className="ml-2">Image X</span>
                </div>
              </div>
            </div>
          </div>

        </Tabs.Content>
        <Tabs.Content value="reference" className="mt-4">
            tab two
        </Tabs.Content>
      </Tabs.Root>
      <div className="mt-4 flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Previous
        </button>
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

export default Statistics;
