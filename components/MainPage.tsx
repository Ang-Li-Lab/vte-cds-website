"use client";

import React, { useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Criteria from "./Containers/Criteria";
import Statistics from "./Containers/Statistics";
import Summary from "./Containers/Summary";

const MainPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const criteriaRef = useRef<HTMLDivElement>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSection = () => {
      if (pathname.startsWith("/criteria")) {
        criteriaRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (pathname.startsWith("/statistics")) {
        statisticsRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (pathname.startsWith("/summary")) {
        summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    scrollToSection();
  }, [pathname]);

  const getQueryString = () => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString() ? `?${params.toString()}` : "";
  };

  return (
    <div className="container mx-auto space-y-8">
      <div ref={criteriaRef} className="scroll-mt-20">
        <Criteria queryString={getQueryString()} />
      </div>
      <div ref={statisticsRef} className="scroll-mt-20">
        <Statistics queryString={getQueryString()} />
      </div>
      <div ref={summaryRef} className="scroll-mt-20">
        <Summary queryString={getQueryString()} />
      </div>
    </div>
  );
};

export default MainPage;
