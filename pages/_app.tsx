import "../styles/globals.scss";
import { CookiesProvider } from "react-cookie";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "../modules/SessionContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BaseContainer from "../components/common/BaseContainer";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
          <Header />
          <BaseContainer>
            <Component {...pageProps} />
          </BaseContainer>
          <Footer />
        </SessionProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
