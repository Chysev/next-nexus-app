"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const NotAvailable = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Page Not Available
        </h1>
        <p className="text-xl font-semibold text-gray-600 mb-8">
          Sorry, the feature you are looking for is currently unavailable.
        </p>
        <Button
          onClick={() => router.back()}
          className="bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
