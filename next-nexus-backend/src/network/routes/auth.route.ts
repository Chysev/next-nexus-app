import { Router } from "express";
import { LoginDTO, RegisterDTO } from "@/validators/auth.dto";
import { ExpressRouter } from "@/types/express-types";
import RequestValidator from "@/middleware/validator";
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
 *       500:
 *         description: Internal server error
 */
auth
  .route("/login")
  .post(RequestValidator.validate(LoginDTO), controller.Login);

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
  .post(RequestValidator.validate(RegisterDTO), controller.Register);

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

export default auth;
