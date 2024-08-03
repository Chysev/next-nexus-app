import Axios from "@/lib/Axios";
import useToken from "@/hooks/use-token";
import { NextRequest, NextResponse } from "next/server";

const adminPaths = ["/dashboard", "/dashboard/settings/account/[id]"];

const AuthPaths = ["/authorize/login", "/authorize/register"];

const auth = async (req: NextRequest) => {
  try {
    const Token = useToken();

    const response = await Axios.get("/api/v1/auth/session-token", {
      headers: {
        Authorization: `Bearer ${Token?.sessionToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const Token = req.cookies.get("sessionToken");

  if (pathname.startsWith("/authorize/logout")) {
    const res = NextResponse.redirect(new URL("/authorize/login", req.url));
    res.cookies.delete("sessionToken");

    return res;
  }

  try {
    const response = await auth(req);
    if (AuthPaths.some((path) => pathname.startsWith(path))) {
      if (Token) {
        if (response.status === 200) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }
  } catch (error: any) {
    if (adminPaths.some((path) => pathname.startsWith(path))) {
      if (!Token) {
        if (error.response?.status === 401) {
          return NextResponse.redirect(new URL("/authorize/login", req.url));
        }
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|.*\\..*|_next/image|$).*)"],
};
