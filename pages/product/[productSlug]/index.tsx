import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetail from "../../../components/common/ProductDetail";

const ProductPage = () => {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(
    gql`
      query product($sku: String!) {
        productFindOne(filter: { sku: $sku }) {
          name
          detail
          price
          _id
        }
      }
    `,
    {
      variables: {
        sku: query.productSlug,
      },
    }
  );

  return (
    <>
      {!loading && data && data.productFindOne && (
        <>
          <ProductDetail
            name={data.productFindOne.name}
            price={data.productFindOne.price}
            detail={data.productFindOne.detail}
            id={data.productFindOne._id}
            imgurl="../product-xl.jpg"
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
