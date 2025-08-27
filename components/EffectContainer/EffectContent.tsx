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

const fmtPct = (n: number | null) => (n == null ? "Excluded" : `${n}%`);
const fmtPct2 = (n: number | null) => (n == null ? "Excluded" : `${n.toFixed(2)}%`);

function MetricContent({
  iconSrc,
  iconAlt = "",
  label,
  value,
  valueClass = "",
  gridClass = "grid-cols-[64px,180px,64px]",
}: {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  value: string;
  valueClass?: string;
  gridClass?: string;
}) {
  return (
    <div className="h-24 flex items-center justify-center">
      <div className={`grid ${gridClass} items-center gap-3`}>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={64}
          height={64}
          className="h-16 w-16 object-contain"
        />
        <div className="text-sm truncate">{label}</div>
        <div
          className={`text-right whitespace-nowrap tabular-nums ${valueClass}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ArrowContent({
  iconSrc,
  iconAlt = "",
  label,
  widthClass = "w-18",
}: {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  widthClass?: string;
}) {
  return (
    <div className="h-24 flex flex-col items-center justify-center">
      {label ? (
        <span className="mb-1 text-sm text-gray-900 whitespace-nowrap tabular-nums">
          {label}
        </span>
      ) : (
        <span className="sr-only">No change</span>
      )}
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={96}
        height={64}
        className={`${widthClass} h-auto object-contain`}
      />
    </div>
  );
}

function EffectTable({
  leftHeader,
  midHeader,
  rightHeader,
  leftR1,
  midR1,
  rightR1,
  midR2,
  rightR2,
  leftR3,
  midR3,
  rightR3,
  leftR4,
  midR4,
  rightR4,
}: {
  leftHeader: React.ReactNode;
  midHeader: React.ReactNode;
  rightHeader: React.ReactNode;

  leftR1: React.ReactNode;
  midR1: React.ReactNode;
  rightR1: React.ReactNode;
  midR2: React.ReactNode;
  rightR2: React.ReactNode;

  leftR3: React.ReactNode;
  midR3: React.ReactNode;
  rightR3: React.ReactNode;

  leftR4: React.ReactNode;
  midR4: React.ReactNode;
  rightR4: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 items-center mb-3">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">{leftHeader}</div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">{midHeader}</div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <Image
              src="/drug.png"
              alt="Low-dose DOAC"
              width={20}
              height={20}
              className="h-12 w-12 object-contain"
            />
            {rightHeader}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
        <table className="w-full table-fixed border-separate [border-spacing:0]">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[20%]" />
            <col className="w-[40%]" />
          </colgroup>
          <tbody>
            <tr className="border-b border-gray-200">
              <td rowSpan={2} className="align-middle border-b border-gray-200">{leftR1}</td>
              <td className="align-middle border-b border-gray-200">{midR1}</td>
              <td className="align-middle border-b border-gray-200">{rightR1}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="align-middle border-b border-gray-200">{midR2}</td>
              <td className="align-middle border-b border-gray-200">{rightR2}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="align-middle border-b border-gray-200">{leftR3}</td>
              <td className="align-middle border-b border-gray-200">{midR3}</td>
              <td className="align-middle border-b border-gray-200">{rightR3}</td>
            </tr>

            <tr>
              <td className="align-middle">{leftR4}</td>
              <td className="align-middle">{midR4}</td>
              <td className="align-middle">{rightR4}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const EffectContent: React.FC<EffectContentProps> = ({
  computedScore = 0,
  hasBleedingExclusions,
  vteHistoryValue,
  acValue,
}) => {
  const vteRisk = vteHistoryValue === "1" && acValue === "1" ? null : calcVteRisk(computedScore);

  const blue = "text-blue-600";
  const red = "text-red-600";
  const muted = "text-gray-500";

  // VTE rows
  const vteLeftLabel = "VTE (at 6 month)";
  const vteLeftValue = fmtPct(vteRisk);
  const vteLeftClass = vteRisk == null ? muted : blue;

  const vteRight1Label = "VTE (intention-to-treat)";
  const vteRight1Value = fmtPct2(vteRisk != null ? vteRisk * 0.56 : null);

  const vteRight2Label = "VTE (on-treatment)";
  const vteRight2Value = fmtPct2(vteRisk != null ? vteRisk * 0.30 : null);

  // MB
  const mbLeftLabel = "MB (at 6 month)";
  const mbLeftValue = hasBleedingExclusions ? "Excluded" : "1%";
  const mbClass = hasBleedingExclusions ? muted : red;

  // CRNMB
  const crnmbLeftLabel = "CRNMB (at 6 month)";
  const crnmbLeftValue = hasBleedingExclusions ? "Excluded" : "3.2%";
  const crnmbClass = hasBleedingExclusions ? muted : red;

  return (
    <div className="w-full">
      <EffectTable
        leftHeader={<span>Baseline Risk</span>}
        midHeader={<span></span>}
        rightHeader={<span>With Low-dose DOAC (apixaban or rivaroxaban)</span>}

        leftR1={
          <MetricContent
            iconSrc="/leg.png"
            iconAlt={vteLeftLabel}
            label={vteLeftLabel}
            value={vteLeftValue}
            valueClass={vteLeftClass}
            gridClass="grid-cols-[64px,150px,64px]"
          />
        }
        midR1={<ArrowContent label={vteRisk == null ? "" : "44% decrease"} iconSrc="/blue_arrow.png" />}
        rightR1={
          <MetricContent
            iconSrc="/leg.png"
            iconAlt={`${vteRight1Label} with DOAC`}
            label={vteRight1Label}
            value={vteRight1Value}
            valueClass={vteLeftClass}
            gridClass="grid-cols-[64px,180px,64px]"
          />
        }

        midR2={<ArrowContent label={vteRisk == null ? "" : "70% decrease"} iconSrc="/blue_arrow.png" />}
        rightR2={
          <MetricContent
            iconSrc="/leg.png"
            iconAlt={`${vteRight2Label} with DOAC`}
            label={vteRight2Label}
            value={vteRight2Value}
            valueClass={vteLeftClass}
            gridClass="grid-cols-[64px,180px,64px]"
          />
        }

        leftR3={
          <MetricContent
            iconSrc="/brain.png"
            iconAlt={mbLeftLabel}
            label={mbLeftLabel}
            value={mbLeftValue}
            valueClass={mbClass}
            gridClass="grid-cols-[64px,150px,64px]"
          />
        }
        midR3={<ArrowContent label={hasBleedingExclusions ? "" : "96% increase"} iconSrc="/red_arrow.png" />}
        rightR3={
          <MetricContent
            iconSrc="/brain.png"
            iconAlt="MB with DOAC"
            label="MB (on-treatment)"
            value={hasBleedingExclusions ? "Excluded" : "1.96%"}
            valueClass={mbClass}
            gridClass="grid-cols-[64px,180px,64px]"
          />
        }

        leftR4={
          <MetricContent
            iconSrc="/finger.png"
            iconAlt={crnmbLeftLabel}
            label={crnmbLeftLabel}
            value={crnmbLeftValue}
            valueClass={crnmbClass}
            gridClass="grid-cols-[64px,150px,64px]"
          />
        }
        midR4={<ArrowContent label={hasBleedingExclusions ? "" : "28% increase"} iconSrc="/red_arrow.png" />}
        rightR4={
          <MetricContent
            iconSrc="/finger.png"
            iconAlt="CRNMB with DOAC"
            label="CRNMB (on-treatment)"
            value={hasBleedingExclusions ? "Excluded" : "4.1%"}
            valueClass={crnmbClass}
            gridClass="grid-cols-[64px,180px,64px]"
          />
        }
      />

      <div className="mt-3 text-xs">
        <span className="mr-3">MB: Major Bleeding</span>
        <span className="mr-3">CRNMB: Clinically Relevant Non-Major Bleeding</span>
        <br />
        <span className="mr-3">
          intention-to-treat: risk with usual use of the medication, including interruption, non-adherence, and early discontinuation
        </span>
        <br />
        <span className="mr-3">on-treatment: risk while actively receiving the medication</span>
      </div>
    </div>
  );
};

export default EffectContent;
