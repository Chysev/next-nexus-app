import fs from "fs";
import path from "path";
import { MailConfigDTO } from "@/validators/config.dto";
import { HttpNotFoundError } from "@/lib/error";

const configFilePath = path.join(
  process.cwd(),
  "/src/config/services/mailConfig.json"
);

class ConfigService {
  /**
   * Retrieves the mail configuration from the file system.
   *
   * @public
   * @async
   * @returns {Promise<MailConfigDTO>}
   * @throws {Error}
   */
  public async getMailConfig() {
    if (fs.existsSync(configFilePath)) {
      const data = fs.readFileSync(configFilePath, "utf8");
      return JSON.parse(data) as MailConfigDTO;
    } else {
      return new HttpNotFoundError("Configuration file not found");
    }
  }

  /**
   * Saves the provided mail configuration to the file system.
   *
   * @public
   * @async
   * @param {MailConfigDTO} config
   * @returns {Promise<{ message: string }>}
   */
  public async setMailConfig(config: MailConfigDTO) {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    return { message: "Mail configuration saved successfully." };
  }
}

export default ConfigService;
