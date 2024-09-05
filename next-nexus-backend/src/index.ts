import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import nocache from "nocache";
import express from "express";
import router from "./network";
import config from "./config/app/config";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import session from "./middleware/session";
import swaggerSpec from "./config/app/swagger";
import { PassportConfig } from "./config/app/passport";
import { Request, Response, NextFunction } from "@/types/express-types";

class index {
  public app: express.Application;

  public passportConfig = new PassportConfig();

  constructor() {
    this.app = express();
    this.Middleware();
    this.MediaRoutes();
    this.Routes();
    this.ErrorHandler();
    this.PassportSetup();
  }

  private Middleware(): void {
    this.app.use(helmet());
    // this.app.use(session);
    this.app.use(nocache());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.disable("x-powered-by");
    this.app.set("view engine", "ejs");
    this.app.set("views", "views");
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.set("trust proxy", 1);

    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  private PassportSetup(): void {
    this.app.use(this.passportConfig.initialize());
  }

  private MediaRoutes(): void {
    const imagePath = path.join(process.cwd(), "uploads");

    this.app.get("/uploads/:imageName", (req: Request, res: Response) => {
      const { imageName } = req.params as { imageName: string };
      res.sendFile(path.join(imagePath, imageName));
    });
  }

  private Routes(): void {
    this.app.use(`/${config.api.baseRoute}/${config.api.version}`, router);

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customfavIcon: "/swagger-ui/custom-favicon.ico",
        customSiteTitle: "Next Nexus App",
        swaggerOptions: {
          docExpansion: "none",
          displayRequestDuration: true,
          filter: true,
          operationsSorter: "alpha",
          tagsSorter: "alpha",
          tryItOutEnabled: true,
        },
      })
    );
  }

  private ErrorHandler(): void {
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction): void => {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error });
        next();
      }
    );
  }
}

export default index;
