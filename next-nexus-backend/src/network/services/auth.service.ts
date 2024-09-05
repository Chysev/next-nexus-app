import {
  ForgotPasswordDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "@/validators/auth.dto";
import prisma from "@/lib/prisma";
import passport from "passport";
import Bcrypt from "@/lib/bcrypt";
import { HttpNotFoundError } from "@/lib/error";
import joseJwt, { josejwt } from "@/lib/jose-jwt";
import createMailTransporter from "@/utils/mailer";
import { NextFunction, Request, Response } from "@/types/express-types";

class AuthService {
  /**
   * Handles user login using passport authentication and generates a JWT if authentication is successful.
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<sessionToken: string>}
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        async (error: Error, user: User, info) => {
          if (error) {
            return reject({
              status: 500,
              message: "Internal Server Error",
            });
          }

          if (!user) {
            return reject({ status: 401, message: info.message });
          }

          req.login(user, { session: false }, async (err) => {
            if (err) {
              reject(err);
            }

            const encryptedToken = await joseJwt.encryptToken(
              { id: user.id, role: user.role },
              "30d",
              {
                issuer: "next-nexus-app",
                audience: "auth-service",
                subject: user.id,
                clockTolerance: 60,
              }
            );

            const token = await joseJwt.generateToken(
              {
                encryptedToken: encryptedToken,
              },
              "30d",
              {
                issuer: "next-nexus-app",
                audience: "auth-service",
                subject: user.id,
                clockTolerance: 60,
              }
            );

            resolve({ sessionToken: token });
          });
        }
      )(req, res, next);
    });
  }

  /**
   * Registers a new account.
   *
   * @public
   * @async
   * @param {RegisterDTO} data
   * @returns {Promise<Object>}
   * @throws {Error}
   */

  public async register(data: RegisterDTO) {
    const account = await prisma.account.findUnique({
      where: { email: data.email },
    });

    if (account) {
      return { message: "Account is already taken" };
    }

    const hashedPassword = await Bcrypt.hashPassword(data.password);

    await prisma.account.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      message: "Account Created",
    };
  }

  /**
   * Validates and returns the user associated with the provided JWT.
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {User}
   */
  public async SessionToken(req: Request, res: Response, next: NextFunction) {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        async (error: Error, user: User, info) => {
          if (error || !user) {
            reject({
              status: 401,
              message: "Authorization Bearer Token Missing",
            });
          }

          resolve({ user });
        }
      )(req, res, next);
    });
  }

  /**
   * Handles the forgot password functionality by sending a reset password link to the user's email.
   *
   * @public
   * @async
   * @param {ForgotPasswordDTO} data
   * @returns {Promise<Object>}
   * @throws {HttpNotFoundError}
   */
  public async ForgotPassword(data: ForgotPasswordDTO) {
    const account = await prisma.account.findUnique({
      where: { email: data.email },
    });

    if (!account) {
      throw new HttpNotFoundError("Account not found");
    }

    const transporter = createMailTransporter();

    const TokenParams = await josejwt.generateToken(
      {
        id: account.id,
        email: account.email,
        password: account.password,
      },
      "5m",
      {
        issuer: "next-nexus-app",
        audience: "auth-service",
        subject: account.id,
        clockTolerance: 60,
      }
    );

    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: data.email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/account/reset-password/${TokenParams}`,
    });

    return { TokenParams };
  }

  /**
   * Resets the user's password using the provided token and new password.
   *
   * @public
   * @async
   * @param {ResetPasswordDTO} data
   * @param {string} token
   * @returns {Promise<Object>}
   * @throws {HttpNotFoundError}
   */
  public async ResetPassword(data: ResetPasswordDTO, token: string) {
    const TokenParams: any = await joseJwt.verifyToken(token, {
      issuer: "next-nexus-app",
      audience: "auth-service",
    });

    const email = TokenParams?.payload.email;

    if (!email) {
      throw new HttpNotFoundError("Account not found");
    }

    const hashedPassword = await Bcrypt.hashPassword(data.password);

    return prisma.account.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
  }
}

export default AuthService;
