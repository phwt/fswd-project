import { useSession } from "@modules/SessionContext";
import { Col, Row, Nav } from "react-bootstrap";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-3 bg-0 sticky-1">
      <div className="smartphone-menu-trigger"></div>
      <header className="avatar">
        <h2>DashBoard</h2>
      </header>

      <Nav  className="flex-column" activeKey="/home">
          <Nav.Link href="/admin/products" className="raleway-3s">
            Products
          </Nav.Link>
          <Nav.Link href="/admin/orders" className="raleway-3s">
            Orders
          </Nav.Link>
          <Nav.Link href="/admin/promotions" className="raleway-3s">
            Promotions
          </Nav.Link>
      </Nav>

      {/* <ul className="nav flex-column">
          <li className="nav-item">
            <span className="nav-link">Dashboard</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Customers</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Users</span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Settings</span>
          </li>
        </ul> */}

      {/* <Row>
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
      </Nav> */}
    </div>
  );
};

export default Header;
