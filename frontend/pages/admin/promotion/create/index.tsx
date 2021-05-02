import ProductCreateForm from "@components/admin/product/ProductCreateForm";
import PageTitle from "@components/admin/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);
  return { props: {} };
};

const AdminPromotionCreatePage = () => {
  return (
    <>
      <PageTitle title="Create Promotion" />
      <hr />
      <ProductCreateForm promotionForm />
    </>
  );
};

export default AdminPromotionCreatePage;
