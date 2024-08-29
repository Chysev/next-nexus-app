import josejwt from "@/lib/jose-jwt";
import { HttpUnAuthorizedError } from "@/lib/error";
import { Request, Response, NextFunction } from "@/types/express-types";

const verifyUserAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    next(new HttpUnAuthorizedError("Unauthorized - Missing or invalid token"));
    return;
  }

  const token = authorizationHeader.slice(7);

  try {
    const decodedToken: any = await josejwt.verifyToken(token, {
      issuer: "next-nexus-app",
      audience: "auth-service",
    });

    if (!decodedToken) {
      next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    }

    const decryptedToken = await josejwt.decryptToken(
      decodedToken?.payload?.encryptedToken
    );

    if (!decryptedToken) {
      next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    }

    next();
  } catch (error) {
    next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
  }
};

const verifyAdminAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    next(new HttpUnAuthorizedError("Unauthorized - Missing or invalid token"));
    return;
  }

  const token = authorizationHeader.slice(7);

  try {
    const decodedToken: any = await josejwt.verifyToken(token, {
      issuer: "next-nexus-app",
      audience: "auth-service",
    });

    if (!decodedToken) {
      next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    }

    const decryptedToken = await josejwt.decryptToken(
      decodedToken?.payload?.encryptedToken
    );

    if (!decryptedToken) {
      next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    }

    if (decryptedToken?.payload?.role === "USER") {
      next(new HttpUnAuthorizedError("Unauthorized - You are not an admin"));
    }

    next();
  } catch (error) {
    next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
  }
};

export { verifyUserAuthToken, verifyAdminAuthToken };
