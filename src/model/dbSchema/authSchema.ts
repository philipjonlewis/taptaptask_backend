import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../utils/regexValidators";
const { Schema } = mongoose;
import { v4 as uuidV4 } from "uuid";

const authSchema = new Schema(
  {
    user: { type: String, default: uuidV4(), required: true, select: true },
    username: {
      type: String,
      // required: [true, 'username is required'],
      default: Buffer.from(uuidV4().replace(/-/g, ""), "hex").toString(
        "base64"
      ),
      trim: true,
      unique: true,
      max: 32,
      select: false,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      max: 256,
      match: emailRegex,
      select: false,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: 6,
      max: 32,
      match: passwordRegex,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    emailVerificationPin: {
      type: String,
      default: uuidV4(),
      select: false,
    },
    userRole: {
      type: String,
      default: "free",
      select: false,
    },
    errorLogReference: {
      type: Schema.Types.ObjectId,
      ref: "errorLog",
      select: false,
    },
    refreshTokens: {
      type: [
        {
          type: String,
        },
      ],
      select: false,
    },
    resetPins: {
      type: [
        {
          type: String,
        },
      ],
      select: false,
    },
    userAgent: {
      type: [],
      select: false,
    },
  },
  { timestamps: true }
);

export default authSchema;
