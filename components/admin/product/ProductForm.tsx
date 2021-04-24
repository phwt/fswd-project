import React, { useCallback, useMemo, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Product, Promotion } from "@type/SchemaModel";

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
  product: Product | Promotion;
  onSubmit: (product: Product | Promotion) => void;
  promotionForm?: boolean;
  noImage?: boolean;
}

const ProductForm = ({
  product,
  onSubmit,
  promotionForm = false,
  noImage = false,
}: Props) => {
  const [localProduct, setLocalProduct] = useState<Product | Promotion>(
    product
  );

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

  const lastColSize = useMemo(() => {
    return promotionForm ? 3 : 4;
  }, [promotionForm]);

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

        <Col md={lastColSize} className="mt-2">
          <ControlUnit
            label="Price"
            unit="฿"
            name="price"
            value={localProduct.price}
            onChange={changeHandler}
          />
        </Col>

        {promotionForm && (
          <Col md={lastColSize} className="mt-2">
            <ControlUnit
              label="Discount"
              unit="%"
              name="discountPercentage"
              // @ts-ignore
              value={localProduct.discountPercentage}
              onChange={changeHandler}
            />
          </Col>
        )}

        <Col md={lastColSize} className="mt-2">
          <ControlUnit
            label="Weight"
            unit="g"
            name="weight"
            value={localProduct.weight}
            onChange={changeHandler}
          />
        </Col>

        <Col md={lastColSize} className="mt-2">
          <ControlUnit
            label="Stock"
            unit="pcs"
            name="stock"
            value={localProduct.stock}
            onChange={changeHandler}
          />
        </Col>

        {!noImage && (
          <Col md={12} className="mt-2">
            <Form.Label>Product Image</Form.Label>
            <Form.File
              label="Choose file"
              custom
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocalProduct({
                  ...localProduct,
                  // @ts-ignore
                  image: Array.from(e.target.files)[0],
                });
              }}
            />
          </Col>
        )}

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
