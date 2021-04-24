import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { formatPrice } from "@modules/Utils";

const ProductCard = ({ size, name, price, detail, imgurl, id, type }) => {
  return (
    <Card style={{ width: `${size}rem` }} className="bg-t border-0">
      {/* {type === "product" && (
        <Link href={`/product/${id}`}>
      )}
      {type === "promotion" && (
        <Link href={`/product/${id}`}>
      )}
        <a>
          <Card.Img variant="top" src={imgurl} className="border-0" />

          <Card.Body className="p-0">
            <p className="m-0 upper">{name}</p>
            <p className="m-0">{detail}</p>
            <p>{price} THB</p>
          </Card.Body>
        </a>
      </Link> */}

      <Link
        href={`/product/${id}${type === "product" ? "" : "?type=promotion"}`}
      >
        <a>
          <Card.Img variant="top" src={imgurl} className="border-0" />

          <Card.Body className="p-0">
            <p className="m-0 upper">{name}</p>
            <p className="m-0">{detail}</p>
            <p>{formatPrice(price)} THB</p>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
