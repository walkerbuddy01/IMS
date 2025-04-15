import { asyncHandler } from "../lib/AsyncHandler.ts";
import { User } from "../models/user.model.js";
import apiError from "../lib/ApiError.ts";
import ApiResponse from "../lib/ApiResponse.ts";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { HttpStatusCode } from "../lib/const.ts";
import type { Request, Response } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullname: string;
  avatar: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const generateAccessToken = async (userId: string) => {
  try {
    const user: any = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });
    return accessToken ;
  } catch (error) {
    return new apiError(HttpStatusCode.BAD_REQUEST, `Internal Server Error ${error}`);
  }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const { fullname, email, password } = req.body;

  if ([fullname, email, password].some((field) => field.trim() === "")) {
    return new apiError(400, "Please fill all the fields");
  }

  if (email.includes("@")) {
    const vaildDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    const domain = email.split("@")[1];
    //TODO: Please complete this validation
  } else {
    return new apiError(
      400,
      "Please Enter the vaild email:Which contain the '@' symbol"
    );
  }

  //Query in the database
  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    return new apiError(
      409,
      "User with this email and password already existed"
    );
  }

  const createdUser = await User.create({
    fullname,
    email,
    password,
    avatar: fullname.toUpperCase()[0],
    refreshToken: "",
  });

  const user = await User.findById(createdUser._id).select(
    "-password "
  );

  if (!user) {
    return new apiError(500, "Server failed to create user please try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User created successfully"));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const bodycontain = req.body;

  if (!bodycontain.email) {
    return new apiError(401, " email is required");
  }

  const user = await User.findOne({
    // mongoose operator !
    $or: [{ email: bodycontain.email }],
  });

  const token = await generateAccessToken(user?._id as any);

  console.log(token.accessToken);

  if (!user) {
    return new apiError(404, "User with the given credentials is not found");
  }

  if (!bodycontain.password) {
    return new apiError(401, "Password is requied");
  }

  const updatedUser = await User.findById(user._id)?.select("-password");

  const option = {
    httpOnly: true,
    secure: true,
  }; //cookie option

  res.cookie("accessToken", token, option);

  return res
    .status(200)
    .json(new ApiResponse(201, updatedUser, "user logged in successfully"));
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "User loggedOut"));
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const {} = req.body;
  return res
    .status(200)
    .json(new ApiResponse(200, "", "User is loggedIn"));
});

// const updatePassword = asyncHandler(async (req: Request, res: Response) => {
//   const { oldPassword, newPassword } = req.body;

//   if (!oldPassword || !newPassword) {
//     return new apiError(404, "Please send the required fields");
//   }

//   const user = await User.findById(req.user._id);

//   const oldPasswordValidation = await user.isPasswordCorrect(oldPassword);

//   if (!oldPasswordValidation) {
//     return new apiError(401, "password is wrong!");
//   }

//   user.password = newPassword;
//   user.save();
//   return res
//     .status(200)
//     .json(new ApiResponse(201, {}, "Password changed successfully"));
// });

export {
  registerUser,
  loginUser,
  logoutUser,
  // assignAccessToken,
  // getCurrentUser,
  // updatePassword,
};
