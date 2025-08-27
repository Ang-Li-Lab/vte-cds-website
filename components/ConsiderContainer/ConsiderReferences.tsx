import React from "react";

const ConsiderReferences: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <ul>
        <li>
          Key NS, et al. Venous thromboembolism prophylaxis and treatment in
          patients with cancer: ASCO guideline update. 
          <em>Journal of Clinical Oncology.</em> 2023;41(36):4030-4053. doi:{" "}
          <a
            href="https://ascopubs.org/doi/10.1200/JCO.23.00294"
            target="_blank"
            rel="noopener"
          >
            10.1200/JCO.23.00294
          </a>
          . PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/31381464/"
            target="_blank"
            rel="noopener"
          >
            31381464
          </a>
          .
        </li>
        <li>
          Lyman GH, et al. American Society of Hematology 2021 guidelines for 
          management of venous thromboembolism: prevention and treatment in 
          patients with cancer. 
          <em>Blood Adv.</em> 2021;5(4):927–974. doi:{" "}
          <a
            href="https://doi.org/10.1182/bloodadvances.2020003442"
            target="_blank"
            rel="noopener"
          >
            10.1182/bloodadvances.2020003442
          </a>
          . PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/33570602/"
            target="_blank"
            rel="noopener"
          >
            33570602
          </a>
          .
        </li>
        <li>
          National Comprehensive Cancer Network. <em>NCCN Clinical Practice Guidelines in Oncology: Cancer-Associated Venous Thromboembolic Disease, Version 2.2025.</em> link:{" "}
          <a href="https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1423" target="_blank" rel="noopener">
            https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1423
          </a>.
        </li>
      </ul>
    </div>
  );

};

export default ConsiderReferences;
