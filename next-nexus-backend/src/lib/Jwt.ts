import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync(
  "../next-nexus-backend/src/certs/jwtRS256.key",
  "utf8"
);

class Jwt {
  /**
   * Generates a JSON Web Token (JWT) with a specified payload and expiration time.
   *
   * @public
   * @param {T} payload
   * @param {string} expiresIn
   * @returns {string}
   */
  public generateToken<T extends object>(
    payload: T,
    expiresIn: string
  ): string {
    return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: expiresIn,
    });
  }
}

export default new Jwt();
