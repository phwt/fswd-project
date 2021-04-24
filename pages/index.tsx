import { gql, useQuery } from "@apollo/client";
import { Col, Row, Card, Button, CardDeck, Image } from "react-bootstrap";
import ProductCard from "../components/common/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const query = gql`
    query {
      products(limit: 5) {
        _id
        name
        detail
        price
      }
      promotions(limit: 4) {
        _id
        name
        detail
        price
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
              <ProductCard
                size="40"
                name={data.products[0].name}
                price={data.products[0].price}
                detail={data.products[0].detail}
                id={data.products[0]._id}
                type="product"
                imgurl="product-xl.jpg"
              />
            </Col>
            <Col></Col>
          </Row>
          <CardDeck>
            {data.products.slice(1).map((d) => {
              return (
                <ProductCard
                  key={d.name.toString()}
                  size="18"
                  name={d.name}
                  price={d.price}
                  detail={d.detail}
                  id={d._id}
                  type="product"
                  imgurl="product.jpg"
                />
              );
            })}
          </CardDeck>

          <h3>
            <FontAwesomeIcon icon={faPercentage} />
            <b> PROMOTION</b>
          </h3>
          <CardDeck>
            {data.promotions.slice(1).map((d) => {
              return (
                <ProductCard
                  key={d.name.toString()}
                  size="18"
                  name={d.name}
                  price={d.price}
                  detail={d.detail}
                  id={d._id}
                  type="promotion"
                  imgurl="promotion.jpg"
                />
              );
            })}
          </CardDeck>
        </>
      )}
    </>
  );
};

export default Home;
