"use client";
import { z } from "zod";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/validators";

const Logout = async () => {
  try {
    const response = await Axios.get("/api/v1/auth/logout");

    return response;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const ResetPassword = async (
  datas: z.infer<typeof ResetPasswordSchema>,
  token: string
) => {
  try {
    const response = await Axios.post(
      `/api/v1/auth/reset-password/${token}`,
      datas
    );

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { Logout, ResetPassword };
