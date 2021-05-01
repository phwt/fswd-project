import { serverApollo } from "@modules/Apollo";
import { ME_QUERY } from "../graphql/meQuery";

/**
 * Require authentication before accessing the page
 * Place inside getServerSideProps on page that need to be protected
 * @param context getServerSideProps context object
 */
export const requireAuthentication = async (context) => {
  const apolloClient = serverApollo(context);
  const {
    data: { me },
  } = await apolloClient.query({ query: ME_QUERY });

  if (!me) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", "/login");
    return false;
  }
  return true;
};
