"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logout } from "@/app/api/auth";

const Header = () => {
  const router = useRouter();
  const LogOut = async () => {
    const response = await Logout();

    if (response.status === 200) {
      router.push("/authorize/login");
    }

    if (response.status === 500) {
      router.push("/authorize/login");
    }
  };
  return (
    <div className="bg-gray-100 shadow-md justify-center fixed flex w-full">
      <div className="min-h-[80px] max-w-[1400px] justify-between px-5 w-full items-center flex h-full">
        <Link href="/dashboard">
          <Image src="/CNNA.png" alt="CNPA" width={80} height={35} />
        </Link>
        <div>
          <Button onClick={LogOut}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
