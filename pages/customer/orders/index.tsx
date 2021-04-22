import { useQuery, gql } from "@apollo/client";

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
              name
              price
              stock
            }
          }
        }
      }
    `
  );

  if (loading) {
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
      <div className="card my-5">
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
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  <svg width="150" height="120">
                    <rect x="50" y="20" width="100" height="100" />
                  </svg>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <h5>{product.name}</h5>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <h5 className="float-right">{product.price} THB</h5>
                </div>
              </div>
            );
          })}
          <div className="d-flex flex-fill justify-content-end">
            <h5>
              <b>Total:</b> {calPrice(order.products)} THB
            </h5>
          </div>
          <a href={"/customer/order/" + order._id}>
            <button className="btn btn-light my-3 float-right">Detail</button>
          </a>
        </div>
      </div>
    );
  });

  return (
    <>
      <h4>Orders</h4>
      {renderOrderCards}
    </>
  );
};

export default CustomerOrdersPage;
