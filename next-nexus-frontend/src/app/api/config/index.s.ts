"use server";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";

const getMailConfig = async () => {
  try {
    const response = await Axios.get("/api/v1/config/mail");

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { getMailConfig };
