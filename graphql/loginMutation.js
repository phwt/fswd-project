import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
