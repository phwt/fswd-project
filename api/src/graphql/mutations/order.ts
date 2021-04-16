import { OrderTC } from "../models";

export const createOrder = OrderTC.getResolver("createOne");
export const updateOrderById = OrderTC.getResolver("updateById");
