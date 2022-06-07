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

import authRoutes from "./handlers/routes/authRoutes";
import projectRoutes from "./handlers/routes/projectRoutes";
import phaseRoutes from "./handlers/routes/phaseRoutes";
import taskRoutes from "./handlers/routes/taskRoutes";

import aggregationRoute from "./handlers/routes/aggregationRoute";

import { projectDbSeeder, phaseDbSeeder, taskDbSeeder } from "./model/dbSeeder";

app.disable("x-powered-by");

app.set("trust proxy", true);

// url encoded is needed with form data
app.use(express.urlencoded({ extended: true }));
// express.json is needed when parsing json data i.e. rest
app.use(express.json());

app.use(cookieParser(process.env.WALKERS_SHORTBREAD));

app.use(boolParser());

app.use(helmet());

app.use(nocache());

app.set("etag", false);

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://169.254.26.231:3000",
    // origin: "http://192.168.0.25:3000" ,
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
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", "http://169.254.26.231:3000");
  // res.header("Access-Control-Allow-Credentials", "http://192.168.0.25:3000" );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/phase", phaseRoutes);
app.use("/task", taskRoutes);
app.use("/aggregate", aggregationRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.get("*", (req, res) => {
  res.send("Page does not exist");
});

app.use(customErrorMiddleware);

app.listen(4000, () => {
  console.log(`App listening on port ${4000}!`);
});
// app.listen(process.env.PORT, () => {
//   console.log(`App listening on port ${process.env.PORT}!`);
// });
