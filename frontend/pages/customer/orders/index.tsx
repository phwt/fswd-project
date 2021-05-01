import { useQuery, gql } from "@apollo/client";
import { formatPrice } from "@modules/Utils";
import Link from "next/link";

const CustomerOrdersPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      query {
        me {
          _id
          shippingAddress
          orders {
            _id
            status
            products {
              _id
              name
              price
              stock
            }
          }
        }
      }
    `
  );

  if (loading || !data.me) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error...</div>;
  }

  const calPrice = (products) => {
    return products.map((product) => product.price).reduce((a, b) => a + b, 0);
  };

  const renderOrderCards = data.me.orders.map((order) => {
    return (
      <div className="card my-5" key={order._id.toString()}>
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h5>
                <b>Order Id:</b> {order._id}
              </h5>
            </div>
            <div className="col">
              <h5 className="float-right">
                <b>Status:</b> {order.status}
              </h5>
            </div>
          </div>
        </div>
        <div className="card-body">
          {order.products.map((product) => {
            return (
              <div className="row" key={product._id.toString()}>
                <div className="col-3 d-flex align-items-center">
                  <svg width="150" height="120">
                    <rect x="50" y="20" width="100" height="100" />
                  </svg>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <h5>{product.name}</h5>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <h5 className="float-right">
                    {formatPrice(product.price)} THB
                  </h5>
                </div>
              </div>
            );
          })}
          <div className="d-flex flex-fill justify-content-end">
            <h5>
              <b>Total:</b> {formatPrice(calPrice(order.products))} THB
            </h5>
          </div>
          <Link href={"/customer/order/" + order._id}>
            <a>
              <button className="btn btn-light my-3 float-right">Detail</button>
            </a>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <>
      {!loading && (
        <>
          <h1>Orders</h1>

          {data?.me?.orders.length === 0 && <p>No Orders</p>}

          {renderOrderCards}
        </>
      )}
    </>
  );
};

export default CustomerOrdersPage;
