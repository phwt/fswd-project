import { gql, useQuery } from "@apollo/client";

const CustomerPage = () => {

  const { loading, error, data} = useQuery(gql`
    query{
      me{
        _id
      }
    }
  `);

  if(loading) {
    return (<div>Loading...</div>);
  }
  if(error || !data) {
    return (<div>Error...</div>);
  }

  return (
    <>
    <p>{data.me._id}</p>
    {/* <p>{data.customerById.username}</p> */}
      <h1 class="mx-5 mb-4 mt-2">Profile</h1>
      <div class="card mx-5">
        <h5 class="card-header">Information</h5>
        <div class="card-body">
          <div class="row" id="informationTab">
            <div class="col text-center">
              <img src="profile.jpg" class="profilePic" width="80%"></img>
            </div>

            <div class="col-9">
              <form>
                <div class="row">
                  <div class="col form-group">
                    <label>User ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Customer's ID"
                      readOnly
                    ></input>
                  </div>

                  <div class="col form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Customer's username"
                      readOnly
                    ></input>
                  </div>
                </div>

                <div class="row">
                  <div class="col form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Serenade Platinum"
                      readOnly
                    ></input>
                  </div>

                  <div class="col form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="example@example.com"
                    ></input>
                  </div>
                </div>

                <div class="form-group">
                  <label>Billing Address</label>
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="278/23 Billing Rd."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label>Shipping Address</label>
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="278/23 Billing Rd."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="0812345678"
                  ></input>
                </div>
                <button type="submit" class="btn btn-primary my-3 float-right">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="card m-5">
        <h5 class="card-header">Password</h5>
        <div class="card-body">
          <div class="row">
            <div class="col d-flex justify-content-center align-items-center">
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

            <div class="col">
              <div class="form-group">
                <label>Old Password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your old password"
                ></input>
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your new password"
                ></input>
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Confirm new password"
                ></input>
              </div>
              <button type="submit" class="btn btn-primary my-3 float-right">
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
