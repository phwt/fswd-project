import { ProductTC, PromotionTC } from "../models";

export const createProduct = ProductTC.getResolver("createOne");
export const createPromotion = PromotionTC.getResolver("createOne");

export const updateProductById = ProductTC.getResolver("updateById");
export const updatePromotionById = PromotionTC.getResolver("updateById");

export const removeProductById = ProductTC.getResolver("removeById");
export const removePromotionById = PromotionTC.getResolver("removeById");
