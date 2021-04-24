import ProductForm from "@components/admin/product/ProductForm";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import { Product } from "@type/SchemaModel";

const ProductEditForm = ({ product }) => {
  const router = useRouter();
  const {
    query: { productId },
  } = router;

  const [updateProduct] = useMutation(
    gql`
      mutation updateProduct(
        $id: MongoID!
        $productInput: UpdateByIdProductInput!
      ) {
        updateProductById(_id: $id, record: $productInput) {
          recordId
        }
      }
    `
  );

  const handleProductUpdate = useCallback(
    async (product: Product) => {
      delete product["__typename"];

      Object.keys(product).map((key) => {
        if (["price", "stock", "weight"].includes(key))
          product[key] = parseFloat(product[key]);
      });

      await updateProduct({
        variables: {
          id: productId,
          productInput: product,
        },
      });

      await router.push("/admin/products");
    },
    [updateProduct]
  );

  return (
    <ProductForm product={product} onSubmit={handleProductUpdate} noImage />
  );
};

export default ProductEditForm;
