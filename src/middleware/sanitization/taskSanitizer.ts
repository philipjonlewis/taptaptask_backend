import { Request, Response, RequestHandler, NextFunction } from "express";

import sanitizeHtml from "sanitize-html";
import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const sanitizationOptions = {
  allowedTags: [],
  parser: {
    lowerCaseTags: true,
  },
};

const createTaskDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newTaskData = req.body;

      newTaskData = newTaskData.map((taskData: any) => {
        return {
          ...taskData,
          taskContent: sanitizeHtml(
            taskData.taskContent.toString(),
            sanitizationOptions
          ).trim(),
        };
      });

      res.locals.newTaskData = [...newTaskData];

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readTaskDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { taskId } = req.query;

      if (!taskId) {
        res.locals.taskId = false;
        return next();
      }

      taskId = sanitizeHtml(taskId.toString(), sanitizationOptions).trim();

      res.locals.sanitizedTaskId = { taskId };
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const updateTaskDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let [updateParameters, updateData] = req.body;

      if (!updateData.taskContent) {
        console.log("is this running");
        res.locals.sanitizedData = {
          updateParameters,
          updateData,
        };
        return next();
      }

      updateData = {
        ...updateData,
        taskContent: sanitizeHtml(
          updateData.taskContent.toString().trim(),
          sanitizationOptions
        ),
      };

      res.locals.sanitizedData = {
        isTaskContent: true,
        updateParameters,
        updateData,
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const deleteTaskDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, taskId, projectReferenceId, phaseReferenceId } = req.body;

      const sanitizedDeleteDataParams = {
        user: sanitizeHtml(user, sanitizationOptions),
        taskId: sanitizeHtml(taskId, sanitizationOptions),
        projectReferenceId: sanitizeHtml(
          projectReferenceId,
          sanitizationOptions
        ),
        phaseReferenceId: sanitizeHtml(phaseReferenceId, sanitizationOptions),
      };

      res.locals.sanitizedDeleteDataParams = { ...sanitizedDeleteDataParams };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  createTaskDataSanitizer,
  readTaskDataSanitizer,
  updateTaskDataSanitizer,
  deleteTaskDataSanitizer,
};
