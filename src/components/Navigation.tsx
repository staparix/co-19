import { Navbar, Nav } from "react-bootstrap";
import * as React from "react";

export const Navigation: React.FC = () => {
  return (
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">COVID-19</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href="/stats">Statistics</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
};
