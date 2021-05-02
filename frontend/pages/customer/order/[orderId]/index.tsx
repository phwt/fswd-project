import { gql } from "@apollo/client";
import {
  calculateTotalPrice,
  discountPrice,
  formatPrice,
} from "@modules/Utils";
import { serverApollo } from "@modules/Apollo";
import { useCallback, useMemo } from "react";
import { Order } from "@type/SchemaModel";
import { requireAuthentication } from "@modules/Auth";
import { Badge } from "react-bootstrap";

export const getServerSideProps = async (context) => {
  if (!(await requireAuthentication(context))) return;
  const apolloClient = serverApollo(context);

  const {
    data: { orderById },
  } = await apolloClient.query({
    query: gql`
      query orderById($orderId: MongoID!) {
        orderById(_id: $orderId) {
          _id
          status
          timestamp
          products {
            _id
            name
            detail
            price
            stock
            weight
            imageLocation
          }
          promotions {
            _id
            name
            detail
            price
            stock
            weight
            discountPercentage
            imageLocation
          }
        }
      }
    `,
    variables: {
      orderId: context.params.orderId,
    },
  });

  return {
    props: { order: orderById },
  };
};

const ProductCard = ({ product, isPromotion = false }) => {
  return (
    <div className="row my-4" key={product._id.toString()}>
      <div className="col-3 d-flex align-items-center justify-content-center">
        <svg width="100" height="100">
          <rect x="0" y="0" width="100" height="100" />
        </svg>
      </div>
      <div className="col-7 d-flex flex-column justify-content-center">
        <h5>Name: {product.name}</h5>
        <h5>Stock: {product.stock}</h5>
      </div>
      <div className="col-2 d-flex align-items-center text-right">
        {!isPromotion && (
          <h5 className="float-right">{formatPrice(product.price)} THB</h5>
        )}

        {isPromotion && "discountPercentage" in product && (
          <div>
            <h5
              className="mb-0 d-inline mr-2"
              style={{ textDecoration: "line-through" }}
            >
              {formatPrice(product.price)}
            </h5>
            <h5 className="mb-0 d-inline">
              {formatPrice(
                discountPrice(product.price, product.discountPercentage)
              )}{" "}
              THB
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

interface Props {
  order: Order;
}

const CustomerOrderPage = ({ order }: Props) => {
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(order.products, order.promotions);
  }, [order.products, order.promotions]);

  const dateString = useMemo(() => {
    return new Date(order.timestamp);
  }, [order.timestamp]);

  return (
    <>
      <div className="card my-5">
        <div className="card-header">Order Detail</div>
        <div className="card-body">
          <div className="mx-3 my-3">
            <h5>
              <b>Order Id:</b> {order._id}
            </h5>

            <h5>
              <b>Status:</b> {order.status}
            </h5>

            <h5>
              <b>Date:</b> {dateString.toLocaleDateString()}
            </h5>
            <h5>
              <b>Time:</b> {dateString.toLocaleTimeString()}
            </h5>
          </div>
          <hr />
          {order.products.map((product) => {
            return <ProductCard product={product} />;
          })}
          {order.promotions.map((promotion) => {
            return <ProductCard product={promotion} isPromotion />;
          })}
          <hr />
          <div className="d-flex flex-fill justify-content-end mx-5 mt-3">
            <h5>
              <b>Total:</b> {formatPrice(totalPrice)} THB
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderPage;
