import index from ".";
import http from "http";
import "./utils/env-validator";
import printAppInfo from "./utils/print-app-info";
import { connectPrisma, disconnectPrisma } from "./lib/prisma";

const _index = new index();
const main = _index.app;
const server = http.createServer(main);

const createServer = (cpuCount: number, process: NodeJS.Process) => {
  return async () => {
    try {
      await connectPrisma();

      server.listen(process.env.BACKEND_PORT, () => {
        printAppInfo(
          cpuCount,
          cpuCount,
          process.pid,
          `Worker ${process.pid}: Prisma and Redis Connected`,
          `Worker ${process.pid}: Server started on port ${process.env.BACKEND_PORT}`
        );
      });
    } catch (error) {
      console.error(`Worker ${process.pid}: Connection failed:`, error);

      await disconnectPrisma();

      process.exit(1);
    }
  };
};

export default createServer;
