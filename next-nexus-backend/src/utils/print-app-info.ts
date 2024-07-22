import kleur from "kleur";

const printAppInfo = () => {
  const serverSuccessMessage = kleur.green("Server is running successfully!");
  const label = (name: string) => kleur.bold(name) + ":";

  const env = process.env.NODE_ENV;
  const port = process.env.BACKEND_PORT;
  const appUrl = process.env.BACKEND_BASE_URL;
  const apiUrl = process.env.FRONTEND_BASE_URL;
  const dbUrl = process.env.DATABASE_URL;

  console.log(`
    \r${serverSuccessMessage}\n
    \r${label("Port")} ${kleur.yellow(port || "Not set")}\n
    \r${label("Env")} ${kleur.yellow(env || "Not set")}\n
    \r${label("Server URL")} ${kleur.yellow(appUrl || "Not set")}\n
    \r${label("Client URL")} ${kleur.yellow(apiUrl || "Not set")}\n
    \r${label("DB URL")} ${kleur.yellow(dbUrl || "Not set")}\n
  `);
};

export default printAppInfo;
