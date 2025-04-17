import type { Request, Response } from "express";
import { Document } from "mongoose";
import apiError from "../lib/ApiError.ts";
import ApiResponse from "../lib/ApiResponse.ts";
import { asyncHandler } from "../lib/AsyncHandler.ts";
import { HttpStatusCode } from "../lib/const.ts";
import { User } from "../models/user.model.js";

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
    return accessToken;
  } catch (error) {
    return new apiError(
      HttpStatusCode.BAD_REQUEST,
      `Internal Server Error ${error}`
    );
  }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const { fullname, email, password } = req.body;

  if ([fullname, email, password].some((field) => field.trim() === "")) {
    return new apiError(
      HttpStatusCode.BAD_REQUEST,
      "Please fill all the fields"
    );
  }

  //Query in the database
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return new apiError(
      HttpStatusCode.CONFLICT,
      "User with this email and password already existed"
    );
  }

  try {
    const createdUser = await User.create({
      fullname,
      email,
      password,
      avatar: fullname.toUpperCase()[0],
    });

    const user = await User.findById(createdUser._id).select("-password ");

    if (!user) {
      return new apiError(
        HttpStatusCode.SERVER_ERROR,
        "Server failed to create user please try again"
      );
    }

    return res
      .status(HttpStatusCode.CREATED)
      .json(
        new ApiResponse(
          HttpStatusCode.CREATED,
          user,
          "User created successfully"
        )
      );
  } catch (error) {
    return new apiError(HttpStatusCode.SERVER_ERROR, "Internal Server Error");
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const bodycontain = req.body;

  if (!bodycontain.email) {
    return new apiError(HttpStatusCode.NOT_FOUND, " email is required");
  }

  const user = await User.findOne({
    // mongoose operator !
    $or: [{ email: bodycontain.email }],
  });

  const token = await generateAccessToken(user?._id as any);

  if (!user) {
    res
      .status(HttpStatusCode.NOT_FOUND)
      .json(new apiError(HttpStatusCode.NOT_FOUND, "User not found"));
    return;
  }

  if (!bodycontain.password) {
    res
      .status(HttpStatusCode.NOT_FOUND)
      .json(new apiError(HttpStatusCode.NOT_FOUND, "Password is required"));
    return;
  }

  const isPasswordCorrect = await user.isPasswordCorrect(bodycontain.password);

  if (!isPasswordCorrect) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json(
        new ApiResponse(
          HttpStatusCode.UNAUTHORIZED,
          "",
          "Password is incorrect"
        )
      );
    return;
  }

  const updatedUser = await User.findById(user._id)?.select("-password");

  return res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      // sameSite: "lax",
    })
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
  return res.status(200).json(new ApiResponse(200, "", "User is loggedIn"));
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
  loginUser,
  logoutUser, registerUser
};
