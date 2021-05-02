import { Card, Badge } from "react-bootstrap";
import Link from "next/link";
import { formatPrice } from "@modules/Utils";
import { Product, Promotion } from "@type/SchemaModel";

interface Props {
  product: Product | Promotion;
  size: string;
}
const ProductCard = ({ product, size }: Props) => {
  return (
    <Card style={{ width: `${size}rem` }} className="bg-t border-0">
      <Link
        href={`/product/${product.sku}${
          product.type === "Product" ? "" : "?type=promotion"
        }`}
      >
        <a>
          <Card.Img
            variant="top"
            src={product.imageLocation ?? "no-image.jpg"}
            className="border-0"
          />

          <Card.Body className="p-0">
            <p className="m-0 upper">{product.name}</p>
            {/* <p className="m-0">{product.detail}</p> */}
            {product.type === "Product" && (
              <p>{formatPrice(product.price)} THB</p>
            )}
            {product.type === "Promotion" && (
              <>
                <del>
                  <p className="m-0">{formatPrice(product.price)} THB</p>
                </del>
                <h5>
                  <Badge variant="danger">
                    {formatPrice(
                      product.price -
                        (product.price *
                          (product as Promotion).discountPercentage) /
                          100
                    )}
                    THB
                  </Badge>
                </h5>
              </>
            )}
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
