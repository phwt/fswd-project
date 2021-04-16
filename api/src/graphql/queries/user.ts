import { AdminTC, CustomerTC, UserModel, UserTC } from "../models";
import { schemaComposer } from "graphql-compose";

export const users = UserTC.getResolver("findMany");
export const userById = UserTC.getResolver("findById");

export const admins = AdminTC.getResolver("findMany");
export const adminById = AdminTC.getResolver("findById");

export const customers = CustomerTC.getResolver("findMany");
export const customerById = CustomerTC.getResolver("findById");

export const me = schemaComposer.createResolver({
  name: "me",
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    if (!context.user) {
      return null;
    }
    const { _id } = context.user;
    return UserModel.findById(_id);
  },
});
