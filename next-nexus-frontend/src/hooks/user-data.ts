import { GetUserData } from "@/app/api/users";
import { useQuery } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const UserData = (sessionToken: string, router?: AppRouterInstance) => {
  return useQuery({
    queryKey: ["User", "Profile_Data"],
    queryFn: async () => await GetUserData(sessionToken, router),
    refetchInterval: 3000,
  });
};

export default UserData;
