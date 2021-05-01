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

  const handleChange = useCallback(
    (e) => {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    },
    [customer]
  );

  return (
    <>
      <h1 className="mx-5 mb-4 mt-2">Profile</h1>
      {customer && (
        <>
          <CustomerInfoCard customer={customer} handleChange={handleChange} />
          <PasswordCard />
        </>
      )}
    </>
  );
};

export default CustomerPage;
