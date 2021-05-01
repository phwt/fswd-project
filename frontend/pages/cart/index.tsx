import { Button, Col, Row } from "react-bootstrap";
import { Product, Promotion } from "@type/SchemaModel";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import CartItem from "@components/common/CartItem";
import { formatPrice, productTotal, promotionTotal } from "@modules/Utils";
import Link from "next/link";
import { getCartItems } from "@modules/Cart";
import PageTitle from "@components/common/PageTitle";

const SummaryBlock = ({
  products,
  promotions,
}: {
  products: Product[];
  promotions: Promotion[];
}) => {
  const items = useMemo(() => {
    return products.length + promotions.length;
  }, [products, promotions]);

  const total = useMemo(() => {
    return productTotal(products) + promotionTotal(promotions);
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
            <Button
              variant="success"
              block
              className="mt-2"
              disabled={!products.length}
            >
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
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const { loading: productsLoading, data: productsData } = useQuery(
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

  const { loading: promotionsLoading, data: promotionsData } = useQuery(
    gql`
      query promotionByIds($promotionIds: [MongoID!]!) {
        promotionByIds(_ids: $promotionIds) {
          _id
          name
          detail
          price
          imageLocation
          discountPercentage
        }
      }
    `,
    {
      variables: {
        promotionIds: getCartItems("PROMOTION"),
      },
    }
  );

  useEffect(() => {
    if (!productsLoading && productsData)
      setProducts(productsData.productByIds);
  }, [productsLoading]);

  useEffect(() => {
    if (!promotionsLoading && promotionsData)
      setPromotions(promotionsData.promotionByIds);
  }, [promotionsLoading]);

  const handleProductRemove = useCallback((products: Product[]) => {
    setProducts(products);
  }, []);

  const handlePromotionRemove = useCallback((promotions: Promotion[]) => {
    setPromotions(promotions);
  }, []);

  return (
    <>
      <PageTitle icon="shopping-cart" title="My Cart" />
      <Row>
        <Col md={8}>
          {!products.length && (
            <div className="text-center my-5">
              <h3>No Item in Cart</h3>
              <Link href="/">
                <a>
                  <h5>Start Shopping</h5>
                </a>
              </Link>
            </div>
          )}
          {products.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              onRemove={handleProductRemove}
            />
          ))}

          {Boolean(promotions.length) && (
            <>
              <h4 className="mt-4">Promotions</h4>
              <hr className="mt-1" />
            </>
          )}

          {promotions.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              onRemove={handlePromotionRemove}
              isPromotion
            />
          ))}
        </Col>
        <Col md={4}>
          <SummaryBlock products={products} promotions={promotions} />
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
