import * as React from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navigation } from "./Navigation";
import { Container } from "react-bootstrap";

export const MainLayout: React.FC = props => {
  return (
    <>
      <Helmet>
        <html lang="eng" />
        <title>Covid-19</title>
        <meta name="description" content="Information about covid-19" />
      </Helmet>
      <div>
        <Navigation />
        <Container>{props.children}</Container>
      </div>
    </>
  );
};
