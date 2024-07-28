"use client";
import Link from "next/link";
import Image from "next/image";
import { Logout } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

import UserData from "@/hooks/user-data";

const Header = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();

  const { data: user } = UserData(sessionToken, router);

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
    <div className="shadow-md justify-center fixed flex w-full">
      <div className="min-h-[80px] max-w-[1400px] justify-between px-5 w-full items-center flex h-full">
        <Link href="/dashboard">
          <Image src="/CNNA.png" alt="CNPA" width={80} height={35} />
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border outline-none rounded-full items-center justify-center">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  <Image
                    src="/USER.png"
                    alt="CNPA"
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>
                      <Image
                        src="/USER.png"
                        alt="CNPA"
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{user?.data?.user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <CiUser className="mr-2 h-4 w-4" />
                <Link href="/dashboard">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CiSettings className="mr-2 h-4 w-4" />
                <Link
                  href={`/dashboard/settings/account/${user?.data?.user?.id}`}
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={LogOut}>
                <IoIosLogOut className="mr-2 h-4 w-4" />
                <p>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
