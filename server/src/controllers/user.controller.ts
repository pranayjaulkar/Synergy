import { RequestHandler } from "express";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { UserLoginData, UserSignUpData } from "../types/user.types";
import { handleFirebaseErrors, loginUserWithEmailAndPassword, signUpUserWithEmailAndPassword } from "../services/firebase";
import { isValidUser } from "../utils/lib";
import { User as FirebaseUser } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const signUpUser: RequestHandler = async (req, res) => {
  const userData: UserSignUpData = req.body;
  console.log("userData: ", userData);

  if (!userData || !isValidUser(userData)) {
    throw new ApiError({
      code: "invalid-data",
      at: "signUpUser",
      status: 400,
      data: { receivedData: userData },
    });
  }

  let user: FirebaseUser | undefined;
  try {
    user = await signUpUserWithEmailAndPassword({ email: userData.email, password: userData.password });
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseErrors(error);
    }
    throw new ApiError({ at: "signUpUser" });
  }

  console.log("user: ", user);
  if (!user) throw new Error(`Received User is undefined or null`);

  const createdUser = await User.create({ name: user.displayName, email: user.email });

  res.json(createdUser);
};

export const loginUser: RequestHandler = async (req, res) => {
  const userData: UserLoginData = req.body;

  if (typeof userData?.email !== "string" || typeof userData?.password !== "string") {
    throw new ApiError({
      code: "invalid-data",
      at: "signUpUser",
      message: "Email or Password is required",
      status: 400,
      data: { receivedData: userData },
    });
  }

  let user: FirebaseUser | undefined;
  try {
    user = await loginUserWithEmailAndPassword({ email: userData.email, password: userData.password });
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseErrors(error);
    }
    throw new ApiError({ at: "signUpUser" });
  }

  res.json(user);
};
