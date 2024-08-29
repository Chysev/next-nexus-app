import { IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
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
 */
class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 */
class LoginDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordDTO:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 */
class ForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordDTO:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 */
class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export { RegisterDTO, LoginDTO, ForgotPasswordDTO, ResetPasswordDTO };
