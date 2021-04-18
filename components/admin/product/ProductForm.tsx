import { useCallback, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Product } from "@type//SchemaModel";

const ControlUnit = ({ label, unit, name, value, onChange }) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          className="text-center"
          value={value}
          onChange={onChange}
          name={name}
        />
        <InputGroup.Append>
          <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

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
        <Col md={4} className="mt-2">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            value={localProduct.sku}
            onChange={changeHandler}
            name="sku"
          />
        </Col>

        <Col md={8} className="mt-2">
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
          <ControlUnit
            label="Price"
            unit="฿"
            name="price"
            value={localProduct.price}
            onChange={changeHandler}
          />
        </Col>

        <Col md={4} className="mt-2">
          <ControlUnit
            label="Weight"
            unit="g"
            name="weight"
            value={localProduct.weight}
            onChange={changeHandler}
          />
        </Col>

        <Col md={4} className="mt-2">
          <ControlUnit
            label="Stock"
            unit="pcs"
            name="stock"
            value={localProduct.stock}
            onChange={changeHandler}
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
