import { Product } from "@type/SchemaModel";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  product: Product;
  noRemove?: boolean;
}

const CartItem = ({ product, noRemove = false }: Props) => {
  return (
    <Card className="mb-3 p-3">
      <Row>
        <Col className="text-center">
          <img
            className="img-fluid"
            src="https://via.placeholder.com/200x300"
            style={{
              height: 150,
            }}
          />
        </Col>
        <Col md={6}>
          <h4>{product.name}</h4>
          <p className="text-muted">
            {product.detail && product.detail !== ""
              ? product.detail
              : "No detail"}
          </p>
          {!noRemove && (
            <a href="" className="text-danger">
              <i className="fa fa-trash mr-2" />
              Remove
            </a>
          )}
        </Col>
        <Col md={3} className="text-right">
          <h3 className="mb-0">{product.price}</h3>
          <small className="text-muted">THB</small>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
