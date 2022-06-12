import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

// Authorizer will handle passes like if free user or paid

const createPhaseAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readPhaseAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const updatePhaseAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const changeOrderPhaseAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deletePhaseAuthorizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  createPhaseAuthorizer,
  readPhaseAuthorizer,
  updatePhaseAuthorizer,
  changeOrderPhaseAuthorizer,
  deletePhaseAuthorizer,
};
