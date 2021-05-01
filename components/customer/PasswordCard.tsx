import { Button } from "react-bootstrap";

const PasswordCard = () => {
  return (
    <div className="card m-5">
      <h5 className="card-header">Reset Password</h5>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <div>
                <b>Password Guidelines</b>
                <ul>
                  <li>Use both uppercase and lowercase letters.</li>
                  <li>Include at least one number</li>
                  <li>Include special symbols, such as ./@#! %():</li>
                  <li>At least 12 characters long.</li>
                  <li>Doesn't contain memorable keyboard paths.</li>
                  <li>Doesn't have your personal information.</li>
                  <li>Unique for each account you have.</li>
                </ul>
              </div>
            </div>

            <div className="col d-flex justify-content-center align-items-center">
              <Button
                block
                variant="light"
                onClick={() => {
                  alert(
                    "Password reset instruction has been sent to your email"
                  );
                }}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordCard;
