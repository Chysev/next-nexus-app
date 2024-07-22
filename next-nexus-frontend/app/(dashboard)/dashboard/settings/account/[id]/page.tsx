"use server";

import useToken from "@/hooks/use-token";
import Index from "@/components/dashboard/settings/Index";

const page = () => {
  const Token = useToken();
  const { sessionToken } = Token as { sessionToken: string };
  return <Index sessionToken={sessionToken as string} />;
};

export default page;
