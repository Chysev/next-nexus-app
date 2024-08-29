import { Router } from "express";
import { Multer } from "@/lib/cloudinary";
import { ExpressRouter } from "@/types/express-types";
import { verifyUserAuthToken } from "@/middleware/verifyAuthToken";
import CloudServicesController from "../controllers/cloud-services.controller";

const cloud: ExpressRouter = Router();
const controller = new CloudServicesController();

/**
 * @swagger
 * /cloud-services/upload:
 *   post:
 *     summary: Upload an image to the cloud.
 *     tags: [Cloud Services]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatarUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_url:
 *                   type: string
 *                   example: "https://example.com/path/to/image.jpg"
 *       500:
 *         description: Internal Server Error.
 */
cloud
  .route("/upload")
  .post(
    verifyUserAuthToken,
    Multer.single("avatarUrl"),
    controller.UploadStaticContent
  );

export default cloud;
