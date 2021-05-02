import "../styles/globals.scss";
import { CookiesProvider } from "react-cookie";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "@modules/SessionContext";
import CommonHeader from "@components/common/Header";
import BackofficeHeader from "@components/admin/Header";
import Footer from "@components/common/Footer";
import CommonBaseContainer from "@components/common/BaseContainer";
import BackofficeBaseContainer from "@components/admin/BaseContainer";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { clientApollo } from "@modules/Apollo";
import Head from "next/head";
import { ResponsiveEmbed, Row } from "react-bootstrap";

const BaseLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { pathname } = useRouter();

  const isBackoffice = useMemo(() => {
    return pathname.includes("admin");
  }, [pathname]);

  return (
    <>
      {isBackoffice ? <BackofficeHeader /> : <CommonHeader />}
      {isBackoffice ? (
        <>
          <Head>
            <title>Dashboard</title>
          </Head>
          <BackofficeBaseContainer>{children}</BackofficeBaseContainer>
        </>
      ) : (
        <>
          <Head>
            <title>Store</title>
          </Head>
          <Row style={{ width: "auto", height: "auto" }}>
            <ResponsiveEmbed aspectRatio="21by9">
              <embed
                type="image/svg+xml"
                src="https://dms-fs.s3.ap-southeast-1.amazonaws.com/video.mp4"
              />
            </ResponsiveEmbed>
          </Row>
          <CommonBaseContainer>{children}</CommonBaseContainer>
        </>
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
