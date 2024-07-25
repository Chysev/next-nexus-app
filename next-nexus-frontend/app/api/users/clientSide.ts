"use client";

import { z } from "zod";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";
import { UpdateUserDataSchema } from "@/validators";

const GetUserData = async (sessionToken: string) => {
  try {
    const response = await Axios.get("/api/v1/auth/session-token", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const UpdateUser = async (
  id: string,
  datas: z.infer<typeof UpdateUserDataSchema>,
  sessionToken: string
) => {
  try {
    const response = await Axios.patch(`/api/v1/users/${id}`, datas, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    return response;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { UpdateUser, GetUserData };
