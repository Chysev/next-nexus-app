import { Router } from "express";
import { ExpressRouter } from "@/types/express-types.d";
import UsersController from "../controllers/users.controller";
import RequestValidator from "@/middleware/validator";
import { UpdateUserDTO } from "@/validators/users.dto";

const users: ExpressRouter = Router();
const controller = new UsersController();

/**
 * @swagger
 * /users/{id}:
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
  .route("/:id")
  .patch(RequestValidator.validate(UpdateUserDTO), controller.UpdateUser);

export default users;
