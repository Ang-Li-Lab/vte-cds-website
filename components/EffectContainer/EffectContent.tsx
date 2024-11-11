import React from "react";
import Image from "next/image";

interface EffectContentProps {
  computedScore: number;
  hasBleedingExclusions: boolean;
  vteHistoryValue: string | null;
  acValue: string | null;
}

const calcVteRisk = (score: number): number => {
  if (score <= 0) return 1;
  if (score === 1) return 3;
  if (score === 2) return 5;
  if (score === 3) return 7;
  if (score === 4) return 9;
  if (score >= 5) return 11;
  return 0;
};

const EffectContent: React.FC<EffectContentProps> = ({
  computedScore = 0,
  hasBleedingExclusions,
  vteHistoryValue,
  acValue,
}) => {
  const vteRisk =
    vteHistoryValue === "1" && acValue === "1"
      ? null
      : calcVteRisk(computedScore);
  const vteRiskDrug = vteRisk ? vteRisk * 0.56 : null;

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center h-full">
          <h2 className="mb-2">Estimated VTE Risk at 6 Months</h2>
          <div className="flex items-center">
            <Image
              src="/leg.png"
              width={0}
              height={0}
              alt=""
              className="w-28 h-28"
            />
            <span className="ml-2 text-blue-500">
              {vteRisk != null ? `${vteRisk}%` : "Excluded"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center h-full">
          <h2 className="mb-2">Estimated CRB Risk at 6 Months</h2>
          <div className="flex items-center">
            <Image
              src="/finger.png"
              width={0}
              height={0}
              alt=""
              className="w-28 h-28"
            />
            <span className="ml-2 text-red-500">
              {hasBleedingExclusions ? "Excluded" : "4%"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="mb-2 text-center text-black">
            {vteRiskDrug ? "44% Decrease" : ""}
          </span>
          <Image
            src="/blue_arrow.png"
            width={0}
            height={0}
            alt=""
            className="w-28 h-18"
          />
        </div>
        <div className="flex items-center justify-center h-full">
          <Image
            src="/drug.png"
            width={0}
            height={0}
            alt=""
            className="w-20 h-20"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <span className="mb-2 text-center text-black">
            {hasBleedingExclusions ? "" : "50% Increase"}
          </span>
          <Image
            src="/red_arrow.png"
            width={0}
            height={0}
            alt=""
            className="w-28 h-18"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="mb-2">If given low-dose apixaban or rivaroxaban</h2>
          <div className="flex items-center">
            <Image
              src="/leg.png"
              width={0}
              height={0}
              alt=""
              className="w-28 h-28"
            />
            <span className="ml-2 text-blue-500">
              {vteRiskDrug != null ? `${vteRiskDrug.toFixed(2)}%` : "Excluded"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="mb-2">If given low-dose apixaban or rivaroxaban</h2>
          <div className="flex items-center">
            <Image
              src="/finger.png"
              width={0}
              height={0}
              alt=""
              className="w-28 h-28"
            />
            <span className="ml-2 text-red-500">
              {hasBleedingExclusions ? "Excluded" : "6%"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectContent;
