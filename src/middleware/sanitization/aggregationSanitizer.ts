import { Request, Response, RequestHandler, NextFunction } from "express";

import sanitizeHtml from "sanitize-html";
import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const sanitizationOptions = {
  allowedTags: [],
  parser: {
    lowerCaseTags: true,
  },
};

const readTasksByDateSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectReferenceId, phaseReferenceId } = req.query;

      // this code below exists because we cant set skip true in the aggregate rtk query
      if (!phaseReferenceId) {
        return res.send("ok");
      }

      if (projectReferenceId !== undefined && phaseReferenceId !== undefined) {
        res.locals.sanitizedReadTasksByDateData = {
          projectReferenceId: sanitizeHtml(
            projectReferenceId.toString().trim(),
            sanitizationOptions
          ),
          phaseReferenceId: sanitizeHtml(
            phaseReferenceId.toString().trim(),
            sanitizationOptions
          ),
        };

        return next();
      }
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readPhasesByProjectSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectReferenceId } = req.query;

      if (projectReferenceId !== undefined) {
        res.locals.sanitizedReadPhasesByProjectData = {
          projectReferenceId: sanitizeHtml(
            projectReferenceId.toString().trim(),
            sanitizationOptions
          ),
        };

        return next();
      }
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const deleteTasksByDateSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dateOfDeadline } = req.body;

      res.locals.sanitizedDeleteTasksByDateSanitizer = {
        dateOfDeadline: sanitizeHtml(
          dateOfDeadline.toString().trim(),
          sanitizationOptions
        ),
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readLapsedTasksSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phaseId } = req.query as { phaseId: string };
      res.locals.sanitizedPhaseId = {
        phaseId: sanitizeHtml(phaseId.toString().trim(), sanitizationOptions),
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  readTasksByDateSanitizer,
  readPhasesByProjectSanitizer,
  deleteTasksByDateSanitizer,
  readLapsedTasksSanitizer,
};
