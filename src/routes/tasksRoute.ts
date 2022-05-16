import express from "express";

const router = express.Router();

import TaskModel from "../model/dbModel/taskModel";

router
  .route("/")
  .get(async (req, res, next) => {
    const tasks = await TaskModel.find({});
    res.json(tasks);
  })
  .post(async (req, res, next) => {
    const task = req.body;

    const newTask = await new TaskModel(task);

    newTask.save();

    console.log("this route is working");

    res.json(newTask);
  });

router.route("/:taskId").get(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await TaskModel.findOne({ taskId });
  res.json(task);
});

export default router;
