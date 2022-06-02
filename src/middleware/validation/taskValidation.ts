import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import Joi, { string } from "joi";
// import sanitizeHtml from "sanitize-html";

import {
  createNewTaskDataValidatorSchema,
  readTaskValidationSchema,
  updateTaskParametersValidationSchema,
  updateTaskDataValidatorSchema,
  deleteTaskParametersValidationSchema,
} from "./validationSchemas";

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

const createTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newTaskData } = res.locals;

      if (!Array.isArray(newTaskData)) {
        throw new ErrorHandler(409, "Invalid Data structure", newTaskData);
      }

      await createNewTaskDataValidatorSchema
        .validateAsync(newTaskData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.newTaskData = [...value];
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

const readTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedTaskId } = res.locals;

      if (!sanitizedTaskId) {
        res.locals.taskId = {};
        return next();
      }

      await readTaskValidationSchema
        .validateAsync(sanitizedTaskId, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.taskId = value;
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

const updateTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { updateParameters, updateData } = res.locals.sanitizedData;

      await updateTaskParametersValidationSchema
        .validateAsync(updateParameters, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.updateParameters = { ...value };
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            500,
            "something wrong with updateparameters",
            error.details.map((err: any) => {
              return err;
            })
          );
        });

      await updateTaskDataValidatorSchema
        .validateAsync(updateData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.updateData = { ...value };
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            500,
            "something wrong with update data",
            error.details.map((err: any) => {
              return err;
            })
          );
        });

      res.locals.validatedData = {
        updateParameters,
        updateData,
      };

      delete res.locals.sanitizedData;

      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteDataParams } = res.locals;

      await deleteTaskParametersValidationSchema
        .validateAsync(sanitizedDeleteDataParams, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeleteDataParams = { ...value };
          delete res.locals.sanitizedDeleteDataParams;

          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            500,
            "something wrong with updateparameters",
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
  createTaskDataValidator,
  readTaskDataValidator,
  updateTaskDataValidator,
  deleteTaskDataValidator,
};
