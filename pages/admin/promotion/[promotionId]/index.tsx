import { gql } from "@apollo/client/core";
import { apolloClient } from "app-apollo-client";
import ProductEditForm from "@components/admin/product/ProductEditForm";

export const getServerSideProps = async ({ params: { promotionId } }) => {
  const {
    data: { promotionById },
  } = await apolloClient.query({
    query: gql`
      query product($promotionId: MongoID!) {
        promotionById(_id: $promotionId) {
          name
          detail
          price
          sku
          stock
          weight
          discountPercentage
        }
      }
    `,
    variables: {
      promotionId,
    },
  });

  return {
    props: {
      product: promotionById,
    },
  };
};

const AdminPromotionPage = ({ product }) => {
  return (
    <>
      <h2>Edit Promotion</h2>
      <hr />
      <ProductEditForm product={product} promotionForm />
    </>
  );
};

export default AdminPromotionPage;
