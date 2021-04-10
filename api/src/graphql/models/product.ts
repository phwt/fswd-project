import mongoose, { Schema } from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const productTypes = {
  PRODUCT: "Product",
  PROMOTION: "Promotion",
};

const ProductSchema = new Schema({
  sku: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  detail: { type: String },
  price: { type: Number, required: true },
  weight: { type: Number },
  stock: { type: Number, required: true },
  created: { type: Date, default: new Date() },
  modified: { type: Date, default: new Date() },
  type: { type: String, required: true, enum: Object.keys(productTypes) },
});

const PromotionSchema = new Schema({
  discountPercentage: { type: Number, required: true },
});

ProductSchema.set("discriminatorKey", "type");

export const ProductModel = mongoose.model("Product", ProductSchema);
export const PromotionModel = ProductModel.discriminator(
  productTypes.PROMOTION,
  PromotionSchema
);

export const ProductTC = composeWithMongooseDiscriminators(ProductModel);
export const PromotionTC = ProductTC.discriminator(PromotionModel, {
  name: productTypes.PROMOTION,
});
