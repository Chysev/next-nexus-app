"use server";

import { z } from "zod";
import Axios from "@/lib/Axios";
import { LoginSchema, RegisterSchema } from "@/validators";
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
    return {
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
    };
  }
};

const Register = async (datas: z.infer<typeof RegisterSchema>) => {
  try {
    const response = await Axios.post("/api/v1/auth/register", datas);

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { Login, Register };
