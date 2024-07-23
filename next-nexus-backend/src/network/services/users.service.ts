import prisma from "@/prisma";
import Bcrypt from "@/lib/bcrypt.";
import { UpdateUserDTO } from "@/validators/users.dto";

class UserService {
  /**
   * Updates the user profile with the given data.
   *
   * @public
   * @async
   * @param {string} id
   * @param {UpdateUserDTO} data
   * @returns {unknown}
   */
  public async updateUser(id: string, data: UpdateUserDTO) {
    const HashedPassword = await Bcrypt.hashPassword(data.password);
    return prisma.account.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: HashedPassword,
        description: data.description,
        avatarUrl: data.avatarUrl,
      },
    });
  }
}

export default UserService;
