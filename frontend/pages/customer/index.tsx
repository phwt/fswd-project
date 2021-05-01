import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { Customer } from "@type/SchemaModel";
import CustomerInfoCard from "@components/customer/CustomerInfoCard";
import PasswordCard from "@components/customer/PasswordCard";

const CustomerPage = () => {
  const [customer, setCustomer] = useState<Customer>();

  const { loading, error, data } = useQuery(
    gql`
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
    `
  );

  if (!loading && data && data.me && !customer) {
    setCustomer(data.me);
  }

  return (
    <>
      <h1 className="mx-5 mb-4 mt-2">Profile</h1>
      {customer && (
        <>
          <CustomerInfoCard customer={customer} />
          <PasswordCard />
        </>
      )}
    </>
  );
};

export default CustomerPage;
