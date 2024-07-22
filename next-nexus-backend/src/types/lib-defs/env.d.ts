import { type Environments } from "../../enums/environment.enum";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environments;
      BACKEND_PORT: string;
      FRONTEND_BASE_URL: string;
      BACKEND_BASE_URL: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export {};
