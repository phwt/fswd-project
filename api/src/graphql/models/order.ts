import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const OrderSchema = new Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, require: true, default: new Date() },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
export const OrderTC = composeWithMongoose(OrderModel);
export default OrderModel;
