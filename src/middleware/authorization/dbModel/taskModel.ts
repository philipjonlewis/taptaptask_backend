import mongoose from "mongoose";

import taskSchema from "../../../model/dbSchema/taskSchema";

const Task = mongoose.model("task", taskSchema);

export default Task;
