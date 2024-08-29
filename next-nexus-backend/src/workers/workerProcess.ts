import createServer from "@/server";
import Shutdown from "@/utils/shutdown";

const WorkerProcess = (cpuCount: number) => {
  const server = createServer(cpuCount, process);

  server();

  process.on("SIGTERM", Shutdown);
  process.on("SIGINT", Shutdown);

  process.on("uncaughtException", (err) => {
    console.error(`Worker ${process.pid}: Uncaught Exception`, err);
    Shutdown();
  });
};

export default WorkerProcess;
