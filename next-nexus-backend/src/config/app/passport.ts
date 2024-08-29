import "@/utils/env-validator";
import passport from "passport";
import prisma from "@/lib/prisma";
import Bcrypt from "@/lib/bcrypt";
import joseJwt from "@/lib/jose-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

export class PassportConfig {
  public initialize() {
    this.setupLocalStrategy();
    this.setupJwtStrategy();
    return passport.initialize();
  }

  private setupLocalStrategy() {
    passport.use(
      new LocalStrategy(
        { usernameField: "email", session: false },
        async (email: string, password: string, done) => {
          try {
            const account = await prisma.account.findUnique({
              where: { email: email },
            });

            if (!account) {
              return done(null, false, { message: "Account Not Found" });
            }

            const passwordMatch = await Bcrypt.comparePassword(
              password,
              account.password
            );

            if (!passwordMatch) {
              return done(null, false, { message: "Invalid Credentials" });
            }

            return done(null, account);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  private setupJwtStrategy() {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          // Change this into JWT_PUBLIC_KEY if you used jwt.ts to generate token
          secretOrKey: process.env.JOSE_PUBLIC_KEY as string,
          algorithms: ["RS256"],
        },
        async (jwtPayload: any, done) => {
          const decryptedToken = await joseJwt.decryptToken(
            jwtPayload.encryptedToken
          );

          if (!decryptedToken) {
            return done(null, false, {
              message: "Decryption failed or invalid token",
            });
          }

          try {
            const account = await prisma.account.findUnique({
              where: { id: decryptedToken?.payload.id as any },
            });

            if (!account) {
              return done(null, false, {
                message: "Account Not Found",
              });
            }

            const accountData = {
              id: account.id,
              name: account.name,
              email: account.email,
              avatarUrl: account.avatarUrl,
              description: account.description,
              role: account.role,
              createdAt: account.createdAt,
              updatedAt: account.updatedAt,
            };

            return done(null, accountData);
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  }
}

export default PassportConfig;
