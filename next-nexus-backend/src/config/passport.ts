import prisma from "@/prisma";
import Bcrypt from "@/lib/bcrypt.";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import fs from "fs";

const privateKey = fs.readFileSync(
  "../next-nexus-backend/src/certs/jwtRS256.pub",
  "utf8"
);

class PassportConfig {
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
          secretOrKey: privateKey,
          algorithms: ["RS256"],
        },
        async (jwtPayload: any, done) => {
          try {
            const account = await prisma.account.findUnique({
              where: { id: jwtPayload?.id },
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

export default new PassportConfig();
