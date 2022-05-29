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

router.route("/byproject/:user").get(async (req, res, next) => {
  const { user } = req.params;
  // console.log(user);
  const modelMatch = {
    user,
  };

  const allPhases = await PhaseModel.aggregate([
    {
      $match: modelMatch,
    },
    {
      $project: {
        user: "$user",
        phaseId: "$phaseId",
        projectReferenceId: "$projectReferenceId",
        phaseName: "$phaseName",
        phaseOrder: "$phaseOrder",
      },
    },
    {
      $group: { _id: "$projectReferenceId", phaseList: { $push: "$$CURRENT" } },
    },
    // { $unwind: "$phaseList" },
    // { $sort: { "phaseList.phaseOrder": 1 } },
    // {
    //   $group: { _id: "$projectReferenceId", phaseList: { $push: "$phaseList" } },
    // },
    { $sort: { _id: 1 } },
  ]);

  console.log(allPhases);

  res.json(allPhases);
});

router.route("/changeorder").patch(async (req, res, next) => {
  console.log(req.body);
  console.log("Lahat na lang");

  req.body.map(async (phase: any) => {
    await PhaseModel.findOneAndUpdate(
      { phaseId: phase.phaseId },
      {
        phaseOrder: phase.phaseOrder,
      }
    );
  });
  res.send("hello");
});

router.route("/:phaseId").get(async (req, res, next) => {
  const { phaseId } = req.params;

  const phase = await PhaseModel.findOne({ phaseId });
  res.json(phase);
});

export default router;
