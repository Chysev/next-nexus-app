import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const UserCardLoading = () => {
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

const TableLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-7xl w-full mt-36 px-2 overflow-x-auto">
        <Table>
          <TableCaption>
            <Skeleton className="h-6 w-48 bg-gray-300 rounded" />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-lg">
                <Skeleton className="h-8 w-full bg-gray-300 rounded" />
              </TableHead>
              <TableHead className="text-lg">
                <Skeleton className="h-8 w-full bg-gray-300 rounded" />
              </TableHead>
              <TableHead className="text-lg">
                <Skeleton className="h-8 w-full bg-gray-300 rounded" />
              </TableHead>
              <TableHead className="text-right text-lg">
                <Skeleton className="h-8 w-full bg-gray-300 rounded" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }, (_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton className="h-6 w-20 bg-gray-300 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-32 bg-gray-300 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-48 bg-gray-300 rounded" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-6 w-24 bg-gray-300 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="flex justify-center items-center mt-4">
          <PaginationContent className="flex space-x-1">
            <PaginationItem>
              <Skeleton className="h-8 w-12 bg-gray-300 rounded" />
            </PaginationItem>
            {Array.from({ length: 5 }, (_, index) => (
              <PaginationItem key={index}>
                <Skeleton className="h-8 w-8 bg-gray-300 rounded" />
              </PaginationItem>
            ))}
            <PaginationItem>
              <Skeleton className="h-8 w-12 bg-gray-300 rounded" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export { UserCardLoading, TableLoading };
