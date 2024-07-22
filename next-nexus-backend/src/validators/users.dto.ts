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
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}

export { UpdateUserDTO };
