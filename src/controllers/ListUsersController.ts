import { Request, Response } from "express";
import { ListUserService } from "../services/ListUsersService";

class ListUsersController {
  async handle(requeste: Request, response: Response) {
    const listUsersService = new ListUserService();

    const users = await listUsersService.execute();

    return response.json(users);
  }
}

export { ListUsersController };
