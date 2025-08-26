import React from "react";
import Image from "next/image";

interface EffectContentProps {
  computedScore: number;
  hasBleedingExclusions: boolean;
  vteHistoryValue: string | null;
  acValue: string | null;
}

type RiskStr = string;

const calcVteRisk = (score: number): number => {
  if (score <= 0) return 1;
  if (score === 1) return 3;
  if (score === 2) return 5;
  if (score === 3) return 7;
  if (score === 4) return 9;
  if (score >= 5) return 11;
  return 0;
};

function ColumnHeader({
  children,
  iconSrc,
  iconAlt,
}: {
  children: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={iconAlt ?? ""}
          width={20}
          height={20}
          className="h-12 w-12 object-contain"
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}

function MetricCell({
  iconSrc,
  iconAlt = "",
  title,
  value,
  valueClass = "",
}: {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="h-24 flex items-center justify-center">
      <div className="grid grid-cols-[64px,200px,64px] items-center gap-3">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={64}
          height={64}
          className="h-16 w-16 object-contain"
        />
        <div className="text-sm truncate">{title}</div>
        <div
          className={`text-right whitespace-nowrap tabular-nums ${valueClass}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ArrowCell({
  arrowSrc,
  arrowAlt = "",
  deltaLabel,
  widthClass = "w-16",
}: {
  arrowSrc: string;
  arrowAlt?: string;
  deltaLabel?: string;
  widthClass?: string;
}) {
  return (
    <div className="h-24 flex flex-col items-center justify-center">
      {deltaLabel ? (
        <span className="mb-1 text-sm text-gray-900 whitespace-nowrap tabular-nums">
          {deltaLabel}
        </span>
      ) : (
        <span className="sr-only">No change</span>
      )}
      <Image
        src={arrowSrc}
        alt={arrowAlt}
        width={96}
        height={64}
        className={`${widthClass} h-auto object-contain`}
      />
    </div>
  );
}

function TableRow({
  left,
  middle,
  right,
}: {
  left: React.ReactNode;
  middle: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 items-center py-2">
      <div className="flex justify-center">{left}</div>
      <div className="flex justify-center">{middle}</div>
      <div className="flex justify-center">{right}</div>
    </div>
  );
}

function RiskComparison({
  headers = {
    left: "Baseline risk",
    middle: "Change with DOAC",
    right: "With DOAC",
  },
  rows,
}: {
  headers?: { left: string; middle: string; right: string };
  rows: Array<{
    id: string;
    icon: string;
    leftLabel: string;
    leftValue: RiskStr;
    rightLabel: string;
    rightValue: RiskStr;
    arrow: {
      src: string;
      label?: string;
      widthClass?: string;
      alt?: string;
    };
    valueClass?: {
      left?: string;
      right?: string;
    };
  }>;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 items-center mb-3">
        <div className="flex justify-center">
          <ColumnHeader>{headers.left}</ColumnHeader>
        </div>
        <div className="flex justify-center">
          <ColumnHeader>{headers.middle}</ColumnHeader>
        </div>
        <div className="flex justify-center">
          <ColumnHeader iconSrc="/drug.png" iconAlt="Low-dose DOAC">
            {headers.right}
          </ColumnHeader>
        </div>
      </div>

      <div className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
        {rows.map((r) => (
          <TableRow
            key={r.id}
            left={
              <MetricCell
                iconSrc={r.icon}
                iconAlt={r.leftLabel}
                title={r.leftLabel}
                value={r.leftValue}
                valueClass={r.valueClass?.left ?? ""}
              />
            }
            middle={
              <ArrowCell
                arrowSrc={r.arrow.src}
                arrowAlt={r.arrow.alt ?? "Change"}
                deltaLabel={r.arrow.label}
                widthClass={r.arrow.widthClass ?? "w-16"}
              />
            }
            right={
              <MetricCell
                iconSrc={r.icon}
                iconAlt={`${r.rightLabel} with DOAC`}
                title={r.rightLabel}
                value={r.rightValue}
                valueClass={r.valueClass?.right ?? ""}
              />
            }
          />
        ))}
      </div>

      <div className="mt-3 text-xs">
        <span className="mr-3">
          MB: Major Bleeding
        </span>
        <span className="mr-3">
          CRNMB: Clinically Relevant Non-Major Bleeding
        </span>
        <span className="mr-3">
          On-treatment: risk while receiving therapy
        </span>
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
  const vteRisk =
    vteHistoryValue === "1" && acValue === "1"
      ? null
      : calcVteRisk(computedScore);
  const vteRiskDrug = vteRisk != null ? vteRisk * 0.56 : null;

  const blue = "text-blue-600";
  const red = "text-red-600";
  const muted = "text-gray-500";

  const s = (n: number | null) => (n == null ? "Excluded" : `${n}%`);
  const s2 = (n: number | null) =>
    n == null ? "Excluded" : `${n.toFixed(2)}%`;

  const rows = [
    {
      id: "vte6",
      icon: "/leg.png",
      leftLabel: "VTE (at 6 month)",
      leftValue: s(vteRisk),
      rightLabel: "VTE (intention-to-treat)",
      rightValue: s2(vteRiskDrug),
      arrow: {
        src: "/blue_arrow.png",
        label: vteRiskDrug == null ? "" : "44% decrease",
        widthClass: "w-18",
        alt: "VTE decrease arrow",
      },
      valueClass: {
        left: vteRisk == null ? muted : blue,
        right: vteRiskDrug == null ? muted : blue,
      },
    },
    {
      id: "vte_on_tx",
      icon: "/leg.png",
      leftLabel: "VTE (at 6 month)",
      leftValue: s(vteRisk),
      rightLabel: "VTE (on-treatment)",
      rightValue: s2(vteRiskDrug),
      arrow: {
        src: "/blue_arrow.png",
        label: vteRiskDrug == null ? "" : "70% decrease",
        widthClass: "w-18",
        alt: "VTE decrease arrow",
      },
      valueClass: {
        left: vteRisk == null ? muted : blue,
        right: vteRiskDrug == null ? muted : blue,
      },
    },
    {
      id: "mb_on_tx",
      icon: "/brain.png",
      leftLabel: "MB (at 6 month)",
      leftValue: hasBleedingExclusions ? "Excluded" : "4%",
      rightLabel: "MB (on-treatment)",
      rightValue: hasBleedingExclusions ? "Excluded" : "6%",
      arrow: {
        src: "/red_arrow.png",
        label: hasBleedingExclusions ? "" : "96% increase",
        widthClass: "w-18",
        alt: "MB increase arrow",
      },
      valueClass: {
        left: hasBleedingExclusions ? muted : red,
        right: hasBleedingExclusions ? muted : red,
      },
    },
    {
      id: "crnmb_on_tx",
      icon: "/finger.png",
      leftLabel: "CRNMB (at 6 month)",
      leftValue: hasBleedingExclusions ? "Excluded" : "4%",
      rightLabel: "CRNMB (on-treatment)",
      rightValue: hasBleedingExclusions ? "Excluded" : "6%",
      arrow: {
        src: "/red_arrow.png",
        label: hasBleedingExclusions ? "" : "28% increase",
        widthClass: "w-18",
        alt: "CRNMB increase arrow",
      },
      valueClass: {
        left: hasBleedingExclusions ? muted : red,
        right: hasBleedingExclusions ? muted : red,
      },
    },
  ];

  return (
    <div className="w-full">
      <RiskComparison
        headers={{
          left: "Baseline Risk",
          middle: "",
          right: "With Low-dose DOAC (apixaban or rivaroxaban)",
        }}
        rows={rows}
      />
    </div>
  );
};


export default EffectContent;
