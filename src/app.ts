import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 4000;

import projectsRoute from "./routes/projectsRoute";
import phaseRoute from "./routes/phasesRoute";
import taskRoute from "./routes/tasksRoute";

import { databaseConnection } from "./model/dbConnection";
databaseConnection();

import { projectDbSeeder, phaseDbSeeder, taskDbSeeder } from "./model/dbSeeder";
// projectDbSeeder();
// phaseDbSeeder();
// taskDbSeeder();

// url encoded is needed with form data
app.use(express.urlencoded({ extended: true }));
// express.json is needed when parsing json data i.e. rest
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_PORT || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  //   const refreshCookie = req.signedCookies["datetask-refresh"];
  //   console.log(refreshCookie);
  res.send("home page");
});

app.use("/projects", projectsRoute);
app.use("/phases", phaseRoute);
app.use("/tasks", taskRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
