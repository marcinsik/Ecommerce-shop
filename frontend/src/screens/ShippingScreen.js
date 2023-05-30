import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
            <Form.Label>Adres</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Adres"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
            <Form.Label>Miasto</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Miasto"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Kod pocztowy"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
            <Form.Label>Państwo</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Państwo"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
            Continue
        </Button>
        </Form>
    </FormContainer>
    );
}

export default ShippingScreen;
