import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DBNAME,
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
