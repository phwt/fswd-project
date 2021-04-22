import { Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addCartItem } from "@modules/Cart";
import {useRouter} from "next/router";

const ProductDetail = ({ name, price, detail, imgurl, id }) => {
  const router = useRouter()

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

          <Button
            variant="light"
            onClick={() => {
              addCartItem(id);
              router.push("/cart");
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp;&nbsp;Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
