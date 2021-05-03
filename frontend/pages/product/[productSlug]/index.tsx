import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ProductDetail from "../../../components/common/ProductDetail";
import { serverApollo } from "@modules/Apollo";

export const getServerSideProps = async (context) => {
  const apolloClient = serverApollo(context);

  const {
    data: { productFindOne, promotionFindOne },
  } = await apolloClient.query({
    query: gql`
      query productFindOne($sku: String!) {
        productFindOne(filter: { sku: $sku }) {
          name
          detail
          price
          _id
          imageLocation
          stock
        }
        promotionFindOne(filter: { sku: $sku }) {
          name
          detail
          price
          _id
          imageLocation
          discountPercentage
          stock
        }
      }
    `,
    variables: {
      sku: context.params.productSlug,
    },
  });

  return {
    props: {
      product: productFindOne,
      promotion: promotionFindOne,
    },
  };
};

const ProductPage = ({ product, promotion }) => {
  const [isPromotion, setIsPromotion] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("type");

      if (myParam === "promotion") setIsPromotion(true);
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {loaded && (
        <>
          {isPromotion ? (
            <ProductDetail product={promotion} isPromotion />
          ) : (
            <ProductDetail product={product} />
          )}
        </>
      )}
    </>
  );
};

export default ProductPage;
