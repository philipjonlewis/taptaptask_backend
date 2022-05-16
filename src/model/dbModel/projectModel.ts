import mongoose from "mongoose";

import projectSchema from "../dbSchema/projectSchema";

const Project = mongoose.model("project", projectSchema);

export default Project;
