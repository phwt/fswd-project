import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017", {
  dbName: "fswd-ecommerce",
  user: "username",
  pass: "password",
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// docker run -d -p 27017:27017 --name fswd-mongo -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
