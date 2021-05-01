import "../styles/globals.scss";
import { CookiesProvider } from "react-cookie";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SessionProvider } from "@modules/SessionContext";
import CommonHeader from "@components/common/Header";
import BackofficeHeader from "@components/admin/Header";
import Footer from "@components/common/Footer";
import CommonBaseContainer from "@components/common/BaseContainer";
import BackofficeBaseContainer from "@components/admin/BaseContainer";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { clientApollo } from "@modules/Apollo";

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
      <ApolloProvider client={clientApollo()}>
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
