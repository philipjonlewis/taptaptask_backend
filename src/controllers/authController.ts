import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "../handlers/asyncHandler";
import fs from "fs";
import path from "path";
import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { AuthModel } from "../model/dbModel";

import { userAgentCleaner } from "../utils/userAgentCleaner";

import bcrypt from "bcryptjs";

const publicKey = fs.readFileSync(
  path.resolve(
    __dirname,
    "../infosec/keys/refreshTokenKeys/refreshTokenPublic.key"
  ),
  "utf8"
);

const signUpUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedSignUpUserData, useragent } = res.locals;

      const newUser = await new AuthModel({
        ...validatedSignUpUserData,
        userAgent: { ...(await userAgentCleaner(useragent)) },
      });

      await newUser.save();

      delete res.locals.validatedSignUpUserData;
      delete res.locals.useragent;

      return res.json(await newUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const logInUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedLogInUserData }: any = res.locals;

      const isUserExisting = await AuthModel.exists({
        email: validatedLogInUserData.email,
      }).select("+password");

      console.log(isUserExisting);

      if (!isUserExisting) {
        throw new ErrorHandler(500, "No user like that", {});
      }

      const existingUser = await AuthModel.find({
        email: validatedLogInUserData.email,
      }).select(
        "+email +username -user -_id -__v -createdAt -updatedAt +password"
      );

      delete res.locals.validatedLogInUserData;

      bcrypt.compare(
        validatedLogInUserData.password,
        existingUser[0].password,
        function (err, result) {
          if (result) {
            return res.json(existingUser);
          } else {
            return res.send("No");
          }
        }
      );
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const updateUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedEditUserData } = res.locals;
      // Must use userId for params and have a setting for existing password to new password
      const { username, email, newPassword, password } = validatedEditUserData;

      const isUserExisting = (await AuthModel.exists({
        //replace email with user id from cookie 
        email,
      }).select("+password")) as { password: string };

      if (!isUserExisting) {
        throw new ErrorHandler(500, "No user like that", {});
      }

      bcrypt.compare(
        password,
        isUserExisting.password,
        async function (err, result) {
          if (result) {
            const editedUser = await AuthModel.findOneAndUpdate(
              {
                // Get this user from the decoded cookie
                user: "1850ea5e-580e-4c35-82e2-7e21fb0ff9b4",
                password: password,
              },
              {
                ...(username && { username }),
                ...(email && { email }),
                ...(newPassword && { password: newPassword }),
              }
            ).select("+email +username -user -_id -__v -createdAt -updatedAt");

            delete res.locals.validatedEditUserData;

            return res.json(editedUser);
          } else {
            return res.send("No");
          }
        }
      );
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeleteUserData } = res.locals;
      // Must use userId for params and have a setting for existing password to new password
      const deletedUser = await AuthModel.findOneAndDelete({
        ...validatedDeleteUserData,
      });

      delete res.locals.validatedEditUserData;

      return res.json(deletedUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

export {
  signUpUserDataController,
  logInUserDataController,
  updateUserDataController,
  deleteUserDataController,
};
