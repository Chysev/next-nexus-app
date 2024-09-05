"use client";
import {
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  ForgotResetPasswordSchema,
} from "@/validators";
import { z } from "zod";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";

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

const Register = async (datas: z.infer<typeof RegisterSchema>) => {
  try {
    const response = await Axios.post("/api/v1/auth/register", datas);

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const ForgotResetPassword = async (
  datas: z.infer<typeof ForgotResetPasswordSchema>
) => {
  try {
    const response = await Axios.post("/api/v1/auth/forgot-password", datas);

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { Login, Register, ForgotResetPassword, ResetPassword };
