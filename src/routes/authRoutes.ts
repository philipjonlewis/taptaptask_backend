import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

import { refreshCookieAuthentication } from "../infosec/cookies/authentication/cookieAuthentication";

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
  logInUserDataController,
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
    logInUserDataController,
  ]);

router
  .route("/update")
  .patch([
    refreshCookieAuthentication,
    updateUserDataSanitizer,
    updateUserDataValidator,
    userCredentialsVerifier,
    updateUserDataController,
  ]);

router
  .route("/delete")
  .delete([
    refreshCookieAuthentication,
    deleteUserDataSanitizer,
    deleteUserDataValidator,
    userCredentialsVerifier,
    deleteUserDataController,
  ]);

export default router;
