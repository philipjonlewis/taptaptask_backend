const Joi = require("joi").extend(require("@joi/date"));

import {
  uuidValidationSchema,
  uuidValidationSchemaNotRequired,
  stringContentValidationSchema,
  booleanValidationSchema,
  dateValidationSchema,
} from "./commonValidationSchema";

const userNameValidSchema = Joi.string()
  .alphanum()
  .lowercase()
  .trim()
  .min(6)
  .max(32)
  .required();

const emailValidSchema = Joi.string()
  .lowercase()
  .trim()
  .min(3)
  .max(256)
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .required();

const passwordValidSchema = Joi.string()
  .trim()
  .min(6)
  .max(32)
  .pattern(new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"))
  .required();

const passwordValidSchemaConfirmation = Joi.string()
  .valid(Joi.ref("password"))
  .required();

const signUpUserDataValidationSchema = Joi.object({
  email: emailValidSchema,
  password: passwordValidSchema,
  passwordConfirmation: passwordValidSchemaConfirmation,
});

export { signUpUserDataValidationSchema };
