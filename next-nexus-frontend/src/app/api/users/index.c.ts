"use client";
import { z } from "zod";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";
import { toast } from "@/components/ui/use-toast";
import { UpdateUserDataSchema, UpdateViewUserDataSchema } from "@/validators";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getUserSessionData = async (
  sessionToken: string,
  router?: AppRouterInstance
) => {
  try {
    const response = await Axios.get("/api/v1/auth/session-token", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status == 401) {
      toast({
        title: "Auth",
        description: "Session Expired",
      });
      setTimeout(() => {
        router?.push("/authorize/logout");
      }, 5000);
    }
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const updateUser = async (
  id: string,
  datas: z.infer<typeof UpdateUserDataSchema | typeof UpdateViewUserDataSchema>,
  sessionToken: string
) => {
  try {
    const response = await Axios.patch(`/api/v1/users/update/${id}`, datas, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    return response;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const deleteUser = async (id: string, sessionToken: string) => {
  try {
    const response = await Axios.delete(`/api/v1/users/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    return response;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { updateUser, deleteUser, getUserSessionData };
