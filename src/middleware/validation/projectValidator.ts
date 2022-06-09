import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import {
  createNewProjectDataValidatorSchema,
  readProjectValidationSchema,
  updateProjectDataParametersValidationSchema,
  updateProjectDataContentValidatorSchema,
  deleteProjectDataParametersValidationSchema,
} from "./projectValidatorSchema";

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

const createProjectDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedNewProjectData } = res.locals;

      if (!Array.isArray(sanitizedNewProjectData)) {
        throw new ErrorHandler(
          409,
          "Invalid Data structure",
          sanitizedNewProjectData
        );
      }

      await createNewProjectDataValidatorSchema
        .validateAsync(sanitizedNewProjectData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedNewProjectData = [...value];
          delete res.locals.sanitizedNewProjectData;
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

const readProjectDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedReadProjectDataId, isReadProjectDataId } = res.locals;

      if (isReadProjectDataId == false) {
        res.locals.validatedReadProjectDataId = {};
        delete res.locals.isReadProjectDataId;
        return next();
      }

      await readProjectValidationSchema
        .validateAsync(
          { projectId: sanitizedReadProjectDataId },
          validationOptions
        )
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedReadProjectDataId = { ...value };

          delete res.locals.sanitizedReadProjectDataId;
          delete res.locals.isReadProjectDataId;
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

const updateProjectDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      let { updateProjectDataParameters, updateProjectDataContent } =
        res.locals.sanitizedUpdateProjectData;

      await updateProjectDataParametersValidationSchema
        .validateAsync(updateProjectDataParameters, validationOptions)
        .then(({ value, warning, debug }: any) => {
      
          updateProjectDataParameters = {
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

      await updateProjectDataContentValidatorSchema
        .validateAsync(updateProjectDataContent, validationOptions)
        .then(({ value, warning, debug }: any) => {
          updateProjectDataContent = {
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

      res.locals.validatedUpdateProjectData = {
        updateProjectDataParameters,
        updateProjectDataContent,
      };

      delete res.locals.sanitizedUpdateProjectData;

      return next();
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteProjectDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteProjectDataParams } = res.locals;

      await deleteProjectDataParametersValidationSchema
        .validateAsync(sanitizedDeleteProjectDataParams, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeleteProjectDataParams = { ...value };
          delete res.locals.sanitizedDeleteProjectDataParams;
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
  createProjectDataValidator,
  readProjectDataValidator,
  updateProjectDataValidator,
  deleteProjectDataValidator,
};
