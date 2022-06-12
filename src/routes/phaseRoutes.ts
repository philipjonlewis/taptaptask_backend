import { Router } from "express";

const router = Router();

import {
  refreshCookieAuthentication,
  accessCookieAuthentication,
} from "../infosec/cookies/authentication/cookieAuthentication";

import {
  createPhaseAuthorizer,
  readPhaseAuthorizer,
  updatePhaseAuthorizer,
  changeOrderPhaseAuthorizer,
  deletePhaseAuthorizer,
} from "../middleware/authorization/phaseAuthorization";

import {
  createPhaseDataSanitizer,
  readPhaseDataSanitizer,
  updatePhaseDataSanitizer,
  deletePhaseDataSanitizer,
  changeOrderPhaseDataSanitizer,
} from "../middleware/sanitization/phaseSanitizer";

import {
  createPhaseDataValidator,
  updatePhaseDataValidator,
  readPhaseDataValidator,
  deletePhaseDataValidator,
  changeOrderPhaseDataValidator,
} from "../middleware/validation/phaseValidator";

import { userCredentialsAuthenticator } from "../middleware/authentication/authAuthenticator";

import {
  createNewPhaseDataController,
  readPhaseDataController,
  updatePhaseDataController,
  deletePhaseDataController,
  changeOrderPhaseDataController,
} from "../controllers/phaseController";

// Add a rate limiter middleware here

router.use([
  refreshCookieAuthentication,
  accessCookieAuthentication,
  userCredentialsAuthenticator,
]);

router
  .route("/create")
  .post([
    createPhaseAuthorizer,
    createPhaseDataSanitizer,
    createPhaseDataValidator,
    createNewPhaseDataController,
  ]);

router
  .route("/read?:phaseId")
  .get([
    readPhaseAuthorizer,
    readPhaseDataSanitizer,
    readPhaseDataValidator,
    readPhaseDataController,
  ]);

router
  .route("/update")
  .patch([
    updatePhaseAuthorizer,
    updatePhaseDataSanitizer,
    updatePhaseDataValidator,
    updatePhaseDataController,
  ]);

router
  .route("/changeorder")
  .patch([
    changeOrderPhaseAuthorizer,
    changeOrderPhaseDataSanitizer,
    changeOrderPhaseDataValidator,
    changeOrderPhaseDataController,
  ]);

router
  .route("/delete")
  .delete([
    deletePhaseAuthorizer,
    deletePhaseDataSanitizer,
    deletePhaseDataValidator,
    deletePhaseDataController,
  ]);

export default router;
