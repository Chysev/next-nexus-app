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
      REDIS_URL: string;
      NEXUS_KEY: string;
      JOSE_PRIVATE_KEY: string;
      JOSE_PUBLIC_KEY: string;
      JWT_PRIVATE_KEY: string;
      JWT_PUBLIC_KEY: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_KEY: string;
      CLOUDINARY_SECRET: string;
    }
  }
}

export {};
