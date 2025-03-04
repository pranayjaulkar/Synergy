import express from "express";
import { signUpUser, loginUser } from "../controllers/user.controller";
import { catchAsync } from "../utils/lib";

const router = express.Router();

router.route("/signup").post(catchAsync(signUpUser));
router.route("/login").post(catchAsync(loginUser));

export const userRouter = router;
