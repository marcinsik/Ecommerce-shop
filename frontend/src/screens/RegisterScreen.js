import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";

function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister)
  const { error, loading, userInfo } = userRegister

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const redirect = queryParams.get("redirect") ?? "/"

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Hasła różnią się od siebie.");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </Col>
        <Col col="4" md="6">
          <div
            className="login-info mb-4"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              minHeight: "100px",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Rejestracja
            </p>
          </div>
          {message && <Message variant="danger">{message}</Message>}
          
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="name">
              <Form.Control
                required
                type="name"
                placeholder="Imię"
                value={name}
                onChange={(e) => setName(e.target.value)}
                classname="mb-3"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4" controlId="email">
              <Form.Control
                required
                type="email"
                placeholder="Adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                required
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4" controlId="passwordConfirm">
              <Form.Control
                required
                type="password"
                placeholder="Powtórz hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Zarejestruj się
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Posiadasz już konto?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Zaloguj się
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default RegisterScreen;
