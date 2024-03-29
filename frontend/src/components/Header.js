import React from "react";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Form,
  Button,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search?query=${searchTerm}`)
  }

  //enter
  function handleFormSubmit(event) {
    event.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza
    handleSearch(); // Wywołujemy funkcję do wyszukiwania
  }


  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [subcategories, setSubcategories] = useState([]);
  const [subsubcategories, setSubsubcategories] = useState([]);

  useEffect(() => {
    fetch("/api/subcategories/")
      .then((response) => response.json())
      .then((data) => setSubcategories(data))
      .catch((error) => console.log(error));

    fetch("/api/subsubcategories/")
      .then((response) => response.json())
      .then((data) => setSubsubcategories(data))
      .catch((error) => console.log(error));
  }, []);

  const findSubSubcategories = (subcategory) => {
    if (subsubcategories.length > 0) {
      return subsubcategories.filter(
        (subsubcategory) => subsubcategory.parent_subcategory === subcategory.id
      );
    }
    return [];
  };


  const location = useLocation()
  const isUserListRoute = location.pathname.startsWith('/admin/userslist') ||
    (location.pathname.startsWith('/admin') || location.pathname == '/admin/productslist' || location.pathname == '/admin/user/');

  if (isUserListRoute) {
    return null;
  }


  return (
    <header>
      <Navbar expand="sm" collapseOnSelect className="header-up">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="myshop">MyShop</Navbar.Brand>
          </LinkContainer>
          <Col className="logo" md="1" lg="2" sm="1">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
              style={{ marginLeft: "-20%", marginBottom: "10%"}}
            />
          </Col>
          <Form className="my-form" onSubmit={handleFormSubmit}>
            <Form.Control
              type="search"
              placeholder="Czego szukasz?"
              className="search-form"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="dark" onClick={handleSearch} >Wyszukaj</Button>
          </Form>
          <Navbar className="my-class">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title="Twoje konto" id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Wyloguj się
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Logowanie
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Koszyk
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>

      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        className="categories"
      >
        <Container>
          <Navbar.Brand className="d-lg-none">Kategorie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="test">

              <NavDropdown title="Laptopy i Komputery">
                <NavDropdown title="Laptopy">
                  <LinkContainer to="/">
                    <NavDropdown.Item>Laptopy 17</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavDropdown.Item>Laptopy 15</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </NavDropdown>

              <NavDropdown title="Podzespoły Komputerowe">
                <NavDropdown title="  Dyski HHD i SSD">
                  <LinkContainer to="/products/ssd">
                    <NavDropdown.Item>SSD</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/products/hdd">
                    <NavDropdown.Item>HDD</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <LinkContainer to="/products/graphic-cards">
                  <Nav.Link>Karty graficzne</Nav.Link>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown title="GAMING">
                <NavDropdown title="Action">
                  <LinkContainer to="/">
                    <NavDropdown.Item>test</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/products/hdd">
                    <NavDropdown.Item>TEST</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </NavDropdown>

              <NavDropdown title="Urządzenia peryferyjne">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="TV">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Audio">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Akcesoria">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
