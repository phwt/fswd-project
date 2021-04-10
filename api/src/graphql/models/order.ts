import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const orderStatuses = {
  AWAITING_PAYMENT: "AwaitingPayment",
  PAID: "Paid",
  SHIPPED: "Shipped",
  COMPLETED: "Completed",
};

const OrderSchema = new Schema({
  status: { type: String, required: true, enum: Object.keys(orderStatuses) },
  timestamp: { type: Date, required: true, default: new Date() },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
export const OrderTC = composeWithMongoose(OrderModel);
