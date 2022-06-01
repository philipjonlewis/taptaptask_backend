import express, { Express, Request, Response, RequestHandler } from "express";
const app: Express = express();

var boolParser = require("express-query-boolean");

import userAgent from "express-useragent";

import { lookup } from "geoip-lite";

import getClientIp from "@supercharge/request-ip";

import cookieParser from "cookie-parser";

import csrf from "csurf";

import helmet from "helmet";

import cors from "cors";

import path from "path";

import nocache from "nocache";

require("dotenv").config();

import { databaseConnection } from "./model/dbConnection";

import customErrorMiddleware from "./middleware/errorHandling/customErrorMiddleware";

import projectsRoute from "./routes/projectsRoute";
import phaseRoute from "./routes/phasesRoute";
import taskRoute from "./routes/tasksRoute";
import aggregationRoute from "./routes/aggregationRoute";

import { projectDbSeeder, phaseDbSeeder, taskDbSeeder } from "./model/dbSeeder";
// projectDbSeeder();
// phaseDbSeeder();
// taskDbSeeder();
app.disable("x-powered-by");

app.set("trust proxy", true);

app.use(userAgent.express());

// url encoded is needed with form data
app.use(express.urlencoded({ extended: true }));
// express.json is needed when parsing json data i.e. rest
app.use(express.json());

app.use(cookieParser());

app.use(boolParser());

app.use(helmet());

// app.use(nocache());

app.set("etag", false);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "*, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

// app.use((req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

app.use(
  cors({
    origin: "http://192.168.0.22:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

databaseConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("ome");
});

app.use(csrf({ cookie: true }));
app.get("/getCSRFToken", (req, res) => {
  res.json({ CSRFToken: req.csrfToken() });
});

app.use("/projects", projectsRoute);
app.use("/phases", phaseRoute);
app.use("/tasks", taskRoute);
app.use("/aggregate", aggregationRoute);

app.get("*", (req, res) => {
  res.send("Page does not exist");
});

app.use(customErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
