"use server";

import useToken from "@/hooks/use-token";
import Settings from "@/app/(dashboard)/components/root/Settings";

const page = () => {
  const Token = useToken();
  const { sessionToken } = Token as { sessionToken: string };
  return <Settings sessionToken={sessionToken as string} />;
};

export default page;
