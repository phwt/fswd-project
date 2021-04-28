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
        discountPercentage
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
          <Col
            className="bg-danger mx-1 p-3 mb-5"
            style={{ justifyContent: "center" }}
          >
            <p className="raleway-3">ONLINE ONLY</p>
            <br />
            <h1 className="raleway-6 text-white ">
              {/* <FontAwesomeIcon icon={faPercentage} /> */}
              SPRING PROMOTION
              <br />
              UP TO 20% OFF
            </h1>
          </Col>
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
