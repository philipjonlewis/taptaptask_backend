import { PhaseModel } from "../dbModel";

const phaseDbSeeder = async () => {
  await PhaseModel.insertMany([
    // Project 1 seed
    {
      user: "user-001",
      phaseId: "phase-001-001",
      projectReferenceId: "project-001",
      phaseName: "Schematic Design",
      phaseOrder: 1,
    },
    {
      user: "user-001",
      phaseId: "phase-001-002",
      projectReferenceId: "project-001",
      phaseName: "Design Development",
      phaseOrder: 2,
    },
    {
      user: "user-001",
      phaseId: "phase-001-003",
      projectReferenceId: "project-001",
      phaseName: "Contract Document",
      phaseOrder: 3,
    },
    // Project 2 seed
    {
      user: "user-001",
      phaseId: "phase-002-001",
      projectReferenceId: "project-002",
      phaseName: "User Experience",
      phaseOrder: 1,
    },
    {
      user: "user-001",
      phaseId: "phase-002-002",
      projectReferenceId: "project-002",
      phaseName: "User Interface",
      phaseOrder: 2,
    },
    // Project 3 seed
    {
      user: "user-001",
      phaseId: "phase-003-001",
      projectReferenceId: "project-003",
      phaseName: "Collect Data",
      phaseOrder: 1,
    },
    {
      user: "user-001",
      phaseId: "phase-003-002",
      projectReferenceId: "project-003",
      phaseName: "Study",
      phaseOrder: 2,
    },
  ]);
};

export default phaseDbSeeder;
