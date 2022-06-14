import { Request, Response, RequestHandler, NextFunction } from "express";
import asyncHandler from "../handlers/asyncHandler";

import ErrorHandler from "../middleware/errorHandling/modifiedErrorHandler";

import { AuthModel } from "../middleware/authorization/dbModel";

import { userAgentCleaner } from "../utils/userAgentCleaner";

import bcrypt from "bcryptjs";

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

      if (!isUserExisting) {
        throw new ErrorHandler(500, "No user like that", {});
      }

      const existingUser = await AuthModel.find({
        email: validatedLogInUserData.email,
      }).select(
        "+email +username -user -_id -__v -createdAt -updatedAt +password +refreshTokens +accessTokens"
      );

      bcrypt.compare(
        validatedLogInUserData.password,
        existingUser[0].password,
        async function (err, result) {
          if (result) {
            return res
              .status(200)
              .cookie(
                "authentication-refresh",
                existingUser[0].refreshTokens[0],
                {
                  signed: true,
                  // expires in 28 days
                  // expires: new Date(Date.now() + 6048000 * 4),
                  maxAge: 241920000,
                  // make secure true upon deployment
                  secure: false,
                  httpOnly: false,
                  sameSite: false,
                }
              )
              .cookie(
                "authentication-access",
                existingUser[0].accessTokens[0],
                {
                  signed: true,
                  // expires in 28 days
                  maxAge: 86400000,
                  // make secure true upon deployment
                  secure: false,
                  httpOnly: false,
                  sameSite: false,
                }
              )
              .json({
                code: 200,
                status: true,
                message: "Successfully logged in",
                payload: { _id: validatedLogInUserData },
              });
            delete res.locals.validatedLogInUserData;
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
      const { validatedEditUserData, refreshTokenAuthenticatedUserId } =
        await res.locals;

      // Must use userId for params and have a setting for existing password to new password
      const { username, email, newPassword, password } = validatedEditUserData;

      const isUserExisting = await AuthModel.find({
        //replace email with user id from cookie
        _id: refreshTokenAuthenticatedUserId,
      }).select("+password");

      if (!isUserExisting) {
        throw new ErrorHandler(500, "No user like that", {});
      }

      // bcrypt.compare(
      //   password,
      //   isUserExisting[0].password,
      //   async function (err, result) {
      //     console.log(result);
      //     if (!result) {
      //       throw new ErrorHandler(500, "very wrong", {});
      //     }

      //   }
      // );

      const isRightPassword = await bcrypt.compare(
        password,
        isUserExisting[0].password
      );

      if (!isRightPassword) {
        throw new ErrorHandler(500, "very wrong", {});
      }

      if (isRightPassword) {
        const editedUser = await AuthModel.findOneAndUpdate(
          {
            _id: refreshTokenAuthenticatedUserId,
          },
          {
            ...(username && { username }),
            ...(email && { email }),
            ...(newPassword && { password: newPassword }),
          },
          { new: true }
        ).select("+email +username -user -_id -__v -createdAt -updatedAt");

        console.log(await editedUser);

        delete res.locals.validatedEditUserData;

        return res.json(editedUser);
      }
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error);
    }
  }
) as RequestHandler;

const deleteUserDataController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { validatedDeleteUserData, refreshTokenAuthenticatedUserId } =
        res.locals;
      // Must use userId for params and have a setting for existing password to new password
      const deletedUser = await AuthModel.findOneAndDelete({
        refreshTokenAuthenticatedUserId,
        ...validatedDeleteUserData,
      });

      delete res.locals.validatedEditUserData;

      return res.json(deletedUser);
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, error.payload);
    }
  }
) as RequestHandler;

export {
  signUpUserDataController,
  logInUserDataController,
  updateUserDataController,
  deleteUserDataController,
};
