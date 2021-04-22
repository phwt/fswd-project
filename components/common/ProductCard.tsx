import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { Product } from "@type/SchemaModel";

interface Props {
  product: Product;
  size: string;
}

const ProductCard = ({ product, size }: Props) => {
  return (
    <Card style={{ width: `${size}rem` }} className="bg-t border-0">
      <Link href={`/product/${product.sku}`}>
        <a>
          <Card.Img
            variant="top"
            src={product.imageLocation ?? "promotion.jpg"}
            className="border-0"
          />

          <Card.Body className="p-0">
            <p className="m-0 upper">{product.name}</p>
            <p className="m-0">{product.detail}</p>
            <p>{product.price} THB</p>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
