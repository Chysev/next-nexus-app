import { sign, verify } from "jsonwebtoken";

export class jwt {
  /**
   * Generates a JSON Web Token (JWT) with the specified payload and options.
   *
   * @public
   * @static
   * @param {Record<string, any>} payload
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @param {Record<string, any>} [claims={}] -
   * @returns {string}
   */
  public static generateToken(
    payload: Record<string, any>,
    expiresIn: string,
    options: JwtOptions = {},
    claims: Record<string, any> = {}
  ): string {
    return sign({ ...payload, ...claims }, process.env.JWT_PRIVATE_KEY, {
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
   * @static
   * @param {string} sessionToken
   * @param {JwtOptions} [options={}]
   * @returns {(Record<string, any> | null)}
   */
  public static verifyToken(
    sessionToken: string,
    options: JwtOptions = {}
  ): Record<string, any> | null {
    try {
      return verify(sessionToken, process.env.JWT_PUBLIC_KEY, {
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
   * @static
   * @param {string} sessionToken
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @returns {(string | null)}
   */
  public static refreshToken(
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

export default jwt;
