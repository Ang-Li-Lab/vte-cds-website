"use client";

import { useRef, useEffect, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import RiskContainer from "@/components/RiskContainer/Risk";
import EffectContainer from "@/components/EffectContainer/Effect";
import ConsiderContainer from "@/components/ConsiderContainer/Consider";
import { useSearchParams } from "next/navigation";

const MainPage = () => {
  const {
    currentContainer,
    isInitialized,
    setContainer,
    initializeStateFromUrl,
  } = useAppStore();

  const riskRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLDivElement>(null);
  const considerRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    if (searchParams) {
      initializeStateFromUrl(searchParams);
    }
  }, [searchParams, initializeStateFromUrl]);

  useEffect(() => {
    if (isInitialized && currentContainer && !hasAutoScrolled.current) {
      hasAutoScrolled.current = true;
      const refs: Record<string, React.RefObject<HTMLDivElement>> = {
        risk: riskRef,
        effect: effectRef,
        consider: considerRef,
      };
      refs[currentContainer]?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isInitialized, currentContainer]);

  const handleScroll = useCallback(
    (section: string) => {
      setContainer(section);
      const refs: Record<string, React.RefObject<HTMLDivElement>> = {
        risk: riskRef,
        effect: effectRef,
        consider: considerRef,
      };
      refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
    },
    [setContainer],
  );

  return (
    <div className="container mx-auto space-y-8">
      <div ref={riskRef} id="risk" className="scroll-mt-20">
        <RiskContainer onNext={() => handleScroll("effect")} />
      </div>
      <div ref={effectRef} id="effect" className="scroll-mt-20">
        <EffectContainer
          onNext={() => handleScroll("consider")}
          onPrevious={() => handleScroll("risk")}
        />
      </div>
      <div ref={considerRef} id="consider" className="scroll-mt-20">
        <ConsiderContainer onPrevious={() => handleScroll("effect")} />
      </div>
    </div>
  );
};

export default MainPage;
