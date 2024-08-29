import { Request, Response, NextFunction } from "@/types/express-types";
import { HttpBadRequestError, HttpUnAuthorizedError } from "@/lib/error";

const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["nexus-key"];
  console.log("Nexus key from header:", apiKey);
  console.log("Expected Nexus Key:", process.env.NEXUS_KEY);

  if (!apiKey) {
    throw new HttpBadRequestError("API key is missing", [
      "nexus-key is required",
    ]);
  }

  if (apiKey !== process.env.NEXUS_KEY) {
    throw new HttpUnAuthorizedError("Invalid API key");
  }

  next();
};

export default verifyApiKey;
