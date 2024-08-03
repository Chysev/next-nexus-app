"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Error from "../Error";
import UserData from "@/hooks/user-data";
import Loading from "../Loading";
import { CiSettings } from "react-icons/ci";
import { UserImage, UserInfo } from "../UserInfo";
import { useRouter } from "next/navigation";

const Index = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();
  const {
    data: user,
    isLoading: userDataLoading,
    error: userDataError,
  } = UserData(sessionToken, router);

  if (userDataLoading) return <Loading />;

  if (userDataError) return <Error />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-4xl m-auto w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p>Profile</p>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/dashboard/settings/account/${user?.data?.user?.id}`}
                  >
                    <CiSettings />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-shrink-0">
            <UserImage sessionToken={sessionToken} />
          </div>
          <UserInfo Token={sessionToken} />
        </CardContent>
        <CardFooter className="justify-center">
          <p>Create Next Nexus App</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
