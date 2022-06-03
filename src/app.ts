import express, { Express, Request, Response, RequestHandler } from "express";
const app: Express = express();

var boolParser = require("express-query-boolean");

import userAgent from "express-useragent";

import { lookup } from "geoip-lite";

import getClientIp from "@supercharge/request-ip";

import cookieParser from "cookie-parser";

import csrf from "csurf";
const csrfProtection = csrf({ cookie: true });

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
import authenticationRoute from "./routes/authenticationRoute";

import { projectDbSeeder, phaseDbSeeder, taskDbSeeder } from "./model/dbSeeder";

app.disable("x-powered-by");

app.set("trust proxy", true);

app.use(userAgent.express());

// url encoded is needed with form data
app.use(express.urlencoded({ extended: true }));
// express.json is needed when parsing json data i.e. rest
app.use(express.json());

app.use(cookieParser(process.env.WALKERS_SHORTBREAD));

app.use(boolParser());

app.use(helmet());

app.use(nocache());

app.set("etag", false);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

databaseConnection();
// projectDbSeeder();
// phaseDbSeeder();
// taskDbSeeder();

// app.use(csrfProtection);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/project", projectsRoute);
app.use("/phase", phaseRoute);
app.use("/task", taskRoute);
app.use("/aggregate", aggregationRoute);
app.use("/auth", authenticationRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.get("*", (req, res) => {
  res.send("Page does not exist");
});

app.use(customErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
