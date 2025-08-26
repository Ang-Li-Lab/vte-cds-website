import React from "react";

interface ConsiderContentProps {
  computedScore: number;
  hasBleedingExclusions: boolean;
  vteHistoryValue: string | null;
  acValue: string | null;
}

const ConsiderContent: React.FC<ConsiderContentProps> = ({
  computedScore = 0,
  hasBleedingExclusions,
  vteHistoryValue,
  acValue,
}) => {
  if (computedScore >= 4 && !hasBleedingExclusions)
    return (
      <div>
        <p>Patient has high-risk of VTE and low-risk of bleeding</p>
        <p>
          Consider prescribing low-dose apixaban or rivaroxaban for 6 months
        </p>
        <br />
        <p className="font-semibold">Decision Tree:</p>
        <ul className="list-disc list-outside pl-4">
          <li>Is there high copay (e.g., Medicare; if yes, stop)</li>
          <li>
            Is there difficulty with twice daily schedule (if no, choose
            apixaban; if yes, choose rivaroxaban)
            <ul className="list-disc list-outside pl-4">
              <li>Apixaban 2.5 mg bid, 60 tabs, 5 refills</li>
              <li>Rivaroxaban 10 mg daily, 30 tabs, 5 refills</li>
            </ul>
          </li>
        </ul>

        <p className="font-semibold mt-4">Counsel patient on the following:</p>
        <ul className="list-disc list-outside pl-4">
          <li>Avoid aspirin and NSAIDs</li>
          <li>
            Hold apixaban or rivaroxaban for 48 hours before invasive procedures
            or surgeries
          </li>
          <li>
            Restart apixaban or rivaroxaban 24 hours after invasive procedures
            or surgeries
          </li>
          <li>
            OK to continue apixaban or rivaroxaban during hospital admission for
            VTE prophylaxis
          </li>
          <li>
            Stop apixaban or rivaroxaban if any unexpected bleeding or bruising
          </li>
          <li>
            Notify your doctor immediately if any unexpected bleeding or
            bruising, new onset of chest pain or shortness of breath anytime, or
            new onset of leg pain/swelling that lasts more than 1 day
          </li>
        </ul>
      </div>
    );
  else if (vteHistoryValue === "1" && acValue === "1")
    return (
      <div>
        <p>Patient has known VTE on anticoagulation</p>
        <p>Consider providing additional education material on VTE treatment</p>
      </div>
    );
  else if (computedScore >= 4 && hasBleedingExclusions)
    return (
      <div>
        <p>
          Patient has high-risk of VTE and high-risk of bleeding (would be
          excluded from clinical trial)
        </p>
        <p>
          Consider active surveillance & providing additional education material
          on VTE treatment
        </p>
      </div>
    );
  else if (computedScore < 4)
    return (
      <div>
        <p>Patient has low-risk of VTE</p>
        <p>Consider providing education material on VTE prevention</p>
      </div>
    );
  else return <div></div>;
};

export default ConsiderContent;
