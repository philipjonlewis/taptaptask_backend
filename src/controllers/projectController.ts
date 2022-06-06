import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { ProjectModel } from "../model/dbModel";

const createNewProjectDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedNewProjectData } = res.locals;

      const addedProjectData = await ProjectModel.insertMany(
        validatedNewProjectData
      );

      delete res.locals.validatedNewProjectData;

      res.json(addedProjectData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const readProjectDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedReadProjectDataId, authenticatedUserId } = res.locals;

      const projectData = await ProjectModel.find({
        user: authenticatedUserId,
        ...validatedReadProjectDataId,
      });

      delete res.locals.validatedReadProjectDataId;

      res.json(projectData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updateProjectDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { authenticatedUserId } = res.locals;
      const { updateProjectDataParameters, updateProjectDataContent } =
        res.locals.validatedUpdateProjectData;

      const updatedProjectData = await ProjectModel.updateMany(
        { user: authenticatedUserId, ...updateProjectDataParameters },
        { ...updateProjectDataContent }
      );

      delete res.locals.validatedUpdateProjectData;

      res.json(updatedProjectData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteProjectDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeleteProjectDataParams, authenticatedUserId } =
        res.locals;

      const deletedProjectData = await ProjectModel.findOneAndDelete({
        user: authenticatedUserId,
        ...validatedDeleteProjectDataParams,
      });

      delete res.locals.validatedDeleteProjectDataParams;
      res.json(deletedProjectData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export {
  createNewProjectDataController,
  readProjectDataController,
  updateProjectDataController,
  deleteProjectDataController,
};
