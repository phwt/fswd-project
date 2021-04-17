import { Col, Row, Card, Button, CardDeck } from "react-bootstrap";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  return (
    <>
      <CardDeck>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </CardDeck>
    </>
  );
};

export default Home;
