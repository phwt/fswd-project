import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
export const ProductTC = composeWithMongoose(ProductModel);
export default ProductModel;
