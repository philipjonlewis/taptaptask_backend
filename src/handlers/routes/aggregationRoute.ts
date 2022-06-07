import express from "express";
import { PhaseModel } from "../../model/dbModel";

const router = express.Router();

import TaskModel from "../../model/dbModel/taskModel";

router.route("/tasks/count/:projectId/:phaseId").get(async (req, res) => {
  const { projectId, phaseId } = req.params;

  const modelMatch = {
    projectReferenceId: projectId,
    phaseRefereceId: phaseId,
    dateOfDeadline: {
      $gte: new Date(),
    },
    ...req.query,
  };

  const allTasks = await TaskModel.aggregate([
    {
      $match: modelMatch,
    },
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
      $group: { _id: null, taskContent: { $sum: 1 } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(allTasks);
});

router
  .route("/tasks/date/:projectId/:phaseReferenceId")
  .get(async (req, res) => {
    const { projectId, phaseReferenceId } = req.params;
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const modelMatch = {
      projectReferenceId: projectId,
      phaseReferenceId: phaseReferenceId,
      dateOfDeadline: {
        $gte: new Date(yesterday),
      },
      ...req.query,
    };

    const allTasks = await TaskModel.aggregate([
      // only getting thos with the phase reference id of this - Add other params here
      {
        $match: modelMatch,
      },
      {
        $project: {
          user: "$user",
          taskId: "$taskId",
          projectReferenceId: "$projectReferenceId",
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
        // $group: { _id: null, taskContent: { $sum: 1 } },
        //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
        // code below gets all the task documents
        $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(allTasks);
  });

router
  .route("/tasks/lapsed/:projectId/:phaseReferenceId")
  .get(async (req, res) => {
    const { projectId, phaseReferenceId } = req.params;

    const modelMatch = {
      projectReferenceId: projectId,
      phaseReferenceId,
      dateOfDeadline: {
        $lt: new Date(),
      },
    };

    const allTasks = await TaskModel.aggregate([
      // only getting thos with the phase reference id of this - Add other params here
      {
        $match: modelMatch,
      },
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
        // $group: { _id: null, taskContent: { $sum: 1 } },
        //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
        // code below gets all the task documents
        $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(allTasks);
  });

router.route("/phase/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const filteredPhases = await PhaseModel.find({
    projectReferenceId: projectId,
  });

  res.json(filteredPhases);
});

export default router;
