import * as React from "react";
import { Navigation } from "./Navigation";
import { Container } from "react-bootstrap";

export const MainLayout: React.FC = props => {
  return (
    <Container>
      <Navigation />
      {props.children}
    </Container>
  );
};
