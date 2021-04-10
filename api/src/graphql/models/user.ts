import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
});

export const UserModel = mongoose.model("User", UserSchema);
export const UserTC = composeWithMongoose(UserModel).removeField("password");
export default UserModel;
