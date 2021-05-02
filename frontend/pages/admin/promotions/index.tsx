import { useQuery, gql } from "@apollo/client";
import { Nav, Button, Col, Row } from "react-bootstrap";
import { formatPrice } from "@modules/Utils";
import { serverApollo } from "@modules/Apollo";
import Link from "next/link";
import PageTitle from "@components/admin/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);

  const apolloClient = serverApollo(context);
  const {
    data: { promotions },
  } = await apolloClient.query({
    query: gql`
      query {
        promotions {
          _id
          name
          detail
          price
          stock
          discountPercentage
          sku
        }
      }
    `,
  });

  return {
    props: {
      promotions,
    },
  };
};

const AdminPromotionsPage = ({ promotions }) => {
  const renderTablePromotions = promotions.map((promotion, index) => {
    return (
      <tr key={promotion.name.toString()}>
        <th scope="row">{index + 1}</th>
        <td>
          <Link href={"/admin/promotion/" + promotion._id}>
            {promotion.name}
          </Link>
        </td>
        <td>{promotion.detail}</td>
        <td>{formatPrice(promotion.price)}</td>
        <td>{promotion.stock}</td>
        <td>{promotion.discountPercentage}%</td>
        <td className="text-right">
          <Link href={"/admin/promotion/" + promotion._id}>
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
      <Row className="mb-3">
        <Col>
          <PageTitle title="Promotions" />
        </Col>
        <Col className="text-right">
          <Link href="/admin/promotion/create">
            <Button variant="success">
              <i className="fa fa-plus mr-2" />
              Add Promotion
            </Button>
          </Link>
        </Col>
      </Row>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Detail</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Discount</th>
            <th />
          </tr>
        </thead>
        <tbody>{renderTablePromotions}</tbody>
      </table>
    </>
  );
};

export default AdminPromotionsPage;
