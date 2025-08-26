"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return (
    <main className="p-6">
      <noscript>
        <a href="/en">Continue to English</a>
      </noscript>
    </main>
  );
}
