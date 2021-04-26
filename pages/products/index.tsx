import { gql, useQuery } from "@apollo/client";
import { CardDeck, Pagination } from "react-bootstrap";
import ProductCard from "../../components/common/ProductCard";
import { useState, useEffect } from "react";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(
    gql`
      query productPagination($currentPage: Int) {
        productPagination(page: $currentPage, perPage: 5) {
          items {
            _id
            sku
            name
            detail
            price
            type
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
  if (loading) {
    for (let number = 1; number <= 10; number++) {
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
  } else {
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
          <h3>
            <b> ALL PRODUCTS</b>
          </h3>
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
      <Pagination>{items}</Pagination>
    </>
  );
};

export default ProductsPage;
