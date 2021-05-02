import { gql } from "@apollo/client";
import { Customer } from "@type/SchemaModel";
import CustomerInfoCard from "@components/customer/CustomerInfoCard";
import PasswordCard from "@components/customer/PasswordCard";
import { serverApollo } from "@modules/Apollo";
import PageTitle from "@components/common/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  if (!(await requireAuthentication(context))) return;

  const apolloClient = serverApollo(context);

  const {
    data: { me },
  } = await apolloClient.query({
    query: gql`
      query {
        me {
          _id
          username
          email
          phone
          billingAddress
          shippingAddress
        }
      }
    `,
  });

  return {
    props: { customer: me },
  };
};

interface Props {
  customer: Customer;
}

const CustomerPage = ({ customer }: Props) => {
  return (
    <>
      <PageTitle icon="user" title="Profile" />
      <CustomerInfoCard customer={customer} />
      <PasswordCard />
    </>
  );
};

export default CustomerPage;
