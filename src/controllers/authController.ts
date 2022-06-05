import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { AuthModel } from "../model/dbModel";

import { userAgentCleaner } from "../utils/userAgentCleaner";

const signUpUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedSignUpUserData, useragent } = res.locals;

      const newUser = await new AuthModel({
        ...validatedSignUpUserData,
        userAgent: { ...(await userAgentCleaner(useragent)) },
      });

      newUser.save();

      delete res.locals.validatedSignUpUserData;
      delete res.locals.useragent;

      return res.json(newUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const logInUserkDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedLogInUserData } = res.locals;

      const existingUser = await AuthModel.find({
        ...validatedLogInUserData,
      }).select("+email +username -user -_id -__v -createdAt -updatedAt");

      delete res.locals.validatedLogInUserData;

      return res.json(existingUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updateUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedEditUserData } = res.locals;
      // Must use userId for params and have a setting for existing password to new password
      const { username, email, newPassword, password } = validatedEditUserData;

      const editedUser = await AuthModel.findOneAndUpdate(
        {
          user: "1850ea5e-580e-4c35-82e2-7e21fb0ff9b4",
          password: password,
        },
        {
          ...(username && { username }),
          ...(email && { email }),
          ...(newPassword && { password: newPassword }),
        }
      ).select("+email +username -user -_id -__v -createdAt -updatedAt");

      delete res.locals.validatedEditUserData;

      return res.json(editedUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeleteUserData } = res.locals;
      // Must use userId for params and have a setting for existing password to new password
      const deletedUser = await AuthModel.findOneAndDelete({
        ...validatedDeleteUserData,
      });

      delete res.locals.validatedEditUserData;

      return res.json(deletedUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export {
  signUpUserDataController,
  logInUserkDataController,
  updateUserDataController,
  deleteUserDataController,
};
