"use client";

import React, { Suspense } from "react";
import MainPage from "@/components/MainPage";

const HomePage = () => {
  return <Suspense fallback={null}><MainPage /></Suspense>;
};

export default HomePage;
