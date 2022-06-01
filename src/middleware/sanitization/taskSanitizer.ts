import { Request, Response, RequestHandler, NextFunction } from "express";

import sanitizeHtml from "sanitize-html";
import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const newTaskDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newTaskData = req.body;

      newTaskData = newTaskData.map((taskData: any) => {
        return {
          ...taskData,
          taskContent: sanitizeHtml(taskData.taskContent.toString(), {
            allowedTags: [],
            parser: {
              lowerCaseTags: true,
            },
          }).trim(),
        };
      });

      res.locals.newTaskData = [...newTaskData];

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export { newTaskDataSanitizer };
