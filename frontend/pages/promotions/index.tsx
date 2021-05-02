import { gql, useQuery } from "@apollo/client";
import { CardDeck, Pagination } from "react-bootstrap";
import ProductCard from "../../components/common/ProductCard";
import { useState } from "react";
// import PageTitle from "@components/common/PageTitle";

const PromotionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(
    gql`
      query promotionPagination($currentPage: Int) {
        promotionPagination(page: $currentPage, perPage: 5, sort: _ID_DESC) {
          items {
            _id
            sku
            name
            detail
            price
            type
            imageLocation
            discountPercentage
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

  let items = [];
  if (!loading) {
    for (
      let number = 1;
      number <= data.promotionPagination.count / 4;
      number++
    ) {
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
          <h3 className="raleway-6">PROMOTIONS</h3>
          <br />
          <CardDeck>
            {data.promotionPagination.items.map((d) => {
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

export default PromotionsPage;
