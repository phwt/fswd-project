import { useQuery, gql } from "@apollo/client";
import { Nav, Button } from "react-bootstrap";

const AdminOrdersPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        orders {
          _id
          status
          timestamp
          customerId
          orderedBy {
            username
          }
        }
      }
    `
  );
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error...</div>;
  }

  const renderTableOrder = data.orders.map((order, index) => {
    var dateString = new Date(order.timestamp);
    return (
      <tr key={order._id.toString()}>
        <th>{index+1}</th>
        <td>{order.status}</td>
        <td>{dateString.toLocaleDateString()}</td>
        <td>{order.orderedBy.username}</td>
        <td>
          <Button variant="outline-dark">
            <Nav.Link href={"/admin/order/" + order._id}>View</Nav.Link>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Time Stamp</th>
            <th>Customer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTableOrder}</tbody>
      </table>
    </>
  );
};

export default AdminOrdersPage;
