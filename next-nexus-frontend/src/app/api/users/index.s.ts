"use server";
import Axios from "@/lib/Axios";
import { NextResponse } from "next/server";

const getAllUsers = async () => {
  try {
    const response = await Axios.get("/api/v1/users/list");

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const getUsersCount = async () => {
  try {
    const response = await Axios.get("/api/v1/users/count");

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

const getUserData = async (id: string) => {
  try {
    const response = await Axios.get(`/api/v1/users/${id}`);

    return response.data;
  } catch (error) {
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
};

export { getUserData, getAllUsers, getUsersCount };
