import fs from "fs";
import jwt from "jsonwebtoken";

const privateKey = fs.readFileSync(
  "../next-nexus-backend/src/certs/jwtRS256.key"
);

const publicKey = fs.readFileSync(
  "../next-nexus-backend/src/certs/jwtRS256.pub"
);

class Jwt {
  /**
   * Generates a JSON Web Token (JWT) with the specified payload, expiration time, and options.
   *
   * @public
   * @param {Record<string, any>} payload
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @param {Record<string, any>} [claims={}]
   * @returns {string}
   */
  public generateToken(
    payload: Record<string, any>,
    expiresIn: string,
    options: JwtOptions = {},
    claims: Record<string, any> = {}
  ): string {
    return jwt.sign({ ...payload, ...claims }, privateKey, {
      algorithm: "RS256",
      expiresIn: expiresIn,
      issuer: options.issuer,
      audience: options.audience,
      subject: options.subject,
    });
  }

  /**
   * Verifies the authenticity and validity of a JWT.
   *
   * @public
   * @param {string} sessionToken
   * @param {JwtOptions} [options={}]
   * @returns {(Record<string, any> | null)}
   */
  public verifyToken(
    sessionToken: string,
    options: JwtOptions = {}
  ): Record<string, any> | null {
    try {
      return jwt.verify(sessionToken, publicKey, {
        algorithms: ["RS256"],
        issuer: options.issuer,
        audience: options.audience,
        subject: options.subject,
        clockTolerance: options.clockTolerance,
      }) as Record<string, any>;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refreshes an expired JWT by generating a new token with the same payload.
   *
   * @public
   * @param {string} sessionToken
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @returns {(string | null)}
   */
  public refreshToken(
    sessionToken: string,
    expiresIn: string,
    options: JwtOptions = {}
  ): string | null {
    const decoded = this.verifyToken(sessionToken);
    if (decoded) {
      const { exp, ...payload } = decoded;
      return this.generateToken(payload, expiresIn, options);
    }
    return null;
  }
}

export default new Jwt();
