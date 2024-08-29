import Api from "@/lib/api";
import { HttpStatusCode } from "axios";
import { HttpInternalServerError } from "@/lib/error";
import configService from "../services/config.service";
import { Request, Response, NextFunction } from "@/types/express-types";

class ConfigController extends Api {
  private readonly configService = new configService();

  public getMailConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const config = await this.configService.getMailConfig();
      this.send(res, config, HttpStatusCode.Ok, "Get Mail Config Route");
    } catch (error) {
      console.log(error);
      next(new HttpInternalServerError("Failed to get mail config"));
    }
  };

  public setMailConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const config = await this.configService.setMailConfig(req.body);
      this.send(res, config, HttpStatusCode.Ok, "Set Mail Config Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to set mail config"));
    }
  };
}

export default ConfigController;
