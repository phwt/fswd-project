import { Container } from "react-bootstrap";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const BaseContainer = ({ children }: Props) => {
  return (
    <>
      <Container fluid style={{ minHeight: "100vh" }} className="px-5 py-4">
        {children}
      </Container>
    </>
  );
};

export default BaseContainer;
