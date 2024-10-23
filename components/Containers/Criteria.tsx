"use client";

import React, { Suspense } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter, usePathname } from "next/navigation";
import RiskScore from "../RiskScore";
import BleedingExclusion from "../BleedingExclusion";
import TrialExclusion from "../TrialExclusion";

interface CriteriaProps {
  queryString: string;
}

const Criteria: React.FC<CriteriaProps> = ({ queryString }) => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const currentTab = pathSegments[2] || "risk-score";

  const handleTabChange = (value: string) => {
    router.push(`/criteria/${value}${queryString}`);
  };

  const onNext = () => {
    router.push(`/statistics${queryString}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Criteria</h2>
      <Tabs.Root
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="risk-score"
            className={`pb-2 ${
              currentTab === "risk-score"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Risk Score
          </Tabs.Trigger>
          <Tabs.Trigger
            value="bleeding-exclusion"
            className={`pb-2 ${
              currentTab === "bleeding-exclusion"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bleeding Exclusion
          </Tabs.Trigger>
          <Tabs.Trigger
            value="trial-exclusion"
            className={`pb-2 ${
              currentTab === "trial-exclusion"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Trial Exclusion
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="risk-score" className="mt-4">
          <Suspense fallback={null}><RiskScore /></Suspense>
        </Tabs.Content>
        <Tabs.Content value="bleeding-exclusion" className="mt-4">
          <Suspense fallback={null}><BleedingExclusion /></Suspense>
        </Tabs.Content>
        <Tabs.Content value="trial-exclusion" className="mt-4">
          <TrialExclusion />
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
