"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUsersCount } from "@/app/api/users/index.s";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const page = () => {
  const router = useRouter();

  const {
    data: usersCount,
  }: UseQueryResult<{
    data: { users: number; admin: number; moderator: number };
  }> = useQuery({
    queryKey: ["Users", "Count"],
    queryFn: async () => {
      return await getUsersCount();
    },
    refetchInterval: 3000,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="grid gap-6 sm:grid-cols-1 sm:mt-[10rem] mt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="max-w-[300px] w-full rounded-xl shadow-lg border border-gray-200 bg-white flex flex-col">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800">
              User List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5 flex-grow flex flex-col justify-between">
            <div className="text-gray-700 space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Users:</span>
                <span>{usersCount?.data?.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Admin:</span>
                <span>{usersCount?.data?.admin}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Moderator:</span>
                <span>{usersCount?.data?.moderator}</span>
              </div>
            </div>
            <Button
              onClick={() => router.push("/dashboard/admin/users")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
            >
              <p className="block w-full text-center">View Details</p>
            </Button>
          </CardContent>
          <CardFooter className="justify-center p-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              All registered users on the system.
            </p>
          </CardFooter>
        </Card>

        <Card className="max-w-[300px] w-full rounded-xl shadow-lg border border-gray-200 bg-white flex flex-col">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Email System
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5 flex-grow flex flex-col justify-between">
            <div className="text-gray-700 space-y-1.5">
              <p>Control your Email with advance configuration.</p>
            </div>
            <Button
              onClick={() => router.push("/dashboard/admin/config/mail")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
            >
              <p className="block w-full text-center">View Details</p>
            </Button>
          </CardContent>
          <CardFooter className="justify-center p-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Email registered on the system
            </p>
          </CardFooter>
        </Card>

        <Card className="max-w-[300px] w-full rounded-xl shadow-lg border border-gray-200 bg-white flex flex-col">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Payment Gateway
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5 flex-grow flex flex-col justify-between">
            <div className="text-gray-700 space-y-1.5">
              <p>Control your payment with advance configuration.</p>
            </div>
            <Button
              onClick={() =>
                router.push("/dashboard/admin/config/payment/gateway")
              }
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
            >
              <p className="block w-full text-center">View Details</p>
            </Button>
          </CardContent>
          <CardFooter className="justify-center p-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Gateway registered on the system
            </p>
          </CardFooter>
        </Card>

        <Card className="max-w-[300px] w-full rounded-xl shadow-lg border border-gray-200 bg-white flex flex-col">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5 flex-grow flex flex-col justify-between">
            <div className="text-gray-700 space-y-1.5">
              <p>Control your roles with advance permission system.</p>
            </div>
            <Button
              onClick={() => router.push("/dashboard/admin/permissions")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
            >
              <p className="block w-full text-center">View Details</p>
            </Button>
          </CardContent>
          <CardFooter className="justify-center p-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Permission system on the app
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
