import React from 'react'
import { Nav, Navbar, Container, Row, Form, Button, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'


function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

  return (
        <header>
            <Navbar bg="light" variant='light' expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className="myshop">MyShop</Navbar.Brand>
                    </LinkContainer>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Czego szukasz?"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="dark">Wyszukaj</Button>
                    </Form>
                    <Navbar className="my-class">
                        <Nav className="ms-auto">
                        
                        {userInfo ? (
                                <NavDropdown title="Twoje konto" id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Logowanie</Nav.Link>
                                    </LinkContainer>
                                )}
                            <LinkContainer to ='/cart'>
                                <Nav.Link><i className = "fas fa-shopping-cart"></i> Koszyk</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar>
                </Container>
            </Navbar>

            <Navbar bg="light" variant='light' expand="lg"  collapseOnSelect className='categories'>
                <Container>
                <Navbar.Brand className='d-lg-none'>Kategorie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="test">
                                <NavDropdown title="Laptopy i komputery">
                                    <NavDropdown.Item>Action</NavDropdown.Item>
                                    <NavDropdown.Item>Another action</NavDropdown.Item>
                                    <NavDropdown.Item>Something else here</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Podzespoły komputerowe">
                                    <NavDropdown.Item>Action</NavDropdown.Item>
                                    <NavDropdown.Item>Another action</NavDropdown.Item>
                                    <NavDropdown.Item>Something else here</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Gaming">
                                    <NavDropdown.Item>Action</NavDropdown.Item>
                                    <NavDropdown.Item>Another action</NavDropdown.Item>
                                    <NavDropdown.Item>Something else here</NavDropdown.Item>
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
  )
}

export default Header
