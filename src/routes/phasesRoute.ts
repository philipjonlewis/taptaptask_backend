import express from "express";

const router = express.Router();

import PhaseModel from "../model/dbModel/phaseModel";

router
  .route("/")
  .get(async (req, res, next) => {
    const phases = await PhaseModel.find({});
    res.json(phases);
  })
  .post(async (req, res, next) => {
    const phase = req.body;

    const newPhase = await new PhaseModel(phase);

    newPhase.save();

    console.log("this route is working");

    res.json(newPhase);
  });

router.route("/:phaseId").get(async (req, res, next) => {
  const { phaseId } = req.params;

  const phase = await PhaseModel.findOne({ phaseId });
  res.json(phase);
});

export default router;
