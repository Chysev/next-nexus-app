"use client";
import React from "react";
import Image from "next/image";
import UserData from "@/hooks/use-user-data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserImage = ({ sessionToken }: { sessionToken: string }) => {
  const { data: user } = UserData(sessionToken);

  return (
    <Avatar className="border h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80 flex items-center justify-center">
      <AvatarImage src={`${user?.data?.user?.avatarUrl}`} />
      <AvatarFallback className="flex items-center justify-center">
        <Image
          src="/USER.png"
          alt="CNPA"
          width={400}
          height={400}
          className="object-cover"
        />
      </AvatarFallback>
    </Avatar>
  );
};
const UserInfo = (Token: any) => {
  const { data: user } = UserData(Token?.sessionToken);

  return (
    <div className="flex-1 space-y-3">
      <h1 className="text-3xl font-bold">{user?.data?.user?.name}</h1>
      <h2 className="text-2xl">{user?.data?.user?.email}</h2>
      <h3 className="text-md">CreatedAt: {user?.data?.user?.createdAt}</h3>

      <h3 className="text-md">UpdatedAt: {user?.data?.user?.updatedAt}</h3>

      <p className="text-justify">{user?.data?.user?.description}</p>
      <Badge variant="outline">{user?.data?.user.role}</Badge>
    </div>
  );
};

export { UserInfo, UserImage };
