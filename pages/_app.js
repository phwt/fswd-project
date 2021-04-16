import "../styles/globals.scss";
import { CookiesProvider } from "react-cookie";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "../modules/SessionContext";

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
