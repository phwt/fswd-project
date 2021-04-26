import { ProductTC, PromotionTC } from "../models";

export const products = ProductTC.getResolver("findMany");
export const productById = ProductTC.getResolver("findById");
export const productByIds = ProductTC.getResolver("findByIds");
export const productFindOne = ProductTC.getResolver("findOne");
export const productPagination = ProductTC.getResolver("pagination");

export const promotions = PromotionTC.getResolver("findMany");
export const promotionById = PromotionTC.getResolver("findById");
export const promotionByIds = PromotionTC.getResolver("findByIds");
export const promotionFindOne = PromotionTC.getResolver("findOne");
