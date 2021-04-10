import { AdminTC, CustomerTC } from "../models";

export const createAdmin = AdminTC.getResolver("createOne");
export const createCustomer = CustomerTC.getResolver("createOne");
