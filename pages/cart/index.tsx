import { Button, Col, Row } from "react-bootstrap";
import { Product } from "@type/SchemaModel";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import CartItem from "@components/common/CartItem";
import { formatPrice, productTotal } from "@modules/Utils";
import Link from "next/link";
import { getCartItems } from "@modules/Cart";

const SummaryBlock = ({ products }: { products: Product[] }) => {
  const items = useMemo(() => {
    return products.length;
  }, [products]);

  const total = useMemo(() => {
    return productTotal(products);
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
          <h4 className="d-inline ml-1">{formatPrice(total)}</h4>
        </Col>
        <Col md={12}>
          <Link href="/checkout">
            <Button variant="success" block className="mt-2">
              <i className="fa fa-shopping-cart mr-2" />
              Checkout
            </Button>
          </Link>
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
        productIds: getCartItems(),
      },
    }
  );

  useEffect(() => {
    if (!loading && data) setProducts(data.productByIds);
  }, [loading]);

  const handleRemove = useCallback((products: Product[]) => {
    setProducts(products);
  }, []);

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
            <CartItem
              key={product._id}
              product={product}
              onRemove={handleRemove}
            />
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
