import { gql, useQuery } from "@apollo/client";
import { Col, Row, Card, Button, CardDeck, Image } from "react-bootstrap";
import ProductCard from "../components/common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@type/SchemaModel";

const Home = () => {
  const query = gql`
    query {
      products(limit: 5, sort: _ID_DESC) {
        _id
        sku
        name
        detail
        price
        type
        imageLocation
      }
      promotions(limit: 4, sort: _ID_DESC) {
        _id
        sku
        name
        detail
        price
        type
        imageLocation
      }
    }
  `;
  const { loading, error, data } = useQuery(query);

  return (
    <>
      {!loading && (
        <>
          <Row>
            <Col></Col>
            <Col>
              <ProductCard size="40" product={data.products[0]} />
            </Col>
            <Col></Col>
          </Row>
          <CardDeck>
            {data.products.slice(1).map((d) => {
              return (
                <ProductCard key={d.name.toString()} size="18" product={d} />
              );
            })}
          </CardDeck>

          <h3>
            <FontAwesomeIcon icon={faPercentage} />
            <b> PROMOTION</b>
          </h3>
          <CardDeck>
            {data.promotions.slice(1).map((d: Product) => {
              return (
                <ProductCard key={d.name.toString()} size="18" product={d} />
              );
            })}
          </CardDeck>
        </>
      )}
    </>
  );
};

export default Home;
