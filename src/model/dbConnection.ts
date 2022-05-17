import mongoose from "mongoose";

const mongooseOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const databaseConnection = async () => {
  try {
    mongoose.connect(
      "mongodb://127.0.0.1:27017/DatetaskServer",
      mongooseOptions
    );
    console.log("Connected to the database");
  } catch (error) {
    console.log("Unable to Connect to the database", error);
  }
};

export { databaseConnection };
