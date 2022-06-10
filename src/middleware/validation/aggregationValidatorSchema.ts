const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
} from "./commonValidationSchema";

const readTasksByDateValidationSchema = Joi.object({
  projectReferenceId: uuidValidationSchema,
  phaseReferenceId: uuidValidationSchema,
});

const readPhasesByProjectValidationSchema = Joi.object({
  projectReferenceId: uuidValidationSchema,
});

const deleteTasksByDateValidationSchema = Joi.object({
  dateOfDeadline: dateValidationSchema,
});

const readLapsedTasksValidationSchema = Joi.object({
  phaseId: uuidValidationSchema,
});

export {
  readTasksByDateValidationSchema,
  readPhasesByProjectValidationSchema,
  deleteTasksByDateValidationSchema,
  readLapsedTasksValidationSchema,
};
