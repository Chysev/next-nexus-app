import {
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  ForgotPasswordDTO,
} from "@/validators/auth.dto";
import { Router } from "express";
import rateLimiter from "@/middleware/rateLimit";
import { ExpressRouter } from "@/types/express-types";
import RequestValidator from "@/middleware/validator";
import { dataRateLimiter } from "@/middleware/rateLimit";
import AuthController from "../controllers/auth.controller";

const auth: ExpressRouter = Router();
const controller = new AuthController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
auth
  .route("/login")
  .post(
    rateLimiter(dataRateLimiter),
    RequestValidator.validate(LoginDTO),
    controller.Login
  );

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       200:
 *         description: Account created successfully
 *       500:
 *         description: Internal server error
 */
auth
  .route("/register")
  .post(
    rateLimiter(dataRateLimiter),
    RequestValidator.validate(RegisterDTO),
    controller.Register
  );

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /auth/session-token:
 *   get:
 *     summary: Get a new session token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session token created successfully
 *       401:
 *         description: Unauthorized
 */
auth.route("/session-token").get(controller.SessionToken);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Mail a forgot password link to user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordDTO'
 *     responses:
 *       200:
 *         description: Account created successfully
 *       500:
 *         description: Internal server error
 */
auth
  .route("/forgot-password")
  .post(
    rateLimiter(dataRateLimiter),
    RequestValidator.validate(ForgotPasswordDTO),
    controller.ForgotPassword
  );

/**
 * @swagger
 * /auth/reset-password/:token:
 *   post:
 *     summary: Reset user's password using Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDTO'
 *     responses:
 *       200:
 *         description: Account created successfully
 *       500:
 *         description: Internal server error
 */
auth
  .route("/reset-password/:token")
  .post(
    rateLimiter(dataRateLimiter),
    RequestValidator.validate(ResetPasswordDTO),
    controller.ResetPassword
  );

export default auth;
