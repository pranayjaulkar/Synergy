import { NextFunction, RequestHandler } from "express";
import { userSchema } from "../schemas/user.schema";
import { RequestHandlerParams } from "express-serve-static-core";

export const isValidUser = (user: any) => {
  const result = userSchema.safeParse(user);
  return result.success;
};

export const catchAsync = (func: RequestHandler): RequestHandler => {
  return (req, res, next) => Promise.resolve(func(req, res, next)).catch(next);
};
