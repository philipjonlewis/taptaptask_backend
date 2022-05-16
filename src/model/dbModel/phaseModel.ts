import mongoose from "mongoose";

import phaseSchema from "../dbSchema/phaseSchema";

const Phase = mongoose.model("phase", phaseSchema);

export default Phase;
