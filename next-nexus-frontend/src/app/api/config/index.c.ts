"use client";
import { z } from "zod";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";
import { MailConfigSchema } from "@/validators/index";

const setMailConfig = async (
  config: z.infer<typeof MailConfigSchema>,
  sessionToken: string
) => {
  try {
    const response = await Axios.post("/api/v1/config/setmail", config, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { setMailConfig };
