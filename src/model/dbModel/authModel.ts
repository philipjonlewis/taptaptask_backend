import mongoose from "mongoose";

import authSchema from "../dbSchema/authSchema";

const Auth = mongoose.model("auth", authSchema);

export default Auth;
