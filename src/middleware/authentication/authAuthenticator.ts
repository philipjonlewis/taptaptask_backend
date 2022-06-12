import { Request, Response, RequestHandler, NextFunction } from "express";

import fs from "fs";
import path from "path";

import jwt from "jsonwebtoken";

import asyncHandler from "../../handlers/asyncHandler";
import ErrorHandler from "../errorHandling/modifiedErrorHandler";

import { AuthModel } from "../../model/dbModel";

const signUpAuthenticator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { validatedSignUpUserData } = res.locals;

      const doesUserExist = await AuthModel.exists({
        // email: "lewisphilipjon@gmail.com",
        email: validatedSignUpUserData.email,
      });

      if (doesUserExist) {
        throw new ErrorHandler(500, "user already exists", {});
      }

      return next();
    } catch (error: any) {
      throw new ErrorHandler(error.status, error?.message, {});
    }
    //if email and password exists do not process
  }
) as RequestHandler;

const logInAuthenticator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { validatedLogInUserData } = res.locals;

      const doesUserExist = await AuthModel.exists({
        email: validatedLogInUserData.email,
      });

      if (doesUserExist) {
        return next();
      }
      throw new ErrorHandler(500, "user already exists", {});
    } catch (error: any) {
      throw new ErrorHandler(error.status, error?.message, {});
    }
  }
) as RequestHandler;

const userCredentialsAuthenticator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessTokenAuthenticatedUserId } = res.locals;

      const doesUserExist = await AuthModel.exists({
        _id: accessTokenAuthenticatedUserId,
      });

      if (doesUserExist) {
        return next();
      }
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  signUpAuthenticator,
  logInAuthenticator,
  userCredentialsAuthenticator,
};