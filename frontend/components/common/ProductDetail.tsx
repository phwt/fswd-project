import { Button, Row, Col, Image, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@modules/Utils";
import { addCartItem } from "@modules/Cart";
import { useRouter } from "next/router";

const ProductDetail = ({ name, price, detail, imgurl, id, discount, type }) => {
  const router = useRouter();

  return (
    <>
      <Row>
        <Col>
          <Image src={imgurl} fluid />
        </Col>
        <Col>
          <h3>{name}</h3>
          <p>{detail}</p>
          {type === "Product" && <p>{formatPrice(price)} THB</p>}
          {type === "Promotion" && (
            <>
              <del>
                <p className="m-0">{formatPrice(price)} THB</p>
              </del>
              <h5>
                <Badge variant="danger">
                  {formatPrice(price - (price * discount) / 100)}
                  THB
                </Badge>
              </h5>
            </>
          )}
          <br />
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
