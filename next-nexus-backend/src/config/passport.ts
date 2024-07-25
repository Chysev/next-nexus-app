import fs from "fs";
import jose from "node-jose";
import prisma from "@/prisma";
import passport from "passport";
import Bcrypt from "@/lib/bcrypt.";
import { promises as promisefs } from "fs";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const publicKey = fs.readFileSync(
  "../next-nexus-backend/src/certs/jwtRS256.pub",
  "utf8"
);

class PassportConfig {
  public keyStore = jose.JWK.createKeyStore();

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
          secretOrKey: publicKey,
          algorithms: ["RS256"],
        },
        async (jwtPayload: any, done) => {
          const keyJSON = await promisefs.readFile(
            "./src/keys/key.json",
            "utf8"
          );

          const key = await this.keyStore.add(JSON.parse(keyJSON));

          const decryptedToken = await jose.JWE.createDecrypt(key).decrypt(
            jwtPayload.encryptedToken
          );

          const payload = JSON.parse(decryptedToken.plaintext.toString());

          try {
            const account = await prisma.account.findUnique({
              where: { id: payload?.id },
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
