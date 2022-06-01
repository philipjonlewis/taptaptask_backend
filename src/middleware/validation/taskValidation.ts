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
  uuidValidationSchema,
  stringContentValidationSchema,
  dateValidationSchema,
  booleanValidationSchema,
  tasketteKeys,
} from "./validationSchemas";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const tasketteDataValidationSchema = Joi.array().items(
  Joi.object({
    user: uuidValidationSchema,
    taskId: uuidValidationSchema,
    projectReferenceId: uuidValidationSchema,
    phaseReferenceId: uuidValidationSchema,
    taskContent: stringContentValidationSchema,
    dateOfDeadline: dateValidationSchema,
    isCompleted: booleanValidationSchema,
  })
);

const newTaskDataValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {newTaskData} = res.locals;

      if (!Array.isArray(newTaskData)) {
        throw new ErrorHandler(409, "Invalid Data structure", newTaskData);
      }

      await tasketteDataValidationSchema
        .validateAsync(newTaskData, {
          abortEarly: false,
          cache: false,
          // Must study this convert option to to date issues
          convert: true,
          debug: true,
          warnings: true,
        })
        .then(({ value, warning, debug }) => {
          res.locals.newTaskData = [...value];
          return next();
        })
        .catch((error) => {
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

export { newTaskDataValidation };
