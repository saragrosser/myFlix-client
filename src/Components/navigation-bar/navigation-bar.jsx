import { Navbar, Container, Nav, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="ghibli-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="ghibli-navbar-brand">
          Studio Ghibli Movies App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="ghibli-navbar-toggler"
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="ghibli-navbar-collapse"
        >
          <Nav className="me-auto ghibli-nav">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="ghibli-nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="ghibli-nav-link">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="ghibli-nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="ghibli-nav-link">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="ghibli-nav-link">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
