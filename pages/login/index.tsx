import { useCallback, useState } from "react";
import { useSession } from "@modules/SessionContext";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";
import AuthContainer from "@components/AuthContainer";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState({
    error: false,
    detail: "",
  });

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (await login(username, password)) await router.push("/");
      else {
        setResult({
          error: true,
          detail: "Invalid username or password",
        });
      }
    },
    [login, password, username]
  );

  const redirectToRegister = useCallback(() => {
    router.push("/register");
  }, [router]);

  return (
    <form onSubmit={handleLogin}>
      <AuthContainer>
        <Row>
          <Col md={12} className="mb-3 text-center">
            <h2>Login</h2>
          </Col>
          <Col md={12} className="mb-3">
            <Form.Control
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
              isInvalid={result.error}
            />
          </Col>

          <Col md={12} className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
              isInvalid={result.error}
            />
            <Form.Control.Feedback type="invalid">
              {result.detail}
            </Form.Control.Feedback>
          </Col>

          <Col md={6} className="mb-3">
            <Button type="submit" block variant="success">
              Login
            </Button>
          </Col>

          <Col md={6} className="mb-3">
            <Button
              type="button"
              onClick={redirectToRegister}
              block
              variant="outline-primary"
            >
              Register
            </Button>
          </Col>
        </Row>
      </AuthContainer>
    </form>
  );
};

export default LoginPage;
