import prisma from "@/lib/prisma";
import Bcrypt from "@/lib/bcrypt";
import { UpdateUserDTO } from "@/validators/users.dto";
import { HttpNotFoundError } from "@/lib/error";

class UserService {
  /**
   * Retrieves the details of all users.
   *
   * @public
   * @returns {Promise<Array<Object>>}
   */
  public getAllUsers() {
    return prisma.account.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        avatarUrl: true,
        role: true,
      },
    });
  }

  /**
   * Gets the count of users by their roles.
   *
   * @public
   * @async
   * @returns {Promise<Object>}
   */
  public async getUsersCount() {
    const users = await prisma.account.count({
      where: { role: "USER" },
    });

    const admin = await prisma.account.count({
      where: { role: "ADMIN" },
    });

    const moderator = await prisma.account.count({
      where: { role: "MODERATOR" },
    });

    const count = {
      users: users,
      admin: admin,
      moderator: moderator,
    };
    return count;
  }

  /**
   * Retrieves the details of a specific user by their ID.
   *
   * @public
   * @param {string} id
   * @returns {Promise<Object | null>}
   */
  public getUser(id: string) {
    return prisma.account.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
        avatarUrl: true,
        role: true,
      },
    });
  }

  /**
   * Updates the user profile with the given data.
   *
   * @public
   * @async
   * @param {string} id
   * @param {UpdateUserDTO} data
   * @returns {Promise<Object>}
   * @throws {Error}
   */

  public async updateUser(id: string, data: UpdateUserDTO) {
    const account = await prisma.account.findUnique({
      where: { id: id },
    });

    if (!account) {
      return new HttpNotFoundError("Account not found");
    }

    let updatedPassword = account.password;

    if (data.password) {
      updatedPassword = await Bcrypt.hashPassword(data.password);
    }

    return await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        name: data.name || account.name,
        email: data.email || account.email,
        role: data.role || account.role,
        password: updatedPassword,
        description: data.description || account.description,
        avatarUrl: data.avatarUrl || account.avatarUrl,
      },
    });
  }

  /**
   * Deletes a user by their ID.
   *
   * @public
   * @param {string} id
   * @returns {Promise<Object>}
   */
  public deleteUser(id: string) {
    return prisma.account.delete({
      where: { id: id },
    });
  }
}

export default UserService;
