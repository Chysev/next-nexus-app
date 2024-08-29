import kleur from "kleur";
import config from "@/config/app/config";

const printAppInfo = (
  cpuCount: number = 1,
  workerCount: number = 1,
  processId: number | string = "Unknown",
  customMessage: string = "",
  customMessage2: string = ""
) => {
  const serverSuccessMessage = kleur.green("Server is running successfully!");
  const label = (name: string) => kleur.bold(name) + ":";

  const env = process.env.NODE_ENV || "development";
  const port = process.env.BACKEND_PORT || "Not set";
  const appUrl = process.env.BACKEND_BASE_URL || "Not set";
  const apiUrl = process.env.FRONTEND_BASE_URL || "Not set";
  const redisUrl = process.env.REDIS_URL || "Not set";
  const dbUrl = process.env.DATABASE_URL || "Not set";

  console.log(`
    \r${kleur.yellow("-----------------------------------")}\n
    \r${serverSuccessMessage}\n
    \r${label("Env")} ${kleur.yellow(env)}\n
    \r${label("Port")} ${kleur.yellow(port)}\n
    \r${label("Server URL")} ${kleur.yellow(appUrl)}\n
    \r${label("API Base Route")} ${kleur.yellow(
    `/${config.api.baseRoute}/${config.api.version}`
  )}\n
    \r${label("Client URL")} ${kleur.yellow(apiUrl)}\n
    \r${label("REDIS URL")} ${kleur.yellow(redisUrl)}\n
    \r${label("DB URL")} ${kleur.yellow(dbUrl)}\n
    \r${label("Process ID")} ${kleur.yellow(processId.toString())}\n
    \r${label("CPU Count")} ${kleur.yellow(cpuCount.toString())}\n
    \r${label("Worker Count")} ${kleur.yellow(workerCount.toString())}\n
    \r${customMessage ? kleur.blue(customMessage) : ""}\n
    \r${customMessage2 ? kleur.blue(customMessage2) : ""}\n
    \r${kleur.yellow("-----------------------------------")}\n
`);
};

export default printAppInfo;
