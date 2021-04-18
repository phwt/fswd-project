import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Product } from "@type//SchemaModel";

interface Props {
  product: Product;
  onSubmit: (product: Product) => void;
}

const ProductForm = ({ product, onSubmit }: Props) => {
  const [localProduct, setLocalProduct] = useState<Product>(product);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(localProduct);
    },
    [localProduct]
  );

  const changeHandler = useCallback(
    ({ target: { name, value } }) => {
      setLocalProduct({ ...localProduct, [name]: value });
    },
    [localProduct]
  );

  return (
    <form onSubmit={submitHandler}>
      <Row>
        <Col md={6} className="mt-2">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            value={localProduct.sku}
            onChange={changeHandler}
            name="sku"
          />
        </Col>

        <Col md={6} className="mt-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={localProduct.name}
            onChange={changeHandler}
            name="name"
          />
        </Col>

        <Col md={12} className="mt-2">
          <Form.Label>Detail</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={localProduct.detail}
            onChange={changeHandler}
            name="detail"
          />
        </Col>

        <Col md={4} className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={localProduct.price}
            onChange={changeHandler}
            name="price"
          />
        </Col>

        <Col md={4} className="mt-2">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            value={localProduct.weight}
            onChange={changeHandler}
            name="weight"
          />
        </Col>

        <Col md={4} className="mt-2">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={localProduct.stock}
            onChange={changeHandler}
            name="stock"
          />
        </Col>

        <Col className="mt-3 text-right">
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default ProductForm;
