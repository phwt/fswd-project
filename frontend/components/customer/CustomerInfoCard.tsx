import { Customer } from "@type/SchemaModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useSession } from "@modules/SessionContext";

const ProfilePicture = () => {
  const profilePictures = [
    "/profile/01.jpg",
    "/profile/02.jpg",
    "/profile/03.jpg",
    "/profile/04.jpg",
  ];
  const [updateFlag, setUpdateFlag] = useState(true);

  const currentProfile = useMemo(() => {
    return profilePictures[Math.floor(Math.random() * profilePictures.length)];
  }, [updateFlag]);

  const updateProfile = useCallback(() => {
    setUpdateFlag(!updateFlag);
  }, [updateFlag]);

  return (
    <div className="col text-center">
      <img src={currentProfile} className="profilePic" width="80%" />
      <div className="d-flex justify-content-center">
        <Button onClick={updateProfile} variant="light" className="mt-2">
          <i className="fa fa-random" />
        </Button>
      </div>
    </div>
  );
};

const CustomerInfoCard = ({ customer }: { customer: Customer }) => {
  const [localCustomer, setLocalCustomer] = useState(customer);
  const { user } = useSession();

  const [updateCustomer] = useMutation(gql`
    mutation(
      $id: MongoID!
      $billingAddress: String!
      $shippingAddress: String!
      $phone: String!
    ) {
      updateCustomerById(
        _id: $id
        record: {
          billingAddress: $billingAddress
          shippingAddress: $shippingAddress
          phone: $phone
        }
      ) {
        record {
          billingAddress
          shippingAddress
          phone
        }
      }
    }
  `);

  const handleChange = useCallback(
    (e) => {
      setLocalCustomer({ ...localCustomer, [e.target.name]: e.target.value });
    },
    [localCustomer]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const {
          data: {
            updateCustomerById: { record },
          },
        } = await updateCustomer({
          variables: {
            id: user._id,
            billingAddress: localCustomer.billingAddress,
            shippingAddress: localCustomer.shippingAddress,
            phone: localCustomer.phone,
          },
        });

        setLocalCustomer({ ...localCustomer, ...record });
        alert("User updated successfully");
      } catch {
        alert("Fail to update user!");
      }
    },
    [user, localCustomer]
  );

  return (
    <div className="card mx-5">
      <h5 className="card-header">Information</h5>
      <div className="card-body">
        <div className="row" id="informationTab">
          <ProfilePicture />

          <div className="col-9">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control-plaintext text-secondary"
                    value={localCustomer.username}
                    readOnly
                  />
                </div>

                <div className="col form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control-plaintext text-secondary"
                    value={localCustomer.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Billing Address</label>
                <textarea
                  className="form-control"
                  value={localCustomer.billingAddress}
                  name="billingAddress"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  className="form-control"
                  value={localCustomer.shippingAddress}
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
                  value={localCustomer.phone}
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

export default CustomerInfoCard;
