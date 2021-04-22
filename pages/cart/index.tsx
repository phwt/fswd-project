import { Button, Card, Col, Row } from "react-bootstrap";
import { Product } from "@type/SchemaModel";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useEffect, useMemo, useState } from "react";

const CartItem = ({ product }: { product: Product }) => {
  return (
    <Card className="mb-3 p-3">
      <Row>
        <Col className="text-center">
          <img
            className="img-fluid"
            src="https://via.placeholder.com/200x300"
            style={{
              height: 150,
            }}
          />
        </Col>
        <Col md={6}>
          <h4>{product.name}</h4>
          <p className="text-muted">
            {product.detail && product.detail !== ""
              ? product.detail
              : "No detail"}
          </p>
          <a href="" className="text-danger">
            <i className="fa fa-trash mr-2" />
            Remove
          </a>
        </Col>
        <Col md={3} className="text-right">
          <h3 className="mb-0">{product.price}</h3>
          <small className="text-muted">THB</small>
        </Col>
      </Row>
    </Card>
  );
};

const SummaryBlock = ({ products }: { products: Product[] }) => {
  const items = useMemo(() => {
    return products.length;
  }, [products]);

  const total = useMemo(() => {
    if (products.length)
      return products
        .map((product) => product.price)
        .reduce((acc, cur) => acc + cur);
    return 0;
  }, [products]);

  return (
    <>
      <Row>
        <Col md={8}>Items</Col>
        <Col md={4} className="text-right">
          {items}
        </Col>
        <Col md={12}>
          <hr />
        </Col>
        <Col md={8}>
          <h4>Total</h4>
        </Col>
        <Col md={4} className="text-right">
          <small className="text-muted">THB</small>
          <h4 className="d-inline ml-1">{total}</h4>
        </Col>
        <Col md={12}>
          <Button variant="success" block className="mt-2">
            <i className="fa fa-shopping-cart mr-2" />
            Checkout
          </Button>
        </Col>
      </Row>
    </>
  );
};

const CartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { loading, error, data } = useQuery(
    gql`
      query productByIds($productIds: [MongoID!]!) {
        productByIds(_ids: $productIds) {
          _id
          name
          detail
          price
          imageLocation
        }
      }
    `,
    {
      variables: {
        productIds: [
          "607bfd4fe6e50c1acfe46f85",
          "607a8b13fcf9f204efe28e7a",
          "607a8b28fcf9f204efe28e7b",
        ],
      },
    }
  );

  useEffect(() => {
    if (!loading && data) setProducts(data.productByIds);
  }, [loading]);

  return (
    <>
      <Row>
        <Col md={12} className="text-center mt-4 mb-5">
          <h2>
            <i className="fa fa-shopping-cart" /> My Cart
          </h2>
        </Col>
        <Col md={8}>
          {products.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </Col>
        <Col md={4}>
          <SummaryBlock products={products} />
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
