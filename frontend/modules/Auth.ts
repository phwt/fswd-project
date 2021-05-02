import { serverApollo } from "@modules/Apollo";
import { ME_QUERY } from "../graphql/meQuery";

/**
 * Require authentication before accessing the page
 * Place inside getServerSideProps on page that need to be protected
 * @param context getServerSideProps context object
 * @param roles Restrict page based on role
 */
export const requireAuthentication = async (context, roles: string[] = []) => {
  const apolloClient = serverApollo(context);
  const {
    data: { me },
  } = await apolloClient.query({ query: ME_QUERY });

  const validAccess = () => {
    if (me) {
      if (roles.length) {
        return (
          roles.includes(me.role) ||
          roles.map((role) => role.toLowerCase()).includes(me.username)
        );
      }
      return true;
    }
    return false;
  };

  if (!validAccess()) {
    context.res.statusCode = 302;
    context.res.setHeader("Location", "/login");
    return false;
  }
  return true;
};
