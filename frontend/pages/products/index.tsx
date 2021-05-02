import { gql, useQuery } from "@apollo/client";
import { CardDeck, Pagination } from "react-bootstrap";
import ProductCard from "../../components/common/ProductCard";
import { useState } from "react";
// import PageTitle from "@components/common/PageTitle";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(
    gql`
      query productPagination($currentPage: Int) {
        productPagination(page: $currentPage, perPage: 4, sort: _ID_DESC) {
          items {
            _id
            sku
            name
            detail
            price
            type
            imageLocation
          }
          count
        }
      }
    `,
    {
      variables: {
        currentPage: currentPage,
      },
    }
  );
  // const query = gql`
  //   query {
  //     products(limit: 10, sort: _ID_DESC) {
  //       _id
  //       sku
  //       name
  //       detail
  //       price
  //       type
  //     }
  //   }
  // `;
  let items = [];
  if (!loading) {
    for (let number = 1; number <= data.productPagination.count / 4; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  return (
    <>
      {!loading && (
        <>
          <br />
          <h3 className="raleway-6">PRODUCTS</h3>
          <br />
          <CardDeck>
            {data.productPagination.items.map((d) => {
              return (
                <ProductCard key={d.name.toString()} size="18" product={d} />
              );
            })}
          </CardDeck>
        </>
      )}
      <br />
      <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
    </>
  );
};

export default ProductsPage;
