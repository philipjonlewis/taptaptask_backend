const Joi = require("joi").extend(require("@joi/date"));

const uuidValidationSchema = Joi.string()
  .guid({
    version: ["uuidv4", "uuidv5"],
  })
  .required();

const uuidValidationSchemaNotRequired = Joi.string().guid({
  version: ["uuidv4", "uuidv5"],
});

const stringContentValidationSchema = Joi.string().max(128).required();

const booleanValidationSchema = Joi.boolean()
  .required()
  //   .truthy("yes")
  //   .falsy("no")
  .sensitive();

const dateValidationSchema = Joi.date().required();

const tasketteKeys =
  "user,taskId,projectReferenceId,phaseReferenceId,taskContent,dateOfDeadline,isCompleted";

const createNewTaskDataValidatorSchema = Joi.array().items(
  Joi.object({
    user: uuidValidationSchema,
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

const updateTaskParametersValidationSchema = Joi.object({
  user: uuidValidationSchema,
  taskId: uuidValidationSchemaNotRequired,
  projectReferenceId: uuidValidationSchemaNotRequired,
  phaseReferenceId: uuidValidationSchemaNotRequired,
  isCompleted: Joi.boolean().sensitive(),
});

const updateTaskDataValidatorSchema = Joi.object({
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
  updateTaskParametersValidationSchema,
  updateTaskDataValidatorSchema,
  deleteTaskParametersValidationSchema,
};
