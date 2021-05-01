import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import axios from "axios";
import ProductForm from "@components/admin/product/ProductForm";

interface Props {
  promotionForm?: boolean;
}

const ProductCreateForm = ({ promotionForm = false }: Props) => {
  const router = useRouter();

  const initialProduct = promotionForm
    ? {
        _id: "",
        detail: "",
        name: "",
        price: 0,
        sku: "",
        stock: 0,
        weight: 0,
        discountPercentage: 0,
      }
    : {
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

  const [addPromotion] = useMutation(
    gql`
      mutation createPromotion($productInput: CreateOnePromotionInput!) {
        createPromotion(record: $productInput) {
          recordId
        }
      }
    `
  );

  const handleProductCreation = useCallback(
    async (product) => {
      delete product["_id"];

      let checkKey = ["price", "stock", "weight"];
      if (promotionForm) checkKey = [...checkKey, "discountPercentage"];

      Object.keys(product).map((key) => {
        if (checkKey.includes(key)) product[key] = parseFloat(product[key]);
      });

      if (product["image"]) {
        const formData = new FormData();
        const imageFile: File = product["image"];
        formData.append("file", imageFile);

        const {
          data: { imageLocation },
        } = await axios.post("/api/admin/product/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        delete product["image"];
        product["imageLocation"] = imageLocation;
      }

      if (promotionForm)
        await addPromotion({
          variables: {
            productInput: product,
          },
        });
      else
        await addProduct({
          variables: {
            productInput: product,
          },
        });

      if (promotionForm) await router.push("/admin/promotions");
      else await router.push("/admin/products");
    },
    [addProduct]
  );

  return (
    <ProductForm
      product={initialProduct}
      onSubmit={handleProductCreation}
      promotionForm={promotionForm}
    />
  );
};

export default ProductCreateForm;
