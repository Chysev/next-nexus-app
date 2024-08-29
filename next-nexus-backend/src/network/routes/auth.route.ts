import {
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  ForgotPasswordDTO,
} from "@/validators/auth.dto";
import { Router } from "express";
import { ExpressRouter } from "@/types/express-types";
import RequestValidator from "@/middleware/validator";
import { authRateLimiter } from "@/middleware/rateLimit";
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
  .post(authRateLimiter, RequestValidator.validate(LoginDTO), controller.Login);

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
    authRateLimiter,
    RequestValidator.validate(RegisterDTO),
    controller.Register
  );

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 *       500:
 *         description: Internal server error
 */
auth.route("/logout").get(controller.Logout);

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
    authRateLimiter,
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
    authRateLimiter,
    RequestValidator.validate(ResetPasswordDTO),
    controller.ResetPassword
  );

export default auth;
