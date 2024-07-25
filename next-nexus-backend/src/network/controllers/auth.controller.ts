import Api from "@/lib/api";
import { HttpStatusCode } from "axios";
import { HttpInternalServerError } from "@/lib/error";
import AuthService from "@/network/services/auth.service";
import { Request, Response, NextFunction } from "@/types/express-types";

class AuthController extends Api {
  private readonly authService = new AuthService();

  public Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.register(req.body);
      this.send(res, auth, HttpStatusCode.Ok, "Register Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to register"));
    }
  };

  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.login(req, res, next);
      this.send(res, auth, HttpStatusCode.Ok, "Login Route");
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  public Logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.logout(res);
      this.send(res, auth, HttpStatusCode.Ok, "Logout Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to logout"));
    }
  };

  public SessionToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const auth = await this.authService.SessionToken(req, res, next);
      this.send(res, auth, HttpStatusCode.Ok, "SessionToken Route");
    } catch (error) {
      res.status(error.status).json({ message: error.message });
      console.info("SessionToken Route:", error.message);
    }
  };
}

export default AuthController;
