import { useSession } from "@modules/SessionContext";
import Link from "next/link";
import { Col, Row, Nav, Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();
  const router = useRouter();

  const topPath = useMemo(() => {
    return router.pathname.split("/")[1];
  }, [router.pathname]);

  const adminSection = (
    <>
      <Dropdown className="raleway-3s" style={{ display: "inline" }}>
        <Dropdown.Toggle
          style={{ textTransform: "uppercase" }}
          size="sm"
          variant="dark"
          id="dropdown-basic"
        >
          {user?.username}
        </Dropdown.Toggle>

        <Dropdown.Menu className="raleway-3s">
          <Link href="/admin" passHref>
            <Dropdown.Item>DASHBOARD</Dropdown.Item>
          </Link>
          <Dropdown.Item href="#" onClick={handleLogout}>
            LOGOUT
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const customerSection = (
    <>
      <Dropdown className="raleway-3s" style={{ display: "inline" }}>
        <Dropdown.Toggle
          style={{ textTransform: "uppercase" }}
          size="sm"
          variant="dark"
          id="dropdown-basic"
        >
          {user?.username}
        </Dropdown.Toggle>

        <Dropdown.Menu className="raleway-3s">
          <Link href="/customer" passHref>
            <Dropdown.Item>PROFILE</Dropdown.Item>
          </Link>
          <Link href="/customer/orders" passHref>
            <Dropdown.Item>MY ORDERS</Dropdown.Item>
          </Link>
          <Dropdown.Item href="#" onClick={handleLogout}>
            LOGOUT
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const visitorSection = (
    <span className="mr-2">
      <Link href="/login">
        <a className="raleway-3s">LOGIN</a>
      </Link>
      <span className="mx-2">/</span>
      <Link href="/register">
        <a className="raleway-3s">REGISTER</a>
      </Link>
    </span>
  );

  return (
    <div className="p-3 bg-0 sticky">
      <Row>
        <Col />
        <Col />
        <Col />
        <Col>
          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <h2 className="text-center raleway-6">FSWD</h2>
            </a>
          </Link>
        </Col>
        <Col />
        <Col className="text-right">
          {user &&
            (user.username === "admin" ? (
              <>{adminSection}</>
            ) : (
              <>{customerSection}</>
            ))}
          {!user && <>{visitorSection}</>}
          &nbsp;&nbsp;
          <Link href="/cart">
            <Button size="sm" variant="light">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Button>
          </Link>
        </Col>
        <Col />
      </Row>

      <Nav className="justify-content-center" activeKey={topPath}>
        <Nav.Item>
          <Link href="/products" passHref>
            <Nav.Link className="raleway-3s" eventKey="products">
              PRODUCTS
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/promotions" passHref>
            <Nav.Link className="raleway-3s" eventKey="promotions">
              PROMOTIONS
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/" passHref>
            <Nav.Link className="raleway-3s" disabled>
              MEN
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/" passHref>
            <Nav.Link className="raleway-3s" disabled>
              WOMEN
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/" passHref>
            <Nav.Link className="raleway-3s" disabled>
              ACCESSORIES
            </Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
