import { Product, Promotion } from "@type/SchemaModel";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { removeCartItem } from "@modules/Cart";
import { discountPrice, formatPrice } from "@modules/Utils";
import Link from "next/link";

interface Props {
  product: Product | Promotion;
  noRemove?: boolean;
  onRemove?: (products: Product[] | Promotion[]) => void;
  isPromotion?: boolean;
}

const CartItem = ({
  product,
  noRemove = false,
  onRemove,
  isPromotion = false,
}: Props) => {
  return (
    <Card className="mb-3 p-3">
      <Row>
        <Col className="text-center">
          <Link
            href={`/product/${product.sku}${
              isPromotion ? "?type=promotion" : ""
            }`}
          >
            <img
              className="img-fluid"
              src={product.imageLocation ?? "no-image.jpg"}
              style={{
                height: 150,
                cursor: "pointer",
              }}
            />
          </Link>
        </Col>
        <Col md={6}>
          <h4>{product.name}</h4>
          <p className="text-muted">
            {product.detail && product.detail !== ""
              ? product.detail
              : "No detail"}
          </p>
          {!noRemove && (
            <a
              href=""
              className="text-danger"
              onClick={(e) => {
                e.preventDefault();
                onRemove(
                  removeCartItem(
                    product._id,
                    isPromotion ? "PROMOTION" : "PRODUCT"
                  )
                );
              }}
            >
              <i className="fa fa-trash mr-2" />
              Remove
            </a>
          )}
        </Col>
        <Col md={3} className="text-right">
          {isPromotion && "discountPercentage" in product && (
            <div>
              <Badge variant="danger" className="mr-2">
                -{product.discountPercentage}%
              </Badge>
              <h5
                className="mb-0 d-inline mr-2 text-danger"
                style={{ textDecoration: "line-through" }}
              >
                {formatPrice(product.price)}
              </h5>
              <h3 className="mb-0 d-inline">
                {formatPrice(
                  discountPrice(product.price, product.discountPercentage)
                )}
              </h3>
            </div>
          )}
          {!isPromotion && (
            <h3 className="mb-0">{formatPrice(product.price)}</h3>
          )}

          <small className="text-muted">THB</small>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
