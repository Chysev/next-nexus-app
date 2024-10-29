import xior from "xior";
import Axios from "@/lib/Axios";
import useToken from "@/hooks/use-token";
import { NextRequest, NextResponse } from "next/server";

const userPaths = ["/dashboard", "/dashboard/settings/account/:id"];

const adminPaths = [
  "/dashboard/admin",
  "/dashboard/admin/users",
  "/dashboard/admin/users/:id",
  "/dashboard/admin/permissions",
  "/dashboard/admin/config/mail",
  "/dashboard/admin/config/payment/gateway",
];

const authPaths = ["/authorize/login", "/authorize/register"];

const auth = async () => {
  try {
    const Token = useToken();

    const response = await xior.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/auth/session-token`,
      {
        headers: {
          Authorization: `Bearer ${Token?.sessionToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const Token = req.cookies.get("sessionToken");

  if (pathname.startsWith("/authorize/logout")) {
    const res = NextResponse.redirect(new URL("/authorize/login", req.url));
    res.cookies.delete("sessionToken");
    return res;
  }

  try {
    const response = await auth();

    if (adminPaths.some((path) => pathname.startsWith(path))) {
      if (response.data.data.user.role === "USER") {
        const res = NextResponse.redirect(new URL("/dashboard", req.url));
        return res;
      }
    }
    if (authPaths.some((path) => pathname.startsWith(path))) {
      if (Token) {
        if (response.status === 200) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }
  } catch (error: any) {
    if (userPaths.some((path) => pathname.startsWith(path))) {
      if (!Token) {
        if (error.response?.status === 401) {
          return NextResponse.redirect(new URL("/authorize/login", req.url));
        }
      }
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|.*\\..*|_next/image|$).*)"],
};
