import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

const router = express.Router();

import TaskModel from "../model/dbModel/taskModel";

import { newTaskDataValidation } from "../middleware/validation/taskValidation";
import { newTaskDataSanitizer } from "../middleware/sanitization/taskSanitizer";
import { userCredentialVerification } from "../middleware/verification/userCredentialVerification";
import { createNewTaskDataController } from "../controllers/taskController";

// Add a rate limiter middleware here

router.route("/create").post([
  (req: Request, res: Response, next: NextFunction) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
  },
  newTaskDataSanitizer,
  newTaskDataValidation,
  userCredentialVerification,
  createNewTaskDataController,
]);

// router.route("/create").post([
//   createNewTaskValidator,
//   async (req, res, next) => {
//     // const task = req.body;

//     // const newTask = await TaskModel.insertMany([...task]);
//     // console.log(newTask);
//     // // newTask.save();

//     // res.json(newTask);

//     res.send("this is hit");
//   },
// ]);

router.route("/read?:taskId").get(async (req, res, next) => {
  const tasks = await TaskModel.find({ ...req.query });
  res.json(tasks);
});

router.route("/update").patch(async (req, res, next) => {
  const updateValue = req.body;

  console.log("parameters to use to update", updateValue[0]);
  console.log("value to be updated", updateValue[1]);

  res.send(updateValue);
});

router.route("/delete").delete(async (req, res, next) => {
  res.send(req.body);
});

// router.use((error: any, req: any, res: any, next: any) => {
//   res.send("error handler");
// });

export default router;
