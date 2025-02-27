import { Request, Response } from "express";
import { User } from "../models/user";
import { isValidUser } from "../utils/lib";

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  if (!userData || !isValidUser(userData)) {
    res.json({ error: "Invalid user data.", receivedData: userData });
  }

  const user = await User.create(userData);

  res.json(user);
};
