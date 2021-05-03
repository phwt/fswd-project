import { Button, Row, Col, Image, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@modules/Utils";
import { addCartItem } from "@modules/Cart";
import { useRouter } from "next/router";
import { Product, Promotion } from "@type/SchemaModel";

interface Props {
  product: Product | Promotion;
  isPromotion?: boolean;
}

const ProductDetail = ({ product, isPromotion = false }: Props) => {
  const router = useRouter();

  return (
    <>
      <Row>
        <Col>
          <Image src={product.imageLocation} fluid />
        </Col>
        <Col>
          <h3 className="raleway-6">{product.name}</h3>
          <p>{product.detail}</p>
          {!isPromotion && <p>{formatPrice(product.price)} THB</p>}

          {isPromotion && "discountPercentage" in product && (
            <>
              <del>
                <p className="m-0">{formatPrice(product.price)} THB</p>
              </del>
              <h5>
                <Badge variant="danger">
                  {formatPrice(
                    product.price -
                      (product.price * product.discountPercentage) / 100
                  )}
                  THB
                </Badge>
              </h5>
            </>
          )}

          <br />
          <Button
            className="raleway-3s"
            variant="light"
            onClick={() => {
              if (isPromotion) addCartItem(product._id, "PROMOTION");
              else addCartItem(product._id);
              router.push("/cart");
            }}
            disabled={product.stock <= 0}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp;&nbsp;ADD TO CART
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
