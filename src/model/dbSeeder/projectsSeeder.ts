import { ProjectModel } from "../dbModel";

const projectDbSeeder = async () => {
  await ProjectModel.insertMany([
    {
      user: "user-001",
      projectId: "project-001",
      projectName: "Architectural Project",
      projectDescription: "Two storey house in the south of manila",
      dateOfDeadline: "2022-07-13",
    },
    {
      user: "user-001",
      projectId: "project-002",
      projectName: "Software Project",
      projectDescription: "Sass app for managing construction estimates",
      dateOfDeadline: "2022-12-25",
    },
    {
      user: "user-001",
      projectId: "project-003",
      projectName: "Exam and Certification",
      projectDescription: "Study for AWS certification",
      dateOfDeadline: "2022-10-12",
    },
  ]);
};

export default projectDbSeeder;
