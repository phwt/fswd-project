import { Card, Button } from "react-bootstrap";
import Link from "next/link";

const ProductCard = ({ size, name, price, detail, imgurl, id }) => {
  return (
    <Card style={{ width: `${size}rem` }} className="bg-t border-0">
      <Link href={`/product/${id}`}>
        <a>
          <Card.Img variant="top" src={imgurl} className="border-0" />

          <Card.Body className="p-0">
            <p className="m-0 upper">{name}</p>
            <p className="m-0">{detail}</p>
            <p>{price} THB</p>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
