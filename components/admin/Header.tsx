import { useSession } from "@modules/SessionContext";
import { Col, Row, Nav } from "react-bootstrap";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();

  return (
    <div className="p-4 bg-0 sticky-1">
      <div className="smartphone-menu-trigger" />
      <header className="avatar">
        <Nav.Link href="/admin/">
          <h2 className="font-weight-bold">Dashboard</h2>
        </Nav.Link>

        <h6>
          {user && (
            <>
              Logged in as {user?.username}
              <span className="mx-2">|</span>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </>
          )}
        </h6>
      </header>

      <Nav className="flex-column" activeKey="/home">
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
    </div>
  );
};

export default Header;
