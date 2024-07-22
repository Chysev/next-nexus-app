"use server";
import { cookies } from "next/headers";

const useToken = (fallback = null) => {
  try {
    const sessionToken = cookies().get("sessionToken");
    return { sessionToken: sessionToken?.value };
  } catch (error) {
    return fallback;
  }
};

export default useToken;
