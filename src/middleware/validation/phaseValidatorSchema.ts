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
    user: Joi.string(),
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
  phaseId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
});

const updatePhaseDataContentValidatorSchema = Joi.object({
  phaseName: Joi.string().max(128),
});

const deletePhaseDataParametersValidationSchema = Joi.object({
  phaseId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
});

const changeOrderPhaseDataValidatorSchema = Joi.array().items(
  Joi.object({
    _id: uuidValidationSchema,
    user: Joi.string(),
    phaseId: uuidValidationSchema,
    projectReferenceId: uuidValidationSchema,
    phaseName: stringContentValidationSchema,
    phaseOrder: numberValidationSchema,
    __v: numberValidationSchema,
    createdAt: dateValidationSchema,
    updateAt: dateValidationSchema,
  })
);

export {
  createNewPhaseDataValidatorSchema,
  readPhaseValidationSchema,
  updatePhaseDataParametersValidationSchema,
  updatePhaseDataContentValidatorSchema,
  deletePhaseDataParametersValidationSchema,
  changeOrderPhaseDataValidatorSchema,
};
