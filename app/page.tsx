import { Suspense } from "react";
import MainPage from "@/components/MainPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
