"use client";

import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";

const Logout = async () => {
  try {
    const response = await Axios.get("/api/v1/auth/logout");

    return response;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { Logout };
