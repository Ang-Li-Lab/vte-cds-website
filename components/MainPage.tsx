"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Risk from "@/components/Containers/Risk";
import Effect from "@/components/Containers/Effect";
import Recomm from "@/components/Containers/Recomm";

const MainPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const riskRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLDivElement>(null);
  const recommRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = pathname.replace("/", "") || "risk";

    if (section.startsWith("risk")) {
      riskRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section.startsWith("effect")) {
      effectRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section.startsWith("recomm")) {
      recommRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  const getQueryString = () => {
    const params = new URLSearchParams(searchParams.toString());
    return params.toString() ? `?${params.toString()}` : "";
  };

  return (
    <div className="container mx-auto space-y-8">
      <div ref={riskRef} id="risk" className="scroll-mt-20">
        <Risk queryString={getQueryString()} />
      </div>
      <div ref={effectRef} id="effect" className="scroll-mt-20">
        <Effect queryString={getQueryString()} />
      </div>
      <div ref={recommRef} id="recomm" className="scroll-mt-20">
        <Recomm queryString={getQueryString()} />
      </div>
    </div>
  );
};

export default MainPage;
