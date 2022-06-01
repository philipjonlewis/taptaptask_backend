const Joi = require("joi").extend(require("@joi/date"));

const uuidValidationSchema = Joi.string()
  .guid({
    version: ["uuidv4", "uuidv5"],
  })
  .required();

const stringContentValidationSchema = Joi.string().max(128).required();

const booleanValidationSchema = Joi.boolean()
  .required()
  //   .truthy("yes")
  //   .falsy("no")
  .sensitive();

const dateValidationSchema = Joi.date().required();

const tasketteKeys =
  "user,taskId,projectReferenceId,phaseReferenceId,taskContent,dateOfDeadline,isCompleted";

export {
  uuidValidationSchema,
  stringContentValidationSchema,
  dateValidationSchema,
  booleanValidationSchema,
  tasketteKeys,
};
