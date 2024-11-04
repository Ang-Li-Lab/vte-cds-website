"use client";

import { Suspense } from "react";
import MainPage from "@/components/MainPage";

export default function RiskScorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
}
