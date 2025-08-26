import React from "react";
import Image from "next/image";

const ConsiderGuidelines: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <strong>ASCO Guidelines on VTE Thromboprophylaxis 2023:</strong>
      <div className="flex justify-center">
        <Image
          src="/asco_guide.png"
          alt="ASCO Guidelines on VTE Thromboprophylaxis 2023"
          width={800}
          height={500}
        />
      </div>

      <strong>NCCN Guidelines on VTE Thromboprophylaxis 2023:</strong>
      <div className="flex justify-center">
        <Image
          src="/nccn_guide.png"
          alt="NCCN Guidelines on VTE Thromboprophylaxis 2023"
          width={800}
          height={500}
        />
      </div>

      <strong>ASH Guidelines on VTE Thromboprophylaxis 2021:</strong>
      <div className="flex justify-center">
        <Image
          src="/ash_guide.png"
          alt="ASH Guidelines on VTE Thromboprophylaxis 2021"
          width={800}
          height={500}
        />
      </div>
    </div>
  );

};

export default ConsiderGuidelines;
