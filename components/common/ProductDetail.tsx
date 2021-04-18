import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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

          <Button variant="light">
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp;&nbsp;Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
