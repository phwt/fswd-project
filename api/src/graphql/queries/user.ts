import { UserTC } from "../models";

export const users = UserTC.getResolver("findMany");
export const userById = UserTC.getResolver("findById");
