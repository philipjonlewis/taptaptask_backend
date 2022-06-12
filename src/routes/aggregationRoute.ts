import express from "express";

const router = express.Router();

import {
  refreshCookieAuthentication,
  accessCookieAuthentication,
} from "../infosec/cookies/authentication/cookieAuthentication";

import {
  readTasksByDateAuthorizer,
  readPhasesByProjectAuthorizer,
  deleteTasksByDateAuthorizer,
  readLapsedTasksAuthorizer,
} from "../middleware/authorization/aggregationAuthorization";

import {
  readTasksByDateSanitizer,
  readPhasesByProjectSanitizer,
  deleteTasksByDateSanitizer,
  readLapsedTasksSanitizer,
} from "../middleware/sanitization/aggregationSanitizer";

import {
  readTasksByDateValidator,
  readPhasesByProjectValidator,
  deleteTasksByDateValidator,
  readLapsedTasksValidator,
} from "../middleware/validation/aggregationValidator";

import { userCredentialsAuthenticator } from "../middleware/authentication/authAuthenticator";

import {
  readTasksByDateController,
  readPhasesByProjectController,
  deleteTasksByDateController,
  readLapsedTasksController,
} from "../controllers/aggregationController";

router.use([
  refreshCookieAuthentication,
  accessCookieAuthentication,
  userCredentialsAuthenticator,
]);

router
  .route("/tasks/date")
  .get([
    readTasksByDateAuthorizer,
    readTasksByDateSanitizer,
    readTasksByDateValidator,
    readTasksByDateController,
  ]);

router
  .route("/phases/project")
  .get([
    readPhasesByProjectAuthorizer,
    readPhasesByProjectSanitizer,
    readPhasesByProjectValidator,
    readPhasesByProjectController,
  ]);

router
  .route("/tasks/deletebydate")
  .delete([
    deleteTasksByDateAuthorizer,
    deleteTasksByDateSanitizer,
    deleteTasksByDateValidator,
    deleteTasksByDateController,
  ]);

router
  .route("/tasks/lapsed")
  .get([
    readLapsedTasksAuthorizer,
    readLapsedTasksSanitizer,
    readLapsedTasksValidator,
    readLapsedTasksController,
  ]);

export default router;
