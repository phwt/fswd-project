import { gql } from "@apollo/client";
import { Row, Col, Card, Button } from "react-bootstrap";
import { serverApollo } from "@modules/Apollo";
import { useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@modules/Utils";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";

export const getServerSideProps = async (context) => {
  const apolloClient = serverApollo(context);

  const { data } = await apolloClient.query({
    query: gql`
      query {
        products {
          _id
          name
          detail
          price
          stock
        }
        users {
          _id
        }
        promotions {
          _id
        }
        orders(filter: { status: PAID }) {
          products {
            price
          }
        }
        FilterOrder: orders(limit: 10, sort: _ID_DESC) {
          _id
          products {
            name
          }
          status
          timestamp
          orderedBy {
            username
          }
        }
      }
    `,
  });

  return {
    props: { data },
  };
};

const StatCard = ({ title, value, unit, href }) => {
  return (
    <Link href={href}>
      <Card
        style={{
          cursor: "pointer",
        }}
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <h1 className="d-inline">{formatPrice(value)}</h1>{" "}
          <small className="text-muted">{unit}</small>
        </Card.Body>
      </Card>
    </Link>
  );
};

const LatestTable = ({ orders }) => {
  const renderTableOrder = orders.map((order, index) => {
    const dateString = new Date(order.timestamp);
    return (
      <tr key={order._id.toString()}>
        <th>{index + 1}</th>
        <th>{order.orderedBy.username}</th>
        <td>
          <OrderStatusLabel status={order.status} />
        </td>
        <td>{dateString.toLocaleDateString()}</td>
        <td className="text-right">
          <Link href={`/admin/order/${order._id}`}>
            <Button size="sm" variant="light">
              <i className="fa fa-chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Timestamp</th>
          <th />
        </tr>
      </thead>
      <tbody>{renderTableOrder}</tbody>
    </table>
  );
};

const StockTable = ({ products }) => {
  const renderTableProduct = products.slice(0, 10).map((item, index) => {
    return (
      <tr key={item._id}>
        <th>{index + 1}</th>
        <th>{item.name}</th>
        <td>{item.stock}</td>
        <td className="text-right">
          <Link href={`/admin/product/${item._id}`}>
            <Button size="sm" variant="light">
              <i className="fa fa-chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Stock</th>
          <th />
        </tr>
      </thead>
      <tbody>{renderTableProduct}</tbody>
    </table>
  );
};

const AdminPage = ({ data }) => {
  const totalIncome = useMemo(() => {
    return data.orders
      .map((order) => {
        return order.products.map((product) => {
          return product.price;
        });
      })
      .reduce((acc, cur) => [...acc, ...cur])
      .reduce((acc, cur) => acc + cur);
  }, [data.orders]);

  const sortStock = useMemo(() => {
    return data.products.slice().sort((a, b) => {
      return parseFloat(a.stock) - parseFloat(b.stock);
    });
  }, [data.products]);

  return (
    <>
      <Row className="mt-2">
        <Col md={3}>
          <StatCard
            title="Total Products"
            value={data.products.length}
            unit="items"
            href="/admin/products"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Promotions"
            value={data.promotions.length}
            unit="items"
            href="/admin/promotions"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Orders"
            value={data.orders.length}
            unit="orders"
            href="/admin/orders"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Income"
            value={totalIncome}
            unit="THB"
            href="/admin/orders"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Latest Orders</h3>
          <LatestTable orders={data.FilterOrder} />
        </Col>
        <Col>
          <h3>Low on Stock</h3>
          <StockTable products={sortStock} />
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
