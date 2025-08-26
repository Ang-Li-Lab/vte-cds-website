import React from "react";

const ConsiderReferences: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <ul>
        <li>
          <strong>ASCO:</strong>{" "}
          <a
            href="https://ascopubs.org/doi/10.1200/JCO.23.00294"
            target="_blank"
            rel="noopener"
          >
            https://ascopubs.org/doi/10.1200/JCO.23.00294
          </a>
        </li>
        <li>
          <strong>NCCN:</strong>{" "}
          <a
            href="https://www.nccn.org/professionals/physician_gls/pdf/vte.pdf"
            target="_blank"
            rel="noopener"
          >
            https://www.nccn.org/professionals/physician_gls/pdf/vte.pdf
          </a>
        </li>
        <li>
          <strong>ASH:</strong>{" "}
          <a
            href="https://ashpublications.org/bloodadvances/article/5/4/927/475194/American-Society-of-Hematology-2021-guidelines-for"
            target="_blank"
            rel="noopener"
          >
            https://ashpublications.org/bloodadvances/article/5/4/927/475194/American-Society-of-Hematology-2021-guidelines-for
          </a>
        </li>
      </ul>
    </div>
  );

};

export default ConsiderReferences;
