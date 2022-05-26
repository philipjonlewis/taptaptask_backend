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
    // only getting thos with the phase reference id of this - Add other params here
    { $match: { phaseReferenceId: "phase-001-001" } },
    {
      $project: {
        phaseReferenceId: "$phaseReferenceId",
        taskContent: "$taskContent",
        dateOfDeadline: "$dateOfDeadline",
        isCompleted: "$isCompleted",
        isPriority: "$isPriority",
        isLapsed: "$isLapsed",
      },
    },
    {
      // code below gets the count
      // $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
      // code below gets all the task documents
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

router.route("/edit").patch(async (req, res, next) => {
  const { taskId, isCompleted, taskContent } = req.body;

  console.log("Editing Task", req.body);

  const updatedTask = await TaskModel.findOneAndUpdate(
    { taskId: taskId },
    req.body
  );
  res.json(updatedTask);
});

router.route("/delete").post(async (req, res, next) => {
  const { taskId } = req.body;

  console.log("Deleting Task", req.body);

  const deletedTask = await TaskModel.findOneAndDelete({ taskId: taskId });
  res.json(deletedTask);
});

router.route("/:taskId").get(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await TaskModel.findOne({ taskId });
  res.json(task);
});

export default router;
