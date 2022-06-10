import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import {
  readTasksByDateValidationSchema,
  readPhasesByProjectValidationSchema,
  deleteTasksByDateValidationSchema,
  readLapsedTasksValidationSchema,
} from "./aggregationValidatorSchema";

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

const readTasksByDateValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedReadTasksByDateData } = res.locals;

      await readTasksByDateValidationSchema
        .validateAsync(sanitizedReadTasksByDateData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedReadTasksByDateData = { ...value };
          delete res.locals.sanitizedReadTasksByDateData;

          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const readPhasesByProjectValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedReadPhasesByProjectData } = res.locals;

      await readPhasesByProjectValidationSchema
        .validateAsync(sanitizedReadPhasesByProjectData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedReadPhasesByProjectData = { ...value };
          delete res.locals.sanitizedReadPhasesByProjectData;

          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteTasksByDateValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteTasksByDateSanitizer } = res.locals;

      await deleteTasksByDateValidationSchema
        .validateAsync(sanitizedDeleteTasksByDateSanitizer, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeleteTasksByDate = { ...value };

          delete res.locals.sanitizedDeleteTasksByDateSanitizer;

          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const readLapsedTasksValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedPhaseId } = res.locals;

      await readLapsedTasksValidationSchema
        .validateAsync(sanitizedPhaseId, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedSanitizedPhaseIdData = { ...value };
          delete res.locals.sanitizedPhaseId;
    
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

export {
  readTasksByDateValidator,
  readPhasesByProjectValidator,
  deleteTasksByDateValidator,
  readLapsedTasksValidator,
};
