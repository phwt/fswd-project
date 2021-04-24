import "../styles/globals.scss";
import { CookiesProvider } from "react-cookie";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "@modules/SessionContext";
import CommonHeader from "@components/common/Header";
import BackofficeHeader from "@components/admin/Header";
import Footer from "@components/common/Footer";
import CommonBaseContainer from "@components/common/BaseContainer";
import BackofficeBaseContainer from "@components/admin/BaseContainer";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
});

const BaseLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { pathname } = useRouter();

  const isBackoffice = useMemo(() => {
    return pathname.includes("admin");
  }, [pathname]);

  return (
    <>
      {isBackoffice ? <BackofficeHeader /> : <CommonHeader />}
      {isBackoffice ? (
        <BackofficeBaseContainer>{children}</BackofficeBaseContainer>
      ) : (
        <CommonBaseContainer>{children}</CommonBaseContainer>
      )}
      <Footer />
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <SessionProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </SessionProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
