import mongoose from "mongoose";

import taskSchema from "../dbSchema/taskSchema";

const Task = mongoose.model("task", taskSchema);

export default Task;
