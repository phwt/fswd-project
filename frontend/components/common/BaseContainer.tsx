import { Container } from "react-bootstrap";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const BaseContainer = ({ children }: Props) => {
  return (
    <>
      <Container
        style={{ minHeight: "100vh", marginTop: 120 }}
        className="py-4"
      >
        {children}
      </Container>
    </>
  );
};

export default BaseContainer;
