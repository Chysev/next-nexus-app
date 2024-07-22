import Api from "@/lib/api";
import UserService from "../services/users.service";
import { Request, Response, NextFunction } from "@/types/express-types";
import { HttpStatusCode } from "axios";
import { HttpInternalServerError } from "@/lib/error";

class UsersController extends Api {
  private readonly usersService = new UserService();

  public UpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const users = await this.usersService.updateUser(id, req.body);
      this.send(res, users, HttpStatusCode.Ok, "Update User Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to update user"));
    }
  };
}

export default UsersController;
