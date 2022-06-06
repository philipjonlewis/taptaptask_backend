import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { PhaseModel } from "../model/dbModel";

const createNewPhaseDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedNewPhaseData } = res.locals;

      const addedPhaseData = await PhaseModel.insertMany(validatedNewPhaseData);

      delete res.locals.validatedNewPhaseData;

      res.json(addedPhaseData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const readPhaseDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedReadPhaseDataId, authenticatedUserId } = res.locals;

      const phaseData = await PhaseModel.find({
        user: authenticatedUserId,
        ...validatedReadPhaseDataId,
      });

      delete res.locals.validatedReadPhaseDataId;

      res.json(phaseData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updatePhaseDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { authenticatedUserId } = res.locals;
      const { updatePhaseDataParameters, updatePhaseDataContent } =
        res.locals.validatedUpdatePhaseData;

      const updatedPhaseData = await PhaseModel.updateMany(
        { user: authenticatedUserId, ...updatePhaseDataParameters },
        { ...updatePhaseDataContent }
      );

      delete res.locals.validatedUpdatePhaseData;

      res.json(updatedPhaseData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deletePhaseDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeletePhaseDataParams, authenticatedUserId } =
        res.locals;

      const deletedPhaseData = await PhaseModel.findOneAndDelete({
        user: authenticatedUserId,
        ...validatedDeletePhaseDataParams,
      });

      delete res.locals.validatedDeletePhaseDataParams;
      res.json(deletedPhaseData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export {
  createNewPhaseDataController,
  readPhaseDataController,
  updatePhaseDataController,
  deletePhaseDataController,
};
