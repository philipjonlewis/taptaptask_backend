import { Request, Response, RequestHandler, NextFunction } from "express";
import { rmSync } from "fs";

import sanitizeHtml from "sanitize-html";
import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../errorHandling/modifiedErrorHandler";

const sanitizationOptions = {
  allowedTags: [],
  parser: {
    lowerCaseTags: true,
  },
};

const createProjectDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newProjectData = req.body;

      newProjectData = newProjectData.map((projectData: any) => {
        return {
          ...projectData,
          projectName: sanitizeHtml(
            projectData.projectName.toString().trim(),
            sanitizationOptions
          ),
          projectDescription: sanitizeHtml(
            projectData.projectDescription.toString().trim(),
            sanitizationOptions
          ),
          dateOfDeadline: sanitizeHtml(
            projectData.dateOfDeadline.toString().trim(),
            sanitizationOptions
          ),
        };
      });

      res.locals.sanitizedNewProjectData = [...newProjectData];

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const readProjectDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { projectId } = req.query;

      if (projectId == undefined) {
        res.locals.isReadProjectDataId = false;
        return next();
      }

      projectId = sanitizeHtml(
        projectId.toString(),
        sanitizationOptions
      ).trim();

      res.locals.sanitizedReadProjectDataId = projectId;
      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const updateProjectDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let [updateProjectDataParameters, updateProjectDataContent] = req.body;

      if (
        updateProjectDataContent.projectName == undefined ||
        updateProjectDataContent.projectDescription == undefined
      ) {
        res.locals.sanitizedUpdatePhaseData = {
          updateProjectDataParameters,
          updateProjectDataContent,
        };
        return next();
      }

      updateProjectDataContent = {
        ...updateProjectDataContent,
        projectName: sanitizeHtml(
          updateProjectDataContent.projectName.toString().trim(),
          sanitizationOptions
        ),
        projectDescription: sanitizeHtml(
          updateProjectDataContent.projectDescription.toString().trim(),
          sanitizationOptions
        ),
        dateOfDeadline: sanitizeHtml(
          updateProjectDataContent.dateOfDeadline.toString().trim(),
          sanitizationOptions
        ),
      };

      res.locals.sanitizedUpdateProjectData = {
        updateProjectDataParameters,
        updateProjectDataContent,
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

const deleteProjectDataSanitizer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, projectId } = req.body;

      const sanitizedDeleteProjectDataParams = {
        user: sanitizeHtml(user, sanitizationOptions),
        projectId: sanitizeHtml(projectId, sanitizationOptions),
      };

      res.locals.sanitizedDeleteProjectDataParams = {
        ...sanitizedDeleteProjectDataParams,
      };

      return next();
    } catch (error: any) {
      throw new ErrorHandler(500, error.message, {});
    }
  }
) as RequestHandler;

export {
  createProjectDataSanitizer,
  readProjectDataSanitizer,
  updateProjectDataSanitizer,
  deleteProjectDataSanitizer,
};
