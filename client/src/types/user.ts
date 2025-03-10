export type User = {
  name: string;
  email: string;
  nodes?: string[];
  workspaces?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type UserLoginData = {
  email: string;
  password: string;
};

export type UserSignUpData = UserLoginData & { name: string; confirmPassword: string; password: string };
