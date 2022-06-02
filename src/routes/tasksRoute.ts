import { Router } from "express";

const router = Router();

import {
  createTaskDataSanitizer,
  readTaskDataSanitizer,
  updateTaskDataSanitizer,
  deleteTaskDataSanitizer,
} from "../middleware/sanitization/taskSanitizer";

import {
  createTaskDataValidator,
  updateTaskDataValidator,
  readTaskDataValidator,
  deleteTaskDataValidator,
} from "../middleware/validation/taskValidation";

import { userCredentialsVerifier } from "../middleware/verification/userCredentialsVerifier";

import {
  createNewTaskDataController,
  readTaskDataController,
  updateTaskDataController,
  deleteTaskDataController,
} from "../controllers/taskControllers";

// Add a rate limiter middleware here

// router.use([
//   refreshCookieAuthentication,
//   accessCookieAuthentication
// ]);

router
  .route("/create")
  .post([
    createTaskDataSanitizer,
    createTaskDataValidator,
    userCredentialsVerifier,
    createNewTaskDataController,
  ]);

router
  .route("/read?:taskId")
  .get([
    readTaskDataSanitizer,
    readTaskDataValidator,
    userCredentialsVerifier,
    readTaskDataController,
  ]);

router
  .route("/update")
  .patch([
    updateTaskDataSanitizer,
    updateTaskDataValidator,
    userCredentialsVerifier,
    updateTaskDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteTaskDataSanitizer,
    deleteTaskDataValidator,
    userCredentialsVerifier,
    deleteTaskDataController,
  ]);

export default router;
