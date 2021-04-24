import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Order } from "@type/SchemaModel";
import { apolloClient } from "app-apollo-client";
import { gql } from "@apollo/client/core";
import { discountPrice, formatPrice } from "@modules/Utils";
import { useMemo } from "react";

const OrderCardRow = ({ title, value }) => (
  <>
    <Col md={4}>
      <b>{title}</b>
    </Col>
    <Col md={8} className="text-right">
      {value}
    </Col>
  </>
);

const OrderCardButton = ({ label, variant }) => {
  return (
    <Col md={4} className="px-1">
      <Button block variant={variant}>
        {label}
      </Button>
    </Col>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card>
      <Card.Header>Total</Card.Header>
      <Card.Body>
        <Row>
          <OrderCardRow
            title="Order Date"
            value={new Date(order.timestamp).toDateString()}
          />
          <OrderCardRow title="Status" value={order.status} />
          <Col md={12}>
            <hr />
          </Col>
          <Col md={12} className="text-center">
            <h5>Change Order Status</h5>
          </Col>
          <OrderCardButton label="Paid" variant="danger" />
          <OrderCardButton label="Delivered" variant="warning" />
          <OrderCardButton label="Completed" variant="success" />
        </Row>
      </Card.Body>
    </Card>
  );
};

const ProductTable = ({ products, promotions }) => {
  const totalItems = useMemo(() => {
    return products.length + promotions.length;
  }, [products, promotions]);

  const totalWeight = useMemo(() => {
    return (
      products
        .map((product) => product.weight)
        .reduce((acc, cur) => acc + cur) +
      promotions
        .map((product) => product.weight)
        .reduce((acc, cur) => acc + cur)
    );
  }, [products, promotions]);

  const totalPrice = useMemo(() => {
    return (
      products.map((product) => product.price).reduce((acc, cur) => acc + cur) +
      promotions
        .map((product) =>
          discountPrice(product.price, product.discountPercentage)
        )
        .reduce((acc, cur) => acc + cur)
    );
  }, [products, promotions]);

  return (
    <Table>
      <thead>
        <th>#</th>
        <th>SKU</th>
        <th>Product Name</th>
        <th>Weight</th>
        <th>Discount</th>
        <th>Price</th>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{formatPrice(product.weight)} g</td>
            <td>-</td>
            <td>{formatPrice(product.price)} THB</td>
          </tr>
        ))}
        {promotions.map((promotion, index) => (
          <tr>
            <td>{index + 1 + products.length}</td>
            <td>{promotion.sku}</td>
            <td>{promotion.name}</td>
            <td>{formatPrice(promotion.weight)} g</td>
            <td>{promotion.discountPercentage}%</td>
            <td>
              {formatPrice(
                discountPrice(promotion.price, promotion.discountPercentage)
              )}{" "}
              THB
            </td>
          </tr>
        ))}
        <tr>
          <td />
          <td>
            <b>Total</b>
          </td>
          <td>{totalItems} items</td>
          <td>{totalWeight} g</td>
          <td>
            <b>Subtotal</b>
          </td>
          <td>{totalPrice} THB</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const getServerSideProps = async ({ params: { orderId } }) => {
  const {
    data: { orderById },
  } = await apolloClient.query({
    query: gql`
      query($orderId: MongoID!) {
        orderById(_id: $orderId) {
          status
          timestamp
          products {
            sku
            name
            weight
            price
          }
          promotions {
            sku
            name
            weight
            price
            discountPercentage
          }
          orderedBy {
            username
            email
            shippingAddress
            billingAddress
            phone
          }
        }
      }
    `,
    variables: {
      orderId,
    },
  });

  return { props: { order: orderById } };
};

interface Props {
  order: Order;
}

const AdminOrderPage = ({ order }: Props) => {
  return (
    <>
      <h2>Edit Order</h2>
      <hr />
      <Row>
        <Col md={8}>
          <ProductTable
            products={order.products}
            promotions={order.promotions}
          />
        </Col>
        <Col md={4}>
          <OrderCard order={order} />
        </Col>
        <Col md={12}>
          <hr />
          <h4>Customer Info</h4>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>Contact</Card.Header>
            <Card.Body>
              <Row>
                <OrderCardRow
                  title="Username"
                  value={order.orderedBy.username}
                />
                <OrderCardRow title="E-Mail" value={order.orderedBy.email} />
                <OrderCardRow title="Phone" value={order.orderedBy.phone} />
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>Billing Address</Card.Header>
            <Card.Body>{order.orderedBy.billingAddress}</Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>Shipping Address</Card.Header>
            <Card.Body>{order.orderedBy.shippingAddress}</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminOrderPage;
