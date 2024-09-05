import { randomBytes } from "crypto";
import {
  EncryptJWT,
  SignJWT,
  importPKCS8,
  importSPKI,
  jwtDecrypt,
  jwtVerify,
} from "jose";

const symmetricKeyUint8Array = new Uint8Array(32);

const alg = "RS256";

export class josejwt {
  /**
   *  Generates a JWT (JSON Web Token) with the specified payload and options.
   *
   * @public
   * @static
   * @async
   * @param {Record<string, any>} payload
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @param {Record<string, any>} [claims={}]
   * @returns {Promise<string>}
   */
  public static async generateToken(
    payload: Record<string, any>,
    expiresIn: string,
    options: JwtOptions = {},
    claims: Record<string, any> = {}
  ): Promise<string> {
    const privateKey = await importPKCS8(
      process.env.JOSE_PRIVATE_KEY as string,
      alg
    );
    return await new SignJWT({ ...payload, ...claims })
      .setIssuedAt()
      .setProtectedHeader({ alg: alg })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .setIssuer(options.issuer as string)
      .setAudience(options.audience as string)
      .setSubject(options.subject as string)
      .sign(privateKey as any);
  }

  /**
   * Verifies a JWT and returns the decoded payload if valid.
   *
   * @public
   * @static
   * @async
   * @param {string} sessionToken
   * @param {JwtOptions} [options={}]
   * @returns {(Promise<Record<string, any> | null>)}
   */
  public static async verifyToken(
    sessionToken: string,
    options: JwtOptions = {}
  ): Promise<Record<string, any> | null> {
    try {
      const publicKey = await importSPKI(
        process.env.JOSE_PUBLIC_KEY as string,
        alg
      );

      const { payload, protectedHeader } = (await jwtVerify(
        sessionToken,
        publicKey as any,
        {
          issuer: options.issuer,
          audience: options.audience,
        }
      )) as Record<string, any>;
      return {
        protectedHeader,
        payload,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Encrypts a payload and returns the encrypted JWT.
   *
   * @public
   * @static
   * @async
   * @param {Record<string, any>} payload
   * @param {string} expiresIn
   * @param {JwtOptions} [options={}]
   * @param {Record<string, any>} [claims={}]
   * @returns {Promise<string>}
   */
  public static async encryptToken(
    payload: Record<string, any>,
    expiresIn: string,
    options: JwtOptions = {},
    claims: Record<string, any> = {}
  ) {
    return await new EncryptJWT({ ...payload, ...claims })
      .setIssuedAt()
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .setIssuer(options.issuer as string)
      .setAudience(options.audience as string)
      .setSubject(options.subject as string)
      .encrypt(symmetricKeyUint8Array);
  }

  /**
   * Decrypts an encrypted JWT and returns the decoded payload.
   *
   * @public
   * @static
   * @async
   * @param {string} sessionToken
   * @param {JwtOptions} [options={}]
   * @returns {Promise<Record<string, any> | null>}
   */
  public static async decryptToken(
    sessionToken: string,
    options: JwtOptions = {}
  ) {
    try {
      const { payload, protectedHeader } = await jwtDecrypt(
        sessionToken,
        symmetricKeyUint8Array,
        {
          issuer: options.issuer,
          audience: options.audience,
        }
      );
      return { payload, protectedHeader };
    } catch (error) {
      return null;
    }
  }
}

export default josejwt;
