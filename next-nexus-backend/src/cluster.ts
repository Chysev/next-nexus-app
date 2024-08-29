import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import WorkerProcess from "./workers/workerProcess";
import PrimaryProcess from "./workers/primaryProcess";

const cpuCount = availableParallelism();

if (cluster.isPrimary) {
  PrimaryProcess(cpuCount, cluster);
} else {
  WorkerProcess(cpuCount);
}
