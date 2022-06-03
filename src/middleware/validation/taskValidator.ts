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

const createTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedNewTaskData } = res.locals;

      if (!Array.isArray(sanitizedNewTaskData)) {
        throw new ErrorHandler(
          409,
          "Invalid Data structure",
          sanitizedNewTaskData
        );
      }

      await createNewTaskDataValidatorSchema
        .validateAsync(sanitizedNewTaskData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedNewTaskData = [...value];
          delete res.locals.sanitizedNewTaskData;
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
      const { sanitizedReadTaskDataId, isReadTaskDataId } = res.locals;

      if (isReadTaskDataId == false) {
        res.locals.validatedReadTaskDataId = {};
        delete res.locals.isReadTaskDataId == false;
        return next();
      }

      await readTaskValidationSchema
        .validateAsync(sanitizedReadTaskDataId, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedReadTaskDataId = { ...value };

          delete res.locals.sanitizedReadTaskDataId;
          delete res.locals.isReadTaskDataId == false;

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
      let { updateTaskDataParameters, updateTaskDataContent } =
        res.locals.sanitizedUpdateTaskData;

      await updateTaskDataParametersValidationSchema
        .validateAsync(updateTaskDataParameters, validationOptions)
        .then(({ value, warning, debug }: any) => {
          updateTaskDataParameters = {
            ...value,
          };
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

      await updateTaskDataContentValidatorSchema
        .validateAsync(updateTaskDataContent, validationOptions)
        .then(({ value, warning, debug }: any) => {
          updateTaskDataContent = {
            ...value,
          };
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            500,
            "something wrong with update task data",
            error.details.map((err: any) => {
              return err;
            })
          );
        });

      res.locals.validatedUpdateTaskData = {
        updateTaskDataParameters,
        updateTaskDataContent,
      };

      delete res.locals.sanitizedUpdateTaskData;

      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteTaskDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteTaskDataParams } = res.locals;

      await deleteTaskParametersValidationSchema
        .validateAsync(sanitizedDeleteTaskDataParams, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeleteTaskDataParams = { ...value };
          delete res.locals.sanitizedDeleteTaskDataParams;

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
