import { useSession } from "../../modules/SessionContext";
import Link from "next/link";
import { Col, Row, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-3 bg-0 sticky">
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <h3 className="text-center raleway-6">FSWD</h3>
        </Col>
        <Col></Col>
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
              <a className="raleway-3s">
                <Link href="/login">LOGIN</Link>
              </a>
              <span className="mx-2">/</span>
              <a className="raleway-3s">
                <Link href="/register">REGISTER</Link>
              </a>
            </>
          )}
          &nbsp;&nbsp;
          <Button size="sm" variant="light">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>
        </Col>

        <Col></Col>
      </Row>

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
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
            PROMOTION
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
