import { useSession } from "../../modules/SessionContext";
import Link from "next/link";
import { Col, Row, Nav } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-3 bg-0 sticky">
      <Row>
        <Col></Col>
        <Col>
          <h3 className="text-center raleway-6">FSWD</h3>
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
          {/* <FontAwesomeIcon icon={["fal", "cart"]} /> */}
        </Col>
      </Row>

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home" className="raleway-3s">
            ALL PRODUCTS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
            MEN
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
            WOMEN
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
            ACCESSORIES
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
            SALE
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
