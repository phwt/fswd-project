import { Button, Card, Col, Row } from "react-bootstrap";
import { Order } from "@type/SchemaModel";
import { OrderCardRow } from "../../../pages/admin/order/[orderId]";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";

const OrderCardButton = (props) => {
  const { label, variant } = props;
  return (
    <Col md={4} className="px-1">
      <Button block variant="light" onClick={props.onClick}>
        <i className={`fa fa-circle mr-2 text-${variant}`} />
        {label}
      </Button>
    </Col>
  );
};

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  const [changeOrderStatus] = useMutation(gql`
    mutation changeOrderStatus($id: MongoID!, $status: EnumOrderStatus!) {
      updateOrderById(_id: $id, record: { status: $status }) {
        recordId
      }
    }
  `);

  return (
    <Card>
      <Card.Header>Total</Card.Header>
      <Card.Body>
        <Row>
          <OrderCardRow
            title="Order Date"
            value={new Date(order.timestamp).toDateString()}
          />
          <OrderCardRow title="Status">
            <OrderStatusLabel status={order.status} />
          </OrderCardRow>
          <Col md={12}>
            <hr />
          </Col>
          <Col md={12} className="text-center">
            <h5>Change Order Status</h5>
          </Col>
          <OrderCardButton
            label="Paid"
            variant="danger"
            onClick={async () => {
              await changeOrderStatus({
                variables: {
                  id: order._id,
                  status: "PAID",
                },
              });
              window.location.reload();
            }}
          />
          <OrderCardButton
            label="Shipped"
            variant="warning"
            onClick={async () => {
              await changeOrderStatus({
                variables: {
                  id: order._id,
                  status: "SHIPPED",
                },
              });
              window.location.reload();
            }}
          />
          <OrderCardButton
            label="Completed"
            variant="success"
            onClick={async () => {
              await changeOrderStatus({
                variables: {
                  id: order._id,
                  status: "COMPLETED",
                },
              });
              window.location.reload();
            }}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
