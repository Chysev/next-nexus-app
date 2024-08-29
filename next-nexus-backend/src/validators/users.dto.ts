import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         avatarUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 */
class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  role: "USER" | "ADMIN" | "MODERATOR";

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUserDTO:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 */
class DeleteUserDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export { UpdateUserDTO, DeleteUserDTO };
