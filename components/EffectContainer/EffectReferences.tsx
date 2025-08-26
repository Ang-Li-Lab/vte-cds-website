import React from "react";

const EffectReferences: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <ul>
        <li>
          Li A, et al. Direct Oral Anticoagulant versus Placebo for the Prevention of Thrombosis 
          in Ambulatory Patients with Cancer: A Systematic Review and Meta-Analysis. 
          <em>J Thromb Haemost</em>. 2019;17(12):2141-2151. doi:{" "}
          <a
            href="https://doi.org/10.1111/jth.14613"
            target="_blank"
            rel="noopener"
          >
            10.1111/jth.14613
          </a>
          . PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/31420937/"
            target="_blank"
            rel="noopener"
          >
            31420937
          </a>
          .
        </li>
        <li>
          Carrier M, et al. Apixaban to Prevent Venous Thromboembolism in Patients with Cancer. 
          <em>N Engl J Med</em>. 2019 Feb 21;380(8):711-719. doi:{" "}
          <a
            href="https://doi.org/10.1056/NEJMoa1814468"
            target="_blank"
            rel="noopener"
          >
            10.1056/NEJMoa1814468
          </a>
          . PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/30511879/"
            target="_blank"
            rel="noopener"
          >
            30511879
          </a>
          .
        </li>
        <li>
          Khorana AA, et al. Rivaroxaban for Thromboprophylaxis in High-Risk Ambulatory Patients with Cancer. 
          <em>N Engl J Med</em>. 2019 Feb 21;380(8):720-728. doi:{" "}
          <a
            href="https://doi.org/10.1056/NEJMoa1814630"
            target="_blank"
            rel="noopener"
          >
            10.1056/NEJMoa1814630
          </a>
          . PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/30786186/"
            target="_blank"
            rel="noopener"
          >
            30786186
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

export default EffectReferences;
