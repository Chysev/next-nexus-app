"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center p-6 space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-shrink-0">
            <Skeleton className="h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80 flex items-center justify-center rounded-full bg-gray-300" />
          </div>
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48 bg-gray-300 rounded" />
            <Skeleton className="h-6 w-64 bg-gray-300 rounded" />
            <Skeleton className="h-24 bg-gray-300 rounded" />
            <Badge
              className="bg-gray-300 text-gray-500 cursor-not-allowed"
              variant="outline"
            ></Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
