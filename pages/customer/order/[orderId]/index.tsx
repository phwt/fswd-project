import { useQuery, gql } from "@apollo/client";
import { formatPrice } from "@modules/Utils";
import { useRouter } from "next/router";

const CustomerOrderPage = () => {
  const { query } = useRouter();

  const { loading, error, data } = useQuery(
    gql`
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
          }
        }
      }
    `,
    {
      variables: {
        orderId: query.orderId,
      },
    }
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

  const dateString = new Date(data.orderById.timestamp);

  return (
    <>
      <div className="card my-5">
        <div className="card-header">Order Detail</div>
        <div className="card-body">
          <div className="mx-3 my-3">
            <h5>
              <b>Order Id:</b> {data.orderById._id}
            </h5>

            <h5>
              <b>Status:</b> {data.orderById.status}
            </h5>

            <h5>
              <b>Date:</b> {dateString.toLocaleDateString()}
            </h5>
            <h5>
              <b>Time:</b> {dateString.toLocaleTimeString()}
            </h5>
          </div>
          <hr></hr>
          {data.orderById.products.map((product) => {
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
                <div className="col-2 d-flex align-items-center">
                  <h5 className="float-right">{formatPrice(product.price)} THB</h5>
                </div>
              </div>
            );
          })}
          <hr></hr>
          <div className="d-flex flex-fill justify-content-end mx-5 mt-3">
            <h5>
              <b>Total:</b> {formatPrice(calPrice(data.orderById.products))} THB
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderPage;
