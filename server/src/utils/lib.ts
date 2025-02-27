import { userSchema } from "../schemas/user";

export const isValidUser = (user: any) => {
  const result = userSchema.safeParse(user);
  return result.success;
};
