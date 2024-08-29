import Api from "@/lib/api";
import { HttpStatusCode } from "axios";
import UserService from "../services/users.service";
import { HttpInternalServerError } from "@/lib/error";
import { Request, Response, NextFunction } from "@/types/express-types";

class UsersController extends Api {
  private readonly usersService = new UserService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.usersService.getAllUsers();
      this.send(res, users, HttpStatusCode.Ok, "User List Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to get all users"));
    }
  };

  public getUsersCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.usersService.getUsersCount();
      this.send(res, users, HttpStatusCode.Ok, "User Count Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to get users count"));
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const users = await this.usersService.getUser(id);
      this.send(res, users, HttpStatusCode.Ok, "User Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to get user"));
    }
  };

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

  public DeleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const users = await this.usersService.deleteUser(id);
      this.send(res, users, HttpStatusCode.Ok, "Delete User Route");
    } catch (error) {
      next(new HttpInternalServerError("Failed to delete user"));
    }
  };
}

export default UsersController;
