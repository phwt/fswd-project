import { gql } from "@apollo/client";
import { Customer } from "@type/SchemaModel";
import CustomerInfoCard from "@components/customer/CustomerInfoCard";
import PasswordCard from "@components/customer/PasswordCard";
import { serverApollo } from "@modules/Apollo";

export const getServerSideProps = async (context) => {
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
      <h1 className="mx-5 mb-4 mt-2">Profile</h1>
      <CustomerInfoCard customer={customer} />
      <PasswordCard />
    </>
  );
};

export default CustomerPage;
