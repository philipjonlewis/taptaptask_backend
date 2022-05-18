import { PhaseModel } from "../dbModel";

const phaseDbSeeder = async () => {
  await PhaseModel.insertMany([
    // Project 1 seed
    {
      user: "user-001",
      phaseId: "phase-001-001",
      projectReferenceId: "project-001",
      phaseName: "Schematic Design",

    },
    {
      user: "user-001",
      phaseId: "phase-001-002",
      projectReferenceId: "project-001",
      phaseName: "Design Development",

    },
    {
      user: "user-001",
      phaseId: "phase-001-003",
      projectReferenceId: "project-001",
      phaseName: "Contract Document",

    },
    // Project 2 seed
    {
      user: "user-001",
      phaseId: "phase-002-001",
      projectReferenceId: "project-002",
      phaseName: "User Experience",

    },
    {
      user: "user-001",
      phaseId: "phase-002-002",
      projectReferenceId: "project-002",
      phaseName: "User Interface",
  
    },
    // Project 3 seed
    {
      user: "user-001",
      phaseId: "phase-003-001",
      projectReferenceId: "project-003",
      phaseName: "Collect Data",

    },
    {
      user: "user-001",
      phaseId: "phase-003-002",
      projectReferenceId: "project-003",
      phaseName: "Study",

    },
  ]);
};

export default phaseDbSeeder;
