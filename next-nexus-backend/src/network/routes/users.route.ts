import { Router } from "express";
import RequestValidator from "@/middleware/validator";
import { ExpressRouter } from "@/types/express-types.d";
import { generalRateLimiter } from "@/middleware/rateLimit";
import UsersController from "../controllers/users.controller";
import { verifyUserAuthToken } from "@/middleware/verifyAuthToken";
import { DeleteUserDTO, UpdateUserDTO } from "@/validators/users.dto";

const users: ExpressRouter = Router();
const controller = new UsersController();

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID.
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date of the account.
 *                   avatarUrl:
 *                     type: string
 *                     description: The URL of the user's avatar.
 *                   role:
 *                     type: string
 *                     enum: [ADMIN, USER, MODERATOR]
 *                     description: The role of the user.
 *       500:
 *         description: Internal server error
 */
users.route("/list").get(generalRateLimiter, controller.getAllUsers);

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Retrieve the count of users by role
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A count of users by role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: integer
 *                   description: The number of users with the USER role.
 *                 admin:
 *                   type: integer
 *                   description: The number of users with the ADMIN role.
 *                 moderator:
 *                   type: integer
 *                   description: The number of users with the MODERATOR role.
 *       500:
 *         description: Internal server error
 */
users.route("/count").get(generalRateLimiter, controller.getUsersCount);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the account.
 *                 avatarUrl:
 *                   type: string
 *                   description: The URL of the user's avatar.
 *                 role:
 *                   type: string
 *                   enum: [ADMIN, USER, MODERATOR]
 *                   description: The role of the user.
 *                 description:
 *                   type: string
 *                   description: The user's description.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
users.route("/:id").get(controller.getUser);

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
users
  .route("/update/:id")
  .patch(
    verifyUserAuthToken,
    RequestValidator.validate(UpdateUserDTO),
    controller.UpdateUser
  );

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUserDTO'
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

users
  .route("/delete/:id")
  .delete(
    verifyUserAuthToken,
    RequestValidator.validate(DeleteUserDTO),
    controller.DeleteUser
  );

export default users;
