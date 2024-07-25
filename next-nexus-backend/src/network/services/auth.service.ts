import Jwt from "@/lib/jwt";
import jose from "node-jose";
import prisma from "@/prisma";
import passport from "passport";
import Bcrypt from "@/lib/bcrypt.";
import { promises as promisefs } from "fs";
import { RegisterDTO } from "@/validators/auth.dto";
import { NextFunction, Request, Response } from "@/types/express-types";

class AuthService {
  public keyStore = jose.JWK.createKeyStore();
  /**
   * Handles user login using passport authentication and generates a JWT if authentication is successful.
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<authToken: string>}
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

            const keyJSON = await promisefs.readFile(
              "./src/keys/key.json",
              "utf8"
            );

            const key = await this.keyStore.add(JSON.parse(keyJSON));

            const encryptedToken = await jose.JWE.createEncrypt(
              { format: "compact" },
              key
            )
              .update(
                JSON.stringify({
                  id: user?.id,
                })
              )
              .final();

            const token = Jwt.generateToken(
              {
                encryptedToken: encryptedToken,
              },
              "7d",
              {
                issuer: "Next-Nexus-App",
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
   * @param {Object} data
   * @param {string} data.name
   * @param {string} data.email
   * @param {string} data.password
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

  public async logout(res: Response) {
    res.clearCookie("sessionToken");

    return {
      message: "Success",
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
          const userIP = (req as any).userIP;

          if (error || !user) {
            reject({
              status: 401,
              message: `Authorization Bearer Token Missing From ${userIP}`,
            });
          }

          resolve({ user });
        }
      )(req, res, next);
    });
  }
}

export default AuthService;
