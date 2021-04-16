import { ProductTC, PromotionTC } from "../models";

export const products = ProductTC.getResolver("findMany");
export const productById = ProductTC.getResolver("findById");

export const promotions = PromotionTC.getResolver("findMany");
export const promotionById = PromotionTC.getResolver("findById");
