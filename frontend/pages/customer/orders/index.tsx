import { gql } from "@apollo/client";
import {
  calculateTotalPrice,
  discountPrice,
  formatNumber,
} from "@modules/Utils";
import Link from "next/link";
import { serverApollo } from "@modules/Apollo";
import PageTitle from "@components/common/PageTitle";
import { requireAuthentication } from "@modules/Auth";
import { useMemo } from "react";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";
import { Order, Product, Promotion } from "@type/SchemaModel";
import { Badge } from "react-bootstrap";

export const getServerSideProps = async (context) => {
  if (!(await requireAuthentication(context))) return;
  const apolloClient = serverApollo(context);

  const {
    data: { me },
  } = await apolloClient.query({
    query: gql`
      query {
        me {
          _id
          shippingAddress
          orders(sort: _ID_DESC) {
            _id
            timestamp
            status
            products {
              _id
              name
              price
              imageLocation
            }
            promotions {
              _id
              name
              price
              discountPercentage
              imageLocation
            }
          }
        }
      }
    `,
  });

  return {
    props: { me },
  };
};

const ProductRow = ({
  product,
  isPromotion,
}: {
  product: Product | Promotion;
  isPromotion?: boolean;
}) => {
  return (
    <>
      <div className="row mb-1" key={product._id.toString()}>
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
        <div className="col-6 d-flex align-items-center">
          <h5>{product.name}</h5>
        </div>
        <div className="col-3 d-flex align-items-center justify-content-center">
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

          {!isPromotion && (
            <h5 className="float-right">{formatNumber(product.price)} THB</h5>
          )}
        </div>
        <hr />
      </div>
    </>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const calPrice = (products) => {
    return products.map((product) => product.price).reduce((a, b) => a + b, 0);
  };

  const dateString = useMemo(() => {
    return new Date(order.timestamp);
  }, [order.timestamp]);

  return (
    <div className="card mb-5" key={order._id.toString()}>
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h5 className="m-0">
              <b>Date:</b> {dateString.toLocaleDateString()}
            </h5>
          </div>
          <div className="col">
            <h5 className="float-right m-0">
              <OrderStatusLabel status={order.status} />
            </h5>
          </div>
        </div>
      </div>
      <div className="card-body">
        {order.products.map((product) => {
          return <ProductRow product={product} />;
        })}
        {order.promotions.map((promotion) => {
          return <ProductRow product={promotion} isPromotion />;
        })}

        <div className="d-flex flex-fill justify-content-end mx-5 mt-3">
          <h5>
            <b>Total:</b>{" "}
            {formatNumber(calculateTotalPrice(order.products, order.promotions))}{" "}
            THB
          </h5>
        </div>

        <div className="d-flex flex-fill justify-content-end mx-5 mt-3">
          <Link href={"/customer/order/" + order._id}>
            <a>
              <button className="btn btn-light my-3 float-right px-5">
                Detail
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CustomerOrdersPage = ({ me }) => {
  return (
    <>
      <PageTitle icon="list" title="Orders" />
      {me?.orders.length === 0 && <p>No Orders</p>}
      {me.orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </>
  );
};

export default CustomerOrdersPage;
