import { useQuery, gql } from "@apollo/client";
import { Nav,Button } from "react-bootstrap";

const AdminOrdersPage = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        orders {
          _id
          status
          timestamp
          customerId
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

  const renderTableOrder = data.orders.map((order) => {
    return (
      <tr>
        <th scope="row">{order._id}</th>
        <td>{order.status}</td>
        <td>{order.timestamp}</td>
        <td>{order.customerId}</td>
        <td><Button variant="outline-dark"><Nav.Link href={"/admin/orders/"+order._id}>View</Nav.Link></Button></td>
      </tr>
    );
  });

  return (
    <div className="content-admin">
      <h2>Admin Page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Time Stamp</th>
            <th>Customer ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderTableOrder}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;
