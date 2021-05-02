import { gql } from "@apollo/client/core";
import { serverApollo } from "@modules/Apollo";
import ProductEditForm from "@components/admin/product/ProductEditForm";
import { Button } from "react-bootstrap";
import PageTitle from "@components/admin/PageTitle";

export const getServerSideProps = async (context) => {
  const {
    params: { productId },
  } = context;

  const {
    data: { productById },
  } = await serverApollo(context).query({
    query: gql`
      query product($productId: MongoID!) {
        productById(_id: $productId) {
          name
          detail
          price
          sku
          stock
          weight
        }
      }
    `,
    variables: {
      productId,
    },
  });

  return {
    props: {
      product: productById,
    },
  };
};

const AdminProductPage = ({ product }) => {
  return (
    <>
      <PageTitle title="Edit Product" />
      <hr />
      <ProductEditForm product={product} />
    </>
  );
};

export default AdminProductPage;
