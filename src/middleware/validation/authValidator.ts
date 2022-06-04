import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import {
  createNewTaskDataValidatorSchema,
  readTaskValidationSchema,
  updateTaskDataParametersValidationSchema,
  updateTaskDataContentValidatorSchema,
  deleteTaskParametersValidationSchema,
} from "./taskValidatorSchema";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const validationOptions = {
  abortEarly: false,
  cache: false,
  // Must study this convert option to to date issues
  convert: true,
  debug: true,
  warnings: true,
};

const signUpUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const logInUserDataSValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const updateUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

export {
  signUpUserDataValidator,
  logInUserDataSValidator,
  updateUserDataValidator,
  deleteUserDataValidator,
};
