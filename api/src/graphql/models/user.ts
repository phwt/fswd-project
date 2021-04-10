import mongoose, { Schema } from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const userRoles = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};

const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: Object.keys(userRoles),
  },
});

const AdminSchema = new Schema({});
const CustomerSchema = new Schema({
  billingAddress: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  phone: { type: String },
});

UserSchema.set("discriminatorKey", "role");

const discriminatorOptions = {};

const UserModel = mongoose.model("User", UserSchema);
export const AdminModel = UserModel.discriminator(userRoles.ADMIN, AdminSchema);
export const CustomerModel = UserModel.discriminator(
  userRoles.CUSTOMER,
  CustomerSchema
);

const UserTC = composeWithMongooseDiscriminators(UserModel);
export const AdminTC = UserTC.discriminator(AdminModel, {
  name: userRoles.ADMIN,
  ...discriminatorOptions,
});
export const CustomerTC = UserTC.discriminator(CustomerModel, {
  name: userRoles.CUSTOMER,
  ...discriminatorOptions,
});
