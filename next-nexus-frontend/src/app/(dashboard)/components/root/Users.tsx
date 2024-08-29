"use client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { User } from "@/types";
import { TableLoading } from "../Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useModalStore } from "@/state/modal.store";
import { deleteUser } from "@/app/api/users/index.c";
import { getAllUsers } from "@/app/api/users/index.s";
import { UserDeleteModal } from "@/components/ui/modal";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Users = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = 10;
  const maxPagesToShow = 5;

  const { closeModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const currentPage = parseInt(searchParams.get("p") || "1", 10);

  const {
    data: users,
    isLoading: usersDataLoading,
  }: UseQueryResult<{ data: User[] }> = useQuery({
    queryKey: ["userList", "List"],
    queryFn: async () => await getAllUsers(),
    refetchInterval: 3000,
  });

  const handleSearch = useCallback(() => {
    if (users) {
      const result = users.data.filter(
        (user: any) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(result);
    }
  }, [users, searchQuery]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users.data);
    }
  }, [users]);

  const totalPages = filteredUsers
    ? Math.ceil(filteredUsers.length / itemsPerPage)
    : 0;

  const handlePageChange = (pageNumber: number) => {
    router.push(`?p=${pageNumber}`);
  };

  const paginatedUsers = filteredUsers
    ? filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const onSubmit = async (id: string) => {
    try {
      const response = await deleteUser(id as string, sessionToken as string);

      if (response.status === 200) {
        toast({
          title: "Action",
          description: "User has been deleted",
        });
        closeModal();
      }
    } catch (error) {
      toast({
        title: "Action",
        description: "Something went wrong",
      });
      closeModal();
    }
  };

  const getPageNumbers = () => {
    const totalNumbers = Math.min(maxPagesToShow, totalPages);
    const halfWay = Math.ceil(totalNumbers / 2);
    const isStart = currentPage <= halfWay;
    const isEnd = (totalPages - halfWay < currentPage) as any;
    const start = isStart
      ? 1
      : isEnd
      ? totalPages - totalNumbers + 1
      : currentPage - halfWay + 1;
    return Array.from({ length: totalNumbers }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

  if (usersDataLoading) {
    return <TableLoading />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-7xl w-full mt-36 p-2">
        <div className="sm:flex justify-between py-2">
          <h1 className="text-2xl font-semibold">Users</h1>

          <div className="mb-4 flex space-x-2">
            <Input
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleSearch} className="ml-2">
              Search
            </Button>
          </div>
        </div>

        <div className="hidden md:block">
          <Table>
            <TableCaption>A list of registered users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 text-lg">ID</TableHead>
                <TableHead className="text-lg">Name</TableHead>
                <TableHead className="text-lg">Email</TableHead>
                <TableHead className="text-lg">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right flex space-x-4 justify-end">
                    <Link href={`/dashboard/admin/users/view/${user.id}`}>
                      <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>
                          <Image
                            src="/USER.png"
                            alt="CNPA"
                            width={20}
                            height={20}
                            className="object-cover"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="block md:hidden">
          {paginatedUsers.map((user) => (
            <Card key={user.id} className="mb-4 w-full">
              <CardHeader className="flex justify-between">
                <div>
                  <h2 className="font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Link href={`/dashboard/admin/users/view/${user.id}`}>
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback>
                      <Image
                        src="/USER.png"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm">ID: {user.id}</p>
                <p className="text-sm">Role: {user.role}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => onSubmit(user.id)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination className="flex justify-center items-center mt-4">
          <PaginationContent className="flex overflow-auto space-x-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if ((currentPage as number) > 1)
                    handlePageChange((currentPage as number) - 1);
                }}
                className={`${
                  currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
                }`}
              />
            </PaginationItem>

            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  size="sm"
                  isActive={currentPage === pageNumber}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                  className={`${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } hover:bg-blue-100 px-3 py-1 rounded-md`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > maxPagesToShow &&
              currentPage + Math.ceil(maxPagesToShow / 2) < totalPages && (
                <>
                  <PaginationItem>
                    <span className="text-gray-500">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                      className="hover:bg-blue-100 px-3 py-1 rounded-md"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if ((currentPage as number) < totalPages)
                    handlePageChange((currentPage as number) + 1);
                }}
                className={`${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <UserDeleteModal onDelete={onSubmit} />
    </div>
  );
};

export default Users;
