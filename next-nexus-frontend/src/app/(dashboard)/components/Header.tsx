"use client";
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
import Link from "next/link";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import UserData from "@/hooks/use-user-data";
import { RiAdminLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();

  const { data: user } = UserData(sessionToken, router);

  const LogOut = async () => {
    router.push("/authorize/logout");
  };
  return (
    <div className="shadow-md justify-center bg-white z-10 fixed flex w-full">
      <div className="min-h-[80px] max-w-[1400px] justify-between px-5 w-full items-center flex h-full">
        <Link href="/">
          <Image src="/CNNA.png" alt="CNPA" width={80} height={35} />
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border outline-none rounded-full items-center justify-center">
              <Avatar>
                <AvatarImage src={user?.data?.user?.avatarUrl} />
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
                    <AvatarImage src={user?.data?.user?.avatarUrl} />
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
              {user?.data?.user?.role === "ADMIN" && (
                <DropdownMenuItem className="cursor-pointer">
                  <RiAdminLine className="mr-2 h-4 w-4" />
                  <Link href="/dashboard/admin">Admin</Link>
                </DropdownMenuItem>
              )}
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
