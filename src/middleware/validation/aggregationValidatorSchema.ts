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

export { readTasksByDateValidationSchema, readPhasesByProjectValidationSchema };
