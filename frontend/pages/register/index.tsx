import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_MUTATION } from "../../graphql/createCustomerMutation";
import { useRouter } from "next/router";
import AuthContainer from "@components/AuthContainer";
import { Button, Col, Form, Row } from "react-bootstrap";

const RegisterForm = () => {
  const router = useRouter();

  const [useBilling, setUseBilling] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (useBilling) {
      setNewUser({
        ...newUser,
        shippingAddress: newUser.billingAddress,
      });
    }
  }, [useBilling]);

  const [createUser] = useMutation(CREATE_CUSTOMER_MUTATION);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await createUser({ variables: { record: newUser } });
        await router.push("/");
        alert("Register success");
      } catch (err) {
        console.log(err);
        alert("Register failed");
      }
    },
    [createUser, router, newUser]
  );

  return (
    <form onSubmit={handleRegister}>
      <AuthContainer>
        <Row>
          <Col md={12} className="mb-3 text-center">
            <h2>Register</h2>
          </Col>

          <Col md={12} className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Your email"
              required
            />
          </Col>
          <Col md={12} className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              placeholder="Your unique username"
              required
            />
          </Col>
          <Col md={12} className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Must be 6 or more characters long"
              required
            />
          </Col>
          <Col md={12} className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              placeholder="Your mobile phone number"
            />
          </Col>
          <Col md={12} className="mb-3">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="billingAddress"
              value={newUser.billingAddress}
              onChange={handleInputChange}
              placeholder="Billing Address"
              required
            />
          </Col>
          <Col md={12} className="mb-3">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="shippingAddress"
              value={newUser.shippingAddress}
              onChange={handleInputChange}
              placeholder="Shipping Address"
              required
            />
            <Form.Check
              label="Same as billing address"
              checked={useBilling}
              onChange={({ target: { checked } }) => {
                setUseBilling(checked);
              }}
            />
          </Col>

          <Col md={6} className="mb-3">
            <Button type="submit" block variant="success">
              Register
            </Button>
          </Col>

          <Col md={6} className="mb-3">
            <Button
              type="button"
              onClick={() => {
                router.push("/login");
              }}
              block
              variant="outline-primary"
            >
              Login
            </Button>
          </Col>
        </Row>
      </AuthContainer>
    </form>
  );
};

export default RegisterForm;
