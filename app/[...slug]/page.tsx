import React, { Suspense } from "react";
import MainPage from "@/components/MainPage";


export async function generateStaticParams() {
  return [
    { slug: ['criteria'] },
    { slug: ['statistics'] },
    { slug: ['summary'] },
    { slug: ['criteria', 'risk-score'] },
    { slug: ['criteria', 'bleeding-exclusion'] },
    { slug: ['criteria', 'trial-exclusion'] },
  ];
}

const CatchAllPage = () => {
  return <Suspense fallback={null}><MainPage /></Suspense>;
};

export default CatchAllPage;
