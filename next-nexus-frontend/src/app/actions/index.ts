"use server";

import { z } from "zod";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { LoginSchema } from "@/validators";
import { Login } from "../api/auth/index.s";

const SetTokenAction = async (datas: z.infer<typeof LoginSchema>) => {
  const response = await Login(datas);

  if (isAxiosResponse(response)) {
    cookies().set({
      name: "sessionToken",
      value: response.data.sessionToken,
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return { success: true, response: response };
  }

  return { success: false, message: response.message };
};

const isAxiosResponse = (
  response: any
): response is AxiosResponse<any, any> => {
  return (response as AxiosResponse<any, any>).data !== undefined;
};

export { SetTokenAction, isAxiosResponse };
