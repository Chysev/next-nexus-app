import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     MailConfigDTO:
 *       type: object
 *       required:
 *         - smtpHost
 *         - smtpPort
 *         - smtpService
 *         - smtpEmail
 *         - smtpPassword
 *       properties:
 *         smtpHost:
 *           type: string
 *         smtpPort:
 *           type: string
 *         smtpService:
 *           type: string
 *         smtpEmail:
 *           type: string
 *         smtpPassword:
 *           type: string
 *
 */
class MailConfigDTO {
  @IsNotEmpty()
  @IsString()
  smtpHost: string;

  @IsNotEmpty()
  @IsString()
  smtpPort: string;

  @IsNotEmpty()
  @IsString()
  smtpService: string;

  @IsNotEmpty()
  @IsEmail()
  smtpEmail: string;

  @IsNotEmpty()
  @IsString()
  smtpPassword: string;
}

export { MailConfigDTO };
