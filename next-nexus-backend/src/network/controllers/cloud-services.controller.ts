import Api from "@/lib/api";
import { HttpStatusCode } from "axios";
import { HttpInternalServerError } from "@/lib/error";
import CloudService from "../services/cloud-services.service";
import { Request, Response, NextFunction } from "@/types/express-types";

class CloudServicesController extends Api {
  private readonly cloudService = new CloudService();

  public UploadStaticContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cloud = await this.cloudService.UploadStaticContent(req);
      this.send(res, cloud, HttpStatusCode.Ok, "Upload Static Content Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to upload static content"));
    }
  };
}

export default CloudServicesController;
