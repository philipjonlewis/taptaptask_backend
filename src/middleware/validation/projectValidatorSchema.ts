const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
  numberValidationSchema,
} from "./commonValidationSchema";

const createNewProjectDataValidatorSchema = Joi.array().items(
  Joi.object({
    user: uuidValidationSchema,
    projectId: uuidValidationSchema,
    projectName: stringContentValidationSchema,
    projectDescription: stringContentValidationSchema,
    dateOfDeadline: dateValidationSchema,
  })
);

const readProjectValidationSchema = Joi.object({
  projectId: uuidValidationSchema,
});

const updateProjectDataParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  projectId: uuidValidationSchema,
});

const updateProjectDataContentValidatorSchema = Joi.object({
  projectName: Joi.string().max(128),
  projectDescription: Joi.string().max(128),
  dateOfDeadline: dateValidationSchema,
});

const deleteProjectDataParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  projectId: uuidValidationSchema,
});

export {
  createNewProjectDataValidatorSchema,
  readProjectValidationSchema,
  updateProjectDataParametersValidationSchema,
  updateProjectDataContentValidatorSchema,
  deleteProjectDataParametersValidationSchema,
};
