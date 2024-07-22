import index from ".";
import "./utils/env-validator";
import printAppInfo from "./utils/print-app-info";
import { connectPrisma, disconnectPrisma } from "./prisma";

const server = new index();

const main = server.app;

connectPrisma()
  .then(() => {
    console.log("Prisma Connected");
    main.listen(process.env.BACKEND_PORT, () => {
      console.log("Prisma Connected");
      printAppInfo();
    });
  })
  .catch(async (error) => {
    console.log("Prisma connection failed:", error);
    await disconnectPrisma();
    process.exit(1);
  });
