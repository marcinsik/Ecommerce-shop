import React from 'react';
import { Outlet } from 'react-router-dom';
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
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminScreen = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };


    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Container>  
                    <Col col="2" md="2">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid"
                        alt="Sample image"
                        style={{ marginLeft: "90px" }} 
                    />
                    </Col>
                    <LinkContainer to="/admin">
                        <Navbar.Brand className="myshop">MyShop ADMIN PANEL</Navbar.Brand>
                    </LinkContainer>

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
                        </Nav>
                    </Navbar>

                </Container>
            </Navbar>

            <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to="/admin/userslist">
                        <Navbar className="admin-panel-userlist" style={{ color: 'green', border: '1px solid white' }}> Użytkownicy
                        </Navbar>
                    </LinkContainer>

                    <LinkContainer to="/admin/productslist">
                        <Navbar className="admin-panel-products-list" style={{ color: 'green', border: '1px solid white' }}> Produkty
                        </Navbar>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                        <Navbar className="admin-panel-orders-list" style={{ color: 'green', border: '1px solid white' }}> Zamówienia
                        </Navbar>
                    </LinkContainer>
                </Container>
            </Navbar>

            <Outlet />

        </header>
    );
};

export default AdminScreen;