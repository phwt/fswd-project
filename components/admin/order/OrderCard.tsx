import { Button, Card, Col, Row } from "react-bootstrap";
import { Order } from "@type/SchemaModel";
import { OrderCardRow } from "../../../pages/admin/order/[orderId]";

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

export default OrderCard;
