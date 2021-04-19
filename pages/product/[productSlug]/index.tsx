import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetail from "../../../components/common/ProductDetail";

const ProductPage = () => {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(
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

  return (
    <>
      {!loading && (
        <>
          {/* Product Page {query.productSlug} */}
          <ProductDetail
            name={data.productById.name}
            price={data.productById.price}
            detail={data.productById.detail}
            id={data.productById.id}
            imgurl="../product-xl.jpg"
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
