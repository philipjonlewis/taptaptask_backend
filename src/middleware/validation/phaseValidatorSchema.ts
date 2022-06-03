const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
  numberValidationSchema,
} from "./commonValidationSchema";

const createNewPhaseDataValidatorSchema = Joi.array().items(
  Joi.object({
    user: uuidValidationSchema,
    phaseId: uuidValidationSchema,
    projectReferenceId: uuidValidationSchema,
    phaseName: stringContentValidationSchema,
    phaseOrder: numberValidationSchema,
  })
);

const readPhaseValidationSchema = Joi.object({
  phaseId: uuidValidationSchema,
});

const updatePhaseDataParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  phaseId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
});

const updatePhaseDataContentValidatorSchema = Joi.object({
  phaseName: Joi.string().max(128),
  phaseOrder: numberValidationSchema,
});

const deletePhaseDataParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  phaseId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
});

export {
  createNewPhaseDataValidatorSchema,
  readPhaseValidationSchema,
  updatePhaseDataParametersValidationSchema,
  updatePhaseDataContentValidatorSchema,
  deletePhaseDataParametersValidationSchema,
};
