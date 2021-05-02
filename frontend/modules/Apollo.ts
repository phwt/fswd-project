import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import cookies from "next-cookies";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_REMOTE_API,
});

const createAuthLink = (token) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const createApolloClient = (authLink) =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: "include",
  });

export const clientApollo = () => {
  const authLink = createAuthLink(Cookies.get("token"));
  return createApolloClient(authLink);
};

export const serverApollo = (context) => {
  const authLink = createAuthLink(cookies(context).token);
  return createApolloClient(authLink);
};
