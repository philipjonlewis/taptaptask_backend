import { Router } from "express";

const router = Router();

import {
  refreshCookieAuthentication,
  accessCookieAuthentication,
} from "../infosec/cookies/authentication/cookieAuthentication";

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

import { userCredentialsAuthenticator } from "../middleware/authentication/authAuthenticator";

import {
  createProjectAuthorizer,
  readProjectAuthorizer,
  updateProjectAuthorizer,
  deleteProjectAuthorizer,
} from "../middleware/authorization/projectAuthorization";

import {
  createNewProjectDataController,
  readProjectDataController,
  updateProjectDataController,
  deleteProjectDataController,
} from "../controllers/projectController";

// Add a rate limiter middleware here

router.use([
  refreshCookieAuthentication,
  accessCookieAuthentication,
  userCredentialsAuthenticator,
]);

router
  .route("/create")
  .post([
    createProjectAuthorizer,
    createProjectDataSanitizer,
    createProjectDataValidator,
    createNewProjectDataController,
  ]);

router
  .route("/read?:projectId")
  .get([
    readProjectAuthorizer,
    readProjectDataSanitizer,
    readProjectDataValidator,
    readProjectDataController,
  ]);

router
  .route("/update")
  .patch([
    updateProjectAuthorizer,
    updateProjectDataSanitizer,
    updateProjectDataValidator,
    updateProjectDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteProjectAuthorizer,
    deleteProjectDataSanitizer,
    deleteProjectDataValidator,
    deleteProjectDataController,
  ]);

export default router;
