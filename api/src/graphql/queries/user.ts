import { AdminTC, CustomerTC } from "../models";

export const admins = AdminTC.getResolver("findMany");
export const adminById = AdminTC.getResolver("findById");

export const customers = CustomerTC.getResolver("findMany");
export const customerById = CustomerTC.getResolver("findById");
