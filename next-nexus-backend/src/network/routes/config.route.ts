import { Router } from "express";
import { ExpressRouter } from "@/types/express-types";
import RequestValidator from "@/middleware/validator";
import { MailConfigDTO } from "@/validators/config.dto";
import ConfigController from "../controllers/config.controller";
import { verifyAdminAuthToken } from "@/middleware/verifyAuthToken";

const config: ExpressRouter = Router();
const controller = new ConfigController();

/**
 * @swagger
 * /config/mail:
 *   get:
 *     summary: Get the mail configuration
 *     tags: [MailConfig]
 *     responses:
 *       200:
 *         description: Successfully retrieved mail configuration
 *       500:
 *         description: Internal server error
 */
config.route("/mail").get(verifyAdminAuthToken, controller.getMailConfig);

/**
 * @swagger
 * /config/mail:
 *   post:
 *     summary: Set the mail configuration
 *     tags: [MailConfig]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MailConfigDTO'
 *     responses:
 *       200:
 *         description: Successfully set mail configuration
 *       500:
 *         description: Internal server error
 */
config
  .route("/setmail")
  .post(
    verifyAdminAuthToken,
    RequestValidator.validate(MailConfigDTO),
    controller.setMailConfig
  );

export default config;
