import { gql, useQuery } from "@apollo/client";
import { CardColumns } from "react-bootstrap";
import ProductCard from "../../components/common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";

const PromotionsPage = () => {
  const query = gql`
    query {
      promotions(limit: 10, sort: _ID_DESC) {
        _id
        sku
        name
        detail
        price
        type
        imageLocation
        discountPercentage
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  return (
    <>
      {!loading && (
        <>
          <h3 className="raleway-3">
            {/* <FontAwesomeIcon icon={faPercentage} /> */}
            ALL PROMOTION
          </h3>
          <br />
          <CardColumns>
            {data.promotions.slice(1).map((d) => {
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

export default PromotionsPage;
