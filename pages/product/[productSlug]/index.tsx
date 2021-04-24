import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetail from "../../../components/common/ProductDetail";

const ProductPage = () => {
  //get type from url param
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("type");

  //come from promotion type=promotion
  //come from product -

  const { query } = useRouter();

  //query product by id
  const [
    getProduct,
    { loading: loadingProduct, error: errorProduct, data: dataProduct },
  ] = useLazyQuery(
    gql`
      query productById($id: MongoID!) {
        productById(_id: $id) {
          name
          detail
          price
          _id
        }
      }
    `,
    {
      variables: {
        id: query.productSlug,
      },
    }
  );
  //query promotion by id
  const [
    getPromotion,
    { loading: loadingPromotion, error: errorPromotion, data: dataPromotion },
  ] = useLazyQuery(
    gql`
      query promotionById($id: MongoID!) {
        promotionById(_id: $id) {
          name
          detail
          price
          _id
        }
      }
    `,
    {
      variables: {
        id: query.productSlug,
      },
    }
  );
  useEffect(() => {
    if (myParam === "promotion") {
      getPromotion();
    } else {
      getProduct();
    }
  }, []);
  // console.log(dataProduct);
  // console.log(dataPromotion);
  // console.log(type);
  // return <h1>{dataPromotion.promotionById.name}</h1>;

  return (
    <>
      {!loadingPromotion && dataPromotion && (
        <>
          {/* Product Page {query.productSlug} */}
          <ProductDetail
            name={dataPromotion.promotionById.name}
            price={dataPromotion.promotionById.price}
            detail={dataPromotion.promotionById.detail}
            id={dataPromotion.promotionById.id}
            imgurl="../product-xl.jpg"
          />
        </>
      )}
      {!loadingProduct && dataProduct && (
        <>
          {/* Product Page {query.productSlug} */}
          <ProductDetail
            name={dataProduct.productById.name}
            price={dataProduct.productById.price}
            detail={dataProduct.productById.detail}
            id={dataProduct.productById.id}
            imgurl="../product-xl.jpg"
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
