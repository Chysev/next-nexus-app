import bcrypt from "bcrypt";

class Bcrypt {
  /**
   * Hashes a plain text password asynchronously.
   *
   * @public
   * @async
   * @param {string} plainTextPassword
   * @returns {Promise<string>}
   */
  public async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  /**
   * Hashes a plain text password synchronously.
   *
   * @public
   * @param {string} plainTextPassword
   * @returns {string}
   */
  public hashPasswordSync(plainTextPassword: string): string {
    const saltRounds = 10;
    try {
      const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  /**
   * Compares a plain text password with a hashed password asynchronously.
   *
   * @public
   * @async
   * @param {string} plainTextPassword
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  public async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {string} plainTextPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  public comparePasswordSync(
    plainTextPassword: string,
    hashedPassword: string
  ): boolean {
    try {
      return bcrypt.compareSync(plainTextPassword, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }
}

export default new Bcrypt();
