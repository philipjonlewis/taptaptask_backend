import { TaskModel } from "../dbModel";

const taskDbSeeder = async () => {
  await TaskModel.insertMany([
    // Project One seed
    {
      user: "user-001",
      taskId: "task-001",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-001",
      taskContent: "A task in the SD Design Phase in the first project",
      dateOfDeadline: "2022-06-01",
      isCompleted: true,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-167",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-001",
      taskContent: "Another task",
      dateOfDeadline: "2022-06-01",
      isCompleted: false,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-783",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-001",
      taskContent: "Third task june 6 deadline",
      dateOfDeadline: "2022-06-01",
      isCompleted: false,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-002",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-001",
      taskContent: "Another task",
      dateOfDeadline: "2022-07-05",
      isCompleted: false,
      isPriority: false,
      isLapsed: true,
    },
    {
      user: "user-001",
      taskId: "task-003",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-002",
      taskContent: "First tas in Design Development",
      dateOfDeadline: "2022-08-05",
      isCompleted: true,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-004",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-003",
      taskContent: "Task in the CD Phase",
      dateOfDeadline: "2022-09-05",
      isCompleted: true,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-005",
      projectReferenceId: "project-001",
      phaseReferenceId: "phase-001-003",
      taskContent: "Cd na naman utang na luob",
      dateOfDeadline: "2022-10-05",
      isCompleted: false,
      isPriority: false,
      isLapsed: true,
    },
    //Project 2 seed
    {
      user: "user-001",
      taskId: "task-006",
      projectReferenceId: "project-002",
      phaseReferenceId: "phase-002-001",
      taskContent: "UX kinemelyn",
      dateOfDeadline: "2022-11-05",
      isCompleted: false,
      isPriority: false,
      isLapsed: true,
    },
    {
      user: "user-001",
      taskId: "task-007",
      projectReferenceId: "project-002",
      phaseReferenceId: "phase-002-001",
      taskContent: "Kinorma UX",
      dateOfDeadline: "2022-12-05",
      isCompleted: false,
      isPriority: false,
      isLapsed: true,
    },
    {
      user: "user-001",
      taskId: "task-008",
      projectReferenceId: "project-002",
      phaseReferenceId: "phase-002-002",
      taskContent: "The only task in the User Interface phase letsgetitttt",
      dateOfDeadline: "2022-06-20",
      isCompleted: true,
      isPriority: false,
      isLapsed: false,
    },
    // Project 3 seed
    {
      user: "user-001",
      taskId: "task-009",
      projectReferenceId: "project-003",
      phaseReferenceId: "phase-003-001",
      taskContent: "A task inside the collecting data phase",
      dateOfDeadline: "2022-07-20",
      isCompleted: true,
      isPriority: false,
      isLapsed: false,
    },
    {
      user: "user-001",
      taskId: "task-010",
      projectReferenceId: "project-003",
      phaseReferenceId: "phase-003-002",
      taskContent: "sidesurf cake studios",
      dateOfDeadline: "2022-08-20",
      isCompleted: false,
      isPriority: false,
      isLapsed: true,
    },
  ]);
};

export default taskDbSeeder;
