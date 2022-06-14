import mongoose from "mongoose";

import projectSchema from "../../../model/dbSchema/projectSchema";

const Project = mongoose.model("project", projectSchema);

export default Project;
