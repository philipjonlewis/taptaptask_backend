const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
} from "./commonValidationSchema";

const tasketteKeys =
  "user,taskId,projectReferenceId,phaseReferenceId,taskContent,dateOfDeadline,isCompleted";

const createNewTaskDataValidatorSchema = Joi.array().items(
  Joi.object({
    user: Joi.string(),
    taskId: uuidValidationSchema,
    projectReferenceId: uuidValidationSchema,
    phaseReferenceId: uuidValidationSchema,
    taskContent: stringContentValidationSchema,
    dateOfDeadline: dateValidationSchema,
    isCompleted: booleanValidationSchema,
  })
);

const readTaskValidationSchema = Joi.object({
  taskId: uuidValidationSchema,
});

const updateTaskDataParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  taskId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
  phaseReferenceId: uuidValidationSchema,
  isCompleted: Joi.boolean().sensitive(),
});

const updateTaskDataContentValidatorSchema = Joi.object({
  dateOfDeadline: Joi.date(),
  taskContent: Joi.string().max(128),
  isCompleted: Joi.boolean().sensitive(),
});

const deleteTaskParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  taskId: uuidValidationSchema,
  projectReferenceId: uuidValidationSchema,
  phaseReferenceId: uuidValidationSchema,
});

export {
  createNewTaskDataValidatorSchema,
  readTaskValidationSchema,
  updateTaskDataParametersValidationSchema,
  updateTaskDataContentValidatorSchema,
  deleteTaskParametersValidationSchema,
};
