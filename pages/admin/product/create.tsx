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
    image: null,
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

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      product["image"] = await toBase64(product["image"]);

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
