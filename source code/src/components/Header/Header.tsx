import { Container, Navbar, Nav } from "react-bootstrap";
import { SaveFile } from "../../components";

/**
 * Header component contains save sequence button, and home link
 * @returns Header component contains Navbar
 */
export const Header = (): JSX.Element => {
  return (
    <Navbar style={{ backgroundColor: "#292929" }}>
      <Container>
        <Navbar.Collapse id="navbarScroll">
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            Machine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "#F3922B" }}>
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SaveFile />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
