import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

// Authorizer will handle passes like if free user or paid

const readTasksByDateAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readPhasesByProjectAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const deleteTasksByDateAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const readLapsedTasksAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  readTasksByDateAuthorizer,
  readPhasesByProjectAuthorizer,
  deleteTasksByDateAuthorizer,
  readLapsedTasksAuthorizer,
};
