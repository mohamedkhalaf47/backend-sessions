import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);

export default userRouter;
