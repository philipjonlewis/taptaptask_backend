import express from "express";
import { PhaseModel } from "../model/dbModel";

const router = express.Router();

import TaskModel from "../model/dbModel/taskModel";

import {
  refreshCookieAuthentication,
  accessCookieAuthentication,
} from "../infosec/cookies/authentication/cookieAuthentication";

import {
  readTasksByDateSanitizer,
  readPhasesByProjectSanitizer,
} from "../middleware/sanitization/aggregationSanitizer";

import {
  readTasksByDateValidator,
  readPhasesByProjectValidator,
} from "../middleware/validation/aggregationValidator";

import { userCredentialsVerifier } from "../middleware/verification/userCredentialsVerifier";

import {
  readTasksByDateController,
  readPhasesByProjectController,
} from "../controllers/aggregationController";

router.use([refreshCookieAuthentication, accessCookieAuthentication]);

router
  .route("/tasks/date")
  .get([
    readTasksByDateSanitizer,
    readTasksByDateValidator,
    userCredentialsVerifier,
    readTasksByDateController,
  ]);

router
  .route("/phases/project")
  .get([
    readPhasesByProjectSanitizer,
    readPhasesByProjectValidator,
    userCredentialsVerifier,
    readPhasesByProjectController,
  ]);

export default router;
