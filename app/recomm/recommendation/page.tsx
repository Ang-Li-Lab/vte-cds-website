"use client";

import { Suspense } from "react";
import MainPage from "@/components/MainPage";

export default function RecommRecommendationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
}
