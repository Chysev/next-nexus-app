"use server";
import { z } from "zod";
import Axios from "@/lib/Axios";
import { LoginSchema } from "@/validators";
import { NextResponse } from "next/server";

const Login = async (datas: z.infer<typeof LoginSchema>) => {
  try {
    const response = await Axios.post("/api/v1/auth/login", datas);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { Login };
