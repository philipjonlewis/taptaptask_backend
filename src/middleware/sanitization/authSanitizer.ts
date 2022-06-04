import { Request, Response, RequestHandler, NextFunction } from "express";

import sanitizeHtml from "sanitize-html";
import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const sanitizationOptions = {
  allowedTags: [],
  parser: {
    lowerCaseTags: true,
  },
};

const signUpUserDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, passwordConfirmation } = req.body;

      const sanitizedSignUpUserData = {
        email: sanitizeHtml(email.toString().trim(), sanitizationOptions),
        password,
        passwordConfirmation,
      };

      res.locals.sanitizedSignUpUserData = {
        ...sanitizedSignUpUserData,
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const logInUserDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const updateUserDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const deleteUserDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  signUpUserDataSanitizer,
  logInUserDataSanitizer,
  updateUserDataSanitizer,
  deleteUserDataSanitizer,
};
