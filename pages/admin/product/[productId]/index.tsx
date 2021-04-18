import ProductForm from "@components/admin/product/ProductForm";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { apolloClient } from "app-apollo-client";
import { Product } from "@type/SchemaModel";

export const getServerSideProps = async ({ params: { productId } }) => {
  const {
    data: { productById },
  } = await apolloClient.query({
    query: gql`
      query product($productId: MongoID!) {
        productById(_id: $productId) {
          name
          detail
          price
          sku
          stock
          weight
        }
      }
    `,
    variables: {
      productId,
    },
  });

  return {
    props: {
      product: productById,
    },
  };
};

const AdminProductPage = ({ product }) => {
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
    <>
      <h2>Edit Product</h2>
      <hr />
      <ProductForm product={product} onSubmit={handleProductUpdate} />
    </>
  );
};

export default AdminProductPage;
