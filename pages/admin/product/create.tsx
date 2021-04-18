import ProductForm from "@components/admin/product/ProductForm";
import { Product } from "@type/SchemaModel";
import { useState } from "react";

const AdminProductCreatePage = () => {
  const [product, setProduct] = useState<Product>({
    _id: "",
    detail: "",
    name: "",
    price: 0,
    sku: "",
    stock: 0,
    weight: 0,
  });

  return (
    <ProductForm
      product={product}
      onSubmit={(product) => {
        console.log(product); // TODO: Send API
      }}
    />
  );
};

export default AdminProductCreatePage;
