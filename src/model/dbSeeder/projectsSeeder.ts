import { ProjectModel } from "../dbModel";

const projectDbSeeder = async () => {
  await ProjectModel.insertMany([
    {
      user: "user-001",
      projectId: "project-001",
      projectName: "Echavez House",
      projectDescription: "Two storey house in the south of manila",
      dateOfDeadline: "2020-01-01",
    },
    {
      user: "user-001",
      projectId: "project-002",
      projectName: "Archestimator App",
      projectDescription: "Sass app for managing construction estimates",
      dateOfDeadline: "2020-02-01",
    },
    {
      user: "user-001",
      projectId: "project-003",
      projectName: "AWS Certification",
      projectDescription: "Study for AWS certification",
      dateOfDeadline: "2020-03-01",
    },
  ]);
};

export default projectDbSeeder;
