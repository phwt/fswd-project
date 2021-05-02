import { gql } from "@apollo/client/core";
import { serverApollo } from "@modules/Apollo";
import ProductEditForm from "@components/admin/product/ProductEditForm";
import PageTitle from "@components/admin/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);

  const {
    params: { promotionId },
  } = context;

  const {
    data: { promotionById },
  } = await serverApollo(context).query({
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
      <PageTitle title="Edit Promotion" />
      <hr />
      <ProductEditForm product={product} promotionForm />
    </>
  );
};

export default AdminPromotionPage;
