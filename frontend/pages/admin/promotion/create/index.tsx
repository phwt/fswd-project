import ProductCreateForm from "@components/admin/product/ProductCreateForm";
import PageTitle from "@components/admin/PageTitle";

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
