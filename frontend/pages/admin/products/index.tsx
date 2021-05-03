import { gql } from "@apollo/client";
import { Button, Col, Row } from "react-bootstrap";
import { formatNumber } from "@modules/Utils";
import { serverApollo } from "@modules/Apollo";
import Link from "next/link";
import PageTitle from "@components/admin/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);

  const apolloClient = serverApollo(context);
  const {
    data: { products },
  } = await apolloClient.query({
    query: gql`
      query {
        products {
          _id
          name
          detail
          price
          stock
          sku
        }
      }
    `,
  });

  return {
    props: {
      products,
    },
  };
};

const AdminProductsPage = ({ products }) => {
  const renderTableProducts = products.map((product, index) => {
    return (
      <tr key={product._id}>
        <th>{index + 1}</th>
        <td>
          <Link href={"/admin/product/" + product._id}>{product.name}</Link>
        </td>
        <td>{product.detail}</td>
        <td>{formatNumber(product.price)}</td>
        <td>{product.stock}</td>
        <td className="text-right">
          <Link href={"/admin/product/" + product._id}>
            <Button variant="light" size="sm">
              <i className="fa fa-chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <PageTitle title="Products" />
        </Col>

        <Col className="text-right">
          <Link href="/admin/product/create">
            <Button variant="success">
              <i className="fa fa-plus mr-2" />
              Add Product
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
            <th />
          </tr>
        </thead>
        <tbody>{renderTableProducts}</tbody>
      </table>
    </div>
  );
};

export default AdminProductsPage;
