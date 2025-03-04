import { User } from "../schemas/user.schema";

export type UserLoginData = {
  email: string;
  password: string;
};

export type UserSignUpData = UserLoginData & { name: string; confirmPassword: string; password: string };

export type { User };
