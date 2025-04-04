import express from "express";
import {
//   assignAccessToken,
//   getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
//   updatePassword,
} from "../controllers/user.controller.ts";
// import { JWTVerify } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
// router.route("/assignToken").post(assignAccessToken);
// router.route("/getCurrentUser").get( getCurrentUser);
// router.route("/change-password").post(updatePassword)

export default router;