import ProductForm from "@components/admin/product/ProductForm";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import { Product, Promotion } from "@type/SchemaModel";

interface Props {
  product: Product | Promotion;
  promotionForm?: boolean;
}

const ProductEditForm = ({ product, promotionForm = false }: Props) => {
  const router = useRouter();
  const {
    query: { productId, promotionId },
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

  const [updatePromotion] = useMutation(
    gql`
      mutation updatePromotion(
        $id: MongoID!
        $productInput: UpdateByIdPromotionInput!
      ) {
        updatePromotionById(_id: $id, record: $productInput) {
          recordId
        }
      }
    `
  );

  const handleProductUpdate = useCallback(
    async (product: Product) => {
      let checkKey = ["price", "stock", "weight"];
      if (promotionForm) checkKey = [...checkKey, "discountPercentage"];

      Object.keys(product).map((key) => {
        if (checkKey.includes(key)) product[key] = parseFloat(product[key]);
      });

      if (promotionForm)
        await updatePromotion({
          variables: {
            id: promotionId,
            productInput: product,
          },
        });
      else
        await updateProduct({
          variables: {
            id: productId,
            productInput: product,
          },
        });

      if (promotionForm) await router.push("/admin/promotions");
      else await router.push("/admin/products");
    },
    [updateProduct]
  );

  return (
    <ProductForm
      product={product}
      onSubmit={handleProductUpdate}
      noImage
      promotionForm={promotionForm}
    />
  );
};

export default ProductEditForm;
