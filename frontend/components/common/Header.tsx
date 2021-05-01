import { useSession } from "@modules/SessionContext";
import Link from "next/link";
import { Col, Row, Nav, Button } from "react-bootstrap";
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
      Hello!, {user?.username}
      <span className="mx-2">|</span>
      <Link href="/admin">Dashboard</Link>
      <span className="mx-2">|</span>
      <a href="#" onClick={handleLogout}>
        Logout
      </a>
    </>
  );

  const customerSection = (
    <>
      Hello!, {user?.username}
      <span className="mx-2">|</span>
      <Link href="/customer">Profile</Link>
      <span className="mx-2">|</span>
      <Link href="/customer/orders">Orders</Link>
      <span className="mx-2">|</span>
      <a href="#" onClick={handleLogout}>
        Logout
      </a>
    </>
  );

  const visitorSection = (
    <>
      <Link href="/login">
        <a className="raleway-3s">LOGIN</a>
      </Link>
      <span className="mx-2">/</span>
      <Link href="/register">
        <a className="raleway-3s">REGISTER</a>
      </Link>
    </>
  );

  return (
    <div className="p-3 bg-0 sticky">
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <h2 className="text-center raleway-6">FSWD</h2>
            </a>
          </Link>
        </Col>
        <Col></Col>
        <Col className="text-right">
          {loading && <span>Loading</span>}
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

        <Col></Col>
      </Row>

      <Nav className="justify-content-center" activeKey={topPath}>
        <Nav.Item>
          <Link href="/products" passHref>
            <Nav.Link className="raleway-3s" eventKey="products">
              ALL PRODUCTS
            </Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link href="/promotions" passHref>
            <Nav.Link className="raleway-3s" eventKey="promotions">
              ALL PROMOTIONS
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
