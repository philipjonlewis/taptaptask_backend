import express from "express";

const router = express.Router();

import TaskModel from "../model/dbModel/taskModel";

router.route("/tasks/all/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const allTasks = await TaskModel.aggregate([
    // only getting thos with the phase reference id of this - Add other params here
    { $match: { projectReferenceId: projectId } },
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
      $group: { _id: null, taskContent: { $sum: 1 } },
      //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
      // code below gets all the task documents
      //   $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(allTasks);
});

router.route("/tasks/completed/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const allTasks = await TaskModel.aggregate([
    // only getting thos with the phase reference id of this - Add other params here
    { $match: { projectReferenceId: projectId, isCompleted: true } },
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
      $group: { _id: null, taskContent: { $sum: 1 } },
      //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
      // code below gets all the task documents
      //   $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(allTasks);
});

router.route("/tasks/lapsed/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const allTasks = await TaskModel.aggregate([
    // only getting thos with the phase reference id of this - Add other params here
    { $match: { projectReferenceId: projectId, isLapsed: true } },
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
      $group: { _id: null, taskContent: { $sum: 1 } },
      //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
      // code below gets all the task documents
      //   $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(allTasks);
});

router.route("/tasks/ongoing/:projectId").get(async (req, res) => {
  const { projectId } = req.params;

  const allTasks = await TaskModel.aggregate([
    // only getting thos with the phase reference id of this - Add other params here
    {
      $match: {
        projectReferenceId: projectId,
        isLapsed: false,
        isCompleted: false,
      },
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
      $group: { _id: null, taskContent: { $sum: 1 } },
      //   $group: { _id: "$dateOfDeadline", taskContent: { $sum: 1 } },
      // code below gets all the task documents
      //   $group: { _id: "$dateOfDeadline", taskContent: { $push: "$$CURRENT" } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(allTasks);
});

export default router;
