import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-3 prose prose-neutral max-w-none dark:prose-invert">
      <div className="relative mb-4 flex items-center justify-center">
        <Link
          href="/"
          className="absolute left-0 text-sm text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Home
        </Link>
        <h2 className="m-0 text-customBlue underline">About</h2>
      </div>

      <p>
        This is the new <strong>Cancer-Associated Venous Thromboembolism (VTE)
        Decision Aid</strong> website. Development of this Next.js version was
        started in <strong>September 2024</strong> by <strong>Omid Jafari</strong>.
      </p>

      <h3>About this work</h3>
      <p>
        This project is the result of an ongoing collaborative effort to
        conduct patient-centered clinical epidemiology and informatics research
        using multi-institutional cancer registry–linked electronic health
        record (EHR) databases. It is co-led by Dr. Ang Li (Baylor College of
        Medicine) and Dr. Nathanael Fillmore (VA Boston Healthcare System and
        Harvard Medical School).
      </p>

      <p>
        We have performed the initial derivation and external validation of a
        new risk assessment model (RAM) called <strong>EHR-CAT</strong> for
        venous thromboembolism (VTE, or blood clots) using retrospective
        databases of nearly 90,000 patients over 10 years. The model has been
        tested in highly heterogeneous populations in the U.S., covering nearly
        all cancer histologies and modern treatment approaches, as well as
        diverse groups defined by age, sex, race, and ethnicity.
      </p>

      <p>
        EHR-CAT builds upon the existing Khorana score with additional common
        data that are readily extractable from most cancer center EHR systems.
        This added granularity provides a more discriminative risk prediction
        (c-statistic improved from <strong>0.65 → 0.71</strong>) and identifies{" "}
        <strong>20–30% more patients</strong> with VTE in the high-risk
        subgroup.
      </p>

      <p>
        The VTE outcome was carefully selected and adjudicated via a
        combination of ICD-9/10 codes, anticoagulant medications, and radiology
        reports (natural language processing) to achieve high precision and
        recall.
      </p>

      <h3>References</h3>
      <ul>
        <li>
          <strong>Initial Derivation/Validation:</strong><br />
          Li A, et al. Derivation and Validation of a Clinical Risk Assessment
          Model for Cancer-Associated Thrombosis in Two Unique US Health Care
          Systems. <em>J Clin Oncol</em>. 2023;41(16):2926-2938. doi:{" "}
          <a
            href="https://doi.org/10.1200/JCO.22.01542"
            target="_blank"
            rel="noopener"
          >
            10.1200/JCO.22.01542
          </a>. PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/36626707/"
            target="_blank"
            rel="noopener"
          >
            36626707
          </a>.
        </li>
        <li>
          <strong>External Validation:</strong><br />
          Li A, et al. External validation of a novel electronic risk score for
          cancer-associated thrombosis in a comprehensive cancer center.{" "}
          <em>Am J Hematol</em>. 2023;98(7):1052-1057. doi:{" "}
          <a
            href="https://doi.org/10.1002/ajh.26928"
            target="_blank"
            rel="noopener"
          >
            10.1002/ajh.26928
          </a>. PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/37067102/"
            target="_blank"
            rel="noopener"
          >
            37067102
          </a>.
        </li>
        <li>
          <strong>Additional Reference:</strong><br />
          Li A, et al. Developing and optimizing a computable phenotype for
          incident venous thromboembolism in a longitudinal cohort of patients
          with cancer. <em>Res Pract Thromb Haemost</em>. 2022;6(4):e12733. doi:{" "}
          <a
            href="https://doi.org/10.1002/rth2.12733"
            target="_blank"
            rel="noopener"
          >
            10.1002/rth2.12733
          </a>. PMID:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/35647478/"
            target="_blank"
            rel="noopener"
          >
            35647478
          </a>.
        </li>
      </ul>
    </div>
  );
}
