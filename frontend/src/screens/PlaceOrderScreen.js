import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce((acc, items) => acc + items.price * items.qty, 0).toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 200 ? 0 : 10).toFixed(2);
  cart.totalPrice = ( Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2);

  useEffect(() => {
    if (success) {
        navigate(`/order/${order._id}`)
        dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success])

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  if (!cart.paymentMethod) {
    navigate('/payment')
}

  return (
    <div>
      <h2 className="mb-5 text-center">Twoje zamówienie</h2>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="">
              <h2 style={{ marginBottom: "1rem" }}>Dostawa</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="mt-3">
              <h2 style={{ marginBottom: "1rem" }}>Metoda płatności</h2>
              <p>
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

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="text-center">Podsumowanie zamówienia</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Wartość</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Dostawa</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col style={{ fontWeight: '1000' }}>Razem:</Col>
                  <Col style={{ fontWeight: '1000' }}>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant = 'danger'>Aby złożyć zamówienie musisz być zalogowany.</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Złoż zamówienie
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
