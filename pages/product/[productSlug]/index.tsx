import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetail from "../../../components/common/ProductDetail";

const ProductPage = () => {
  //get type from url param

  //come from promotion type=promotion
  //come from product -

  const { query } = useRouter();

  //query product by id
  const [
    getProduct,
    { loading: loadingProduct, error: errorProduct, data: dataProduct },
  ] = useLazyQuery(
    gql`
      query productFindOne($sku: String!) {
        productFindOne(filter: { sku: $sku }) {
          name
          detail
          price
          _id
          imageLocation
        }
      }
    `,
    {
      variables: {
        sku: query.productSlug,
      },
    }
  );
  //query promotion by id
  const [
    getPromotion,
    { loading: loadingPromotion, error: errorPromotion, data: dataPromotion },
  ] = useLazyQuery(
    gql`
      query promotionFindOne($sku: String!) {
        promotionFindOne(filter: { sku: $sku }) {
          name
          detail
          price
          _id
          imageLocation
        }
      }
    `,
    {
      variables: {
        sku: query.productSlug,
      },
    }
  );

  useEffect(() => {
    if (process.browser) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("type");

      if (myParam === "promotion") {
        getPromotion();
      } else {
        getProduct();
      }
    }
  }, []);

  return (
    <>
      {!loadingPromotion && dataPromotion && (
        <>
          {/* Product Page {query.productSlug} */}
          <ProductDetail
            name={dataPromotion.promotionFindOne.name}
            price={dataPromotion.promotionFindOne.price}
            detail={dataPromotion.promotionFindOne.detail}
            id={dataPromotion.promotionFindOne.id}
            imgurl={
              dataPromotion.promotionFindOne.imageLocation ?? "../no-image.jpg"
            }
          />
        </>
      )}
      {!loadingProduct && dataProduct && (
        <>
          <ProductDetail
            name={dataProduct.productFindOne.name}
            price={dataProduct.productFindOne.price}
            detail={dataProduct.productFindOne.detail}
            id={dataProduct.productFindOne._id}
            imgurl={
              dataProduct.productFindOne.imageLocation ?? "../no-image.jpg"
            }
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
