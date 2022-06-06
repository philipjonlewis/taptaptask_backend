import { ProjectModel } from "../dbModel";

const projectDbSeeder = async () => {
  await ProjectModel.insertMany([
    {
      user: "629db2e331f8a5f114d8af88",
      projectId: "881079a6-fe58-4c3d-a753-8b2135a60e07",
      projectName: "Architectural Project",
      projectDescription: "Two storey house in the south of manila",
      dateOfDeadline: "2022-07-13",
    },
    {
      user: "629db2e331f8a5f114d8af88",
      projectId: "9744d4d4-290a-4b58-a274-56f760fac42b",
      projectName: "Software Project",
      projectDescription: "Sass app for managing construction estimates",
      dateOfDeadline: "2022-12-25",
    },
    {
      user: "629db2e331f8a5f114d8af88",
      projectId: "727c3356-2998-4579-b602-b73df938537f",
      projectName: "Exam and Certification",
      projectDescription: "Study for AWS certification",
      dateOfDeadline: "2022-10-12",
    },
  ]);
};

export default projectDbSeeder;
