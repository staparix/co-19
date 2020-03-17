import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navigation } from "./Navigation";
import { Container } from "react-bootstrap";

export const MainLayout: React.FC = props => {
  return (
    <div>
      <Navigation />
      <Container>{props.children}</Container>
    </div>
  );
};
