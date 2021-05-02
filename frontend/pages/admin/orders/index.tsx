import { gql } from "@apollo/client";
import { Button } from "react-bootstrap";
import { serverApollo } from "@modules/Apollo";
import Link from "next/link";
import PageTitle from "@components/admin/PageTitle";
import OrderStatusLabel from "@components/admin/order/OrderStatusLabel";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);

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
          <Link href={"/admin/order/" + order._id}>
            {order.orderedBy.username}
          </Link>
        </td>
        <td>
          <OrderStatusLabel status={order.status} />
        </td>
        <td>{dateString.toLocaleDateString()}</td>
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
            <th>Customer</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th />
          </tr>
        </thead>
        <tbody>{renderTableOrder}</tbody>
      </table>
    </>
  );
};

export default AdminOrdersPage;
