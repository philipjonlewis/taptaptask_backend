import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

import { userCredentialsVerifier } from "../middleware/verification/userCredentialsVerifier";

import userAgent from "express-useragent";

const router = Router();

router.use(userAgent.express());

import {
  signUpUserDataSanitizer,
  logInUserDataSanitizer,
  updateUserDataSanitizer,
  deleteUserDataSanitizer,
} from "../middleware/sanitization/authSanitizer";

import {
  signUpUserDataValidator,
  logInUserDataSValidator,
  updateUserDataValidator,
  deleteUserDataValidator,
} from "../middleware/validation/authValidator";

import {
  signUpUserDataController,
  logInUserkDataController,
  updateUserDataController,
  deleteUserDataController,
} from "../controllers/authController";

router
  .route("/signup")
  .post([
    signUpUserDataSanitizer,
    signUpUserDataValidator,
    userCredentialsVerifier,
    signUpUserDataController,
  ]);

router
  .route("/login")
  .post([
    logInUserDataSanitizer,
    logInUserDataSValidator,
    userCredentialsVerifier,
    logInUserkDataController,
  ]);

router
  .route("/update")
  .patch([
    updateUserDataSanitizer,
    updateUserDataValidator,
    userCredentialsVerifier,
    updateUserDataController,
  ]);

router
  .route("/delete")
  .delete([
    deleteUserDataSanitizer,
    deleteUserDataValidator,
    userCredentialsVerifier,
    deleteUserDataController,
  ]);

export default router;
