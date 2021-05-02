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
import { ResponsiveEmbed, Row, Col } from "react-bootstrap";

const BaseLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { pathname } = useRouter();

  const isBackoffice = useMemo(() => {
    return pathname.includes("admin");
  }, [pathname]);

  const isRoot = useMemo(() => {
    return pathname === "/";
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
          {isRoot && (
            <>
              <Row className="mt-5 pt-5"></Row>
              <Row style={{ width: "auto", height: "auto", maxWidth: "100vw" }}>
                <ResponsiveEmbed aspectRatio="21by9">
                  <video autoPlay muted>
                    <source
                      src="https://dms-fs.s3.ap-southeast-1.amazonaws.com/video.mp4"
                      type="video/mp4"
                    />
                  </video>
                </ResponsiveEmbed>
              </Row>
              <Col className="text-center">
                <i className="fa fa-chevron-down fa-2x" />
              </Col>
            </>
          )}
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
