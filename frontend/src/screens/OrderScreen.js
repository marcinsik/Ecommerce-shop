import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { getOrderDetails } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function OrderScreen() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const dispatch = useDispatch();

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h2 className="mb-5 text-center">Twoje zamówienie</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="">
              <h2 style={{ marginBottom: "1rem" }}>Informacje</h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#333",
                  marginTop: "1rem",
                  fontWeight: "1000",
                }}
              >
                Potwierdzenie złożenia zamówienia zostało wysłane na twój adres
                e-mail: <span></span>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="">
              <h2 style={{ marginBottom: "1rem" }}>Dostawa</h2>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Dostarczone {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Niedostarczone</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="mt-3">
              <h2 style={{ marginBottom: "1rem" }}>Metoda płatności</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Opłacone: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Nieopłacone</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ marginTop: "1rem" }}>Produkty</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Puste zamówienie</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col>Nr. zamówienia</Col>
                  <Col>{orderId}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Wartość</Col>
                  <Col>{order.itemsPrice} ZŁ</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Dostawa</Col>
                  <Col>{order.shippingPrice} ZŁ</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col style={{ fontWeight: "1000" }}>Razem:</Col>
                  <Col style={{ fontWeight: "1000" }}>
                    {order.totalPrice} ZŁ
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  ZAMÓWIENIE ZŁOŻONE
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
