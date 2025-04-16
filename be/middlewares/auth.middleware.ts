import ApiError from "../lib/ApiError.js";
import { asyncHandler } from "../lib/AsyncHandler.js";
import { HttpStatusCode } from "../lib/const.js";
import { User } from "../models/user.model.js";
import type { NextFunction, Request, Response } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Token = req.cookies?.accessToken;

      if (!Token) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new ApiError(HttpStatusCode.NOT_FOUND, "Token not found "));
        return;
      }

      const decodedData = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET!);
      if (!decodedData) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            new ApiError(HttpStatusCode.UNAUTHORIZED, "unauthorized_access ")
          );
        return;
      }

      const user = await User.findById((decodedData as JwtPayload)._id);
      if (!user) {
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(new ApiError(HttpStatusCode.UNAUTHORIZED, "INVAILD_ACCESS"));
        return;
      }

      (req as any).user = user;
      next();
    } catch (error) {
      throw new ApiError(
        401,
        (error as Error).message || "Invaild access token"
      );
    }
  }
);
