import ProductCreateForm from "@components/admin/product/ProductCreateForm";
import PageTitle from "@components/admin/PageTitle";

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
