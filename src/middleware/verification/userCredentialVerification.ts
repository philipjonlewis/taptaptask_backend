import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const userCredentialVerification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newTaskData } = res.locals;
  
      // Check if all user in the objects in the newTaskData array is existing and is the current user and is also not banned or malicious user
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export { userCredentialVerification };
