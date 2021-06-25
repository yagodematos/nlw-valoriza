import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // verificar se email existe
    const user = await usersRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    //verificar senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // gerar token
    const token = sign(
      { email: user.email },
      "6425ddbf9cd648e1e4d33c4340d3373d",
      { subject: user.id, expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateUserService };
