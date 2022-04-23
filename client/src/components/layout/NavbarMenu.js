import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const { logoutUser } = useContext(AuthContext);

  const { username } = useSelector((state) => state.auth.user);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container fluid>
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          LearnIt
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              className="font-weight-bolder text-white d-flex align-items-center"
              disabled
            >
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
