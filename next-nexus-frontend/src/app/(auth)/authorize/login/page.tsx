import { Metadata } from "next";
import LoginForm from "@/app/(auth)/components/root/LoginForm";

export const metadata: Metadata = {
  title: "Auth | Login",
  description: "Generated by create next nexus app",
};

const page = () => {
  return (
    <div className="flex h-[100vh]">
      <LoginForm />
    </div>
  );
};

export default page;
