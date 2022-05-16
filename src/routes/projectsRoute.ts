import express from "express";

const router = express.Router();

import { ProjectModel } from "../model/dbModel";

router
  .route("/")
  .get(async (req, res, next) => {
    const projects = await ProjectModel.find({});
    res.json(projects);
  })
  .post(async (req, res, next) => {
    const project = req.body;

    const newProject = await new ProjectModel(project);

    newProject.save();

    console.log("this route is working");

    res.json(newProject);
  });

router.route("/:projectId").get(async (req, res, next) => {
  const { projectId } = req.params;

  console.log(req.params);
  const project = await ProjectModel.findOne({ projectId });
  res.json(project);
});

export default router;
