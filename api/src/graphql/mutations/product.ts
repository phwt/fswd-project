import { ProductTC, PromotionTC } from "../models";

export const createProduct = ProductTC.getResolver("createOne");
export const createPromotion = PromotionTC.getResolver("createOne");
