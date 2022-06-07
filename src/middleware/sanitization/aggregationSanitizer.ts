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
      console.log(req.body);
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

export { readTasksByDateSanitizer, readPhasesByProjectSanitizer };
