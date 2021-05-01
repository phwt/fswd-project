import { Customer } from "@type/SchemaModel";
import { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";

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
          <ProfilePicture />

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
                    className="form-control-plaintext text-secondary"
                    value={customer.email}
                    readOnly
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

export default CustomerInfoCard;
