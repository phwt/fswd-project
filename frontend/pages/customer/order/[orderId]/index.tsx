import { gql } from "@apollo/client";
import {
  calculateTotalPrice,
  discountPrice,
  formatNumber,
} from "@modules/Utils";
import { serverApollo } from "@modules/Apollo";
import { useMemo } from "react";
import { Order } from "@type/SchemaModel";
import { requireAuthentication } from "@modules/Auth";
import { Button } from "react-bootstrap";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";

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
      <div className="col-3 d-flex justify-content-center">
        <div className="img-resize">
          {!product.imageLocation && (
            <img className="img-order" src={"/no-image.jpg"} />
          )}

          {product.imageLocation && (
            <img className="img-order" src={product.imageLocation} />
          )}
        </div>
      </div>
      <div className="col-6 d-flex flex-column justify-content-center">
        <h5>{product.name}</h5>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center">
        {!isPromotion && (
          <h5 className="float-right">{formatNumber(product.price)} THB</h5>
        )}

        {isPromotion && "discountPercentage" in product && (
          <div>
            <h5
              className="mb-0 d-inline mr-2"
              style={{ textDecoration: "line-through" }}
            >
              {formatNumber(product.price)}
            </h5>
            <h5 className="mb-0 d-inline">
              {formatNumber(
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
        <div className="card-header">
          <div className="row">
            <div className="col d-flex">
              <Button
                variant=""
                className="p-0 px-2"
                onClick={() => {
                  window.history.back();
                }}
                size="sm"
              >
                <i className="fa fa-chevron-left" />
              </Button>
              <h5 className="m-0 d-inline">Order Detail</h5>
            </div>
            <div className="col">
              <h5 className="float-right m-0">
                <OrderStatusLabel status={order.status} />
              </h5>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="mx-3 my-3 mb-4">
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
              <b>Total:</b> {formatNumber(totalPrice)} THB
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderPage;
