"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface StatisticsProps {
  queryString: string;
}

const Statistics: React.FC<StatisticsProps> = ({ queryString }) => {
  const router = useRouter();

  const onNext = () => {
    router.push(`/summary${queryString}`);
  };

  const onPrevious = () => {
    router.push(`/criteria${queryString}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>
      <p>Statistics content.</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Statistics;
