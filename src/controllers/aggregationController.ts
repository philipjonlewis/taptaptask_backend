import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { TaskModel } from "../model/dbModel";
import { PhaseModel } from "../model/dbModel";

const readTasksByDateController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        validatedReadTasksByDateData: { projectReferenceId, phaseReferenceId },
        refreshTokenAuthenticatedUserId,
      } = res.locals;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const modelMatch = {
        user: refreshTokenAuthenticatedUserId,
        projectReferenceId: projectReferenceId,
        phaseReferenceId: phaseReferenceId,
        dateOfDeadline: {
          $gte: new Date(yesterday),
        },
        // ...req.query,
      };

      const allTasks = await TaskModel.aggregate([
        {
          $match: modelMatch,
        },
        {
          $project: {
            user: "$user",
            taskId: "$taskId",
            projectReferenceId: "$projectReferenceId",
            phaseReferenceId: "$phaseReferenceId",
            taskContent: "$taskContent",
            dateOfDeadline: "$dateOfDeadline",
            isCompleted: "$isCompleted",
            isPriority: "$isPriority",
            isLapsed: "$isLapsed",
          },
        },
        {
          $group: {
            _id: "$dateOfDeadline",
            taskContent: { $push: "$$CURRENT" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      res.json(allTasks);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const readPhasesByProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        validatedReadPhasesByProjectData: { projectReferenceId },
        refreshTokenAuthenticatedUserId,
      } = res.locals;

      const filteredPhases = await PhaseModel.find({
        user: refreshTokenAuthenticatedUserId,
        projectReferenceId: projectReferenceId,
      });

      res.json(filteredPhases);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export { readTasksByDateController, readPhasesByProjectController };
