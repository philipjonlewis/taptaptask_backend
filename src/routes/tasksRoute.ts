import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

const router = express.Router();

import TaskModel from "../model/dbModel/taskModel";


import {
  createTaskDataSanitizer,
  readTaskDataSanitizer,
  updateTaskDataSanitizer,
  deleteTaskDataSanitizer
} from "../middleware/sanitization/taskSanitizer";

import {
  createTaskDataValidation,
  updateTaskDataValidation,
  readTaskDataValidation,
  deleteTaskDataValidation
} from "../middleware/validation/taskValidation";


import { userCredentialVerification } from "../middleware/verification/userCredentialVerification";

import {
  createNewTaskDataController,
  readTaskDataController,
  updateTaskDataController,
  deleteTaskDataController
} from "../controllers/taskControllers";

// Add a rate limiter middleware here

router
  .route("/create")
  .post([
    createTaskDataSanitizer,
    createTaskDataValidation,
    userCredentialVerification,
    createNewTaskDataController,
  ]);

router
  .route("/read?:taskId")
  .get([
    readTaskDataSanitizer,
    readTaskDataValidation,
    userCredentialVerification,
    readTaskDataController,
  ]);

router
  .route("/update")
  .patch([
    updateTaskDataSanitizer,
    updateTaskDataValidation,
    userCredentialVerification,
    updateTaskDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteTaskDataSanitizer,
    deleteTaskDataValidation,
    userCredentialVerification,
    deleteTaskDataController,
  ]);

export default router;
