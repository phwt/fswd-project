import { gql, useQuery } from "@apollo/client";

const CustomerPage = () => {

  const id = "607947d3c50b6e5ed98e612b";
  const { loading, error, data } = useQuery(
    gql`
      query customerById($userId: MongoID!) {
        customerById(_id: $userId) {
          _id
          role
          username
          email
          phone
          billingAddress
          shippingAddress
        }
      }
    `,
    {
      variables: {
        userId: id,
      },
    }
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error...</div>;
  }

  return (
    <>
      <h1 className="mx-5 mb-4 mt-2">Profile</h1>
      <div className="card mx-5">
        <h5 className="card-header">Information</h5>
        <div className="card-body">
          <div className="row" id="informationTab">
            <div className="col text-center">
              <img src="profile.jpg" className="profilePic" width="80%"></img>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-warning m-3">
                  Edit
                </button>
                <button type="submit" className="btn btn-danger m-3">
                  Delete
                </button>
              </div>
            </div>

            <div className="col-9">
              <form>
                <div className="row">
                  <div className="col form-group">
                    <label>User ID</label>
                    <input
                      type="text"
                      className="form-control-plaintext text-secondary"
                      value={data.customerById._id}
                      readOnly
                    ></input>
                  </div>

                  <div className="col form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control-plaintext text-secondary"
                      value={data.customerById.username}
                      readOnly
                    ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      className="form-control-plaintext text-secondary"
                      value={data.customerById.role}
                      readOnly
                    ></input>
                  </div>

                  <div className="col form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={data.customerById.email}
                      required
                    ></input>
                  </div>
                </div>

                <div className="form-group">
                  <label>Billing Address</label>
                  <textarea
                    className="form-control"
                    value={data.customerById.billingAddress}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea
                    className="form-control"
                    value={data.customerById.shippingAddress}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={data.customerById.phone}
                  ></input>
                </div>
                <button type="submit" className="btn btn-primary my-3 float-right">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card m-5">
        <h5 className="card-header">Password</h5>
        <div className="card-body">
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
                ></input>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your new password"
                ></input>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm new password"
                ></input>
              </div>
              <button type="submit" className="btn btn-primary my-3 float-right">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
