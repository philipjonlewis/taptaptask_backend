import { Request, Response, RequestHandler, NextFunction } from "express";

import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { TaskModel } from "../model/dbModel";

const createNewTaskDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { newTaskData } = res.locals;

      const addedData = await TaskModel.insertMany(newTaskData);

      res.json(addedData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const readTaskDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { taskId } = res.locals;
      const taskData = await TaskModel.find({ ...taskId });
      res.json(taskData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updateTaskDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { updateParameters, updateData } = res.locals.validatedData;

      const updatedTask = await TaskModel.updateMany(
        { ...updateParameters },
        { ...updateData }
      );

      delete res.locals.validatedData;

      res.json(updatedTask);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteTaskDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeleteDataParams } = res.locals;

      const deletedTaskData = await TaskModel.findOneAndDelete({
        ...validatedDeleteDataParams,
      });

      delete res.locals.sanitizedDeleteDataParams;
      res.json(deletedTaskData);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export {
  createNewTaskDataController,
  readTaskDataController,
  updateTaskDataController,
  deleteTaskDataController,
};
