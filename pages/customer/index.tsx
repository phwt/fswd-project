import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { apolloClient } from "app-apollo-client";
import { Customer } from "@type/SchemaModel";

const CustomerInfoCard = ({
  customer,
  handleChange,
}: {
  customer: Customer;
  handleChange: (e) => void;
}) => {
  return (
    <div className="card mx-5">
      <h5 className="card-header">Information</h5>
      <div className="card-body">
        <div className="row" id="informationTab">
          <div className="col text-center">
            <img src="profile.jpg" className="profilePic" width="80%" />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-light my-3 mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button type="submit" className="btn btn-light my-3 mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="col-9">
            <form>
              <div className="row">
                <div className="col form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control-plaintext text-secondary"
                    value={customer.username}
                    readOnly
                  />
                </div>

                <div className="col form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={customer.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Billing Address</label>
                <textarea
                  className="form-control"
                  value={customer.billingAddress}
                  name="billingAddress"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  className="form-control"
                  value={customer.shippingAddress}
                  name="shippingAddress"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={customer.phone}
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-light my-3 float-right">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordCard = () => {
  return (
    <div className="card m-5">
      <h5 className="card-header">Password</h5>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <ul>
                <li>uppercase and lowercase letters.</li>
                <li>numbers.</li>
                <li>special symbols, such as ./@#! %():</li>
                <li>at least 12 characters long.</li>
                <li>doesn't contain memorable keyboard paths.</li>
                <li>doesn't have your personal information.</li>
                <li>unique for each account you have.</li>
              </ul>
            </div>

            <div className="col">
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your old password"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your new password"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm new password"
                  required
                ></input>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-light my-3 float-right">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

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
