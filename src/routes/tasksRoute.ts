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

router.route("/distinct").get(async (req, res, next) => {
  // const trial = await TaskModel.aggregate([
  //   {
  //     $project: {
  //       taskContent: "$taskContent",
  //       dateOfDeadline: "$dateOfDeadline",
  //     },
  //   },
  //   { $group: { _id: "$dateOfDeadline", tasks: { $sum: 1 } } },
  //   { $sort: { _id: 1 } },
  // ]);
  const trial = await TaskModel.aggregate([
    {
      $project: {
        taskContent: "$taskContent",
        dateOfDeadline: "$dateOfDeadline",
        isCompleted: "$isCompleted",
        isPriority: "$isPriority",
        isLapsed: "$isLapsed",
      },
    },
    {
      $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
    },
    { $sort: { _id: 1 } },
  ]);
  // console.log(trial);
  // TaskModel.collection.aggregate([
  //   { $project: { taskContent: "$taskContent" } },
  //   { $group: { _id: "$dateOfDeadline", number: { $sum: 1 } } },
  //   { $sort: { _id: 1 } },
  // ]);

  // TaskModel.collection.distinct(
  //   "dateOfDeadline",
  //   function (err: any, dates: any) {
  //     res.send(dates);
  //     console.log(dates);
  //   }
  // );

  res.json(trial);
});

router.route("/:taskId").get(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await TaskModel.findOne({ taskId });
  res.json(task);
});

export default router;
