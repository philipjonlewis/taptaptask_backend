import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { TaskModel } from "../model/dbModel";

const createNewTaskDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { newTaskData } = res.locals;

      const addedData = await TaskModel.insertMany(newTaskData);
      // Add data to database
      res
        .cookie("XSRF-TOKEN", req.csrfToken(), {
          domain: "*", // ← whatever your domain is
          secure: true,
        })
        .send(addedData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export { createNewTaskDataController };
