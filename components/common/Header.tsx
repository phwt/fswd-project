import { useSession } from "../../modules/SessionContext";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-3 bg-dark">
      <Row>
        <Col>
          <Link href="/">eCommerce</Link>
        </Col>
        <Col className="text-right">
          {loading && <span>Loading</span>}
          {user && (
            <>
              Hello!, {user?.username}
              <span className="mx-2">|</span>
              <Link href="/customer">Profile</Link>
              <span className="mx-2">|</span>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </>
          )}
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <span className="mx-2">or</span>
              <Link href="/register">Register</Link>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
