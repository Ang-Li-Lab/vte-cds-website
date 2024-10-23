"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SummaryProps {
  queryString: string;
}

const Summary: React.FC<SummaryProps> = ({ queryString }) => {
  const router = useRouter();

  const onPrevious = () => {
    router.push(`/statistics${queryString}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <p>Summary content.</p>
      <div className="mt-4 flex justify-start">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Previous
        </button>
      </div>
    </div>
  );
};

export default Summary;
