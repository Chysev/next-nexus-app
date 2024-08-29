import { Cluster } from "cluster";
import printAppInfo from "@/utils/print-app-info";

const PrimaryProcess = (cpuCount: number, cluster: Cluster) => {
  printAppInfo(
    cpuCount,
    cpuCount,
    process.pid,
    `Primary ${process.pid} is running`
  );

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} has exited with code ${code} and signal ${signal}`
    );
    console.log("Starting a new worker...");
    cluster.fork();
  });
};

export default PrimaryProcess;
