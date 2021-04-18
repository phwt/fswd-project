import { Card, Button, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";

const ProductDetail = ({ name, price, detail, imgurl, id }) => {
  return (
    <>
      <Row>
        <Col>
          <Image src={imgurl} />
        </Col>
        <Col>
          <h3>{name}</h3>
          <p>{detail}</p>
          <p>{price}</p>
          <Button variant="light">Add to Cart</Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
