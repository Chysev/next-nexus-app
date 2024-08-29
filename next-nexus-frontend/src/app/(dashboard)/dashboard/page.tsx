import useToken from "@/hooks/use-token";
import Dashboard from "@/app/(dashboard)/components/root/Dashboard";

const page = () => {
  const Token = useToken();
  const { sessionToken } = Token as { sessionToken: string };
  return <Dashboard sessionToken={sessionToken} />;
};

export default page;
