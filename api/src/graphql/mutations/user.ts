import { AdminTC, CustomerTC, UserTC } from "../models";

export const createAdmin = AdminTC.getResolver("createOne");
export const createCustomer = CustomerTC.getResolver("createOne");

export const updateUserById = UserTC.getResolver("updateById");
export const removeUserById = UserTC.getResolver("removeById");
export const updateCustomerById = CustomerTC.getResolver("updateById");
