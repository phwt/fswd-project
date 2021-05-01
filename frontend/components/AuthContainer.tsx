import { ReactNode } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  children: ReactNode | ReactNode[];
}

const AuthContainer = ({ children }: Props) => {
  return (
    <Row>
      <Col md={3} />
      <Col md={6}>
        <Card className="p-4">{children}</Card>
      </Col>
    </Row>
  );
};

export default AuthContainer;
