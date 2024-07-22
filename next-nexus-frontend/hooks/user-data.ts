import { useQuery } from "@tanstack/react-query";
import { GetUserData } from "@/app/api/users";

const UserData = (sessionToken: string) => {
  return useQuery({
    queryKey: ["User", "Profile_Data"],
    queryFn: async () => await GetUserData(sessionToken),
  });
};

export default UserData;
