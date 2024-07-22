import prisma from "@/prisma";
import Bcrypt from "@/lib/bcrypt.";
import { UpdateUserDTO } from "@/validators/users.dto";

class UserService {
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
