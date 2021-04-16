import { UserInputError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";
import jsonwebtoken from "jsonwebtoken";

import { UserModel, UserTC } from "../models";

// const LoginInput = schemaComposer.createInputTC({
//   name: 'LoginInput',
//   fields: {
//     username: 'String!',
//     password: 'String!',
//   },
// })

const LoginPayload = schemaComposer.createObjectTC({
  name: "LoginPayload",
  fields: {
    token: "String",
    user: UserTC.getType(),
  },
});

declare module "mongoose" {
  interface Document {
    verifyPassword(password: unknown): boolean;
  }
}

export const login = schemaComposer.createResolver({
  name: "login",
  args: {
    username: "String!",
    password: "String!",
  },
  // args: {
  //   record: LoginInput,
  // },
  type: LoginPayload,
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new UserInputError(`Username ${username} not found`);
    }
    const valid = await user.verifyPassword(password);
    if (!valid) {
      throw new UserInputError("Incorrect password");
    }
    return {
      token: jsonwebtoken.sign(
        { _id: user._id },
        process.env.SECRET ?? "default-secret",
        { expiresIn: "1d", algorithm: "HS256" }
      ),
      user,
    };
  },
});
