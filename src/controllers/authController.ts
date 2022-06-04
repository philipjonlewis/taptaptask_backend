import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { TaskModel } from "../model/dbModel";

const signUpUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      return res.send("sign up auth");
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const logInUserkDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      return res.send("log in auth");
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updateUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      return res.send("edit auth");
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      return res.send("delete auth");
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
