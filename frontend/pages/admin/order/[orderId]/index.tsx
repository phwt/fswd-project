import { Card, Col, Row } from "react-bootstrap";
import { gql } from "@apollo/client/core";
import ProductTable from "@components/admin/order/ProductTable";
import OrderCard from "@components/admin/order/OrderCard";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Order } from "@type/SchemaModel";
import { useEffect, useState } from "react";
import PageTitle from "@components/admin/PageTitle";

export const OrderCardRow = ({ title, value }) => (
  <>
    <Col md={4}>
      <b>{title}</b>
    </Col>
    <Col md={8} className="text-right">
      {value}
    </Col>
  </>
);

const AdminOrderPage = () => {
  const {
    query: { orderId },
  } = useRouter();
  const [order, setOrder] = useState<Order>();

  const { loading, data } = useQuery(
    gql`
      query($orderId: MongoID!) {
        orderById(_id: $orderId) {
          _id
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
    {
      variables: {
        orderId,
      },
    }
  );

  useEffect(() => {
    if (!loading && data && data.orderById) setOrder(data.orderById);
  }, [loading, data]);

  return (
    <>
      <PageTitle title="Edit Order" />
      <hr />
      {order && (
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
      )}
    </>
  );
};

export default AdminOrderPage;
