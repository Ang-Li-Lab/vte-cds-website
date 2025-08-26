import React from "react";
import Image from "next/image";

const EffectDetails: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <strong>Relative Risk Ratios for Major Thromboembolic Outcomes in DOAC Cancer Trials:</strong>
      <div className="flex justify-center">
        <Image
          src="/risk_ratio1.png"
          alt=""
          width={800}
          height={500}
        />
      </div>

      <div className="flex justify-center">
        <Image
          src="/risk_ratio2.png"
          alt=""
          width={800}
          height={500}
        />
      </div>

    </div>
  );
};

export default EffectDetails;
