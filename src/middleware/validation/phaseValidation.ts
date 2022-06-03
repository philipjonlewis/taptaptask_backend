import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import {
  createNewPhaseDataValidatorSchema,
  readPhaseValidationSchema,
  updatePhaseDataParametersValidationSchema,
  updatePhaseDataContentValidatorSchema,
  deletePhaseDataParametersValidationSchema,
} from "./phaseValidationSchema";

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

const createPhaseDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedNewPhaseData } = res.locals;

      if (!Array.isArray(sanitizedNewPhaseData)) {
        throw new ErrorHandler(
          409,
          "Invalid Data structure",
          sanitizedNewPhaseData
        );
      }

      await createNewPhaseDataValidatorSchema
        .validateAsync(sanitizedNewPhaseData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedNewPhaseData = [...value];
          delete res.locals.sanitizedNewPhaseData;
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

const readPhaseDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedReadPhaseDataId } = res.locals;

      if (!sanitizedReadPhaseDataId) {
        delete res.locals.sanitizedReadPhaseDataId;
        res.locals.validatedReadPhaseId = {};
        return next();
      }

      await readPhaseValidationSchema
        .validateAsync({ phaseId: sanitizedReadPhaseDataId }, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedReadPhaseId = { ...value };

          delete res.locals.sanitizedReadPhaseDataId;
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

const updatePhaseDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { updatePhaseDataParameters, updatePhaseDataContent } =
        res.locals.sanitizedUpdatePhaseData;

      await updatePhaseDataParametersValidationSchema
        .validateAsync(updatePhaseDataParameters, validationOptions)
        .then(({ value, warning, debug }: any) => {
          updatePhaseDataParameters = {
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

      await updatePhaseDataContentValidatorSchema
        .validateAsync(updatePhaseDataContent, validationOptions)
        .then(({ value, warning, debug }: any) => {
          updatePhaseDataContent = {
            ...value,
          };
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

      res.locals.validatedUpdatePhaseData = {
        updatePhaseDataParameters,
        updatePhaseDataContent,
      };

      delete res.locals.sanitizedUpdatePhaseData;

      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deletePhaseDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteTaskDataParams } = res.locals;

      await deletePhaseDataParametersValidationSchema
        .validateAsync(sanitizedDeleteTaskDataParams, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeletePhaseDataParams = { ...value };
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
  createPhaseDataValidator,
  readPhaseDataValidator,
  updatePhaseDataValidator,
  deletePhaseDataValidator,
};
