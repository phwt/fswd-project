import { gql } from "@apollo/client/core";
import { apolloClient } from "app-apollo-client";
import ProductEditForm from "@components/admin/product/ProductEditForm";

export const getServerSideProps = async ({ params: { productId } }) => {
  const {
    data: { productById },
  } = await apolloClient.query({
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
      <h2>Edit Product</h2>
      <hr />
      <ProductEditForm product={product} />
    </>
  );
};

export default AdminProductPage;
