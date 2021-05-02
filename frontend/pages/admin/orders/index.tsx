import { useQuery, gql } from "@apollo/client";
import { Nav, Button, Row, Col } from "react-bootstrap";
import { serverApollo } from "@modules/Apollo";
import Link from "next/link";
import PageTitle from "@components/admin/PageTitle";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";

export const getServerSideProps = async (context) => {
  const apolloClient = serverApollo(context);
  const {
    data: { orders },
  } = await apolloClient.query({
    query: gql`
      query {
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
    `,
  });

  return {
    props: {
      orders,
    },
  };
};

const AdminOrdersPage = ({ orders }) => {
  const renderTableOrder = orders.map((order, index) => {
    const dateString = new Date(order.timestamp);
    return (
      <tr key={order._id.toString()}>
        <th>{index + 1}</th>
        <td>
          <OrderStatusLabel status={order.status} />
        </td>
        <td>{dateString.toLocaleDateString()}</td>
        <td>{order.orderedBy.username}</td>
        <td className="text-right">
          <Link href={"/admin/order/" + order._id}>
            <Button variant="light" size="sm">
              <i className="fa fa-chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <PageTitle title="Orders" />
      <div className="mb-3" />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Customer</th>
            <th />
          </tr>
        </thead>
        <tbody>{renderTableOrder}</tbody>
      </table>
    </>
  );
};

export default AdminOrdersPage;
