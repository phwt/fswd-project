import ProductCreateForm from "@components/admin/product/ProductCreateForm";
import PageTitle from "@components/admin/PageTitle";
import { requireAuthentication } from "@modules/Auth";

export const getServerSideProps = async (context) => {
  await requireAuthentication(context, ["Admin"]);
  return { props: {} };
};

const AdminProductCreatePage = () => {
  return (
    <>
      <PageTitle title="Create Product" />
      <hr />
      <ProductCreateForm />
    </>
  );
};

export default AdminProductCreatePage;
