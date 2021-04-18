import ProductForm from "@components/admin/product/ProductForm";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useRouter } from "next/router";
import { useCallback } from "react";

const AdminProductCreatePage = () => {
  const router = useRouter();

  const initialProduct = {
    _id: "",
    detail: "",
    name: "",
    price: 0,
    sku: "",
    stock: 0,
    weight: 0,
  };

  const [addProduct] = useMutation(
    gql`
      mutation createProduct($productInput: CreateOneProductInput!) {
        createProduct(record: $productInput) {
          recordId
        }
      }
    `
  );

  const handleProductCreation = useCallback(
    async (product) => {
      delete product["_id"];

      Object.keys(product).map((key) => {
        if (["price", "stock", "weight"].includes(key))
          product[key] = parseFloat(product[key]);
      });

      await addProduct({
        variables: {
          productInput: product,
        },
      });

      await router.push("/admin/products");
    },
    [addProduct]
  );

  return (
    <>
      <h2>Create Product</h2>
      <hr />
      <ProductForm product={initialProduct} onSubmit={handleProductCreation} />
    </>
  );
};

export default AdminProductCreatePage;
