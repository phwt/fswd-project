import ProductForm from "@components/admin/product/ProductForm";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import axios from "axios";

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

      if (product["image"]) {
        const formData = new FormData();
        const imageFile: File = product["image"];
        delete product["image"];

        formData.append("variables", JSON.stringify(product));
        formData.append("file", imageFile);

        const { data } = await axios.post("/api/admin/product/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await addProduct({
          variables: {
            productInput: product,
          },
        });
      }

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
