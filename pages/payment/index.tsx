import {
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { formatPrice, productTotal } from "@modules/Utils";
import { Product } from "@type/SchemaModel";
import Link from "next/link";
import { getCartItems } from "@modules/Cart";

const VisaForm = () => {
  return (
    <>
      <Col md={12}>
        <Form.Label>Card Number</Form.Label>
        <Form.Control />
      </Col>

      <Col md={3} className="mt-3">
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control />
      </Col>

      <Col md={3} className="mt-3">
        <Form.Label>CVV</Form.Label>
        <Form.Control />
      </Col>
    </>
  );
};

const OrganForm = () => {
  return (
    <>
      <Col md={12} className="text-center">
        Contact nearby hospital for organ harvesting service and provide the
        reference number - the operations must be completed before placing
        order.
      </Col>

      <Col md={12}>
        <Form.Label>Reference Number</Form.Label>
        <Form.Control />
      </Col>
    </>
  );
};

const PaymentPage = () => {
  const [payment, setPayment] = useState();
  const [products, setProducts] = useState<Product[]>([]);

  const { loading, error, data } = useQuery(
    gql`
      query productByIds($productIds: [MongoID!]!) {
        productByIds(_ids: $productIds) {
          price
        }
      }
    `,
    {
      variables: {
        productIds: getCartItems(),
      },
    }
  );

  const total = useMemo(() => {
    return productTotal(products);
  }, [products]);

  useEffect(() => {
    if (!loading && data) setProducts(data.productByIds);
  }, [loading]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Row>
      <Col md={12} className="text-center mt-4 mb-5">
        <h2>
          <i className="fa fa-money-check-alt" /> Payment
        </h2>
      </Col>
      <Col md={6}>
        <h4 className="d-inline">Payment Options</h4>
        <hr />
        <ToggleButtonGroup
          name="radio"
          type="radio"
          className="w-100"
          size="lg"
          value={payment}
          onChange={setPayment}
        >
          <ToggleButton value="Visa / Mastercard">
            <i className="fab fa-cc-visa mr-2" />
            <i className="fab fa-cc-mastercard" />
          </ToggleButton>
          <ToggleButton value="PayPal">
            <i className="fab fa-paypal" />
          </ToggleButton>
          <ToggleButton value="Organ">
            <i className="fa fa-lungs" />
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="mt-2 text-center">
          {payment ? (
            <>
              Pay with <b>{payment}</b>
            </>
          ) : (
            "Please select payment options"
          )}
        </div>

        <Row>
          {payment && (
            <>
              <Col md={12}>
                <hr />
              </Col>

              {payment === "Visa / Mastercard" && <VisaForm />}
              {payment === "PayPal" && (
                <div className="text-center">
                  Your balance will be magically deducted from the PayPal
                  account corresponding to your email in the next step.
                </div>
              )}
              {payment === "Organ" && <OrganForm />}
            </>
          )}
        </Row>
      </Col>

      <Col md={6}>
        <h4 className="d-inline">Summary</h4>
        <hr />

        <Row>
          <Col>
            <h5 className="d-inline mr-3">Total</h5>
          </Col>
          <Col className="text-right">
            <h2 className="d-inline mr-1">{formatPrice(total)}</h2>
            <small className="text-muted">THB</small>
          </Col>

          <Col md={12} className="my-5 pb-5">
            <Link href="/customer/orders">
              <Button block variant="success">
                <i className="fa fa-shopping-cart mr-1" /> Pay and Place Order
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PaymentPage;
