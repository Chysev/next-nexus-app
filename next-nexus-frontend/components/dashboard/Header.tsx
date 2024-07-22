import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-gray-100 shadow-md justify-center fixed flex w-full">
      <div className="min-h-[80px] max-w-[1400px] justify-between px-5 w-full items-center flex h-full">
        <Link href="/dashboard">
          <Image src="/CNNA.png" alt="CNPA" width={80} height={35} />
        </Link>
        <div>
          <Button>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
