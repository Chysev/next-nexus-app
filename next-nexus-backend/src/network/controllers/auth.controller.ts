import Api from "@/lib/api";
import { HttpStatusCode } from "axios";
import { HttpInternalServerError } from "@/lib/error";
import AuthService from "@/network/services/auth.service";
import { Request, Response, NextFunction } from "@/types/express-types";

class AuthController extends Api {
  private readonly authService = new AuthService();

  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.login(req, res, next);
      this.send(res, auth, HttpStatusCode.Ok, "Login Route");
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  };

  public Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.register(req.body);
      this.send(res, auth, HttpStatusCode.Ok, "Register Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to register"));
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
    }
  };

  public ForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const auth = await this.authService.ForgotPassword(req.body);
      this.send(res, auth, HttpStatusCode.Ok, "Forgot Password Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to send reset password link"));
    }
  };

  public ResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;
      const auth = await this.authService.ResetPassword(req.body, token);
      this.send(res, auth, HttpStatusCode.Ok, "Reset Password Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to reset password"));
    }
  };
}

export default AuthController;
