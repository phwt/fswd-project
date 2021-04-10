import mongoose, { Schema } from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const productTypes = {
  PRODUCT: "Product",
  PROMOTION: "Promotion",
};

const IProductSchema = new Schema({
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

const ProductSchema = new Schema({});
const PromotionSchema = new Schema({
  discountPercentage: { type: Number, required: true },
});

IProductSchema.set("discriminatorKey", "type");

const IProductModel = mongoose.model("Products", IProductSchema);
export const ProductModel = IProductModel.discriminator(
  productTypes.PRODUCT,
  ProductSchema
);
export const PromotionModel = IProductModel.discriminator(
  productTypes.PROMOTION,
  PromotionSchema
);

const IProductTC = composeWithMongooseDiscriminators(IProductModel);
export const ProductTC = IProductTC.discriminator(ProductModel, {
  name: productTypes.PRODUCT,
});
export const PromotionTC = IProductTC.discriminator(PromotionModel, {
  name: productTypes.PROMOTION,
});
