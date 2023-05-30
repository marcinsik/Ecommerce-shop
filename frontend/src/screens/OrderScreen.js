import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

function OrderScreen() {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2 className="mb-5 text-center">Podsumowanie zamówienia</h2>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="">
              <h2 style={{ marginBottom: "1rem" }}>Dostawa</h2>
              <p>
                <strong>Adres dostawy: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="mt-3">
              <h2 style={{ marginBottom: "1rem" }}>Metoda płatności</h2>
              <p>
                <strong>Płatność: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ marginTop: "1rem" }}>Produkty</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Twój koszyk jest pusty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} className="order-item-image">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={6} className="order-item-details">
                          <Link
                            to={`/product/${item.product}`}
                            className="order-item-name"
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4} className="order-item-price">
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
