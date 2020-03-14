import { Nav } from "react-bootstrap";
import * as React from "react";

export const Navigation: React.FC = () => {
  return (
      <Nav justify defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/stats" eventKey="link-1">Statistics</Nav.Link>
        </Nav.Item>
      </Nav>
  );
};
