import { Router } from "express";

const router = Router();

import {
  createPhaseDataSanitizer,
  readPhaseDataSanitizer,
  updatePhaseDataSanitizer,
  deletePhaseDataSanitizer,
} from "../middleware/sanitization/phaseSanitizer";

import {
  createPhaseDataValidator,
  updatePhaseDataValidator,
  readPhaseDataValidator,
  deletePhaseDataValidator,
} from "../middleware/validation/phaseValidator";

import { userCredentialsVerifier } from "../middleware/verification/userCredentialsVerifier";

import {
  createNewPhaseDataController,
  readPhaseDataController,
  updatePhaseDataController,
  deletePhaseDataController,
} from "../controllers/phaseController";

// Add a rate limiter middleware here

// router.use([
//   refreshCookieAuthentication,
//   accessCookieAuthentication
// ]);

router
  .route("/create")
  .post([
    createPhaseDataSanitizer,
    createPhaseDataValidator,
    userCredentialsVerifier,
    createNewPhaseDataController,
  ]);

router
  .route("/read?:phaseId")
  .get([
    readPhaseDataSanitizer,
    readPhaseDataValidator,
    userCredentialsVerifier,
    readPhaseDataController,
  ]);

router
  .route("/update")
  .patch([
    updatePhaseDataSanitizer,
    updatePhaseDataValidator,
    userCredentialsVerifier,
    updatePhaseDataController,
  ]);

router
  .route("/delete")
  .delete([
    deletePhaseDataSanitizer,
    deletePhaseDataValidator,
    userCredentialsVerifier,
    deletePhaseDataController,
  ]);

export default router;
