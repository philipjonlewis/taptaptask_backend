import { Router } from "express";

const router = Router();

import {
  createProjectDataSanitizer,
  readProjectDataSanitizer,
  updateProjectDataSanitizer,
  deleteProjectDataSanitizer,
} from "../middleware/sanitization/projectSanitizer";

import {
  createProjectDataValidator,
  updateProjectDataValidator,
  readProjectDataValidator,
  deleteProjectDataValidator,
} from "../middleware/validation/projectValidator";

import { userCredentialsVerifier } from "../middleware/verification/userCredentialsVerifier";

import {
  createNewProjectDataController,
  readProjectDataController,
  updateProjectDataController,
  deleteProjectDataController,
} from "../controllers/projectController";

// Add a rate limiter middleware here

// router.use([
//   refreshCookieAuthentication,
//   accessCookieAuthentication
// ]);

router
  .route("/create")
  .post([
    createProjectDataSanitizer,
    createProjectDataValidator,
    userCredentialsVerifier,
    createNewProjectDataController,
  ]);

router
  .route("/read?:projectId")
  .get([
    readProjectDataSanitizer,
    readProjectDataValidator,
    userCredentialsVerifier,
    readProjectDataController,
  ]);

router
  .route("/update")
  .patch([
    updateProjectDataSanitizer,
    updateProjectDataValidator,
    userCredentialsVerifier,
    updateProjectDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteProjectDataSanitizer,
    deleteProjectDataValidator,
    userCredentialsVerifier,
    deleteProjectDataController,
  ]);

export default router;
