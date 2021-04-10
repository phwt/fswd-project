import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const ProductSchema = new Schema({
  sku: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  detail: { type: String },
  price: { type: Number, required: true },
  weight: { type: Number },
  stock: { type: Number, required: true },
  created: { type: Date, default: new Date() },
  modified: { type: Date, default: new Date() },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
export const ProductTC = composeWithMongoose(ProductModel);
export default ProductModel;
