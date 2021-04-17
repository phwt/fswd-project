import { Card, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <Card style={{ width: "18rem" }} className="bg-t border-0">
      <Card.Img variant="top" src="product.jpg" className="border-0" />
      <Card.Body className="p-0">
        {/* <Card.Title>PATCH HOODIE</Card.Title> */}
        <p className="m-0">CHECK JACKET EMBROIDERY</p>
        <p>2,490 THB</p>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Footer;
