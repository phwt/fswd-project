import { useSession } from "@modules/SessionContext";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Link from "next/link";

const Header = () => {
  const { loading, user, logout: handleLogout } = useSession();
  const router = useRouter();

  const topPath = useMemo(() => {
    return router.pathname.split("/")[2];
  }, [router.pathname]);

  return (
    <div className="p-4 bg-0 sticky-1">
      <div className="smartphone-menu-trigger" />
      <header className="avatar">
        <Link href="/" passHref>
          <Nav.Link>
            <span>
              <i className="fa fa-chevron-left mr-2" /> Back to store
            </span>
          </Nav.Link>
        </Link>

        <Link href="/admin/" passHref>
          <Nav.Link>
            <h2 className="font-weight-bold m-0">Dashboard</h2>
          </Nav.Link>
        </Link>

        <h6>
          {user && (
            <Nav.Item
              style={{
                padding: "0.5rem 1rem",
              }}
            >
              Logged in as {user?.username}
              <span className="mx-2">|</span>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </Nav.Item>
          )}
        </h6>

        <hr
          className="m-0 my-2"
          style={{
            borderTop: "1px solid #FFFFFF44",
          }}
        />
      </header>

      <Nav className="flex-column" activeKey={topPath}>
        <Link href="/admin/products" passHref>
          <Nav.Link className="raleway-3s" eventKey="products">
            Products
          </Nav.Link>
        </Link>
        <Link href="/admin/orders" passHref>
          <Nav.Link className="raleway-3s" eventKey="orders">
            Orders
          </Nav.Link>
        </Link>
        <Link href="/admin/promotions" passHref>
          <Nav.Link className="raleway-3s" eventKey="promotions">
            Promotions
          </Nav.Link>
        </Link>
      </Nav>
    </div>
  );
};

export default Header;
