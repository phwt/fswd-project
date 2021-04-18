import { useSession } from "@modules/SessionContext";
import { Col, Row, Nav } from "react-bootstrap";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-3 bg-0 sticky">
      <Row>
        <Col />
        <Col>
          <h3 className="text-center raleway-6">Dashboard</h3>
        </Col>
        <Col className="text-right">
          {user && (
            <>
              Logged in as {user?.username}
              <span className="mx-2">|</span>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </>
          )}
        </Col>
      </Row>

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home" className="raleway-3s">
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" className="raleway-3s">
            Orders
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
