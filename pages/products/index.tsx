import { gql, useQuery } from "@apollo/client";
import { CardColumns } from "react-bootstrap";
import ProductCard from "../../components/common/ProductCard";

const ProductsPage = () => {
  const query = gql`
    query {
      products(limit: 10, sort: _ID_DESC) {
        _id
        sku
        name
        detail
        price
        type
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  return (
    <>
      {!loading && (
        <>
          <h3>
            <b> ALL PRODUCTS</b>
          </h3>
          <br />
          <CardColumns>
            {data.products.slice(1).map((d) => {
              return (
                <ProductCard key={d.name.toString()} size="18" product={d} />
              );
            })}
          </CardColumns>
        </>
      )}
    </>
  );
};

export default ProductsPage;
