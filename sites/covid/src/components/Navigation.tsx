import { Navbar, Nav } from "react-bootstrap";
import * as React from "react";
import { Link } from "gatsby";

export const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand><Link to={"/"}>COVID-19</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link activeClassName={"someClass"} to="/stats">Statistics</Link>
          </Nav.Link>
            <Nav.Link>
                <Link activeClassName={"someClass"} to="/game">Game</Link>
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
