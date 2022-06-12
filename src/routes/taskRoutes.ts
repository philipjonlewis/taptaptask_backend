import { Router } from "express";

const router = Router();

import {
  refreshCookieAuthentication,
  accessCookieAuthentication,
} from "../infosec/cookies/authentication/cookieAuthentication";

import {
  createTaskAuthorizer,
  readTaskAuthorizer,
  updateTaskAuthorizer,
  deleteTaskAuthorizer,
} from "../middleware/authorization/taskAuthorization";

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
} from "../middleware/validation/taskValidator";

import { userCredentialsAuthenticator } from "../middleware/authentication/authAuthenticator";

import {
  createNewTaskDataController,
  readTaskDataController,
  updateTaskDataController,
  deleteTaskDataController,
} from "../controllers/taskController";

// Add a rate limiter middleware here

router.use([
  refreshCookieAuthentication,
  accessCookieAuthentication,
  userCredentialsAuthenticator,
]);

router
  .route("/create")
  .post([
    createTaskAuthorizer,
    createTaskDataSanitizer,
    createTaskDataValidator,
    createNewTaskDataController,
  ]);

router
  .route("/read?:taskId")
  .get([
    readTaskAuthorizer,
    readTaskDataSanitizer,
    readTaskDataValidator,
    readTaskDataController,
  ]);

router
  .route("/update")
  .patch([
    updateTaskAuthorizer,
    updateTaskDataSanitizer,
    updateTaskDataValidator,
    updateTaskDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteTaskAuthorizer,
    deleteTaskDataSanitizer,
    deleteTaskDataValidator,
    deleteTaskDataController,
  ]);

export default router;
