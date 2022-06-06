import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { emailRegex, passwordRegex } from "../../utils/regexValidators";
const { Schema } = mongoose;
import { v4 as uuidV4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const privateKey = fs.readFileSync(
  path.resolve(
    __dirname,
    "../../infosec/keys/refreshTokenKeys/refreshTokenPrivate.key"
  ),
  "utf8"
);

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

authSchema.pre("save", async function (next) {
  try {
    //expires in 15 days
    const signUpRefreshToken = jwt.sign({ token: await this._id }, privateKey, {
      expiresIn: "360h",
    });

    await this.refreshTokens.push(signUpRefreshToken);

    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(await this.password, 10);

    return next();
  } catch (error) {
    console.log("error from auth user db");
  }
});

export default authSchema;
