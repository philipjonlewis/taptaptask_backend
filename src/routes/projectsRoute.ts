import express from "express";

const router = express.Router();

import { ProjectModel, PhaseModel } from "../model/dbModel";
import { v4 as uuidV4 } from "uuid";
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

    const newPhase = await new PhaseModel({
      user: project.user,
      phaseId: uuidV4(),
      projectReferenceId: newProject.projectId,
      phaseName: "Default Phase",
      phaseOrder: 1,
    });

    newPhase.save();

    console.log("this route is working");

    res.json({ newProject, newPhase });
  });

router.route("/:projectId").get(async (req, res, next) => {
  const { projectId } = req.params;

  console.log(req.params);
  const project = await ProjectModel.findOne({ projectId });
  res.json(project);
});

export default router;
